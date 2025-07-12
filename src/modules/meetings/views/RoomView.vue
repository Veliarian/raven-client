<script setup>
import {ref, watch, onBeforeUnmount, onMounted} from 'vue';
import {createLocalTracks, Room, RoomEvent} from 'livekit-client';
import ResizableSplit from "@/shared/components/ResizableSplit.vue";
import MicrophoneButton from "@/modules/meetings/components/buttons/MicrophoneButton.vue";
import CameraButton from "@/modules/meetings/components/buttons/CameraButton.vue";
import LeaveButton from "@/modules/meetings/components/buttons/LeaveButton.vue";
import MonitorShareButton from "@/modules/meetings/components/buttons/MonitorShareButton.vue";
import BoardButton from "@/modules/meetings/components/buttons/BoardButton.vue";
import MainStage from "@/modules/meetings/components/MainStage.vue";
import ParticipantStrip from "@/modules/meetings/components/ParticipantStrip.vue";

const props = defineProps({
   roomName: String,
   participantName: String,
});

const emit = defineEmits(["leaveRoom"]);

// 🔧 Конфіг
const LIVEKIT_URL = 'ws://localhost:7880/';
const SERVER_URL = 'http://localhost:8080/';

const room = ref(null);

const localTrack = ref();
const screenTrack = ref();
const remoteParticipantsMap = ref(new Map());

const isActiveMainStage = ref(false);
const mainContent = ref(null);

const isCameraOn = ref(true);
const isMicrophoneOn = ref(true);
const isScreenShareOn = ref(false);

const toggleCamera = async () => {
    if (!room.value) return;

    const participant = room.value.localParticipant;

    if (isCameraOn.value) {
        // Вимкнути камеру
        participant.videoTrackPublications.forEach(publication => {
            publication.track?.stop();
            participant.unpublishTrack(publication.track);
        });
        localTrack.value = null;
    } else {
        // Увімкнути камеру
        const [videoTrack] = await createLocalTracks({ video: true });
        await participant.publishTrack(videoTrack);
        localTrack.value = videoTrack;
    }

    isCameraOn.value = !isCameraOn.value;
}

const toggleMicrophone = async () => {
    if (!room.value) return;

    const participant = room.value.localParticipant;
    let found = false;

    for (const pub of participant.audioTrackPublications.values()) {
        if (pub.source === 'microphone' && pub.track) {
            const track = pub.track;

            if (track.isMuted) {
                await track.unmute(); // 🔊
                isMicrophoneOn.value = true;
            } else {
                await track.mute(); // 🔇
                isMicrophoneOn.value = false;
            }

            found = true;
            break;
        }
    }

    // Якщо не знайшли трек — створюємо й вмикаємо
    if (!found) {
        const [audioTrack] = await createLocalTracks({ audio: true });
        await participant.publishTrack(audioTrack, { source: 'microphone' });
        isMicrophoneOn.value = true;
    }
};

const toggleScreenShare = async () => {
    if (!room.value) return;

    const participant = room.value.localParticipant;

    if (isScreenShareOn.value) {
        participant.videoTrackPublications.forEach(publication => {
            if (publication.source === "screen_share") {
                publication.track.stop();
                participant.unpublishTrack(publication.track);
            }
        });

        screenTrack.value = null;
        mainContent.value = null;
    } else {
        const [videoTrack] = await participant.createScreenTracks();
        await participant.publishTrack(videoTrack);

        screenTrack.value = videoTrack;
        mainContent.value = {
            type: 'video',
            data: {
                track: screenTrack.value,
                participantIdentity: participant.identity,
            }
        };
    }

    isScreenShareOn.value = !isScreenShareOn.value;
    isActiveMainStage.value = !isActiveMainStage.value;
}

const joinRoom = async () => {
    room.value = new Room();

    room.value.on(RoomEvent.TrackSubscribed, (track, publication, participant) => {
        const identity = participant.identity;

        if (!remoteParticipantsMap.value.has(identity)) {
            remoteParticipantsMap.value.set(identity, {
                videoTrack: null,
                audioTrack: null,
                screenTrack: null,
            });
        }

        const current = remoteParticipantsMap.value.get(identity);

        if (publication.kind === 'video') {
            if (publication.source === 'screen_share') {
                current.screenTrack = track;

                mainContent.value = {
                    type: 'video',
                    data: {
                        track,
                        participantIdentity: participant.identity,
                    },
                };
                isActiveMainStage.value = true;
            } else {
                current.videoTrack = track;
            }
        } else if (publication.kind === 'audio') {
            current.audioTrack = track;
        }

        remoteParticipantsMap.value.set(identity, { ...current });
    });

    room.value.on(RoomEvent.ParticipantDisconnected, (participant) => {
        const identity = participant.identity;

        // 🔥 Видаляємо з мапи
        remoteParticipantsMap.value.delete(identity);

        // Якщо цей учасник був на MainStage — очищаємо
        if (mainContent.value?.data?.participantIdentity === identity) {
            mainContent.value = null;
            isActiveMainStage.value = false;
        }
    });

    room.value.on(RoomEvent.TrackUnsubscribed, (track, publication, participant) => {
        const identity = participant.identity;

        const current = remoteParticipantsMap.value.get(identity);
        if (!current) return;

        if (publication.kind === 'video') {
            if(publication.source === "screen_share"){
                current.screenTrack = null;
                mainContent.value = null;
                isActiveMainStage.value = false;
            }else {
                current.videoTrack = null;
            }
        } else if (publication.kind === 'audio') {
            current.audioTrack = null;
        }

        remoteParticipantsMap.value.set(identity, { ...current });
    });

    const token = await getToken(props.roomName, props.participantName);
    await room.value.connect(LIVEKIT_URL, token);

    const tracks = await createLocalTracks({ audio: true, video: true });

    for (let track of tracks) {
        await room.value.localParticipant.publishTrack(track);

        if (track.kind === 'video') {
            localTrack.value = track;
        }
    }
};

onMounted(() => {
    joinRoom();
});

// 🧹 Очистка при закритті
onBeforeUnmount(() => {
    leaveRoom()
})

const leaveRoom = () => {
    room.value.disconnect();
    emit("leaveRoom");
}

// 🔑 Отримати токен з бекенду
async function getToken(roomName, participantName) {
    const res = await fetch(SERVER_URL + 'token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            roomName,
            participantName
        })
    });

    const data = await res.json();
    return data.token;
}
</script>

<template>
    <div class="room">
        <div id="room-header">
            <h2 id="room-title">{{ roomName }}</h2>
        </div>

        <ResizableSplit>
            <template #left>
                <div class="layout-container">
                    <div class="videos-container">
                        <MainStage
                            v-if="mainContent"
                            :content-type="mainContent.type"
                            :content-data="mainContent.data"
                        />
                        <ParticipantStrip
                            :participant-name="participantName"
                            :local-track="localTrack"
                            :remote-tracks="remoteParticipantsMap"
                            :active-main-stage="isActiveMainStage"
                        />
                    </div>
                    <div class="room-controls">
                        <MicrophoneButton :microphone-publish="isMicrophoneOn" @click="toggleMicrophone"/>
                        <CameraButton :camera-publish="isCameraOn" @click="toggleCamera"/>
                        <LeaveButton @click="leaveRoom"/>
                        <MonitorShareButton @click="toggleScreenShare"/>
                        <BoardButton/>
                    </div>
                </div>
            </template>

            <template #right>

            </template>
        </ResizableSplit>
    </div>
</template>

<style scoped>
.room{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.layout-container{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: .5rem;
}

.videos-container{
    width: 100%;
    height: 100%;
    position: relative;
}

.room-controls{
    min-width: fit-content;
    padding: var(--spacing-3);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-full);
    display: flex;
    gap: var(--spacing-3);
}
</style>
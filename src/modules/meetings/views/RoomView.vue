<script setup>
import {onBeforeUnmount, onMounted, ref} from 'vue';
import {createLocalTracks, Room, RoomEvent} from 'livekit-client';
import MainStage from "@/modules/meetings/components/MainStage.vue";
import ParticipantStrip from "@/modules/meetings/components/ParticipantStrip.vue";
import {serverURL} from "@/shared/utils/serverURL.js";
import {authHeader} from "@/shared/utils/authHeader.js";
import axios from "axios";
import {FButton, FResizableSplit, FTitle} from "@uikit";
import {
    mdiCamera,
    mdiCameraOff,
    mdiMicrophone,
    mdiMicrophoneOff,
    mdiMonitorOff,
    mdiMonitorShare,
    mdiPencil,
    mdiPencilOff,
    mdiPhoneHangup
} from "@mdi/js";
import RoomControlButton from "@/modules/meetings/components/RoomControlButton.vue";

const props = defineProps({
    roomName: String,
    participantName: String,
});

const emit = defineEmits(["leaveRoom"]);

// 🔧 Конфіг
const LIVEKIT_URL = 'https://livekit.veliar.keenetic.link';
let SERVER_URL = serverURL + '/meetings';

const room = ref(null);

const localTrack = ref();
const screenTrack = ref();
const remoteParticipantsMap = ref(new Map());

const isActiveMainStage = ref(false);
const mainContent = ref(null);

const isCameraOn = ref(true);
const isMicrophoneOn = ref(true);
const isScreenShareOn = ref(false);
const isBoardOpened = ref(false);

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
        const [videoTrack] = await createLocalTracks({video: true});
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
        const [audioTrack] = await createLocalTracks({audio: true});
        await participant.publishTrack(audioTrack, {source: 'microphone'});
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

        remoteParticipantsMap.value.set(identity, {...current});
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
            if (publication.source === "screen_share") {
                current.screenTrack = null;
                mainContent.value = null;
                isActiveMainStage.value = false;
            } else {
                current.videoTrack = null;
            }
        } else if (publication.kind === 'audio') {
            current.audioTrack = null;
        }

        remoteParticipantsMap.value.set(identity, {...current});
    });

    const token = await getToken(props.roomName, props.participantName);
    await room.value.connect(LIVEKIT_URL, token);

    const tracks = await createLocalTracks({audio: true, video: true});

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

async function getToken(roomName, participantName) {
    const res = await axios.post(SERVER_URL + "/token", {roomName, participantName}, {
        headers: authHeader()
    });

    const data = res.data;
    return data.token;
}
</script>

<template>
    <div class="room">
        <f-title :title="roomName"/>

        <f-resizable-split>
            <template #left>
                <div class="layout-container">
                    <div class="videos-container">
                        <main-stage
                            v-if="mainContent"
                            :content-type="mainContent.type"
                            :content-data="mainContent.data"
                        />
                        <participant-strip
                            :participant-name="participantName"
                            :local-track="localTrack"
                            :remote-tracks="remoteParticipantsMap"
                            :active-main-stage="isActiveMainStage"
                        />
                    </div>
                    <div class="room-controls">
                        <room-control-button :parameter="isMicrophoneOn" :enabled-icon="mdiMicrophone"
                                             :disabled-icon="mdiMicrophoneOff" @click="toggleMicrophone"/>
                        <room-control-button :parameter="isCameraOn" :enabled-icon="mdiCamera"
                                             :disabled-icon="mdiCameraOff" @click="toggleCamera"/>
                        <f-button form="circle" type="danger"
                                  :icon="mdiPhoneHangup" @click="leaveRoom"/>
                        <room-control-button :parameter="isScreenShareOn" :enabled-icon="mdiMonitorOff"
                                             :disabled-icon="mdiMonitorShare" @click="toggleScreenShare"/>
                        <room-control-button :parameter="isBoardOpened" :enabled-icon="mdiPencilOff"
                                             :disabled-icon="mdiPencil"/>
                    </div>
                </div>
            </template>

            <template #right>

            </template>
        </f-resizable-split>
    </div>
</template>

<style scoped>
.room {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.layout-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: .5rem;
}

.videos-container {
    width: 100%;
    height: 100%;
    position: relative;
}

.room-controls {
    min-width: fit-content;
    padding: var(--spacing-xs);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-full);
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
}
</style>
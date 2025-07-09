<script setup>
import {ref, watch, onBeforeUnmount, onMounted} from 'vue'
import {createLocalTracks, Room, RoomEvent} from 'livekit-client'
import HzVideoComponent from "@/modules/meetings/components/HzVideoComponent.vue";
import AudioComponent from "@/modules/meetings/components/AudioComponent.vue";
import ResizapleSplit from "@/shared/components/ResizapleSplit.vue";
import RoomControlButton from "@/modules/meetings/components/buttons/RoomControlButton.vue";
import MicrophoneButton from "@/modules/meetings/components/buttons/MicrophoneButton.vue";
import CameraButton from "@/modules/meetings/components/buttons/CameraButton.vue";
import LeaveButton from "@/modules/meetings/components/buttons/LeaveButton.vue";
import MonitorShareButton from "@/modules/meetings/components/buttons/MonitorShareButton.vue";
import BoardButton from "@/modules/meetings/components/buttons/BoardButton.vue";
import VideoComponent from "@/modules/meetings/components/VideoComponent.vue";
import UserVideo from "@/modules/meetings/components/UserVideo.vue";
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
const remoteTracksMap = ref(new Map());

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

const toggleScreenShare = async () => {
    if (!room.value) return;

    const participant = room.value.localParticipant;

    if (isScreenShareOn.value) {
        participant.videoTrackPublications.forEach(publication => {
            if (publication.track?.name === 'screen') {
                publication.track.stop();
                participant.unpublishTrack(publication.track);
            }
        });
        screenTrack.value = null;
    } else {
        const [videoTrack] = await participant.createScreenTracks({ video: true });
        videoTrack.name = 'screen'; // Ідентифікуємо трек
        await participant.publishTrack(videoTrack);
        screenTrack.value = videoTrack;
    }

    isScreenShareOn.value = !isScreenShareOn.value;
}

const toggleMicrophone = async () => {
    if (!room.value) return;

    const participant = room.value.localParticipant;

    if(isMicrophoneOn.value) {
        participant.audioTrackPublications.forEach(publication => {
            publication.track?.stop();
            participant.unpublishTrack(publication.track);
        });
    } else {

    }
}

const joinRoom = async () => {
    room.value = new Room();

    room.value.on(
        RoomEvent.TrackSubscribed,
        (track, publication, participant) => {
            remoteTracksMap.value.set(publication.trackSid, {
                trackPublication: publication,
                participantIdentity: participant.identity
            });
        }
    );

    // On every Track destroyed...
    room.value.on(RoomEvent.TrackUnsubscribed, (track, publication) => {
        remoteTracksMap.value.delete(publication.trackSid);
    });

    const token = await getToken(props.roomName, props.participantName);

    await room.value.connect(LIVEKIT_URL, token);

    const tracks = await createLocalTracks({
        audio: true,
        video: true
    });

    for (let track of tracks) {
        await room.value.localParticipant.publishTrack(track);

        if (track.kind === "video") {
            localTrack.value = room.value.localParticipant.videoTrackPublications.values().next().value.videoTrack;
        }
    }
}

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

        <resizaple-split>
            <template #left>
                <div class="layout-container">
                    <div class="videos-container">
                        <MainStage/>
                        <ParticipantStrip
                            :participant-name="participantName"
                            :local-track="localTrack"
                            :remote-tracks="remoteTracksMap"
                        />
                    </div>
                    <div class="room-controls">
                        <MicrophoneButton/>
                        <CameraButton :camera-publish="isCameraOn" @click="toggleCamera"/>
                        <LeaveButton @click="leaveRoom"/>
                        <MonitorShareButton @click="toggleScreenShare"/>
                        <BoardButton/>
                    </div>
                </div>
            </template>

            <template #right>

            </template>
        </resizaple-split>
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
}

.videos-container{
    flex: 1;
    width: 100%;
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
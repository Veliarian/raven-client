<script setup>
import { ref, watch, onBeforeUnmount } from 'vue'
import {createLocalTracks, Room, RoomEvent} from 'livekit-client'
import HzVideoComponent from "@/modules/meetings/components/HzVideoComponent.vue";
import AudioComponent from "@/modules/meetings/components/AudioComponent.vue";

// 🔧 Конфіг
const LIVEKIT_URL = 'ws://localhost:7880/';
const SERVER_URL = 'http://localhost:8080/';

const room = ref(null);
const roomName = ref("");
const participantName = ref("");

const localTrack = ref();
const remoteTracksMap = ref(new Map());

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

    const token = await getToken(roomName.value, participantName.value);
    console.log(token);

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

    // localTrack.value = room.value.localParticipant.videoTrackPublications.values().next().value.videoTrack;
}

// 🧹 Очистка при закритті
onBeforeUnmount(() => {
    leaveRoom()
})

const leaveRoom = () => {
    room.value.disconnect();
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
    <div v-if="!room" id="join">
        <div id="join-dialog">
            <h2>Join a Video Room</h2>
            <form @submit.prevent="joinRoom">
                <div>
                    <label for="participant-name">Participant</label>
                    <input v-model="participantName" id="participant-name" class="form-control" type="text" required />
                </div>
                <div>
                    <label for="room-name">Room</label>
                    <input v-model="roomName" id="room-name" class="form-control" type="text" required />
                </div>
                <button class="btn btn-lg btn-success" type="submit" :disabled="!roomName || !participantName">
                    Join!
                </button>
            </form>
        </div>
    </div>
    <div v-else id="room">
        <div id="room-header">
            <h2 id="room-title">{{ roomName }}</h2>
            <button class="btn btn-danger" id="leave-room-button" @click="leaveRoom">Leave Room</button>
        </div>
        <div id="layout-container">
            <HzVideoComponent
                v-if="localTrack"
                :track="localTrack"
                :participantIdentity="participantName"
                :local="true"
            />
            <template v-for="remoteTrack of remoteTracksMap.values()" :key="remoteTrack.trackPublication.trackSid">
                <HzVideoComponent
                    v-if="remoteTrack.trackPublication.kind === 'video'"
                    :track="remoteTrack.trackPublication.videoTrack"
                    :participantIdentity="remoteTrack.participantIdentity"
                />
                <AudioComponent v-else :track="remoteTrack.trackPublication.audioTrack" hidden />
            </template>
        </div>
    </div>
</template>

<style scoped>
#layout-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 10px;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 1000px;
    height: 100%;
}
</style>
<script setup>
import {LocalVideoTrack, RemoteVideoTrack} from 'livekit-client';
import {onMounted, onUnmounted, ref, watch} from 'vue';

const props = defineProps({
    track: {
        type: [LocalVideoTrack, RemoteVideoTrack]
    },
    participantIdentity: String,
    local: {
        type: Boolean,
        default: false
    }
});

const videoElement = ref(null);

onMounted(() => {
    if (videoElement.value) {
        props.track.attach(videoElement.value);
    }
});

onUnmounted(() => {
    props.track.detach();
});
</script>

<template>
    <div :id="'camera-' + participantIdentity" class="video-container">
        <div class="participant-data">
            <p>{{ participantIdentity + (local ? ' (You)' : '') }}</p>
        </div>
        <video v-if="track" ref="videoElement" :id="track.sid"></video>
    </div>
</template>

<style scoped>
.video-container {
    position: relative;
    background: #3b3b3b;
    aspect-ratio: 16/9;
    border-radius: 6px;
    overflow: hidden;
    flex: 1;
}

.video-container video {
    width: 100%;
    height: 100%;
}

.video-container .participant-data {
    position: absolute;
    top: 0;
    left: 0;
}

.participant-data p {
    background: #f8f8f8;
    margin: 0;
    padding: 0 5px;
    color: #777777;
    font-weight: bold;
    border-bottom-right-radius: 4px;
}

.no-video {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.profile-image-container {
    width: 10%;
}

/* Media Queries */
@media screen and (max-width: 480px) {
    .video-container {
        aspect-ratio: 9/16;
    }
}
</style>

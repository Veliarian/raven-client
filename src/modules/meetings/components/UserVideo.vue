<script setup>
import {LocalVideoTrack, RemoteVideoTrack} from 'livekit-client';
import VideoComponent from "@/modules/meetings/components/VideoComponent.vue";
import EmptyVideo from "@/modules/meetings/components/EmptyVideo.vue";

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
</script>

<template>
    <div :id="'camera-' + participantIdentity" class="video-container">
        <div class="participant-data">
            <p>{{ participantIdentity + (local ? ' (You)' : '') }}</p>
        </div>
        <video-component v-if="track" :track="track"/>
        <empty-video v-else/>
    </div>
</template>

<style scoped>
.video-container {
    max-width: 100%;
    max-height: 100%;
    aspect-ratio: 16/9;
    background: #3b3b3b;
    border-radius: var(--radius-lg);
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
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

/* Media Queries */
@media screen and (max-width: 480px) {
    .video-container {
        aspect-ratio: 9/16;
    }
}
</style>
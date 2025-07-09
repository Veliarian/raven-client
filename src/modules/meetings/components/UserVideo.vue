<script setup>
import {LocalVideoTrack, RemoteVideoTrack} from 'livekit-client';
import {onMounted, onUnmounted, ref, watch} from 'vue';
import HzVideoComponent from "@/modules/meetings/components/HzVideoComponent.vue";
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
        <VideoComponent v-if="track" :track="track"/>
        <EmptyVideo v-else/>
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
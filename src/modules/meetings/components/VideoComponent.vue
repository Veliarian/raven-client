<script setup>
import {LocalVideoTrack, RemoteVideoTrack} from 'livekit-client';
import {onMounted, onUnmounted, ref, watch} from 'vue';

const props = defineProps({
    track: {
        type: [LocalVideoTrack, RemoteVideoTrack]
    },
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
    <video v-if="track" ref="videoElement" :id="track.sid"></video>
</template>

<style scoped>
video {
    width: 100%;
    height: 100%;
}
</style>

<script setup>
import { LocalAudioTrack, RemoteAudioTrack } from 'livekit-client';
import { onMounted, onUnmounted, ref } from 'vue';

const props = defineProps({
    track: {
        type: [LocalAudioTrack, RemoteAudioTrack]
    },
});

const audioElement = ref(null);

onMounted(() => {
    if (audioElement.value) {
        props.track.attach(audioElement.value);
    }
});

onUnmounted(() => {
    props.track.detach();
});
</script>

<template>
    <audio ref="audioElement" :id="track.sid"></audio>
</template>

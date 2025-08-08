<script setup>
import {LocalVideoTrack, RemoteVideoTrack} from "livekit-client";
import AudioComponent from "@/modules/meetings/components/AudioComponent.vue";
import UserVideo from "@/modules/meetings/components/UserVideo.vue";

const props = defineProps({
    localTrack: [LocalVideoTrack, RemoteVideoTrack],
    participantName: String,
    remoteTracks: Map,
    activeMainStage: Boolean
});
</script>

<template>
    <div class="participant-strip" :class="activeMainStage ? '' : 'full'">
        <user-video
            :track="localTrack"
            :participantIdentity="participantName"
            :local="true"
            class="local"
        />
        <template v-for="[identity, participant] of remoteTracks" :key="identity">
            <user-video
                :track="participant.videoTrack"
                :participantIdentity="identity"
            />
            <audio-component
                v-if="participant.audioTrack"
                :track="participant.audioTrack"
                hidden
            />
        </template>
    </div>
</template>

<style scoped>
.participant-strip {
    position: absolute;
    bottom: 0;
    width: 100%;
    max-width: 100%;
    height: 8rem;
    display: flex;
    justify-content: flex-start;
    gap: var(--spacing-sm);
}

.participant-strip > * {
    flex: 0 0 auto;
    height: 100%;
}

.participant-strip.full {
    width: 100%;
    height: 100%;
    align-items: center;
}

.participant-strip.full > * {
    flex: 1 1 0;
    height: auto;
}
</style>
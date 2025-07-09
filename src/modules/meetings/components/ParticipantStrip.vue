<script setup>
import {LocalVideoTrack, RemoteVideoTrack} from "livekit-client";
import AudioComponent from "@/modules/meetings/components/AudioComponent.vue";
import UserVideo from "@/modules/meetings/components/UserVideo.vue";

const props = defineProps({
    localTrack: [LocalVideoTrack, RemoteVideoTrack],
    participantName: String,
    remoteTracks: Map,
});
</script>

<template>
    <div class="participant-strip">
        <UserVideo
            :track="localTrack"
            :participantIdentity="participantName"
            :local="true"
        />
        <!--                        <HzVideoComponent-->
        <!--                            v-if="screenTrack"-->
        <!--                            :track="screenTrack"-->
        <!--                            :participantIdentity="participantName"-->
        <!--                        />-->

        <template v-for="remoteTrack of remoteTracks.values()" :key="remoteTrack.trackPublication.trackSid">
            <UserVideo
                :track="remoteTrack.trackPublication.videoTrack"
                :participantIdentity="remoteTrack.participantIdentity"
            />
            <AudioComponent v-if="remoteTrack.trackPublication.kind !== 'video'" :track="remoteTrack.trackPublication.audioTrack" hidden />
        </template>
    </div>
</template>

<style scoped>
.participant-strip{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    gap: var(--spacing-4);
}
</style>
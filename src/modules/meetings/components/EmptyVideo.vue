<script setup>
import ProfileImage from "@/shared/components/ProfileImage.vue";

defineProps({
   participantName: String
});
</script>

<template>
    <div class="empty-video">
        <div class="profile-image-container">
            <profile-image class="profile-image" :alt="participantName[0]"/>
        </div>
    </div>
</template>

<style scoped>
.empty-video {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.profile-image-container {
    width: 10%;
    aspect-ratio: 1/1;
}

/* Media Queries */
@media screen and (max-width: 480px) {
    .video-container {
        aspect-ratio: 9/16;
    }
}
</style>
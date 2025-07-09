<script setup>
import ProfileImage from "@/shared/components/ProfileImage.vue";
</script>

<template>
    <div class="empty-video">
        <div class="profile-image-container">
            <ProfileImage class="profile-image"/>
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
}

/* Media Queries */
@media screen and (max-width: 480px) {
    .video-container {
        aspect-ratio: 9/16;
    }
}
</style>
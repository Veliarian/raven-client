<script setup>

import {computed, ref} from "vue";
import {mdiAccountOutline} from "@mdi/js";
import {useProfilePictureStore} from "@/modules/user/store/profilePictureStore.js";
import Icon from "@/shared/components/icons/Icon.vue";

const profilePictureStore = useProfilePictureStore();

const imageUrl = computed(() => profilePictureStore.picture);
</script>

<template>
<div class="profile-img">
    <div class="image-box">
        <img v-if="imageUrl" :src="imageUrl" alt="user" class="user-img">
        <Icon v-else :icon="mdiAccountOutline" class="user-img icon"/>
    </div>
</div>
</template>

<style scoped>
.profile-img{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.image-box{
    width: 100%;
    height: 100%;
    border-radius: 9999px;
    overflow: hidden;
    background-color: var(--color-green-light);
    display: flex;
    justify-content: center;
    align-items: center;
}

.user-img{
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.user-img.icon{
    width: 60%;
    height: 60%;
    color: var(--color-green);
}
</style>
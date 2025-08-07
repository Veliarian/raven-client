<script setup>
import {computed} from "vue";
import {mdiAccountOutline} from "@mdi/js";
import {useProfilePictureStore} from "@/modules/users/store/profilePictureStore.js";
import {serverURL} from "@/shared/utils/serverURL.js";
import {FIcon} from "@uikit";

const props = defineProps({
    profilePicture: {
        type: String
    }
});

const profilePictureStore = useProfilePictureStore();

const imageUrl = computed(() => {
    if (props.profilePicture) {
        return serverURL + "/users/avatar/" + props.profilePicture;
    } else {
        return profilePictureStore.picture;
    }
});
</script>

<template>
    <div class="profile-img">
        <div class="image-box">
            <img v-if="imageUrl" :src="imageUrl" alt="user" class="user-img">
            <f-icon v-else :icon="mdiAccountOutline" class="user-img" size="26"/>
        </div>
    </div>
</template>

<style scoped>
.profile-img {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: var(--radius-full);
}

.image-box {
    width: 100%;
    height: 100%;
    border-radius: var(--radius-full);
    overflow: hidden;
    background-color: var(--color-primary-light);
    display: flex;
    justify-content: center;
    align-items: center;
}

.user-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    color: var(--color-primary);
}
</style>
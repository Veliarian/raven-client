<script setup>
import {computed} from "vue";
import {useProfilePictureStore} from "@/modules/users/store/profilePictureStore.js";
import {serverURL} from "@/shared/utils/serverURL.js";

const props = defineProps({
    profilePicture: {
        type: String
    },
    alt: {
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
            <svg class="alt" v-else viewBox="0 0 20 20">
                <text x="50%" y="80%" text-anchor="middle">{{ alt }}</text>
            </svg>
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
    position: relative;
}

.user-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    color: var(--color-primary);
}

.alt {
    position: absolute;
    left: 0;
    top: 0;
    line-height: 0;
    width: 100%;
    height: 100%;
    fill: var(--color-primary);
}
</style>
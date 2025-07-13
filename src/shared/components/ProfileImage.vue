<script setup>
import {computed, ref} from "vue";
import {mdiAccountOutline} from "@mdi/js";
import {useProfilePictureStore} from "@/modules/users/store/profilePictureStore.js";
import Icon from "@/shared/components/icons/Icon.vue";
import {serverURL} from "@/shared/utils/serverURL.js";

const props = defineProps({
   profilePicture: {
       type: String
   }
});

const profilePictureStore = useProfilePictureStore();

const imageUrl = computed(() => {
    if (props.profilePicture) {
        return serverURL + "/users/avatar/" + props.profilePicture;
    }else {
        return profilePictureStore.picture;
    }
});
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
    border-radius: var(--radius-full);
}

.image-box{
    width: 100%;
    height: 100%;
    border-radius: var(--radius-full);
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
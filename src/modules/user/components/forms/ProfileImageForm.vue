<script setup>

import {mdiTrashCanOutline, mdiTrayArrowUp} from "@mdi/js";
import Icon from "@/shared/components/Icon.vue";
import ProfileImage from "@/shared/components/ProfileImage.vue";
import {useI18n} from "vue-i18n";
import {ref} from "vue";
import {useProfilePictureStore} from "@/modules/user/store/profilePictureStore.js";

const {t} = useI18n();

const profilePictureStore = useProfilePictureStore();

const fileInput = ref(null);
const selectedFile = ref(null);

const triggerFileInput = () => {
    fileInput.value?.click();
};

const handleFileUpload = async (event) => {
    selectedFile.value = event.target.files[0];
    if (!selectedFile.value) return;

    await profilePictureStore.uploadProfilePicture(selectedFile.value);
};
</script>

<template>
    <div class="profile-image-form">
        <div class="profile-image-box">
            <ProfileImage class="profile-image"/>
        </div>
        <div class="profile-image-actions">
            <header class="profile-image-header">
                <h4 class="profile-image-header-h">{{ t("profile.profilePictureHeader") }}</h4>
                <p class="profile-image-header-p">{{ t("profile.profilePictureAdditional") }}</p>
            </header>
            <div class="image-actions">
                <input class="image-input" type="file" ref="fileInput" @change="handleFileUpload" accept="image/*">
                <button class="action-btn upload" @click="triggerFileInput">
                    <Icon class="action-btn-icon" :icon="mdiTrayArrowUp"/>
                    {{ t("controls.upload") }}
                </button>
                <button class="action-btn delete">
                    <Icon class="action-btn-icon" :icon="mdiTrashCanOutline"/>
                    {{ t("controls.delete") }}
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.profile-image-form{
    display: flex;
    gap: 2rem;
}

.profile-image-box{
    width: 7rem;
    height: 7rem;
}

.profile-image-actions{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.profile-image-header{
    display: flex;
    flex-direction: column;
}

.profile-image-header-p{
    color: var(--text-color-secondary);
}

.image-actions{
    display: flex;
    gap: 10px;
}

.image-input{
    display: none;
}

.action-btn:hover{
    cursor: pointer;
}

.action-btn-icon{
    width: 16px;
    height: 16px;
}
</style>
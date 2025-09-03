<script setup>

import {mdiTrashCan, mdiTrayArrowUp} from "@mdi/js";
import ProfileImage from "@/shared/components/ProfileImage.vue";
import {useI18n} from "vue-i18n";
import {ref} from "vue";
import {useProfilePictureStore} from "@/modules/users/store/profilePictureStore.js";
import {FButton, FTitle} from "@uikit";
import {useUsersStore} from "@/modules/users/store/usersStore.js";

const {t} = useI18n();

const profilePictureStore = useProfilePictureStore();
const usersStore = useUsersStore();
const profilePictureAlt = usersStore.currentUser?.username[0];

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
            <profile-image class="profile-image" :alt="profilePictureAlt"/>
        </div>
        <div class="profile-image-actions">
            <f-title :title="t('profile.profilePictureHeader')"
                     :subtitle="t('profile.profilePictureAdditional')"
                     size="sm"
            />
            <div class="image-actions">
                <input class="image-input" type="file" ref="fileInput" @change="handleFileUpload" accept="image/*">
                <f-button :icon="mdiTrayArrowUp" @click="triggerFileInput" size="sm">{{ t("controls.upload") }}</f-button>
                <f-button :icon="mdiTrashCan" type="danger" size="sm">{{ t("controls.delete") }}</f-button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.profile-image-form {
    display: flex;
    gap: 2rem;
}

.profile-image-box {
    width: 7rem;
    height: 7rem;
}

.profile-image-actions {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.profile-image-header {
    display: flex;
    flex-direction: column;
}

.profile-image-header-p {
    color: var(--text-color-secondary);
}

.image-actions {
    display: flex;
    gap: 10px;
}

.image-input {
    display: none;
}

.action-btn:hover {
    cursor: pointer;
}

.action-btn-icon {
    width: 16px;
    height: 16px;
}
</style>
<script setup>
import {ref} from "vue";
import {mdiTrayArrowUp} from "@mdi/js";
import Icon from "@/shared/components/Icon.vue";
import {useI18n} from "vue-i18n";
import {useMediaFilesStore} from "@/modules/materials/store/mediaFilesStore.js";

const {t} = useI18n();
const mediaFilesStore = useMediaFilesStore();

const fileInput = ref(null);
const selectedFile = ref(null);

const triggerFileInput = () => {
    fileInput.value?.click();
};

const handleFileUpload = async (event) => {
    selectedFile.value = event.target.files[0];
    if (!selectedFile.value) return;

    await mediaFilesStore.uploadFile(selectedFile.value);
};
</script>

<template>
    <div class="upload-file-form">
        <input class="file-input" type="file" ref="fileInput" @change="handleFileUpload">
        <button @click="triggerFileInput">
            <Icon :icon="mdiTrayArrowUp"/>
            {{ t("materials.controls.upload") }}
        </button>
    </div>
</template>

<style scoped>
.file-input {
    display: none;
}
</style>
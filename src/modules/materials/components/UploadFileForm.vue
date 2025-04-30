<script setup>
import {ref} from "vue";
import {mdiTrayArrowUp} from "@mdi/js";
import Icon from "@/shared/components/Icon.vue";
import {useI18n} from "vue-i18n";
import {useMediaFilesStore} from "@/modules/materials/store/mediaFilesStore.js";
import UploadFileItem from "@/modules/materials/components/UploadFileItem.vue";

const {t} = useI18n();
const mediaFilesStore = useMediaFilesStore();

const fileInput = ref(null);
const selectedFiles = ref([]);
const isDragging = ref(false);
const filesProgress = ref([]);

const emit = defineEmits(["closeForm"])

let dragCounter = 0;

const triggerFileInput = () => {
    fileInput.value?.click();
};

const handleDragEnter = () => {
    dragCounter++;
    isDragging.value = true;
};

const handleDragLeave = () => {
    dragCounter--;
    if (dragCounter === 0) {
        isDragging.value = false;
    }
};

const getProgressByFileName = (fileName) => {
    return filesProgress.value.find(progress => {
        return progress.name === fileName;
    });
};

const handleDrop = (event) => {
    dragCounter = 0;
    isDragging.value = false;
    selectedFiles.value = Array.from(event.dataTransfer.files);
    addProgressFiles();
};

const handleFiles = (event) => {
    selectedFiles.value = Array.from(event.target.files);
    addProgressFiles();
};

const addProgressFiles = () => {
    selectedFiles.value.forEach((file) => {
        const progressObj = {
            name: file.name,
            progress: 0,
        }
        filesProgress.value.push(progressObj);
    });
};

const deleteFile = (fileName) => {
    filesProgress.value = filesProgress.value.filter(progress => progress.name !== fileName);
    selectedFiles.value = selectedFiles.value.filter(file => file.name !== fileName);
}

const deleteAllFiles = () => {
    filesProgress.value = [];
    selectedFiles.value = [];
}

const processFiles = async () => {
    const uploadPromises = selectedFiles.value.map((file) => {
        const progressObj = getProgressByFileName(file.name);
        return mediaFilesStore.uploadFileWithProgress(file, progressObj);
    });

    await Promise.all(uploadPromises);
};

const closeForm = () => {
    emit("closeForm")
}
</script>

<template>
    <div class="upload-file-form">
        <header class="form-header">
            <h3>Upload Files</h3>
            <p class="subtitle">Upload files to your learning materials collection</p>
        </header>
        <div class="dropzone"
             @click="triggerFileInput"
             @dragover.prevent
             @drop.prevent="handleDrop"
             @dragenter="handleDragEnter"
             @dragleave="handleDragLeave"
             :class="{ 'active': isDragging }"
        >
            <div v-if="selectedFiles.length === 0" class="dropzone-title">
                <p>Drag & drop your files here, or click to select</p>
            </div>
            <div v-else class="files-list-box">
                <div class="files-list-header">
                    <p>{{`${selectedFiles.length} file(s) selected`}}</p>
                    <button class="cancel" @click.stop="deleteAllFiles">Clear All</button>
                </div>
                <div class="files-list">
                    <UploadFileItem v-for="file in selectedFiles"
                                    :file-name="file.name"
                                    :size="file.size"
                                    :progress="getProgressByFileName(file.name).progress"
                                    @delete-file="deleteFile"
                    />
                </div>
            </div>
            <input type="file" multiple ref="fileInput" @change="handleFiles" class="file-input"/>
        </div>
        <div class="controls">
            <button class="cancel" @click="closeForm">
                {{ t("materials.controls.cancel") }}
            </button>
            <button class="upload" @click="processFiles">
                {{ t("materials.controls.upload") }}
            </button>
        </div>
    </div>
</template>

<style scoped>
.upload-file-form {
    width: 100%;
    max-width: 28rem;
    display: flex;
    flex-direction: column;
    gap: 3rem;
    background-color: var(--background);
    padding: 1.5rem;
    border-radius: var(---radius-lg);
}

.file-input {
    display: none;
}

.dropzone {
    border: 2px dashed var(--border-color);
    padding: 1.5rem;
    text-align: center;
    cursor: pointer;
    border-radius: 8px;
    position: relative;
    transition: border-color 0.3s;
}

.dropzone.active {
    border-color: var(--color-green);
    background-color: var(--color-green-light);
}

.dropzone p {
    margin: 0;
    color: #666;
}

.file-input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
}

.files-list-box{
    display: flex;
    flex-direction: column;
    gap: .75rem;
}

.files-list-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.files-list{
    display: flex;
    flex-direction: column;
    gap: .5rem;
}

.controls{
    display: flex;
    justify-content: flex-end;
    gap: .75rem;
}
</style>
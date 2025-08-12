<script setup>
import {mdiCheck, mdiClose, mdiFileDocumentOutline} from "@mdi/js";
import {FButton, FIcon} from "@uikit";
import {ref, watch} from "vue";

const emit = defineEmits(["deleteFile"]);

const props = defineProps({
    fileName: String,
    size: Number,
    progress: {
        type: Number,
        default: 0
    }
});

const formatFileSize = (bytes) => {
    if (bytes < 1024) {
        return `${bytes} B`;
    } else if (bytes < 1024 * 1024) {
        return `${(bytes / 1024).toFixed(2)} KB`;
    } else {
        return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    }
}

const deleteFile = (fileName) => {
    emit("deleteFile", fileName)
}

const isVisible = ref(true);

watch(
    () => props.progress,
    (newVal) => {
        if (newVal === 100) {
            setTimeout(() => {
                isVisible.value = false;
                setTimeout(() => {
                    deleteFile(props.fileName);
                }, 300);
            }, 500);
        }
    }
);
</script>

<template>
    <transition name="fade-slide">
        <div v-if="isVisible" class="upload-file-item">
            <div class="file-info">
                <f-icon :icon="mdiFileDocumentOutline" :size="20" color="#7dae78"/>
                <p class="subtitle">{{ fileName }}</p>
                <p class="subtitle">{{ `(${formatFileSize(size)})` }}</p>
            </div>
            <f-button
                v-if="progress === 0"
                type="close"
                form="circle"
                size="sm"
                @click.stop="deleteFile(fileName)"
                :icon="mdiClose"
            />
            <div class="progress-bar" :style="{width: progress + '%'}">
                <div class="file-info">
                    <f-icon :icon="mdiFileDocumentOutline" :size="16" color="#ffffff"/>
                    <p class="subtitle">{{ fileName }}</p>
                    <p class="subtitle">{{ `(${formatFileSize(size)})` }}</p>
                </div>
                <f-icon class="progress-icon" :icon="mdiCheck" v-if="progress === 100"/>
            </div>
        </div>
    </transition>
</template>

<style scoped>
.upload-file-item {
    width: 100%;
    padding: .5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--color-primary-light);
    border-radius: .75rem;
    position: relative;
    overflow: hidden;
}

.file-info {
    display: flex;
    align-items: flex-end;
    gap: .5rem;
    position: relative;
    white-space: nowrap;
}

.subtitle {
    max-width: 12rem;
    overflow: hidden;
    text-overflow: ellipsis;
}

.progress-bar {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    background-color: var(--color-primary);
    z-index: 1;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-between;
    pointer-events: none;
    transition: width var(--transition-fast);
}

.progress-bar .file-info {
    z-index: 1;
    color: white;
    margin-left: .5rem;
}

.progress-icon {
    margin-right: .5rem;
    color: white;
}

.progress-bar .subtitle {
    max-width: 12rem;
    overflow: hidden;
    text-overflow: ellipsis;
    color: white;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>
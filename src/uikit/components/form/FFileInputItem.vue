<script setup>
import {ref, watch} from "vue";
import {FButton, FIcon} from "@uikit";
import {mdiCheck, mdiClose, mdiFileDocumentOutline} from "@mdi/js";

const emit = defineEmits(["deleteFile"]);

const props = defineProps({
    fileName: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        default: 0
    },
    progress: {
        type: Number,
        default: 0
    }
});

// Форматування розміру файлу
const formatFileSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

// Виклик події видалення файлу
const deleteFile = (fileName) => {
    emit("deleteFile", fileName);
}

// Контроль видимості після завершення прогресу
const isVisible = ref(true);
watch(
    () => props.progress,
    (newVal) => {
        if (newVal >= 100) {
            setTimeout(() => {
                isVisible.value = false;
                setTimeout(() => deleteFile(props.fileName), 300);
            }, 500);
        }
    }
);
</script>

<template>
    <transition name="fade-slide">
        <div v-if="isVisible" class="f-file-input-item">
            <div class="file-info">
                <f-icon :icon="mdiFileDocumentOutline" :size="20" color="#7dae78"/>
                <p class="subtitle">{{ fileName }}</p>
                <p class="subtitle">({{ formatFileSize(size) }})</p>
            </div>

            <f-button
                v-if="progress === 0"
                type="close"
                form="circle"
                size="sm"
                :icon="mdiClose"
                @click.stop="deleteFile(fileName)"
            />

            <div class="progress-bar" :style="{width: progress + '%'}">
                <div class="file-info">
                    <f-icon :icon="mdiFileDocumentOutline" size="16" color="#fff"/>
                    <p class="subtitle">{{ fileName }}</p>
                    <p class="subtitle">({{ formatFileSize(size) }})</p>
                </div>
                <f-icon v-if="progress >= 100" class="progress-icon" :icon="mdiCheck"/>
            </div>
        </div>
    </transition>
</template>

<style scoped>
.f-file-input-item {
    width: 100%;
    padding: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--color-primary-light);
    border-radius: var(--radius-md);
    position: relative;
    overflow: hidden;
}

.file-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
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
    display: flex;
    align-items: center;
    justify-content: space-between;
    pointer-events: none;
    transition: width 0.3s;
}

.progress-bar .file-info {
    z-index: 1;
    color: white;
    margin-left: 0.5rem;
}

.progress-bar .subtitle {
    color: white;
}

.progress-icon {
    margin-right: 0.5rem;
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
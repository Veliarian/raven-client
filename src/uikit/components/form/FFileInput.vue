<script setup>
import {ref} from "vue";
import {FButton} from "@uikit";
import FFileInputItem from "./FFileInputItem.vue"; // імпорт твого існуючого компонента
import {mdiPlus} from "@mdi/js";

const emit = defineEmits(["update:files", "filesAdded"]);

const props = defineProps({
    files: {
        type: Array,
        default: () => []
    },
    multiple: {
        type: Boolean,
        default: true
    },
    maxFiles: {
        type: Number,
        default: 10
    }
});

const internalFiles = ref([...props.files]);

const fileInputRef = ref(null);

const triggerFileDialog = () => {
    fileInputRef.value.click();
};

const handleFilesAdded = (event) => {
    const selectedFiles = Array.from(event.target.files);

    selectedFiles.forEach(file => {
        if (internalFiles.value.length < props.maxFiles) {
            internalFiles.value.push({
                file,
                name: file.name,
                size: file.size,
                progress: 0
            });
        }
    });

    emit("update:files", internalFiles.value);
    emit("filesAdded", selectedFiles);

    // очищаємо інпут, щоб можна було додати той самий файл повторно
    fileInputRef.value.value = null;
};

const deleteFile = (fileName) => {
    internalFiles.value = internalFiles.value.filter(f => f.name !== fileName);
    emit("update:files", internalFiles.value);
};
</script>

<template>
    <div class="f-file-input">
        <input
            type="file"
            ref="fileInputRef"
            :multiple="multiple"
            class="hidden"
            @change="handleFilesAdded"
        />

        <div class="file-input-actions">
            <f-button :icon="mdiPlus" @click="triggerFileDialog">Add file</f-button>
        </div>

        <div class="file-input-list">
            <FFileInputItem
                v-for="file in internalFiles"
                :key="file.name"
                :file-name="file.name"
                :size="file.size"
                :progress="file.progress"
                @deleteFile="deleteFile"
            />
        </div>
    </div>
</template>

<style scoped>
.f-file-input {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
}

.file-input-actions {
    display: flex;
    gap: var(--spacing-xs);
}

.file-input-list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
}
</style>
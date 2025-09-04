<script setup>
import {ref} from "vue";
import {FButton, FContainer} from "@uikit";
import {mdiArrowLeft, mdiContentSave} from "@mdi/js";
import LessonEditorContent from "@/modules/lessons/components/LessonEditorContent.vue";

const props = defineProps({
    lesson: {
        type: Object,
        default: () => ({topic: "", content: ""})
    }
});

const emit = defineEmits(["save", "cancel"]);

const topic = ref(props.lesson.topic);
const content = ref(props.lesson.content);
const files = ref([]);

function saveLesson() {
    emit("save", {
        topic: topic.value,
        content: content.value,
        files: files.value
    });
}
</script>

<template>
    <div class="lesson-editor">
        <header class="lesson-editor-header">
            <div class="lesson-editor-header-item">
                <f-button :icon="mdiArrowLeft" type="light">Back to Lessons</f-button>
            </div>
            <div class="lesson-editor-header-item">
                <f-button :icon="mdiContentSave" @click="saveLesson">Save Lesson</f-button>
            </div>
        </header>

        <main class="lesson-editor-body">
            <section class="lesson-editor-content">
                <f-container>
                    <h3>{{ lesson.name ? "Edit Lesson" : "New Lesson" }}</h3>
                </f-container>
                <f-container class="content-editor-container">
                    <lesson-editor-content class="content-editor"/>
                </f-container>
            </section>
            <section class="lesson-editor-files">
                <f-container>

                </f-container>
                <f-container>

                </f-container>
            </section>
        </main>
    </div>
</template>

<style scoped>
.lesson-editor {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
}

.lesson-editor-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.lesson-editor-header-item {
    display: flex;
    align-items: center;
}

.lesson-editor-body {
    flex: 1;
    display: flex;
    gap: var(--spacing-md);
}

.lesson-editor-content {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
}

.lesson-editor-files {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
}

.content-editor-container {
    flex: 1;
}
</style>
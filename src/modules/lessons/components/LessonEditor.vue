<script setup>
import {ref} from "vue";
import {FButton, FContainer, FSelect, FSeparator, FStringEditable, FTitle} from "@uikit";
import {mdiArrowLeft, mdiContentSave, mdiLink, mdiTrayArrowUp} from "@mdi/js";
import LessonEditorContent from "@/modules/lessons/components/LessonEditorContent.vue";

const props = defineProps({
    lesson: {
        type: Object,
        default: () => ({topic: "", content: ""})
    }
});

const emit = defineEmits(["save", "cancel"]);

const subject = ref();
const subjects = [

];

const setSubject = () => {

}

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
                <f-button :icon="mdiArrowLeft" type="light" @click="emit('cancel')">Back to Lessons</f-button>
            </div>
            <div class="lesson-editor-header-item">
                <f-button :icon="mdiContentSave" @click="saveLesson">Save Lesson</f-button>
            </div>
        </header>

        <main class="lesson-editor-body">
            <section class="lesson-editor-content">
                <f-container class="name-subject-edit">
                    <div class="lesson-editor-name">
                        <f-string-editable :text="lesson.name ? 'Edit Lesson' : 'New Lesson'"/>
                        <h3>{{ lesson.name ? "Edit Lesson" : "New Lesson" }}</h3>
                    </div>
                    <f-select v-model="subject" :options="subjects" placeholder="Subject" @update:modelValue="setSubject"/>
                </f-container>
                <f-container class="content-editor-container">
                    <lesson-editor-content class="content-editor"/>
                </f-container>
            </section>
            <section class="lesson-editor-files">
                <f-container>
                    <div class="media-container">
                        <h3>Files & Links</h3>
                        <div class="files-box">
                            <f-title subtitle="Files">
                                <f-button size="sm" :icon="mdiTrayArrowUp">Upload</f-button>
                            </f-title>
                        </div>
                        <f-separator/>
                        <div class="links-box">
                            <f-title subtitle="Links">
                                <f-button size="sm" :icon="mdiLink">Add Link</f-button>
                            </f-title>
                        </div>
                    </div>
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

.name-subject-edit {
    display: flex;
    justify-content: space-between;
}

.lesson-editor-files {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
}

.content-editor-container {
    flex: 1;
}

.media-container {
    display: flex;
    flex-direction: column;
}

.files-box {
    margin-top: var(--spacing-md);
}
</style>
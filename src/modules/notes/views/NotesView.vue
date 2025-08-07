<script setup>
import {mdiNotePlusOutline} from "@mdi/js";
import Icon from "@/shared/components/icons/Icon.vue";
import {useI18n} from "vue-i18n";
import {computed, onMounted, ref} from "vue";
import {useNotesStore} from "@/modules/notes/store/notesStore.js";
import NotesContainer from "@/modules/notes/components/NotesContainer.vue";
import Note from "@/modules/notes/models/Note.js";
import FormContainer from "@/shared/components/FormContainer.vue";
import {FButton, FTitle} from "@uikit";

const i18n = useI18n();
const {t} = i18n;

const notesStore = useNotesStore();
const notes = computed(() => notesStore.notes);

const editableNote = ref(null);

const createNote = () => {
    editableNote.value = new Note("","", null, null);
}

const editNote = (note) => {
    editableNote.value = note;
}

const closeForm = () => {
    editableNote.value = null;
}

onMounted(() => {
    notesStore.fetchNotes();
});
</script>

<template>
<div class="full-view">
    <header class="view-header">
        <f-title title="Notes" subtitle="Keep track of important notes and reminders">
            <f-button v-if="notes.length > 0" :icon="mdiNotePlusOutline" @click="createNote">Add note</f-button>
        </f-title>
    </header>
    <main class="notes-main">
        <notes-container :notes="notes"
                        :editable-note="editableNote"
                        @create-note="createNote"
                        @edit-note="editNote"
                        @close-form="closeForm"/>
    </main>
</div>
</template>

<style scoped>
.notes-main{
    flex: 1;
}
</style>
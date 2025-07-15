<script setup>

import {mdiNotePlusOutline} from "@mdi/js";
import Icon from "@/shared/components/icons/Icon.vue";
import {useI18n} from "vue-i18n";
import {computed, onMounted, ref} from "vue";
import {useNotesStore} from "@/modules/notes/store/notesStore.js";
import NotesContainer from "@/modules/notes/components/NotesContainer.vue";
import Note from "@/modules/notes/models/Note.js";

const i18n = useI18n();
const {t} = i18n;

const notesStore = useNotesStore();
const notes = computed(() => notesStore.notes);

const editableNote = ref(null);

const createNote = () => {
    editableNote.value = new Note("","", null, null);
}

onMounted(() => {
    notesStore.fetchNotes();
});
</script>

<template>
<div class="full-view">
    <header class="view-header">
        <div class="title-box">
            <h3>Notes</h3>
            <p class="subtitle">Keep track of important notes and reminders</p>
        </div>
        <button v-if="notes.length > 0" @click="createNote">
            <Icon :icon="mdiNotePlusOutline"/>
            <span>Add note</span>
        </button>
    </header>
    <main class="notes-main">
        <NotesContainer :notes="notes" :editable-note="editableNote" @create-note="createNote"/>
    </main>
</div>
</template>

<style scoped>
.notes-main{
    flex: 1;
}
</style>
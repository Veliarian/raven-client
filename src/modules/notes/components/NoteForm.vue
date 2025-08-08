<script setup>
import {ref} from "vue";
import Note from "@/modules/notes/models/Note.js";
import {useNotesStore} from "@/modules/notes/store/notesStore.js";
import {FButton} from "@uikit";

const props = defineProps({
    note: {
        type: Note
    }
});

const emits = defineEmits(["closeForm"]);

const notesStore = useNotesStore();

const title = ref(props.note?.title || "");
const content = ref(props.note?.content || "");

const maxLines = 5;

function limitLines() {
    const lines = content.value.split('\n');
    if (lines.length > maxLines) {
        content.value = lines.slice(0, maxLines).join('\n');
    }
}

const saveNote = () => {
    let note = new Note();
    note.title = title.value;
    note.content = content.value;
    note.reminderTime = props.note.reminderTime;

    if (props.note.id) {
        notesStore.updateNote(props.note.id, note);
    } else {
        notesStore.createNote(note);
    }
    emits("closeForm");
}
</script>

<template>
    <div class="note-form">
        <input type="text" class="note-title" v-model="title">
        <textarea class="note-content" v-model="content" @input="limitLines"></textarea>
        <div class="note-controls">
            <f-button type="cancel" size="sm" @click="emits('closeForm')">Cancel</f-button>
            <f-button size="sm" @click="saveNote">Save</f-button>
        </div>
    </div>
</template>

<style scoped>
.note-form {
    width: 16rem;
    height: 17rem;
    background-color: var(--color-paper);
    padding: 1rem .5rem .5rem .5rem;
    display: flex;
    flex-direction: column;
    gap: .5rem;
    border-radius: var(--radius-md);
}

.note-title {
    width: 100%;
    height: 1.5rem;
    border: none;
    border-radius: 0;
    border-bottom: 2px solid var(--text-color-secondary);
    background-color: transparent;
    padding: 0;
    font-size: 1.1rem;
    font-weight: bold;
    color: var(--text-color-primary);
}

.note-content {
    flex: 1;
    resize: none;
    border: none;
    border-radius: 0;
    background-color: transparent;
    padding: 0;
    line-height: 2rem;
    font-size: 1rem;

    background-image: linear-gradient(
        to bottom,
        var(--text-color-secondary) 0.05rem,
        transparent 0.05rem
    );
    background-size: 100% 2rem;
    background-repeat: repeat-y;
    background-position-y: 1.8rem;
    color: var(--text-color-primary);
}

.note-controls {
    display: flex;
    justify-content: flex-end;
    gap: .5rem;
}
</style>
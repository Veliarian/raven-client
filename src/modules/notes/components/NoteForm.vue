<script setup>
import {ref} from "vue";
import Note from "@/modules/notes/models/Note.js";
import {useNotesStore} from "@/modules/notes/store/notesStore.js";

const props = defineProps({
   note: {
       type: Note
   }
});

const emits = defineEmits(["saveNote"]);

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
    note.creationTime = new Date().toISOString().slice(0, -1);
    note.reminderTime = props.note.reminderTime;

    if (props.note.id) {
        note.id = props.note.id;

    } else {
        console.log(note);
        notesStore.createRoom(note);
    }
}
</script>

<template>
<div class="note-form">
    <input type="text" class="note-title" v-model="title">
    <textarea class="note-content" v-model="content" @input="limitLines"></textarea>
    <div class="note-controls">
        <button class="cancel">Cancel</button>
        <button @click="saveNote">Save</button>
    </div>
</div>
</template>

<style scoped>
.note-form{
    width: 16rem;
    height: 17rem;
    background-color: var(--color-paper);
    padding: 1rem .5rem .5rem .5rem;
    display: flex;
    flex-direction: column;
    gap: .5rem;
    border-radius: var(--radius-md);
}

.note-title{
    width: 100%;
    height: 1.5rem;
    border: none;
    border-radius: 0;
    border-bottom: 2px solid var(--color-gray-400);
    background-color: transparent;
    padding: 0;
    font-size: 1.2rem;
    font-weight: bold;
}

.note-content{
    flex: 1;
    resize: none;
    border: none;
    border-radius: 0;
    background-color: transparent;
    padding: 0;
    line-height: 2rem;
    background-image: repeating-linear-gradient(
        to bottom,
        transparent,
        transparent 1.9rem,
        var(--color-gray-300) 1.9rem,
        var(--color-gray-300) 2rem
    );
}

.note-controls{
    display: flex;
    justify-content: flex-end;
    gap: .5rem;
}
</style>
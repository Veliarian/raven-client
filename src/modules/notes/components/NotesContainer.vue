<script setup>
import NoteCard from "@/modules/notes/components/NoteCard.vue";
import EmptyNote from "@/modules/notes/components/EmptyNote.vue";
import Note from "@/modules/notes/models/Note.js";
import NoteForm from "@/modules/notes/components/NoteForm.vue";

const props = defineProps({
    editableNote: {
        type: Note
    },
    notes: {
        type: Array,
    }
});

const emits = defineEmits(["createNote"]);

const createNote = () => {
    emits("createNote");
}

</script>

<template>
    <div v-if="notes?.length > 0 || editableNote" class="notes-container">
        <NoteForm v-if="editableNote" :note="editableNote"/>
        <NoteCard v-for="note in notes" :key="note.id"/>
    </div>
    <EmptyNote v-else @create-note="createNote"/>
</template>

<style scoped>

</style>
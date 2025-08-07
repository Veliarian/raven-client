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

const emits = defineEmits(["createNote", "editNote", "closeForm"]);

const createNote = () => {
    emits("createNote");
}

const handleEditNote = (note) => {
    emits("editNote", note);
}

const closeForm = () => {
    emits("closeForm");
}

</script>

<template>
    <div v-if="notes?.length > 0 || editableNote" class="notes-container">
        <note-form v-if="editableNote"
                  :note="editableNote"
                  @close-form="closeForm"/>
        <note-card v-for="note in notes.filter(n => !editableNote || n.id !== editableNote.id)"
                  :key="note.id"
                  :note="note"
                  @edit-note="handleEditNote"
        />
    </div>
    <empty-note v-else @create-note="createNote"/>
</template>

<style scoped>
.notes-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1.2rem;
}
</style>
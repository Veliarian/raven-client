<script setup>
import Note from "@/modules/notes/models/Note.js";
import Icon from "@/shared/components/icons/Icon.vue";
import {mdiClock, mdiPencil, mdiTrashCan} from "@mdi/js";
import ConfirmDialog from "@/shared/components/modals/ConfirmDialog.vue";
import {ref} from "vue";
import {useNotesStore} from "@/modules/notes/store/notesStore.js";
import {FButton, FIcon} from "@uikit";

const props = defineProps({
    note: Note
});

const emits = defineEmits(["editNote"])

const notesStore = useNotesStore();

const confirmDialog = ref(null);

const handleDelete = async () => {
    const confirmed = await confirmDialog.value.show("Delete this note?")
    if (confirmed) {
        await notesStore.deleteNote(props.note.id);
    }
}

const handleEdit = () => {
    emits("editNote", props.note);
}

const convertDate = (dateString) => {
    return new Date(dateString).toLocaleString([],
        {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'}
    );
}
</script>

<template>
    <div class="note-card">
        <h6 class="note-title">{{note?.title}}</h6>
        <textarea class="note-content" readonly :value="note?.content"></textarea>
        <div class="creation-time">
            <p>{{convertDate(note?.creationTime)}}</p>
        </div>

        <div class="note-controls">
            <f-button size="sm" form="circle" :icon="mdiClock"/>
            <f-button size="sm" form="circle" :icon="mdiPencil" @click="handleEdit"/>
            <f-button size="sm" form="circle" :icon="mdiTrashCan" type="danger" @click="handleDelete"/>
        </div>
    </div>

    <ConfirmDialog ref="confirmDialog"/>
</template>

<style scoped>
.note-card {
    width: 16rem;
    height: 17rem;
    background-color: var(--color-paper);
    padding: 1rem .5rem .5rem .5rem;
    display: flex;
    flex-direction: column;
    gap: .5rem;
    border-radius: var(--radius-md);
    position: relative;
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
}

.note-content{
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
}

.creation-time{
    display: flex;
    justify-content: flex-end;
}

.note-controls{
    position: absolute;
    top: -10px;
    right: 10px;
    width: 100%;
    display: none;
    gap: .5rem;
    justify-content: flex-end;
}

.note-card:hover > .note-controls{
    display: flex;
}
</style>
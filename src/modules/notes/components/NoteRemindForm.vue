<script setup>
import {ref} from "vue";
import {FButton, FFormContainer, FInput} from "@uikit";
import {useNotesStore} from "@/modules/notes/store/notesStore.js";

const props = defineProps({
    noteId: Number,
    time: Date
});

const editableDate = ref(props.time);
const error = ref(false);
const emits = defineEmits(["close"]);

const handleRemind = async () => {
    if (editableDate.value) {
        const notesStore = useNotesStore();
        await notesStore.updateReminderTime(props.noteId, editableDate.value);
        emits("close");
    } else {
        error.value = true;
    }
}

function formatDateTimeLocal(date) {
    console.log(date)
    if (!date) return "";
    const pad = (n) => String(n).padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}
</script>

<template>
    <f-form-container>
        <form class="form note-remind-form">
            <header class="form-header">
                <h3>Remind me</h3>
            </header>
            <main>
                <f-input type="datetime-local" v-model="editableDate" :error="error"/>
                <div class="controls">
                    <f-button size="sm" type="cancel" @click.prevent="$emit('close')">Cancel</f-button>
                    <f-button size="sm" @click.prevent="handleRemind">Remind</f-button>
                </div>
            </main>
        </form>
    </f-form-container>
</template>

<style scoped>
main {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
}

.controls {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: var(--spacing-md);
}
</style>
import {defineStore} from "pinia";
import {notesApi} from "@/modules/notes/api/notesApi.js";

export const useNotesStore = defineStore("notes", {
    state: () => ({
        notes: [],
    }),

    actions: {
        setNotes(notes) {
            this.notes = notes;
        },

        async fetchNotes(){
            const notes = await notesApi.fetchNotes();
            if(notes) {
                this.setNotes(notes)
            }
        },

        async createRoom(newNote){
            const note = await notesApi.createNote(newNote);
            if(note) {
                this.setNotes([...this.notes, note]);
            }
        },
    },

    persist: {
        enable: true,
        strategies: [
            {
                key: "notes",
                storage: localStorage,
            },
        ],
    },
});
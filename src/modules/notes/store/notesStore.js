import {defineStore} from "pinia";
import {notesApi} from "@/modules/notes/api/notesApi.js";
import Note from "@/modules/notes/models/Note.js";

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
                notes.value = notes.map(Note.fromObject);
            }
        },

        async createNote(newNote){
            const note = await notesApi.createNote(newNote);
            if(note) {
                this.setNotes([Note.fromObject(note), ...this.notes]);
            }
        },

        async updateNote(noteId, newNote) {
            const note = await notesApi.updateNote(noteId, newNote);
            if(note) {
                this.notes = this.notes.filter(note => note.id !== noteId);
                this.notes = [Note.fromObject(note), ...this.notes];
            }
        },

        async deleteNote(noteId) {
            const deleted = await notesApi.deleteNote(noteId);
            if (deleted) {
                this.notes = this.notes.filter(note => note.id !== noteId);
            }
        }
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
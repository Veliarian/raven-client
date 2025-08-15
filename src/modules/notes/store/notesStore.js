import {defineStore} from "pinia";
import {notesApi} from "@/modules/notes/api/notesApi.js";
import Note from "@/modules/notes/models/Note.js";

export const useNotesStore = defineStore("notes", {
    state: () => ({
        notes: [],
    }),

    actions: {
        setNotes(notes) {
            this.notes = notes.map(n => n instanceof Note ? n : Note.fromObject(n));
        },

        async fetchNotes() {
            const notes = await notesApi.fetchNotes();
            if (notes) this.setNotes(notes);
        },

        async createNote(newNote) {
            const note = await notesApi.createNote(newNote);
            if (note) {
                this.setNotes([note, ...this.notes]);
            }
        },

        async updateNote(noteId, newNote) {
            const note = await notesApi.updateNote(noteId, newNote);
            if (note) {
                const filtered = this.notes.filter(n => n.id !== noteId);
                this.setNotes([note, ...filtered]);
            }
        },

        async updateReminderTime(noteId, reminderTime) {
            const note = await notesApi.updateReminderTime(noteId, reminderTime);
            if (note) {
                const filtered = this.notes.filter(n => n.id !== noteId);
                this.setNotes([note, ...filtered]);
            }
        },

        async deleteNote(noteId) {
            const deleted = await notesApi.deleteNote(noteId);
            if (deleted) {
                this.notes = this.notes.filter(n => n.id !== noteId);
            }
        }
    },

    persist: {
        enable: true,
        strategies: [
            {
                key: "notes",
                storage: localStorage,
                afterRestore: (ctx) => {
                    ctx.store.setNotes(ctx.store.notes);
                }
            },
        ],
    },
});

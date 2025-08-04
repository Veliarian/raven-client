import {serverURL} from "@/shared/utils/serverURL.js";
import {authHeader} from "@/shared/utils/authHeader.js";
import axios, {HttpStatusCode} from "axios";

const URL = serverURL + "/notes"

export const notesApi = {

    async fetchNotes() {
        try {
            const response = await axios.get(URL, {
                headers: authHeader()
            });
            return response.data;
        } catch (e) {
            console.log(e);
        }
    },

    async createNote(CreateNoteRequest){
        try{
            const response = await axios.post(URL, CreateNoteRequest, {
                headers: authHeader()
            });
            return response.data;
        }catch (e) {
            console.log(e);
        }
    },

    async updateNote(noteId, newNote) {
        try {
            const response = await axios.put(URL + "/" + noteId, newNote, {
               headers: authHeader()
            });
            return response.data;
        } catch (e) {
            console.log(e);
        }
    },

    async deleteNote(noteId) {
        try {
            const response = await axios.delete(URL + "/" + noteId, {
               headers: authHeader()
            });

            return response.status === HttpStatusCode.NoContent;
        } catch (e) {
            console.log(e);
        }
    }
}
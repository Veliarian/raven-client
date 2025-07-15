import {serverURL} from "@/shared/utils/serverURL.js";
import {authHeader} from "@/shared/utils/authHeader.js";
import axios from "axios";

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
    }
}
import {serverURL} from "@/shared/utils/serverURL.js";
import {authHeader} from "@/shared/utils/authHeader.js";
import axios from "axios";

const URL = serverURL + "/meetings/rooms"

export const roomsApi = {

    async fetchRooms() {
        try {
            const response = await axios.get(URL, {
                headers: authHeader()
            });
            return response.data;
        } catch (e) {
            console.log(e);
        }
    },

    async createRoom(name, startTime, participantIds){
        try{
            const response = await axios.post(URL, {name, startTime, participantIds}, {
                headers: authHeader()
            });
            return response.data;
        }catch (e) {
            console.log(e);
        }
    }
}
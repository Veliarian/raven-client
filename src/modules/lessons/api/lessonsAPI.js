import {serverURL} from "@/shared/utils/serverURL.js";
import {authHeader} from "@/shared/utils/authHeader.js";
import axios from "axios";

const URL = serverURL + "/lessons"

export const lessonsApi = {

    async fetchLessons(userId) {
        try {
            const response = await axios.get(URL, {
                headers: authHeader()
            });
            return response.data;
        } catch (e) {
            console.log(e);
        }
    },
}
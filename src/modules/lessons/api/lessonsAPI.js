import {serverURL} from "@/shared/utils/serverURL.js";
import {authHeader} from "@/shared/utils/authHeader.js";
import axios from "axios";

const URL = serverURL + "/lessons"

export const lessonsApi = {

    async fetchLessonsByUser() {
        try {
            const response = await axios.get(URL + "/user", {
                headers: authHeader()
            });
            return response.data;
        } catch (e) {
            console.log(e);
        }
    },
}
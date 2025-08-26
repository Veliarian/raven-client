import {serverURL} from "@/shared/utils/serverURL.js";
import {authHeader} from "@/shared/utils/authHeader.js";
import axios from "axios";

const URL = serverURL + "/notifications";

export const notificationsApi = {

    fetchNotifications: async () => {
        try {
            const response = await axios.get(URL, {headers: authHeader()});
            return response.data;
        } catch (e) {
            console.error("Failed to fetch notifications:", e);
            return [];
        }
    },
}
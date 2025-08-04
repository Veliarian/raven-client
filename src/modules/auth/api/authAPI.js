import {serverURL} from "@/shared/utils/serverURL.js";
import {authHeader} from "@/shared/utils/authHeader.js";
import axios from "axios";

const URL = serverURL + "/auth"

export const authApi = {

    async logout() {
        try {
            await axios.post(URL + "/logout", {
                headers: authHeader()
            });
        } catch (e) {
            console.log(e);
        }
    },
}
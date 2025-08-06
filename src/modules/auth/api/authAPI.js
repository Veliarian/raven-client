import {serverURL} from "@/shared/utils/serverURL.js";
import {authHeader} from "@/shared/utils/authHeader.js";
import axios from "axios";

const URL = serverURL + "/auth"

export const authApi = {

    async login(username, password) {
        try {
            const res = await axios.post(URL + "/sign-in", {username, password});
            return res.data.token;
        } catch (e) {
            console.log(e);
        }
    },

    async signUp(username, email, password) {
        try {
            const res = await axios.post(URL + "/sign-up", {username, email, password});
            return res.data.token;
        } catch (e) {
            console.log(e);
        }
    },

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
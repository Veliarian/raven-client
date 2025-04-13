import {serverURL} from "@/shared/utils/serverURL.js";
import {authHeader} from "@/shared/utils/authHeader.js";
import axios, {HttpStatusCode} from "axios";

const URL = serverURL + "/users"

export const userApi = {

    async fetchUserProfile() {
        try {
            const response = await axios.get(URL + "/me", {
                headers: authHeader()
            });
            return response.data;
        } catch (e) {
            console.log(e);
        }
    },

    async updateUser(userId, newUser) {
        try {
            const response = await axios.put(URL + "/" + userId, newUser, {
                headers: authHeader(),
            });

            return response.data;
        } catch (e) {
            console.log(e);
        }
    }
}
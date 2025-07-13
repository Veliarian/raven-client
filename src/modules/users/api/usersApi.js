import {serverURL} from "@/shared/utils/serverURL.js";
import {authHeader} from "@/shared/utils/authHeader.js";
import axios, {HttpStatusCode} from "axios";

const URL = serverURL + "/users"

export const usersApi = {

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

    async updateCurrentUser(userId, newUser) {
        try {
            const response = await axios.put(URL + "/" + userId, newUser, {
                headers: authHeader(),
            });

            return response.data;
        } catch (e) {
            console.log(e);
        }
    },

    async fetchAllUsers() {
        try {
            const response = await axios.get(URL, {
               headers: authHeader()
            });

            return response.data;
        } catch (e) {
            console.log(e);
        }
    }
}
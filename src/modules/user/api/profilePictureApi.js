import {serverURL} from "@/shared/utils/serverURL.js";
import {authHeader} from "@/shared/utils/authHeader.js";
import axios, {HttpStatusCode} from "axios";

const URL = serverURL + "/users"

export const profilePictureApi = {

    async uploadPicture(userId, file) {
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post(URL + "/" + userId + "/avatar", formData, {
                    headers: {
                        ...authHeader(),
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error("Upload failed:", error.response?.data?.message || error.message);
        }
    }
}
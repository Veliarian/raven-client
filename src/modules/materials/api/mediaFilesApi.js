import {serverURL} from "@/shared/utils/serverURL.js";
import axios from "axios";
import {authHeader} from "@/shared/utils/authHeader.js";

const URL = serverURL + "/media"

export const mediaFilesApi = {

    async fetchMediaFiles() {
        try {
            const response = await axios.get(URL + "/user", {
                headers: authHeader()
            });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },

    async uploadFile(file) {
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post(URL, formData, {
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
    },
    async uploadFileWithProgress(file, progress) {
        const formData = new FormData()
        formData.append('file', file)

        try {
            const response = await axios.post(URL, formData, {
                    headers: {
                        ...authHeader(),
                        "Content-Type": "multipart/form-data",
                    },
                    onUploadProgress: (event) => {
                        if (event.total) {
                            progress.progress = Math.round((event.loaded * 100) / event.total)
                        }
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error("Upload failed:", error.response?.data?.message || error.message);
        }
        // axios.post(URL, formData, {
        //     headers: {
        //         ...authHeader(),
        //         'Content-Type': 'multipart/form-data'
        //     },
        //     onUploadProgress: (event) => {
        //         if (event.total) {
        //             progress.progress = Math.round((event.loaded * 100) / event.total)
        //         }
        //     },
        // }).then((res) => {
        //     progress.progress = 100;
        //     return res.data;
        // }).catch(() => {
        //     progress.progress = 0;
        // })
    }
}
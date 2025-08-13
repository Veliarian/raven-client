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

    // async uploadFile(file) {
    //     const formData = new FormData();
    //     formData.append("file", file);
    //
    //     try {
    //         const response = await axios.post(URL, formData, {
    //                 headers: {
    //                     ...authHeader(),
    //                     "Content-Type": "multipart/form-data",
    //                 },
    //             }
    //         );
    //         return response.data;
    //     } catch (error) {
    //         console.error("Upload failed:", error.response?.data?.message || error.message);
    //     }
    // },

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
    },

    async moveFileToTrash(mediaFileId) {
        try {
            await axios.put(`${URL}/${mediaFileId}/trash`, null, {
                headers: authHeader()
            });
        } catch (e) {
            console.error('Помилка при переміщенні в корзину:', e);
        }
    },

    async deleteFile(mediaFileId) {
        try {
            await axios.delete(`${URL}/${mediaFileId}`, {
               headers: authHeader()
            });
        } catch (e) {
            console.log(e);
        }
    }
}
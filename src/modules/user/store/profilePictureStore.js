import {defineStore} from "pinia";
import {profilePictureApi} from "@/modules/user/api/profilePictureApi.js";
import {useUserStore} from "@/modules/user/store/userStore.js";
import {serverURL} from "@/shared/utils/serverURL.js";

export const useProfilePictureStore = defineStore("profilePicture", {
    state: () => ({
        picture: null,
    }),

    actions: {
        setPicture(picture){
            const baseUrl = serverURL + "/users/avatar/";
            this.picture = baseUrl + picture;
        },

        async uploadProfilePicture(file) {
            const userStore = useUserStore();
            const picture = await profilePictureApi.uploadPicture(userStore.user.id, file);
            this.setPicture(picture);
        }
    },

    persist: {
        enable: true,
        strategies: [
            {
                key: "profilePicture",
                storage: localStorage,
            },
        ],
    },
});
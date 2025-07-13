import {defineStore} from "pinia";
import {profilePictureApi} from "@/modules/users/api/profilePictureApi.js";
import {useUsersStore} from "@/modules/users/store/usersStore.js";
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
            const usersStore = useUsersStore();
            const picture = await profilePictureApi.uploadPicture(usersStore.user.id, file);
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
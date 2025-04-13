import {defineStore} from "pinia";
import {userApi} from "../api/userApi.js";
import {useProfilePictureStore} from "@/modules/user/store/profilePictureStore.js";

export const useUserStore = defineStore("user", {
    state: () => ({
        user: null,
    }),

    actions: {
        setUser(user){
            this.user = user;
        },

        async fetchUser(){
            const user = await userApi.fetchUserProfile();
            this.setUser(user);

            const profilePictureStore = useProfilePictureStore();
            profilePictureStore.setPicture(user.profilePicture);
        },

        async updateUser(newUser){
            const user = await userApi.updateUser(this.user.id, newUser);
            this.setUser(user);
        }
    },

    persist: {
        enable: true,
        strategies: [
            {
                key: "user",
                storage: localStorage,
            },
        ],
    },
});
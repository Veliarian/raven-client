import {defineStore} from "pinia";
import {usersApi} from "../api/usersApi.js";
import {useProfilePictureStore} from "@/modules/users/store/profilePictureStore.js";

export const useUsersStore = defineStore("users", {
    state: () => ({
        currentUser: null,
        allUsers: []
    }),

    actions: {
        setCurrentUser(currentUser){
            this.currentUser = currentUser;
        },

        async fetchCurrentUser(){
            const currentUser = await usersApi.fetchUserProfile();
            this.setCurrentUser(currentUser);

            if(this.currentUser.profilePicture){
                const profilePictureStore = useProfilePictureStore();
                profilePictureStore.setPicture(this.currentUser.profilePicture);
            }
        },

        async updateCurrentUser(newUser){
            const user = await usersApi.updateCurrentUser(this.user.id, newUser);
            this.setCurrentUser(user);
        },

        setAllUsers(users) {
            this.allUsers = users;
        },

        async fetchAllUsers() {
            const users = await usersApi.fetchAllUsers();
            this.setAllUsers(users);
        },
    },

    getters: {
        getProfilePictureByUserId(state) {
            return (userId) => {
                const user = state.allUsers.find(user => user.id === userId);
                return user ? user.profilePicture : null; // або дефолтне зображення
            };
        },
    },

    persist: {
        enable: true,
        strategies: [
            {
                key: "users",
                storage: localStorage,
                paths: ["currentUser"]
            },
        ],
    },
});
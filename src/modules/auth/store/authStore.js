import {defineStore} from "pinia";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        token: null,
    }),

    actions: {
        setToken(token) {
            this.token = token;
        },
        removeToken(){
            this.token = null;
        },
    },

    persist: {
        enable: true,
        strategies: [
            {
                key: "auth",
                storage: localStorage,
            },
        ],
    },
});
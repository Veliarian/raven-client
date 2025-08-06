import {defineStore} from "pinia";
import {authApi} from "@/modules/auth/api/authAPI.js";

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

        async login(username, password) {
          const token = await authApi.login(username, password);
          if (token) {
              this.setToken(token);
          }
        },

        async signUp(username, email, password) {
          const token = await authApi.signUp(username, email, password);
          if (token) {
              this.setToken(token);
          }
        },

        logout() {
            this.removeToken();
        }
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
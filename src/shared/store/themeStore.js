import {defineStore} from "pinia";

export const useThemeStore = defineStore("theme", {
    state: () => ({
        theme: null,
    }),

    actions: {
        setTheme(theme) {
            this.theme = theme;
            document.documentElement.className = theme;
        },

        initTheme() {
          if(this.theme) {
              this.setTheme(this.theme);
          }else {
              const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
              const defaultTheme = prefersDark ? 'dark' : 'light';
              this.setTheme(defaultTheme);
          }
        },
    },

    persist: {
        enabled: true,
        strategies: [
            {
                key: "theme",
                storage: localStorage,
            },
        ],
    },
});
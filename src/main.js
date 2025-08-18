import { createApp } from 'vue';
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";
import { UiKit }from "@/uikit";

import App from "./App.vue";
import piniaPersist from "pinia-plugin-persistedstate";

import router from "@/shared/router/router.js";

import en from "@/locales/en.json";
import ua from "@/locales/ua.json";

import {useThemeStore} from "@/shared/store/themeStore.js";

const i18n = createI18n({
   legacy: false,
   locale: navigator.language || "ua",
   fallbackLng: "en",
   messages: {
       en,
       ua,
   }
});

const pinia = createPinia();
pinia.use(piniaPersist);

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(i18n);
app.use(UiKit);

app.mount('#app');

const themeStore = useThemeStore();
themeStore.initTheme();
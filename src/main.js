import { createApp } from 'vue';
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persistedstate";
import App from "./App.vue";
import router from "./shared/plugins/router.js";
import { createI18n } from "vue-i18n";
import en from "./locales/en.json";
import ua from "./locales/ua.json";
import "./style.css";

const i18n = createI18n({
   legacy: false,
   locale: "ua",
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

app.mount('#app');

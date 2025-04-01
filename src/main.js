import { createApp } from 'vue';
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persistedstate";
import App from './App.vue';
import router from "./shared/router.js";
import registerFontAwesome from "./shared/plugins/fontawesome";
import "./style.css";

const pinia = createPinia();
pinia.use(piniaPersist);

const app = createApp(App);

app.use(pinia);
app.use(router);
registerFontAwesome(app);

app.mount('#app');

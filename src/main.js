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



import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

const socket = new SockJS("http://localhost:8080/ws");
const stompClient = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 5000,
});

stompClient.onConnect = () => {
    console.log("Connected!");

    // stompClient.subscribe('/user/queue/notifications', function(message) {
    //     console.log('Private notification:', JSON.parse(message.body));
    // });

    stompClient.subscribe("/topic/notifications", msg => {
        console.log("Notification:", msg.body);
    });

    // підписка на повідомлення
    // stompClient.subscribe("/topic/greetings", (msg) => {
    //     console.log("Отримано:", msg.body);
    // });

    // відправка повідомлення
    // stompClient.publish({ destination: "/app/hello", body: "Vue каже привіт!" });
};

stompClient.activate();
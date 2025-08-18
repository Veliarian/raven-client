<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { connectWithJwt, disconnect } from "./ws";
import axios from "axios";
import {authHeader} from "@/shared/utils/authHeader.js";
import {useAuthStore} from "@/modules/auth/store/authStore.js";

const notifications = ref([]);

onMounted(() => {
    const authStore = useAuthStore();
    const token = authStore.token;
    connectWithJwt(token, (n) => notifications.value.push(n));
});

onBeforeUnmount(() => disconnect());

function notifyMe() {
    axios.post("http://localhost:8080/v1/debug/notify-me", {}, {
        headers: authHeader()
    });
}
</script>

<template>
    <div>
        <button @click="notifyMe">🔔 Надіслати собі тест</button>
        <ul>
            <li v-for="n in notifications" :key="n.id">
                <strong>[{{ n.type }}]</strong> {{ n.title }} — {{ n.message }}
            </li>
        </ul>
    </div>
</template>
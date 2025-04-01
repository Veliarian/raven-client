<script setup>
import {useRoute, useRouter} from "vue-router";
import {useAuthStore} from "../store/authStore.js";
import {onMounted} from "vue";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

onMounted(() => {
    const token = route.query.token;
    if(token) {
        authStore.setToken(token);
        router.push("/");
    } else {
        router.push("/auth")
    }
});
</script>

<template>
    <div>Logging in...</div>
</template>

<style scoped>

</style>
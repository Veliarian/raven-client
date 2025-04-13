<script setup>
import {useRoute, useRouter} from "vue-router";
import {useAuthStore} from "../store/authStore.js";
import {onMounted} from "vue";
import {useUserStore} from "@/modules/user/store/userStore.js";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const userStore = useUserStore();

onMounted(() => {
    const token = route.query.token;
    if(token) {
        authStore.setToken(token);
        userStore.fetchUser();
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
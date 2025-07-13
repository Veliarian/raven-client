<script setup>
import {useRoute, useRouter} from "vue-router";
import {useAuthStore} from "../store/authStore.js";
import {onMounted} from "vue";
import {useUsersStore} from "@/modules/users/store/usersStore.js";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const usersStore = useUsersStore();

onMounted(() => {
    const token = route.query.token;
    if(token) {
        authStore.setToken(token);
        usersStore.fetchCurrentUser();
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
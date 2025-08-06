<script setup>
import {ref} from "vue";
import {Button as FButton, Input as FInput, Separator as FSeparator} from "@uikit";
import {mdiAccountOutline, mdiGoogle, mdiLockOutline} from "@mdi/js";
import {useAuthStore} from "@/modules/auth/store/authStore.js";
import {useRoute, useRouter} from "vue-router";

const loginWithGoogle = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
}

const router = useRouter();
const authStore = useAuthStore();

const username = ref("");
const password = ref("");

const login = async () => {
    await authStore.login(username.value, password.value);
    await router.push("/");
}
</script>

<template>
    <div class="login-form-template">
        <div class="form-header">
            <h1>Welcome back</h1>
            <p>Log in to your account</p>
        </div>
        <form class="login-form" id="login-form">
            <div class="form-field">
                <label for="username">Username</label>
                <f-input
                    id="username"
                    type="text"
                    v-model="username"
                    :icon="mdiAccountOutline"
                    placeholder="Enter your username"
                />
            </div>
            <div class="form-field">
                <label for="password">Password</label>
                <f-input
                    id="password"
                    type="password"
                    v-model="password"
                    :icon="mdiLockOutline"
                    placeholder="Enter your password"
                />
            </div>
            <f-button class="full-w" @click.prevent="login">Login</f-button>
            <f-separator>Or continue with</f-separator>
            <f-button class="full-w" type="light" :icon="mdiGoogle" @click="loginWithGoogle">
                Login with Google
            </f-button>
        </form>
    </div>
</template>

<style scoped>
.login-form-template {
    width: 100%;
}

.form-header {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-bottom: 1.5rem;
}

.form-header h1 {
    font-size: 1.875rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
}

.form-header p {
    color: var(--text-color-secondary);
}

.login-form {
    width: 100%;
    max-width: 24rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.separator {
    width: 100%;
    position: relative;
    margin: 1.5rem 0;
    text-align: center;
}

.separator::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: var(--color-secondary);
}

.separator span {
    position: relative;
    padding: 0 0.5rem;
    background-color: var(--surface);
    color: var(--color-secondary);
    font-size: 0.75rem;
    text-transform: uppercase;
}
</style>
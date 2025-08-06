<script setup>
import {Button as FButton, Input as FInput, Separator as FSeparator} from "@uikit";
import {mdiAccountOutline, mdiEmailOutline, mdiGoogle, mdiLockOutline} from "@mdi/js";
import {ref} from "vue";
import {useAuthStore} from "@/modules/auth/store/authStore.js";
import {useRouter} from "vue-router";

const loginWithGoogle = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
}

const router = useRouter();
const authStore = useAuthStore();

const username = ref("");
const email = ref("");
const password = ref("");

const register = async () => {
    await authStore.signUp(username.value, email.value, password.value);
    await router.push("/");
}
</script>

<template>
    <div class="register-form-template">
        <div class="form-header">
            <h1>Create an account</h1>
            <p>Sign up to get started</p>
        </div>
        <form class="register-form">
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
                <label for="email">Email</label>
                <f-input
                    id="email"
                    type="email"
                    v-model="email"
                    :icon="mdiEmailOutline"
                    placeholder="Enter your email"
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
            <f-button class="full-w" @click.prevent="register">Register</f-button>
            <f-separator>Or continue with</f-separator>
            <f-button class="full-w" type="light" :icon="mdiGoogle" @click="loginWithGoogle">
                Login with Google
            </f-button>
        </form>
    </div>
</template>

<style scoped>
.register-form-template{
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

.register-form {
    width: 100%;
    max-width: 24rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
</style>
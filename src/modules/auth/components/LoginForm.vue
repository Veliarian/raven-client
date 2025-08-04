<script setup>
import {ref} from "vue";
import {Button as FButton} from "@/uikit/index.js";

const isShowPassword = ref(false);

const showPassword = () => {
    isShowPassword.value = !isShowPassword.value;
}

const loginWithGoogle = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
}
</script>

<template>
    <div class="login-form-template">
        <div class="form-header">
            <h1>Welcome back</h1>
            <p>Log in to your account</p>
        </div>
        <form class="form-main" id="login-form">
            <div class="form-field">
                <label for="login-username">Username</label>
                <div class="input-wrapper">
                    <div class="input-icon user-icon"></div>
                    <input type="text" id="login-username" name="username" placeholder="Enter your username" required>
                </div>
            </div>
            <div class="form-field">
                <label for="login-password">Password</label>
                <div class="input-wrapper">
                    <div class="input-icon password-icon"></div>
                    <input :type="isShowPassword ? 'text' : 'password'" id="login-password" name="password" placeholder="Enter your password"
                           required>
                    <div class="toggle-password" :class="{show: isShowPassword}" data-for="login-password" @click="showPassword"></div>
                </div>
            </div>
            <FButton class="full-w">Login</FButton>
            <button type="submit" class="btn-submit">Login</button>
            <div class="separator">
                <span>Or continue with</span>
            </div>
            <button class="google-btn" @click="loginWithGoogle">
                <svg xmlns="http://www.w3.org/2000/svg" class="google-icon" viewBox="0 0 24 24">
                    <path fill="currentColor"
                          d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 0 1 0-12.064c1.498 0 2.866.549 3.921 1.453l2.814-2.814A9.969 9.969 0 0 0 12.545 2C7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z"/>
                </svg>
                Login with Google
            </button>
        </form>
    </div>
</template>

<style scoped>
.login-form-template{
    width: 100%;
}

.form-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-bottom: 1.5rem;
    width: 100%;
}

.form-header h1 {
    font-size: 1.875rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
}

.form-header p {
    color: var(--text-color-secondary);
}

.form-main {
    width: 100%;
    max-width: 24rem;
    margin: 0 auto;
}

.input-wrapper {
    position: relative;
}

.input-icon {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    width: 1.2rem;
    height: 1.2rem;
    opacity: 0.7;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
}

.user-icon {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'%3E%3C/path%3E%3Ccircle cx='12' cy='7' r='4'%3E%3C/circle%3E%3C/svg%3E");
}

.password-icon {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect width='18' height='11' x='3' y='11' rx='2' ry='2'%3E%3C/rect%3E%3Cpath d='M7 11V7a5 5 0 0 1 10 0v4'%3E%3C/path%3E%3C/svg%3E");
}

input[type="text"],
input[type="email"],
input[type="password"] {
    padding: 0 0.75rem 0 2.5rem;
}

.toggle-password {
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    width: 1.2rem;
    height: 1.2rem;
    cursor: pointer;
    opacity: 0.7;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M9.88 9.88a3 3 0 1 0 4.24 4.24'%3E%3C/path%3E%3Cpath d='M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68'%3E%3C/path%3E%3Cpath d='M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61'%3E%3C/path%3E%3Cline x1='2' x2='22' y1='2' y2='22'%3E%3C/line%3E%3C/svg%3E");
}

.toggle-password.show {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z'%3E%3C/path%3E%3Ccircle cx='12' cy='12' r='3'%3E%3C/circle%3E%3C/svg%3E");
}

.btn-submit {
    width: 100%;
    height: 2.5rem;
    max-width: none;
    display: flex;
    align-items: center;
    justify-content: center;
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

.google-btn {
    width: 100%;
    max-width: none;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2.5rem;
    border: 1px solid var(--border-color);
    background-color: transparent;
    color: var(--text-color-secondary);
    cursor: pointer;
    transition: background-color 0.15s ease;
}

.google-icon {
    width: 1.25rem;
    height: 1.25rem;
    margin-right: 0.5rem;
}

/* Media Queries */
@media (max-width: 768px) {
    .form-header h1 {
        font-size: 1.5rem;
    }
}

@media (max-width: 480px) {
    .form-header h1 {
        font-size: 1.25rem;
    }
}
</style>
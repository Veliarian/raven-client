<script setup>
import LoginForm from "./LoginForm.vue";
import RegisterForm from "./RegisterForm.vue";
import {ref} from "vue";

const loginFormActive = ref(true);
const registerFormActive = ref(false);
const slideSectionSide = ref("right");
const switchButtonText = ref("Register now");

const switchForms = () => {
    loginFormActive.value = !loginFormActive.value;
    registerFormActive.value = !registerFormActive.value;

    if(loginFormActive.value){
        slideSectionSide.value = "right";
        switchButtonText.value = "Register now";
    }else{
        slideSectionSide.value = "left";
        switchButtonText.value = "Login now";
    }
}
</script>

<template>
    <div class="container">
        <!-- Theme Toggle -->
        <div class="theme-toggle">
            <div class="sun-icon"></div>
            <label class="switch">
                <input type="checkbox" id="theme-switch">
                <span class="slider"></span>
            </label>
            <div class="moon-icon"></div>
        </div>

        <!-- Mobile Layout -->
        <div class="auth-card mobile-layout">
            <div class="auth-image">
                <img src="/vite.svg" alt="Education" />
            </div>
            <div class="auth-form-container" id="mobile-form-container">
                <LoginForm v-if="loginFormActive"/>
                <RegisterForm v-else/>
            </div>
        </div>

        <!-- Desktop Layout -->
        <div class="auth-card desktop-layout">
            <div class="content-container">
                <!-- Forms Container -->
                <div class="forms-section">
                    <div class="login-form-container" :class="{active: loginFormActive}" id="login-form-wrapper">
                        <LoginForm/>
                    </div>
                    <div class="register-form-container" :class="{active: registerFormActive}" id="register-form-wrapper">
                        <RegisterForm/>
                    </div>
                </div>
                <!-- Image Section -->
                <div class="image-section" :class="slideSectionSide" id="sliding-section">
                    <div class="image-content">
                        <img src="/vite.svg" alt="Education" />
                        <h2 id="cta-text">Don't have an account?</h2>
                        <button class="btn-primary" id="toggle-form-btn" @click="switchForms">{{ switchButtonText }}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 1rem;
}

/* Theme Toggle */
.theme-toggle {
    position: absolute;
    top: 1rem;
    right: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    z-index: 20;
}

.sun-icon, .moon-icon {
    width: 1.2rem;
    height: 1.2rem;
    transition: all 0.3s ease;
}

.sun-icon {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='4'%3E%3C/circle%3E%3Cpath d='M12 2v2'%3E%3C/path%3E%3Cpath d='M12 20v2'%3E%3C/path%3E%3Cpath d='m4.93 4.93 1.41 1.41'%3E%3C/path%3E%3Cpath d='m17.66 17.66 1.41 1.41'%3E%3C/path%3E%3Cpath d='M2 12h2'%3E%3C/path%3E%3Cpath d='M20 12h2'%3E%3C/path%3E%3Cpath d='m6.34 17.66-1.41 1.41'%3E%3C/path%3E%3Cpath d='m19.07 4.93-1.41 1.41'%3E%3C/path%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
}

.moon-icon {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z'%3E%3C/path%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    opacity: 0;
    transform: rotate(90deg) scale(0);
}

.dark .sun-icon {
    opacity: 0;
    transform: rotate(-90deg) scale(0);
}

.dark .moon-icon {
    opacity: 1;
    transform: rotate(0) scale(1);
}

/* Switch */
.switch {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 20px;
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--muted);
    transition: .4s;
    border-radius: 34px;
}

.slider:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
}

input:checked + .slider {
    background-color: var(--primary);
}

input:checked + .slider:before {
    transform: translateX(20px);
}

/* Auth Card */
.auth-card {
    background-color: var(--card);
    background-color: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(16px);
    border-radius: var(--radius);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 1000px;
    overflow: hidden;
}

.dark .auth-card {
    background-color: rgba(38, 38, 38, 0.8);
}

/* Mobile Layout */
.mobile-layout {
    display: none;
    flex-direction: column;
    padding: 1.5rem;
}

.mobile-layout .auth-image {
    display: flex;
    justify-content: center;
    margin-bottom: 1.5rem;
    margin-top: 1.5rem;
}

.mobile-layout img {
    width: 8rem;
    height: 8rem;
    border-radius: var(--radius);
    object-fit: cover;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Desktop Layout */
.desktop-layout {
    display: block;
}

.content-container {
    display: flex;
    position: relative;
    height: 600px;
    overflow: hidden;
}

.forms-section {
    position: relative;
    width: 100%;
    height: 100%;
}

.login-form-container,
.register-form-container {
    position: absolute;
    width: 50%;
    height: 100%;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: all 0.5s ease;
    visibility: hidden;
}

.login-form-container {
    left: 0;
    transform: translateX(-30px);
}

.register-form-container {
    right: 0;
    transform: translateX(30px);
}

.login-form-container.active,
.register-form-container.active {
    opacity: 1;
    visibility: visible;
    transform: translateX(0);
    z-index: 1;
}

/* Image Section */
.image-section {
    position: absolute;
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;
    z-index: 2;
}

.image-section.right {
    left: 50%;
    background: linear-gradient(to left, rgba(28, 138, 67, 0.1), rgba(244, 244, 246, 0.1));
}

.dark .image-section.right {
    background: linear-gradient(to left, rgba(48, 212, 100, 0.1), rgba(51, 51, 51, 0.1));
}

.image-section.left {
    left: 0;
    background: linear-gradient(to right, rgba(28, 138, 67, 0.1), rgba(244, 244, 246, 0.1));
}

.dark .image-section.left {
    background: linear-gradient(to right, rgba(48, 212, 100, 0.1), rgba(51, 51, 51, 0.1));
}

.image-content {
    text-align: center;
    padding: 1.5rem;
    max-width: 90%;
}

.image-content img {
    width: 100%;
    max-width: 20rem;
    border-radius: var(--radius);
    object-fit: cover;
    margin-bottom: 2rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.image-content h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: var(--foreground);
}

.btn-primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 2.5rem;
    padding: 0 1rem;
    border: none;
    border-radius: 0.375rem;
    background-color: var(--primary);
    color: var(--primary-foreground);
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.15s ease;
}

.btn-primary:hover {
    background-color: rgba(28, 138, 67, 0.9);
}

.dark .btn-primary:hover {
    background-color: rgba(48, 212, 100, 0.9);
}

/* Media Queries */
@media (max-width: 768px) {
    .mobile-layout {
        display: flex;
    }

    .desktop-layout {
        display: none;
    }

    .theme-toggle {
        transform: scale(0.9);
    }

    .form-header h1 {
        font-size: 1.5rem;
    }
}

@media (max-width: 480px) {
    .container {
        padding: 0.5rem;
    }

    .mobile-layout {
        padding: 1rem;
    }

    .form-header h1 {
        font-size: 1.25rem;
    }
}
</style>
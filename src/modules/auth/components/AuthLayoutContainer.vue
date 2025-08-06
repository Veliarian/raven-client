<script setup>
import LoginForm from "./LoginForm.vue";
import RegisterForm from "./RegisterForm.vue";
import {ref} from "vue";
import ThemeSwitch from "@/shared/components/ThemeSwitch.vue";
import {Button as FButton} from "@uikit";

const loginFormActive = ref(true);
const registerFormActive = ref(false);
const slideSectionSide = ref("right");
const switchButtonText = ref("Register now");
const message = ref("Don't have an account?");

const switchForms = () => {
    loginFormActive.value = !loginFormActive.value;
    registerFormActive.value = !registerFormActive.value;

    if(loginFormActive.value){
        slideSectionSide.value = "right";
        switchButtonText.value = "Register now";
        message.value = "Don't have an account?";
    }else{
        slideSectionSide.value = "left";
        switchButtonText.value = "Login now";
        message.value = "Already have an account?";
    }
}
</script>

<template>
    <div class="auth-layout-container">
        <!-- Theme Toggle -->
        <theme-switch class="theme-switch"/>

        <!-- Mobile Layout -->
        <div class="auth-card mobile-layout">
            <div class="auth-image">
                <img src="/raven_logo.svg" alt="Education" class="logo-img"/>
            </div>
            <div class="auth-form-container" id="mobile-form-container">
                <login-form v-if="loginFormActive"/>
                <register-form v-else/>
            </div>
        </div>

        <!-- Desktop Layout -->
        <div class="auth-card desktop-layout">
            <div class="content-container">
                <!-- Forms Container -->
                <div class="forms-section">
                    <div class="login-form-container" :class="{active: loginFormActive}" id="login-form-wrapper">
                        <login-form/>
                    </div>
                    <div class="register-form-container" :class="{active: registerFormActive}" id="register-form-wrapper">
                        <register-form/>
                    </div>
                </div>
                <!-- Image Section -->
                <div class="image-section" :class="slideSectionSide" id="sliding-section">
                    <div class="image-content">
                        <img src="/raven_logo.svg" alt="Education" class="logo-img"/>
                        <h2 id="cta-text">{{ message }}</h2>
                        <f-button class="login-switch" @click="switchForms">{{ switchButtonText }}</f-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.auth-layout-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 1rem;
}

.theme-switch{
    position: absolute;
    top: 1rem;
    right: 1rem;
}

/* Auth Card */
.auth-card {
    background-color: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(16px);
    border-radius: var(--radius-lg);
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
    max-width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.logo-img {
    width: 100%;
    max-width: 20rem;
    object-fit: cover;
    margin-bottom: 2rem;
}

.dark .logo-img{
    filter: invert(100%) sepia(100%) saturate(10%) hue-rotate(201deg) brightness(103%) contrast(102%);
}

.image-content h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
}

/* Media Queries */
@media (max-width: 768px) {
    .mobile-layout {
        display: flex;
    }

    .desktop-layout {
        display: none;
    }

    .form-header h1 {
        font-size: 1.5rem;
    }
}

@media (max-width: 480px) {
    .auth-layout-container {
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
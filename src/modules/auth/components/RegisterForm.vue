<script setup>
import {ref} from "vue";

const isShowPassword = ref(false);

const showPassword = () => {
    isShowPassword.value = !isShowPassword.value;
}
</script>

<template>
    <div class="register-form-template">
        <div class="form-header">
            <h1>Create an account</h1>
            <p>Sign up to get started</p>
        </div>
        <form class="auth-form" id="register-form">
            <div class="form-group">
                <label for="register-username">Username</label>
                <div class="input-wrapper">
                    <div class="input-icon user-icon"></div>
                    <input type="text" id="register-username" name="username" placeholder="Choose a username" required>
                </div>
            </div>
            <div class="form-group">
                <label for="register-email">Email</label>
                <div class="input-wrapper">
                    <div class="input-icon email-icon"></div>
                    <input type="email" id="register-email" name="email" placeholder="Enter your email" required>
                </div>
            </div>
            <div class="form-group">
                <label for="register-password">Password</label>
                <div class="input-wrapper">
                    <div class="input-icon password-icon"></div>
                    <input :type="isShowPassword ? 'text' : 'password'" id="register-password" name="password" placeholder="Create a password"
                           required>
                    <div class="toggle-password" data-for="register-password" @click="showPassword"></div>
                </div>
            </div>
            <button type="submit" class="btn-submit">Register</button>
            <div class="separator">
                <span>Or continue with</span>
            </div>
            <button type="button" class="google-btn">
                <svg xmlns="http://www.w3.org/2000/svg" class="google-icon" viewBox="0 0 24 24">
                    <path fill="currentColor"
                          d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 0 1 0-12.064c1.498 0 2.866.549 3.921 1.453l2.814-2.814A9.969 9.969 0 0 0 12.545 2C7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z"/>
                </svg>
                Register with Google
            </button>
        </form>
    </div>
</template>

<style scoped>
.register-form-template{
    width: 100%;
}

.form-header {
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
    color: var(--muted-foreground);
}

.auth-form {
    width: 100%;
    max-width: 24rem;
    margin: 0 auto;
}

.form-group {
    margin-bottom: 1rem;
}

.form-group label {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
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

.email-icon {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect width='20' height='16' x='2' y='4' rx='2'%3E%3C/rect%3E%3Cpath d='m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7'%3E%3C/path%3E%3C/svg%3E");
}

.password-icon {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect width='18' height='11' x='3' y='11' rx='2' ry='2'%3E%3C/rect%3E%3Cpath d='M7 11V7a5 5 0 0 1 10 0v4'%3E%3C/path%3E%3C/svg%3E");
}

input[type="text"],
input[type="email"],
input[type="password"] {
    width: 100%;
    height: 2.5rem;
    padding: 0 0.75rem 0 2.5rem;
    border: 1px solid var(--input);
    border-radius: 0.375rem;
    background-color: var(--background);
    color: var(--foreground);
    font-size: 1rem;
    transition: border-color 0.15s ease;
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="password"]:focus {
    outline: none;
    border-color: var(--ring);
    box-shadow: 0 0 0 2px rgba(28, 138, 67, 0.1);
}

.dark input[type="text"]:focus,
.dark input[type="email"]:focus,
.dark input[type="password"]:focus {
    box-shadow: 0 0 0 2px rgba(48, 212, 100, 0.1);
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
    border: none;
    border-radius: 0.375rem;
    background-color: var(--primary);
    color: var(--primary-foreground);
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.15s ease;
}

.btn-submit:hover {
    background-color: rgba(28, 138, 67, 0.9);
}

.dark .btn-submit:hover {
    background-color: rgba(48, 212, 100, 0.9);
}

.separator {
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
    background-color: var(--border);
}

.separator span {
    position: relative;
    padding: 0 0.5rem;
    background-color: var(--card);
    color: var(--foreground);
    font-size: 0.75rem;
    text-transform: uppercase;
}

.google-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 2.5rem;
    border: 1px solid var(--border);
    border-radius: 0.375rem;
    background-color: transparent;
    color: var(--foreground);
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.15s ease;
}

.google-btn:hover {
    background-color: var(--secondary);
}

.google-icon {
    width: 1.25rem;
    height: 1.25rem;
    margin-right: 0.5rem;
}

.form-footer {
    margin-top: 1rem;
    text-align: center;
    font-size: 0.875rem;
    color: var(--foreground);
}

.switch-form-link {
    color: var(--primary);
    text-decoration: none;
    font-weight: 500;
    cursor: pointer;
}

.switch-form-link:hover {
    text-decoration: underline;
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
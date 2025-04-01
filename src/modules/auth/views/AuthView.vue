<script setup>
import AuthBackground from "../components/AuthBackground.vue";
import AuthLayoutContainer from "../components/AuthLayoutContainer.vue";
</script>

<template>
<div class="auth-view">
    <AuthBackground/>
    <AuthLayoutContainer/>
</div>
</template>

<style scoped>
.auth-view{
    position: relative;
    min-height: 100vh;
    width: 100%;
    overflow: hidden;
}
</style>
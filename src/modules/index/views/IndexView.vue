<script setup>

import Sidebar from "../components/Sidebar.vue";
</script>

<template>
    <div class="index-view">
        <Sidebar/>
        <RouterView/>
    </div>
</template>

<style scoped>
    .index-view{
        width: 100%;
        height: 100%;
        display: flex;
    }
</style>
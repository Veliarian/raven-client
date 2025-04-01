<script setup>

import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
</script>

<template>
    <div class="sidebar">
        <div class="sidebar-content">
            <div class="sidebar-header"></div>
            <nav class="sidebar-body">
                <div class="sidebar-list">
                    <router-link class="sidebar-list-item" to="/dashboard">
                        <font-awesome-icon class="sidebar-list-item-icon" icon="house"></font-awesome-icon>
                        <span class="sidebar-list-item-text">Dashboard</span>
                    </router-link>
                </div>
            </nav>
            <div class="sidebar-footer"></div>
        </div>
    </div>
</template>

<style scoped>
.sidebar{
    width: 16rem;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 50;
    background: hsl(240 10% 15%);
}

.sidebar-content{
    height: 100%;
    display: flex;
    flex-direction: column;
    border: 1px solid hsl(240 10% 20%);
}

.sidebar-header{
    padding: 1rem;
    border-bottom: 1px solid hsl(240 10% 20%);
}

.sidebar-body{
    padding: 1.5rem .75rem;
    flex: 1 1 0%;
}

.sidebar-footer{
    padding: 1rem;
    border-top: 1px solid hsl(240 10% 20%);
}
</style>
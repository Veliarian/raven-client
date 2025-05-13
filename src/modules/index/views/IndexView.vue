<script setup>

import Sidebar from "../components/Sidebar.vue";
import TopBar from "../components/TopBar.vue";

</script>

<template>
    <div class="index-view">
        <Sidebar/>
        <div class="content-box">
            <TopBar/>
            <main class="views-box">
                <RouterView/>
            </main>
        </div>
    </div>
</template>

<style scoped>
    .index-view{
        width: 100%;
        height: 100%;
        display: flex;
    }

    .content-box{
        flex: 1;
        display: flex;
        flex-direction: column;
    }

    .views-box{
        max-width: 88rem;
        width: 100%;
        flex: 1;
        padding: 2rem;
        margin-left: auto;
        margin-right: auto;
    }
</style>
<script setup>


import {useI18n} from "vue-i18n";

const {t} = useI18n();

</script>

<template>
    <div class="dashboard-view">
        <header class="dashboard-header">
            <h1>{{ t("dashboard.header") }}</h1>
        </header>
    </div>
</template>

<style scoped>
.dashboard-view{
    width: 100%;
    height: 100%;
}
</style>
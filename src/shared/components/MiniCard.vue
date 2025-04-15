<script setup>

import Icon from "@/shared/components/Icon.vue";

defineProps({
    icon: String,
    color: String,
    title: String,
    sub: String
});
</script>

<template>
<div class="mini-card">
    <div class="icon-box">
        <div class="icon-container" :style="{'background': `hsla(from ${color} h s l / 0.2)`}">
            <Icon :icon="icon" :color="color"/>
        </div>
    </div>
    <div class="info-box">
        <h4 class="info-h">{{ title }}</h4>
        <p class="info-p">{{ sub }}</p>
    </div>
</div>
</template>

<style scoped>
.mini-card{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: .75rem;
    padding: 1rem;
    background-color: var(--background-light);
    border-radius: 1rem;
}

.icon-box{
    width: 100%;
    display: flex;
    justify-content: center;
}

.icon-container{
    width: 44px;
    height: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: .5rem;
}

.info-box{
    width: 100%
}

.info-p{
    color: var(--text-color-secondary);
}
</style>
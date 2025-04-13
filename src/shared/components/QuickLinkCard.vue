<script setup>

import Icon from "@/shared/components/Icon.vue";

defineProps({
    icon: String,
    header: String,
    add: String
});
</script>

<template>
<div class="link-card">
    <div class="icon-box">
        <Icon :icon="icon"/>
    </div>
    <div class="info-box">
        <h4>{{ header }}</h4>
        <p>{{ add }}</p>
    </div>
</div>
</template>

<style scoped>
.link-card{
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 1rem;
}

.icon-box{
    width: 100%;
}
</style>
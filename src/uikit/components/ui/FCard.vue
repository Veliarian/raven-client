<script setup>
import {FIcon} from "@uikit";

defineProps({
    title: String,
    sub: String,
    icon: String,
    color: String,
    select: Boolean
});
</script>

<template>
    <div class="f-card">
        <div class="icon-box">
            <f-icon :icon="icon" :color="color" size="48" padding="10" enable-background/>
        </div>
        <div class="info-box">
            <h6>{{ title }}</h6>
            <p class="subtitle">{{ sub }}</p>
        </div>
    </div>
</template>

<style scoped>
.f-card {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-s-m);
    padding: var(--spacing-md) var(--spacing-lg);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    transition: all var(--transition-fast);
}

.f-card:hover {
    cursor: pointer;
    border-color: var(--color-primary);
}

.f-card.selected {
    border-color: var(--color-primary);
}

.icon-box {
    width: 100%;
    display: flex;
    justify-content: center;
}

.info-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-xs);
}
</style>
<script setup>
import Icon from "@/uikit/components/Icon.vue";

defineOptions({
    name: 'FButton',
});

defineProps({
    type: {
        type: String,
        default: 'default',
        validator: (value) => ['default', 'secondary', 'danger'].includes(value),
    },
    size: {
        type: String,
        default: "md",
        validator: (value) => ['sm', 'md', 'lg'].includes(value),
    },
    icon: {
        type: String,
    }
});

</script>

<template>
<button class="f-button" :class="[type, size]">
    <Icon v-if="icon" :icon="icon"/>
    <span>
        <slot/>
    </span>
</button>
</template>

<style scoped>
.f-button {
    padding: var(--spacing-2) var(--spacing-4);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: .2rem;
}

.test {
    font-size: .875rem;
    font-weight: 600;
    border-radius: 0.75rem;
    border: 1px solid var(--color-green);
    background-color: var(--color-green);
    color: var(--text-color-light);
    transition: background-color 0.2s, color .2s;
}
</style>
<script setup>
import Icon from "@/uikit/components/Icon.vue";

defineOptions({
    name: "FButton",
});

defineProps({
    type: {
        type: String,
        default: "default",
        validator: (value) => ["default", "light", "danger"].includes(value),
    },
    size: {
        type: String,
        default: "md",
        validator: (value) => ["sm", "md", "lg"].includes(value),
    },
    icon: {
        type: String
    },
});

</script>

<template>
    <button class="f-button" :class="[type, size]">
        <Icon v-if="icon" :icon="icon" :size="size === 'sm' ? 14 : (size === 'md' ? 16 : 18)"/>
        <span><slot/></span>
    </button>
</template>

<style scoped>
.f-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: .2rem;
    border: 1px solid;
    transition: all var(--transition-base);
}

/* TYPES */
.f-button.default {
    background-color: var(--color-primary);
    border-color: var(--color-primary);
    color: var(--control-color-light);
    font-weight: var(--font-weight-bold);
}

.f-button.default:hover {
    cursor: pointer;
    background-color: var(--color-primary-light);
    color: var(--control-color-dark);
}

.f-button.light {
    background-color: transparent;
    border-color: var(--border-color);
    color: var(--text-color-secondary);
}

.f-button.light:hover {
    cursor: pointer;
    border-color: var(--color-primary);
    color: var(--text-color-primary);
}

.f-button.danger {
    background-color: var(--color-danger);
    border-color: var(--color-danger);
    color: var(--control-color-light);
    font-weight: var(--font-weight-bold);
}

.f-button.danger:hover {
    cursor: pointer;
    background-color: var();
    color: var(--control-color-light);
}

/* SIZES */
.f-button.sm {
    padding: var(--spacing-xs) var(--spacing-sm);
    font-size: var(--font-size-sm);
}

.f-button.md {
    padding: var(--spacing-sm) var(--spacing-md);
    font-size: var(--font-size-base);
    border-radius: var(--radius-lg);
}

.f-button.lg {
    padding: var(--spacing-md) var(--spacing-lg);
    font-size: var(--font-size-lg);
}
</style>
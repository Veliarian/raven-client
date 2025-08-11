<script setup>
import FIcon from "../FIcon.vue";

defineOptions({
    name: "FButton",
});

defineProps({
    type: {
        type: String,
        default: "default",
        validator: (value) => ["default", "light", "danger", "cancel", "disabled", "transparent"].includes(value),
    },
    size: {
        type: String,
        default: "md",
        validator: (value) => ["sm", "md", "lg"].includes(value),
    },
    form: {
        type: String,
        default: "square",
        validator: (value) => ["square", "circle"].includes(value),
    },
    icon: {
        type: String
    },
});

</script>

<template>
    <button class="f-button" :class="[type, size, form]">
        <FIcon v-if="icon" :icon="icon" :size="size === 'sm' ? 16 : (size === 'md' ? 20 : 24)"/>
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
    background-color: var(--color-danger-light);
    color: var(--control-color-light);
}

.f-button.cancel {
    background-color: var(--color-cancel);
    border-color: var(--color-cancel);
    color: var(--control-color-dark);
    font-weight: var(--font-weight-bold);
}

.f-button.cancel:hover {
    cursor: pointer;
    border-color: var(--control-color-dark);
    color: #000000;
}

.f-button.disabled {
    background-color: var(--bg-color-disabled);
    color: var(--text-color-desabled);
}

.f-button.disabled:hover {
    cursor: not-allowed;
}

.f-button.transparent {
    background-color: transparent;
    border: none;
    padding: 0 !important;
    color: var(--color-danger-light);
    gap: 0;
}

.f-button.transparent:hover {
    cursor: pointer;
    color: var(--color-danger);
}

/* SIZES */
.f-button.sm {
    padding: var(--spacing-xs) var(--spacing-sm);
    font-size: var(--font-size-sm);
    border-radius: var(--radius-md);
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

/* FORMS */
.f-button.circle {
    border-radius: var(--radius-full);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0;
}

.f-button.sm.circle {
    padding: var(--spacing-xs);
}

.f-button.md.circle {
    padding: var(--spacing-sm);
}

.f-button.lg.circle {
    padding: var(--spacing-md);
}
</style>
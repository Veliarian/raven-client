<script setup>
import { defineProps, defineEmits } from 'vue'
import {FIcon} from "@uikit";

// Типи
defineProps({
    modelValue: {
        type: [String, Number],
        required: true
    },
    options: {
        type: Array,
        required: true,
        default: () => []
    }
})

defineEmits(['update:modelValue'])
</script>

<template>
    <div class="f-horizontal-select">
        <button
            v-for="option in options"
            :key="option.id"
            :class="['select-option', { active: option.id === modelValue }]"
            @click="$emit('update:modelValue', option.id)"
        >
            <f-icon v-if="option.icon" :icon="option.icon" size="16" />
            <span v-if="option.label">{{ option.label }}</span>
        </button>
    </div>
</template>

<style scoped>
.f-horizontal-select {
    width: fit-content;
    display: flex;
    gap: 0.25rem;
    align-items: center;
    padding: 2px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-full);
}

.select-option {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.25rem 0.75rem;
    border: 1px solid transparent;
    border-radius: var(--radius-full);
    background-color: transparent;
    color: var(--text-color-secondary);
    cursor: pointer;
    transition:
        background-color 0.3s ease,
        color 0.3s ease,
        border-color 0.3s ease;
}

.select-option:hover {
    background-color: var(--bg-color-hover);
}

.select-option.active {
    background-color: var(--color-primary);
    color: var(--control-color-light);
    border-color: var(--color-primary);
}
</style>
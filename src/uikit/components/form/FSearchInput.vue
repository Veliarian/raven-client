<script setup>
import {mdiMagnify} from "@mdi/js";
import {FInput} from "@uikit";

defineProps({
    modelValue: {
        type: [String, Number]
    },
    placeholder: {
        type: String,
        default: "Search...",
    },
});

defineEmits(["update:modelValue"]);
</script>

<template>
    <div class="search-input">
        <f-input
            type="text"
            :placeholder="placeholder"
            :icon="mdiMagnify"
            class="full-w"
            :model-value="modelValue"
            @update:model-value="$emit('update:modelValue', $event)"
        />
    </div>
</template>

<style scoped>
.search-input {
    width: 100%;
    display: flex;
    align-items: center;
    gap: .5rem;
    position: relative;
    color: var(--text-color-secondary);
}
</style>
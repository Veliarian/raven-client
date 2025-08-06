<script setup>
import {mdiMagnify} from "@mdi/js";
import {Input as FInput} from "@uikit";

defineOptions({
    name: "FSearchInput",
});

defineProps({
    checked: String,
    placeholder: {
        type: String,
        default: "Search...",
    },
});

defineEmits(["update:modelValue"]);
</script>

<template>
    <div class="search-input">
        <f-input type="text" :placeholder="placeholder" :icon="mdiMagnify" class="full-w"/>
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
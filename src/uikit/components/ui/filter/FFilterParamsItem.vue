<script setup>
import {FButton} from "@uikit";
import {mdiClose} from "@mdi/js";

defineProps({
    filter: {
        type: String
    }
});

defineEmits(["delete"]);
</script>

<template>
    <div class="f-filter-params-item">
        <div class="filter-name">{{ filter }}</div>
        <f-button
            type="transparent"
            :icon="mdiClose"
            size="sm"
            @click="$emit('delete')"
        />
    </div>
</template>

<style scoped>
.f-filter-params-item {
    display: flex;
    padding: var(--spacing-xs) var(--spacing-sm);
    background-color: rgba(125, 174, 120, .175);
    border-radius: var(--radius-full);
}

.filter-name {
    color: var(--color-primary);
}
</style>
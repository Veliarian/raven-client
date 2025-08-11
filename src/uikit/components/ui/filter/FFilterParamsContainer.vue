<script setup>
import FFilterParamsItem from "./FFilterParamsItem.vue";

defineProps({
    title: {
        type: String,
        default: "Filtering by:"
    },
    filters: Array
});

defineEmits(["delete"]);
</script>

<template>
    <div class="f-filter-params-container">
        <span class="f-filter-params-title">{{ title }}</span>
        <div class="filters">
            <f-filter-params-item
                v-for="filter in filters"
                :key="filter"
                :filter="filter"
                @delete="$emit('delete', filter)"
            />
        </div>
    </div>
</template>

<style scoped>
.f-filter-params-container {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
}

.f-filter-params-title {
    color: var(--text-color-secondary);
    font-size: var(--font-size-sm);
}

.filters {
    display: flex;
    gap: var(--spacing-xs);
}
</style>
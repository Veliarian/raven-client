<template>
    <svg
        :width="size"
        :height="size"
        viewBox="0 0 24 24"
        fill="currentColor"
        :style="{ color }"
    >
        <path :d="icon" />
    </svg>
</template>

<script setup>
defineProps({
    icon: String,      // шлях з @mdi/js
    size: { type: [Number, String], default: 24 },
    color: { type: String},
});
</script>
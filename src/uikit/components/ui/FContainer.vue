<script setup>

</script>

<template>
<div class="container">
    <slot/>
</div>
</template>

<style scoped>
.container {
    padding: var(--spacing-md);
    background: var(--background);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
}
</style>
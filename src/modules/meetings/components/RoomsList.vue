<script setup>

</script>

<template>
<div class="rooms-list">
    <slot/>
</div>
</template>

<style scoped>
.rooms-list {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}
</style>
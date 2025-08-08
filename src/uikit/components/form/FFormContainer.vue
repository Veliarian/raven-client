<script setup>

</script>

<template>
    <div class="forms-container">
        <slot/>
    </div>
</template>

<style scoped>
.forms-container{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--bg-color-opacity);
}
</style>
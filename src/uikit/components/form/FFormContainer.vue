<script setup>

</script>

<template>
    <div class="f-forms-container">
        <slot/>
    </div>
</template>

<style scoped>
.f-forms-container {
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

.fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
    opacity: 0;
}
</style>
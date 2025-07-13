<script setup>

</script>

<template>
<div class="multi-button">
    <slot/>
</div>
</template>

<style scoped>
.multi-button{
    max-width: fit-content;
    display: flex;
    gap: 4px;
    padding: 2px;
    background-color: var(--background);
    border: 1px solid var(--border-color);
    border-radius: 9999px;
}
</style>

<style>
.multi-button button{
    background-color: transparent;
    border: none;
    padding: .3rem .5rem;
    color: var(--text-color-secondary);
    border-radius: var(--radius-full);
}

.multi-button button:hover{
    background-color: var(--color-green-light);
    cursor: pointer;
}

.multi-button button.active{
    background-color: var(--color-green);
    color: var(--text-color-light);
    cursor: default;
    transition: background-color .2s, color .2s;
}
</style>
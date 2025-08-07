<script setup>
defineProps({
    title: String,
    subtitle: String,
});
</script>

<template>
    <header class="f-title">
        <div class="f-title-header">
            <h1 v-if="title" class="f-title-h">{{ title }}</h1>
            <p v-if="subtitle" class="f-title-sub">{{ subtitle }}</p>
        </div>
        <div v-if="$slots" class="f-title-control">
            <slot/>
        </div>
    </header>
</template>

<style scoped>
.f-title {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.f-title-sub{
    color: var(--color-secondary);
}
</style>
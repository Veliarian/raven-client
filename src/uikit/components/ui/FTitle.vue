<script setup>
defineProps({
    title: String,
    subtitle: String,
    size: {
        type: String,
        default: "lg"
    }
});
</script>

<template>
    <header class="f-title">
        <div class="f-title-header">
            <h1 v-if="title && size === 'lg'" class="f-title-h">{{ title }}</h1>
            <h3 v-if="title && size === 'md'" class="f-title-h">{{ title }}</h3>
            <h5 v-if="title && size === 'sm'" class="f-title-h">{{ title }}</h5>
            <p v-if="subtitle" class="f-title-sub" :class="{'subtitle' : size !== 'lg'}">{{ subtitle }}</p>
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

.f-title-h{
    color: var(--text-color-primary);
}

.f-title-sub{
    color: var(--text-color-secondary);
}
</style>
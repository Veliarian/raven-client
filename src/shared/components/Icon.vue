<script setup>
const props = defineProps({
    icon: String,
    size: { type: [Number, String], default: 24 },
    color: { type: String},
    enableBackground: { type: Boolean }
});

function hexToRgba(hex, alpha = 1) {
    let c = hex.replace('#', '');
    if (c.length === 3) c = c.split('').map(x => x + x).join('');
    const r = parseInt(c.slice(0, 2), 16);
    const g = parseInt(c.slice(2, 4), 16);
    const b = parseInt(c.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}


const backgroundColor = () => {
    if (props.enableBackground && props.color?.startsWith('#')) {
        return { backgroundColor: hexToRgba(props.color, 0.2) };
    }
    return {};
};
</script>

<template>
    <div v-if="enableBackground" :style="backgroundColor()" class="icon-background">
        <svg
            :width="size"
            :height="size"
            viewBox="0 0 24 24"
            fill="currentColor"
            :style="{color}">
            <path :d="icon" />
        </svg>
    </div>

    <template v-else>
        <svg
            :width="size"
            :height="size"
            viewBox="0 0 24 24"
            fill="currentColor"
            :style="{color}">
            <path :d="icon" />
        </svg>
    </template>
</template>

<style scoped>
.icon-background {
    border-radius: var(--radius-lg);
    padding: var(--spacing-1);
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
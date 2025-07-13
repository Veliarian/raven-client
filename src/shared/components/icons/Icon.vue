<script setup>
import { computed } from 'vue';

const props = defineProps({
    icon: { type: String, required: true },
    size: { type: [Number, String], default: 24 },
    color: { type: String, default: 'currentColor' },
    enableBackground: { type: Boolean, default: false },
    backgroundOpacity: { type: Number, default: 0.2 },
    padding: { type: Number, default: 0 },
    backgroundShape: { type: String, default: 'square' } // 'circle' | 'square' | 'none'
});

// Обчислений числовий розмір (без "px")
const baseSize = computed(() =>
    typeof props.size === 'number' ? props.size : parseInt(props.size)
);

// Розмір для SVG (віднімаємо padding * 2)
const svgSize = computed(() =>
    baseSize.value - props.padding * 2
);

// Стиль для фону
const backgroundStyle = computed(() => {
    if (!props.enableBackground) return {};
    const hexOpacity = Math.round(props.backgroundOpacity * 255)
        .toString(16)
        .padStart(2, '0');
    return {
        backgroundColor: `${props.color}${hexOpacity}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: props.backgroundShape === 'circle' ? '50%' : '10px',
        width: `${baseSize.value}px`,
        height: `${baseSize.value}px`,
        padding: `${props.padding}px`,
    };
});
</script>

<template>
    <div class="icon-wrapper" :style="backgroundStyle">
        <svg
            :width="svgSize + 'px'"
            :height="svgSize + 'px'"
            viewBox="0 0 24 24"
            fill="currentColor"
            :style="{ color }"
        >
            <path :d="icon" />
        </svg>
    </div>
</template>

<style>
.icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
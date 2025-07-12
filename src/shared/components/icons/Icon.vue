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

const computedSize = computed(() => (typeof props.size === 'number' ? `${props.size}` : props.size));
const computedPadding = computed(() => (`${props.padding}`));

const backgroundStyle = computed(() => {
    if (!props.enableBackground) return {};
    return {
        backgroundColor: `${props.color}${Math.round(props.backgroundOpacity * 255).toString(16).padStart(2, '0')}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: props.backgroundShape === 'circle' ? '50%' : '10px',
        width: computedSize.value,
        height: computedSize.value,
        padding: computedPadding.value
    };
});

</script>

<template>
    <div class="background" :style="backgroundStyle">
        <svg
            :width="padding > 0 ? size - (padding * 2) + 'px' : computedSize + 'px'"
            :height="padding > 0 ? size - (padding * 2) + 'px' : computedSize + 'px'"
            viewBox="0 0 24 24"
            fill="currentColor"
            :style="{ color }"
        >
            <path :d="icon" />
        </svg>
    </div>
</template>

<style>
.background {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
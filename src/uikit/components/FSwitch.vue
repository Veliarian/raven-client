<script setup>
defineProps({
    modelValue: Boolean,
});

defineEmits(["update:modelValue"]);
</script>

<template>
    <label class="switch">
        <input
            type="checkbox"
            :checked="modelValue"
            @change="$emit('update:modelValue', $event.target.checked)"
        />
        <span class="slider"></span>
    </label>
</template>

<style scoped>
.switch {
    position: relative;
    display: inline-block;
    width: 44px;
    height: 24px;
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--bg-color-hover);
    transition: .2s;
    border-radius: 24px;
}

.slider:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: var(--color-primary);
    transition: 0.3s;
    border-radius: 50%;
}

input:checked + .slider {
    background-color: var(--color-primary);
}

input:checked + .slider::before {
    transform: translateX(20px);
    background-color: var(--surface);
}
</style>
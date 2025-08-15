<script setup>

defineProps({
    modelValue: String,
    resize: Boolean,
    baseWidth: String,
    baseHeight: String,
    placeholder: String,
    error: Boolean
});

defineEmits(["update:modelValue"]);
</script>

<template>
    <div class="f-text-wrapper" :style="{width: baseWidth ? baseWidth : '', height: baseHeight ? baseHeight : ''}">
        <textarea :value="modelValue"
                  @input="$emit('update:modelValue', $event.target.value)"
                  :placeholder="placeholder"
                  class="f-text"
                  :class="[resize ? 'resize' : '', error ? 'error' : '']"
        ></textarea>
    </div>
</template>

<style scoped>
.f-text-wrapper {
    position: relative;
}

.f-text {
    width: 100%;
    height: 100%;
    resize: none;
    font-size: var(--font-size-base);
    padding: var(--spacing-sm) var(--spacing-s-m);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    color: var(--text-color-secondary);
    background-color: var(--surface);
    transition: border-color var(--transition-fast);
}

.f-text.resize {
    resize: block;
}

.f-text:hover {
    cursor: text;
    outline: none;
    border-color: var(--color-primary);
}

.f-text:focus {
    outline: none;
    border-color: var(--color-primary);
}

.f-text.error {
    border-color: var(--color-danger);
}
</style>
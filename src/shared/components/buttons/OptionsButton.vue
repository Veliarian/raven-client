<script setup>
import {mdiDotsVertical} from "@mdi/js";
import Icon from "@/shared/components/icons/Icon.vue";

import {ref} from 'vue'

const emit = defineEmits(['toggle'])

const isOpen = ref(false)

function toggleMenu() {
    isOpen.value = !isOpen.value
    emit('toggle', isOpen.value)
}
</script>

<template>
    <div class="options-button-wrapper">
        <button class="options-button" @click="toggleMenu" aria-label="More options">
            <Icon :icon="mdiDotsVertical"/>
        </button>

        <div v-if="isOpen" class="options-menu">
            <slot/>
        </div>
    </div>
</template>

<style>
.options-button-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

.options-button {
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    color: var(--text-color-secondary);
}

.options-menu {
    position: absolute;
    top: 100%;
    right: 0;
    display: flex;
    flex-direction: column;
    background-color: var(--surface);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    padding: 0.25rem;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    z-index: 10;
}

.options-menu button {
    width: 100%;
    max-width: 100%;
    border: none;
    background-color: transparent;
    padding: .25rem;
    color: var(--text-color-secondary);
    font-size: 0.875rem;
    font-weight: 500;
}
</style>

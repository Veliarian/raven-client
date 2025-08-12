<script setup>
import {onMounted, onUnmounted, ref} from 'vue';
import {mdiDotsVertical} from "@mdi/js";
import {FIcon} from "@uikit";

const isOpen = ref(false);
const containerRef = ref(null);
const buttonRef = ref(null);

function toggleMenu() {
    isOpen.value = !isOpen.value;
}

function closeMenu() {
    isOpen.value = false;
}

function handleClickOutside(event) {
    const insideMenu = containerRef.value?.contains(event.target);
    const onButton = buttonRef.value?.contains(event.target);
    if (!insideMenu && !onButton) {
        closeMenu();
    }
}

onMounted(() => {
    document.addEventListener('mousedown', handleClickOutside);
});
onUnmounted(() => {
    document.removeEventListener('mousedown', handleClickOutside);
});
</script>

<template>
    <div class="options-button-wrapper">
        <button class="options-button" @click="toggleMenu" ref="optionsButtonRef" aria-label="More options">
            <f-icon :icon="mdiDotsVertical"/>
        </button>

        <div v-if="isOpen" class="options-menu" ref="containerRef">
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
    top: 80%;
    right: 10%;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
    background-color: var(--surface);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    padding: var(--spacing-xs);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    z-index: 1;
}
</style>
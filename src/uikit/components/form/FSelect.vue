<script setup>
import {ref, watch, computed} from "vue";
import {FIcon} from "@uikit";

const props = defineProps({
    modelValue: [String, Number],
    options: {
        type: Array,
        default: () => []
    },
    label: {
        type: String,
        default: ""
    },
    placeholder: {
        type: String,
        default: "Select..."
    }
});

const emit = defineEmits(["update:modelValue"]);

const isOpen = ref(false);
const selectedLabel = computed(() => {
    const selected = props.options.find(o => o.id === props.modelValue);
    return selected ? selected.label : props.placeholder;
});

function toggleDropdown() {
    isOpen.value = !isOpen.value;
}

function selectOption(option) {
    emit("update:modelValue", option.id);
    isOpen.value = false;
}

function handleClickOutside(event) {
    if (!event.target.closest(".f-select")) {
        isOpen.value = false;
    }
}
document.addEventListener("click", handleClickOutside);
</script>

<template>
    <div class="f-select">
        <div class="f-select-input" :class="{open: isOpen}" @click="toggleDropdown">
            <span>{{ selectedLabel }}</span>
            <span class="arrow">▼</span>
        </div>
        <ul v-if="isOpen" class="f-select-dropdown">
            <li v-for="option in options" :key="option.id" @click="selectOption(option)">
                <span v-if="option.icon" class="icon"><f-icon :icon="option.icon" size="18"/></span>
                {{ option.label }}
            </li>
        </ul>
    </div>
</template>

<style scoped>
.f-select {
    position: relative;
    width: 10rem;
    font-size: var(--font-size-base);
    user-select: none;
}

.f-select-input {
    height: 100%;
    padding: 6px 10px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    color: var(--text-color-secondary);
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: var(--transition-base);
}

.f-select-input span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.f-select-input:hover, .f-select-input.open {
    border-color: var(--color-primary);
}

.f-select-dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    max-height: 220px;
    overflow-y: auto;
    border: 1px solid var(--border-color);
    background: var(--surface);
    border-radius: var(--radius-md);
    z-index: 10;
    margin-top: 2px;
    padding: 0;
    list-style: none;
}
.f-select-dropdown li {
    padding: 6px 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
}
.f-select-dropdown li:hover {
    background-color: var(--bg-color-hover);
}
.arrow {
    font-size: 10px;
}
.icon {
    display: inline-flex;
}
</style>
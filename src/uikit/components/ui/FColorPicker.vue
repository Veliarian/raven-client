<script setup>
import {ref, onMounted, onBeforeUnmount} from "vue";

const props = defineProps({
    modelValue: {
        type: String,
        default: "#000000"
    },
    label: {
        type: String,
        default: ""
    },
    presetColors: {
        type: Array,
        default: () => ["#000000", "#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"]
    }
});

const emit = defineEmits(["update:modelValue"]);

const isOpen = ref(false);

function toggleDropdown() {
    isOpen.value = !isOpen.value;
}

function selectColor(color) {
    emit("update:modelValue", color);
    isOpen.value = false;
}

function handleInput(event) {
    emit("update:modelValue", event.target.value);
    isOpen.value = false;
}

// Закриття при кліку поза компонентом
function handleClickOutside(event) {
    if (!event.target.closest(".f-color-picker")) {
        isOpen.value = false;
    }
}

onMounted(() => {
    document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
    document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
    <div class="f-color-picker">
        <div class="picker-label">{{ label }}</div>
        <div class="picker-input" @click="toggleDropdown">
            <div class="color-preview" :style="{ backgroundColor: props.modelValue }"></div>
            <input type="text" :value="props.modelValue" @input="handleInput"/>
            <span class="arrow">▼</span>
        </div>

        <div v-if="isOpen" class="picker-dropdown">
            <!-- Preset colors -->
            <div class="color-swatch"
                 v-for="color in presetColors"
                 :key="color"
                 :style="{ backgroundColor: color }"
                 @click="selectColor(color)">
            </div>
            <!-- Full spectrum color input -->
            <input type="color" class="full-color" :value="props.modelValue" @input="handleInput"/>
        </div>
    </div>
</template>

<style scoped>
.f-color-picker {
    display: inline-block;
    position: relative;
    font-size: 14px;
}

.picker-label {
    margin-bottom: 2px;
}

.picker-input {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    min-width: 100px;
}

.color-preview {
    width: 20px;
    height: 20px;
    border: 1px solid #aaa;
    border-radius: 2px;
}

.picker-input input {
    border: none;
    outline: none;
    width: 50px;
    background: transparent;
}

.arrow {
    margin-left: auto;
    font-size: 12px;
}

.picker-dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    margin-top: 4px;
    padding: 4px;
    background: white;
    border: 1px solid #ccc;
    border-radius: 4px;
    z-index: 100;
    min-width: 120px;
}

.color-swatch {
    width: 20px;
    height: 20px;
    border: 1px solid #aaa;
    border-radius: 2px;
    cursor: pointer;
}

.full-color {
    width: 100%;
    margin-top: 4px;
    height: 30px;
    border: none;
    padding: 0;
    cursor: pointer;
}
</style>
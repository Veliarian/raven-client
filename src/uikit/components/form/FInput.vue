<script setup>
import FIcon from "../FIcon.vue";
import {ref} from "vue";
import {mdiEyeOffOutline, mdiEyeOutline} from "@mdi/js";

defineOptions({
    name: "FInput",
});

defineProps({
    modelValue: {
        type: [String, Number]
    },
    type: {
        type: String,
        default: "text",
        validator: (value) => ["text", "email", "password", "number", "search", "hidden"].includes(value),
    },
    placeholder: {
        type: String
    },
    icon: {
        type: String
    }
});

defineEmits(["update:modelValue"]);

const isShowPassword = ref(false);

const showPassword = () => {
    isShowPassword.value = !isShowPassword.value;
}
</script>

<template>
    <div class="f-input-wrapper">
        <f-icon v-if="icon"
              :icon="icon"
              class="f-input-icon"
              size="20"
        />
        <f-icon v-if="type === 'password'"
              :icon="isShowPassword ? mdiEyeOutline : mdiEyeOffOutline"
              class="f-input-show"
              size="20"
              @click="showPassword"
        />
        <input :type="isShowPassword ? 'text' : type"
               :value="modelValue"
               @input="$emit('update:modelValue', $event.target.value)"
               :placeholder="placeholder"
               class="f-input"
               :class="[icon ? 'icon' : '', type === 'password' ? 'pass' : '']"
        />
    </div>
</template>

<style scoped>
.f-input-wrapper {
    position: relative;
}

.f-input-icon {
    position: absolute;
    left: var(--spacing-s-m);
    top: 50%;
    transform: translateY(-50%);
    opacity: .5;
}

.f-input-show {
    position: absolute;
    right: var(--spacing-s-m);
    top: 50%;
    transform: translateY(-50%);
    opacity: .5;
}

.f-input-show:hover {
    cursor: pointer;
    opacity: .7;
}

.f-input {
    width: 100%;
    font-size: var(--font-size-base);
    padding: var(--spacing-sm) var(--spacing-s-m);
    border: 1px solid var(--color-primary-light);
    border-radius: var(--radius-lg);
    color: var(--text-color-secondary);
    background-color: var(--surface);
    transition: border-color 0.2s ease;
}

.f-input.icon {
    padding-left: var(--spacing-xlg);
}

.f-input.pass {
    padding-right: var(--spacing-xlg);
}

.f-input:hover {
    outline: none;
    border-color: var(--color-primary);
}

.f-input:focus {
    outline: none;
    border-color: var(--color-primary);
}
</style>
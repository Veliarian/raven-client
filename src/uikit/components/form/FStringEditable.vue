<script setup>
import {ref} from "vue";
import {mdiContentSave} from "@mdi/js";

defineProps({
    text: {
        type: String,
        default: "Text"
    },
});

defineEmits(["update:modelValue"]);

const enableEdit = ref(false);
</script>

<template>
    <div class="string-editable">
        <input class="string-editable-input" type="text" :disabled="!enableEdit" :value="text" @input="$emit('update:modelValue', $event.target.value)">
        <f-button v-if="enableEdit" size="sm" :icon="mdiContentSave">Save</f-button>
    </div>
</template>

<style scoped>
.string-editable {
    display: flex;
    gap: var(--spacing-sm);
}

.string-editable-input {
    background: transparent;
    border: none;
    cursor: pointer;
}
</style>
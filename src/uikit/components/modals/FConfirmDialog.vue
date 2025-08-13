<script setup>
import { ref } from "vue";
import {FButton, FFormContainer} from "@uikit";

const visible = ref(false);
const message = ref("Are you sure?");
let resolvePromise = null;

function show(msg = "Are you sure?") {
    message.value = msg;
    visible.value = true;
    return new Promise((resolve) => {
        resolvePromise = resolve;
    });
}

function handleConfirm() {
    visible.value = false;
    if (resolvePromise) resolvePromise(true);
}

function handleCancel() {
    visible.value = false;
    if (resolvePromise) resolvePromise(false);
}

defineExpose({ show });
</script>

<template>
    <f-form-container v-if="visible">
        <div class="confirm-content">
            <p>{{ message }}</p>
            <div class="buttons">
                <f-button size="sm" type="cancel" @click="handleCancel">Cancel</f-button>
                <f-button size="sm" @click="handleConfirm">Confirm</f-button>
            </div>
        </div>
    </f-form-container>
</template>

<style scoped>
.confirm-content {
    background: var(--surface);
    padding: var(--spacing-md);
    border-radius: var(--radius-lg);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-md);
}

.buttons {
    display: flex;
    gap: var(--spacing-md);
}
</style>
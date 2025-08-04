<script setup>
import { ref } from "vue";

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

function confirm() {
    visible.value = false;
    if (resolvePromise) resolvePromise(true);
}

function cancel() {
    visible.value = false;
    if (resolvePromise) resolvePromise(false);
}

defineExpose({ show });
</script>

<template>
    <div v-if="visible" class="confirm-dialog">
        <div class="confirm-content">
            <p>{{ message }}</p>
            <div class="buttons">
                <button class="cancel" @click="cancel">Cancel</button>
                <button class="delete" @click="confirm">Confirm</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.confirm-dialog {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
}
.confirm-content {
    background: white;
    padding: 1rem;
    border-radius: 8px;
    text-align: center;
}
.buttons {
    display: flex;
    margin-top: 1rem;
}
.buttons button {
    margin: 0 0.5rem;
}
</style>
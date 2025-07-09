<script setup>
import Icon from "@/shared/components/icons/Icon.vue";
import {mdiCamera, mdiCameraOff} from "@mdi/js";

const props = defineProps({
    cameraPublish: {
        type: Boolean,
        default: true
    }
});
</script>

<template>
    <button class="camera-button">
        <Icon :icon="cameraPublish ? mdiCamera : mdiCameraOff" size="40"/>
    </button>
</template>

<style scoped>
.camera-button{
    width: 48px;
    min-width: 48px;
    height: 48px;
    min-height: 48px;
    border-radius: var(--radius-full);
    background-color: transparent;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-color-secondary);
}

.camera-button:hover{
    border: .125rem solid var(--color-green);
}
</style>
<script setup>
import Icon from "@/shared/components/icons/Icon.vue";
import {mdiMicrophone, mdiMicrophoneOff} from "@mdi/js";

const props = defineProps({
    microphonePublish: {
        type: Boolean,
        default: false
    }
});
</script>

<template>
<button class="microphone-button">
    <Icon :icon="microphonePublish ? mdiMicrophone : mdiMicrophoneOff" size="40" class="microphone-icon"/>
</button>
</template>

<style scoped>
.microphone-button{
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

.microphone-button:hover{
    border: .125rem solid var(--color-green);
}
</style>
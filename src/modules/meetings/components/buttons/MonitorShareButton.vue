<script setup>
import Icon from "@/shared/components/icons/Icon.vue";
import {mdiMonitorOff, mdiMonitorShare} from "@mdi/js";

const props = defineProps({
    monitorShare: {
        type: Boolean,
        default: true
    }
});
</script>

<template>
    <button class="monitor-button">
        <Icon :icon="monitorShare ? mdiMonitorShare : mdiMonitorOff" size="40"/>
    </button>
</template>

<style scoped>
.monitor-button{
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

.monitor-button:hover{
    border: .125rem solid var(--color-green);
}
</style>
<script setup>
import Icon from "@/shared/components/icons/Icon.vue";
import {mdiCamera, mdiCameraOff, mdiPencilRuler} from "@mdi/js";

const props = defineProps({
    boardPublish: {
        type: Boolean,
        default: true
    }
});
</script>

<template>
    <button class="board-button">
        <Icon :icon="mdiPencilRuler" size="40"/>
    </button>
</template>

<style scoped>
.board-button{
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

.board-button:hover{
    border: .125rem solid var(--color-green);
}
</style>
<script setup>
import Icon from "@/shared/components/icons/Icon.vue";
import {mdiPhoneHangup} from "@mdi/js";
</script>

<template>
    <button class="leave-button">
        <Icon :icon="mdiPhoneHangup" size="44"/>
    </button>
</template>

<style scoped>
.leave-button{
    width: 48px;
    min-width: 48px;
    height: 48px;
    min-height: 48px;
    border-radius: var(--radius-full);
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-color-light);
    background-color: var(--color-danger);
    opacity: .7;
    transition: opacity .2s;
}

.leave-button:hover{
    opacity: 1;
}
</style>
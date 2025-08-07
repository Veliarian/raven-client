<script setup>
import {mdiBellOutline} from "@mdi/js";
import {FIcon} from "@uikit";
</script>

<template>
<div class="notice-box">
    <div class="notice-button">
        <f-icon :icon="mdiBellOutline" size="26"/>
        <span class="notice-mark"></span>
    </div>
</div>
</template>

<style scoped>
.notice-box{
    position: relative;
}

.notice-button{
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: var(--radius-full);
    background-color: transparent;
    color: var(--color-primary);
    border: 2px solid transparent;
    transition: all var(--transition-base);
}

.notice-button:hover{
    cursor: pointer;
    border-color: var(--color-primary);
    transition: border-bottom-color .2s, border-left-color .2s, border-right-color .2s, border-top-color .2s;
}

.notice-mark{
    position: absolute;
    top: 8px;
    right: 8px;
    padding: 4px;
    background-color: var(--color-danger);
    border-radius: 9999px;
}
</style>
<script setup>

import Icon from "./Icon.vue";
import {mdiBellOutline} from "@mdi/js";
</script>

<template>
<div class="notice-box">
    <div class="notice-button">
        <Icon :icon="mdiBellOutline" class="notice-icon"/>
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
    align-items: center;
    justify-content: center;
    background-color: transparent;
    color: var(--color-green);
    border: .15rem solid transparent;
    border-radius: 9999px;
    transition: border-bottom-color .2s, border-left-color .2s, border-right-color .2s, border-top-color .2s;
}

.notice-button:hover{
    cursor: pointer;
    border-color: var(--color-green);
    transition: border-bottom-color .2s, border-left-color .2s, border-right-color .2s, border-top-color .2s;
}

.notice-icon{
    width: 24px;
    height: 24px;
}

.notice-mark{
    position: absolute;
    top: 8px;
    right: 8px;
    padding: 4px;
    background-color: var(--color-red);
    border-radius: 9999px;
}
</style>
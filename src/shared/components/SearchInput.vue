<script setup>

import Icon from "./Icon.vue";
import {mdiMagnify} from "@mdi/js";

defineProps({
   checked: String,
   placeholder: {
       type: String,
       default: "Search...",
   },
});

defineEmits(["update:modelValue"]);
</script>

<template>
    <div class="search-input">
        <Icon :icon="mdiMagnify" class="search-icon"/>
        <input
        type="text"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="search-box"/>
    </div>
</template>

<style scoped>
.search-input{
    width: 100%;
    display: flex;
    align-items: center;
    gap: .5rem;
    position: relative;
    color: var(--text-color-secondary);
}

.search-icon{
    position: absolute;
    margin-left: 5px;
}

.search-box{
    width: 100%;
    height: 2.5rem;
    background-color: var(--surface);
    border: none;
    padding: .5rem .75rem .5rem 2rem;
    border-radius: 1.2rem;
    color: var(--text-color-secondary);
    font-size: .9rem;
    transition: outline-width .2s;
}

.search-box:hover, .search-box:focus{
    outline: .15rem solid var(--color-green);
    transition: outline-width .2s;
}
</style>
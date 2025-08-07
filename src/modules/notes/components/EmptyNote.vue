<script setup>
import {mdiPlusCircleOutline} from "@mdi/js";
import {FIcon} from "@uikit";

const emits = defineEmits(["createNote"]);

const createNote = () => {
    emits("createNote");
}
</script>

<template>
    <div class="empty-note">
        <div class="create-note-card" @click="createNote">
            <f-icon :icon="mdiPlusCircleOutline" size="80"/>
            <p class="subtitle">Add you first note</p>
        </div>
    </div>
</template>

<style scoped>
.empty-note {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.create-note-card {
    width: 14rem;
    height: 14rem;
    border: .125rem solid var(--border-color);
    border-radius: var(--radius-lg);
    background-color: var(--surface);
    color: var(--color-primary-light);
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    transition: color .2s ease;
}

.create-note-card:hover {
    border-color: var(--color-primary);
    color: var(--color-primary);
    cursor: pointer;
}

.subtitle {
    position: absolute;
    bottom: -2rem;
}
</style>
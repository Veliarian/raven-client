<script setup>

import Icon from "@/shared/components/icons/Icon.vue";
import {mdiClose} from "@mdi/js";
</script>

<template>
    <form class="create-lesson-form">
        <header>
            <h5>Create New Lesson</h5>
            <button class="close btn-close">
                <Icon :icon="mdiClose"/>
            </button>
        </header>
        <main>
            <label for="lesson-name">Lesson name</label>
            <input type="text" id="lesson-name" placeholder="Enter lesson name">

            <label for="lesson-description">Description</label>
            <textarea id="lesson-description" placeholder="Enter lesson name"></textarea>

            <label for="lesson-status">Status</label>
            <div></div>
            <input type="radio">
        </main>
    </form>
</template>

<style scoped>
.create-lesson-form {
    width: 100%;
    max-width: 600px;
    padding: var(--spacing-6);
    background-color: var(--surface);
    border-radius: var(--radius-lg);
    position: relative;
}

.btn-close {
    position: absolute;
    top: 0;
    right: 0;
}
</style>
<script setup>
import {mdiClose} from "@mdi/js";
import {FButton, FFormContainer, FInput, FTitle} from "@uikit";
</script>

<template>
    <f-form-container>
        <form class="create-lesson-form">
            <f-title title="Create New Lesson" size="md">
                <f-button type="danger" size="md" form="circle" :icon="mdiClose"/>
            </f-title>

            <main>
                <div class="form-field">
                    <label for="lesson-name">Lesson name</label>
                    <f-input type="text" id="lesson-name" placeholder="Enter lesson name"/>
                </div>

                <div class="form-field">
                    <label for="lesson-description">Description</label>
                    <textarea id="lesson-description" placeholder="Enter lesson name"></textarea>
                </div>
            </main>
        </form>
    </f-form-container>
</template>

<style scoped>
.create-lesson-form {
    width: 100%;
    max-width: 600px;
    padding: var(--spacing-md);
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
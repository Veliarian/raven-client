<script setup>
import {FButton} from "@uikit";

const props = defineProps({
    parameter: {
        type: Boolean
    },
    enabledIcon: {
        type: String
    },
    disabledIcon: {
        type: String
    }
});
</script>

<template>
    <f-button :icon="parameter ? enabledIcon : disabledIcon" form="circle"/>
</template>

<style scoped>

</style>
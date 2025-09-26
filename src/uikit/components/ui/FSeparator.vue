<script setup>
import {useSlots} from "vue";

defineOptions({
    name: "FSeparator",
});

const slots = useSlots();
const shouldShowSpan = () => slots;
</script>

<template>
    <div class="separator">
        <span v-if="$slots.default">
            <slot/>
        </span>
    </div>
</template>

<style scoped>
.separator {
    width: 100%;
    position: relative;
    margin: 1.5rem 0;
    text-align: center;
}

.separator:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: var(--color-secondary);
}

.separator span {
    position: relative;
    padding: 0 0.5rem;
    background-color: var(--surface);
    color: var(--color-secondary);
    font-size: 0.75rem;
    text-transform: uppercase;
}
</style>
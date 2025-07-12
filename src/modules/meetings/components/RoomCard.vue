<script setup>
import {mdiAccountPlusOutline, mdiTrayArrowDown} from "@mdi/js";
import Icon from "@/shared/components/icons/Icon.vue";

const props = defineProps({
    name: String,
    status: {
        type: String,
        default: "active"
    },
    participants: Array
});

const emit = defineEmits(["joinRoom"]);

const joinRoom = () => {
    emit("joinRoom");
}

const firstLetterToUpperCase = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
</script>

<template>
<div class="room-card">
    <header class="room-card-header">
        <h6>{{ name }}</h6>
        <span class="status" :class="status.toLowerCase()">{{ firstLetterToUpperCase(status) }}</span>
    </header>
    <main>
        <div class="participants-list">

        </div>
        <div class="actions-box">
            <button>
                <Icon :icon="mdiAccountPlusOutline"/>
                <span>Invite</span>
            </button>
            <button @click="joinRoom" :disabled="status.toLowerCase() === 'scheduled'">
                <Icon :icon="mdiTrayArrowDown" class="join-icon"/>
                <span>Join</span>
            </button>
        </div>
    </main>
</div>
</template>

<style scoped>
.room-card {
    flex: 1 1 calc(33.333% - 1rem);
    min-width: 16rem;
    max-width: calc(33.333% - 1rem);
    padding: var(--spacing-4);
    border-radius: var(--radius-lg);
    border: 1px solid var(--border-color);
    background-color: var(--surface);
}

.room-card-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.status {
    padding: var(--spacing-1) var(--spacing-2);
    color: var(--text-color-light);
    font-size: var(--font-size-xs);
    border-radius: var(--radius-full);
}

.status.active {
    background-color: var(--color-green);
}

.status.scheduled {
    background-color: var(--color-yellow);
}

.actions-box{
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.join-icon{
    transform: rotate(270deg);
}
</style>
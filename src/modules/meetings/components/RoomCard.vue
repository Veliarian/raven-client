<script setup>
import {computed} from "vue";
import {useUsersStore} from "@/modules/users/store/usersStore.js";
import {mdiAccountPlusOutline, mdiArrowCollapseRight} from "@mdi/js";
import ProfileImage from "@/shared/components/ProfileImage.vue";
import {FButton} from "@uikit";
import {capitalize} from "@/shared/utils/string.js";

const props = defineProps({
    name: String,
    status: {
        type: String,
        default: "active"
    },
    participantIds: {
        type: Array,
        default: () => []
    }
});

defineEmits(["joinRoom"]);
const statusClass = computed(() => props.status.toLowerCase());
const usersStore = useUsersStore();
</script>

<template>
    <div class="room-card">
        <div class="room-card-header">
            <h6>{{ name }}</h6>
            <span class="status" :class="statusClass">{{ capitalize(status) }}</span>
        </div>
        <div class="room-card-body">
            <div class="participants-list">
                <profile-image
                    v-for="participantId in participantIds"
                    :key="participantId"
                    :profile-picture="usersStore.getProfilePictureByUserId(participantId)"
                    :alt="usersStore.getFirstLetterOfUsername(participantId)"
                    class="participant-image"
                />
            </div>
            <div class="actions-box">
                <f-button :icon="mdiAccountPlusOutline" size="sm">Invite</f-button>
                <f-button :icon="mdiArrowCollapseRight" size="sm" @click="$emit('joinRoom')"
                          :type="statusClass === 'scheduled' ? 'disabled' : 'default'">Join
                </f-button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.room-card {
    flex: 1 1 calc(33.333% - 1rem);
    min-width: 16rem;
    max-width: calc(33.333% - 1rem);
    padding: var(--spacing-s-m);
    border-radius: var(--radius-lg);
    border: 1px solid var(--border-color);
    background-color: var(--surface);
    display: flex;
    flex-direction: column;
    gap: .75rem;
}

.room-card-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.status {
    padding: var(--spacing-xs) var(--spacing-xs);
    color: var(--control-color-light);
    font-size: var(--font-size-xs);
    border-radius: var(--radius-md);
    font-weight: var(--font-weight-bold);
}

.status.active {
    background-color: var(--color-primary);
}

.status.scheduled {
    background-color: var(--color-accent);
}

.room-card-body {
    display: flex;
    flex-direction: column;
    gap: .75rem;
}

.participants-list {
    width: 100%;
    max-width: 100%;
    display: flex;
}

.participant-image {
    width: 3rem;
    height: 3rem;
    border: 2px solid var(--color-primary);
}

.participants-list .participant-image:not(:first-child) {
    transform: translateX(-1.5rem);
}

.actions-box {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
}
</style>
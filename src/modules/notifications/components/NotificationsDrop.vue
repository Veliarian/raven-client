<script setup>
import {FButton} from "@uikit";
import NotificationItem from "@/modules/notifications/components/NotificationItem.vue";

const props = defineProps({
    notifications: {
        type: Array
    },
    unreadCount: {
        type: Number,
        default: 0
    },
    containerRef: {
        type: Object
    }
})
</script>

<template>
    <div class="notifications-drop" :ref="containerRef">
        <div v-if="unreadCount === 0" class="empty-notifications">No notifications</div>
        <div v-else class="notifications">
            <div class="notifications-list">
                <notification-item v-for="notification in notifications" :key="notification.id"
                                   :notification="notification"/>
            </div>
            <f-button class="full-w" size="sm" type="light">View all</f-button>
        </div>
    </div>
</template>

<style scoped>
.notifications-drop {
    position: absolute;
    top: 44px;
    right: 0;
    background-color: var(--surface);
    padding: var(--spacing-xs);
    border: 1px solid var(--color-primary);
    border-radius: var(--radius-lg);
    z-index: 1;
}

.notifications {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-md);
}

.notifications-list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
}

.empty-notifications {
    padding: var(--spacing-sm);
    text-wrap: nowrap;
    font-size: .875rem;
    color: var(--text-color-secondary);
}
</style>
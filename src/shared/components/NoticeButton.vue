<script setup>
import {mdiBellOutline, mdiCamera, mdiVideo, mdiVideoOutline} from "@mdi/js";
import {FActionsButton, FButton, FIcon} from "@uikit";
import {useNotificationsStore} from "@/modules/notifications/storage/notificationsStore.js";
import {computed, onMounted, onUnmounted, ref} from "vue";
import {useI18n} from "vue-i18n";
import {formatDate} from "../utils/dateUtils.js";
import {subscribeWebsocket} from "@/modules/notifications/services/websocketService.js";

const {t} = useI18n();

const isDisplayDrop = ref(false);

const displayDrop = () => {
    isDisplayDrop.value = !isDisplayDrop.value;
}

const containerRef = ref(null);
const notificationsBtnRef = ref(null);

const handleClickOutside = (event) => {
    const clickedInsideContainer = containerRef.value?.contains(event.target);
    const clickedOnButton = notificationsBtnRef.value?.contains(event.target);

    if (!clickedInsideContainer && !clickedOnButton) {
        isDisplayDrop.value = false;
    }
};

const iconFromType = (type) => {
    switch (type) {
        case "MEETING":
            return mdiVideoOutline;
    }
}

const notificationsStore = useNotificationsStore();
const notifications = computed(() => notificationsStore.getLastNotifications);
const unreadCount = computed(() => notificationsStore.unreadCount);

const initNotifications = () => {
    const channels = [
        "/user/queue/meetings",
    ];

    channels.forEach(channel => {
        subscribeWebsocket(channel, (notif) => {
            notificationsStore.addNotification(notif);
            triggerBellAnimation();
        });
    });
}

const isBellAnimating = ref(false);
const triggerBellAnimation = () => {
    isBellAnimating.value = true;
    setTimeout(() => {
        isBellAnimating.value = false;
    }, 3000); // тривалість анімації
}

onMounted(() => {
    document.addEventListener("mousedown", handleClickOutside);
    initNotifications();
});

onUnmounted(() => {
    document.removeEventListener('mousedown', handleClickOutside);
});
</script>

<template>
    <div class="notice-box">
        <div class="notice-button" :class="{ 'bell-animate': isBellAnimating }" ref="notificationsBtnRef"
             @click="displayDrop">
            <f-icon :icon="mdiBellOutline" size="26"/>
            <span v-if="unreadCount > 0" class="notice-mark"></span>
        </div>
        <div class="notifications-drop" ref="containerRef" v-if="isDisplayDrop">
            <div v-if="unreadCount === 0" class="empty-notifications">No notifications</div>
            <div v-else class="notifications">
                <div class="notifications-list">
                    <div class="notification-item" v-for="notification in notifications" :key="notification.id">
                        <f-icon :icon="iconFromType(notification.type)" color="#31A8FF" size="30" padding="4"
                                enable-background/>
                        <div class="notification-content">
                            <p>{{ t(notification.code, notification.params) }}</p>
                            <p class="subtitle">{{ formatDate(notification.createdAt) }}</p>
                        </div>
                        <f-actions-button class="action-button"/>
                    </div>
                </div>
                <f-button class="full-w" size="sm" type="light">View all</f-button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.notice-box {
    position: relative;
}

.notice-button {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: var(--radius-full);
    background-color: transparent;
    color: var(--color-primary);
    border: 2px solid transparent;
    transition: all var(--transition-base);
}

.notice-button.bell-animate {
    animation: bell-shake 1s ease;
}

@keyframes bell-shake {
    0% {
        transform: rotate(0);
    }
    15% {
        transform: rotate(15deg);
    }
    30% {
        transform: rotate(-15deg);
    }
    45% {
        transform: rotate(10deg);
    }
    60% {
        transform: rotate(-10deg);
    }
    75% {
        transform: rotate(5deg);
    }
    100% {
        transform: rotate(0);
    }
}

.notice-button:hover {
    cursor: pointer;
    border-color: var(--color-primary);
    transition: border-bottom-color .2s, border-left-color .2s, border-right-color .2s, border-top-color .2s;
}

.notice-mark {
    position: absolute;
    top: 8px;
    right: 8px;
    padding: 4px;
    background-color: var(--color-danger);
    border-radius: 9999px;
}

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

.notification-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-xs);
    border-radius: var(--radius-md);
    transition: background-color var(--transition-base);
}

.notification-item:hover {
    background-color: var(--bg-color-hover);
    cursor: default;
}

.notification-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
    text-wrap: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 200px;
}

.empty-notifications {
    padding: var(--spacing-sm);
    text-wrap: nowrap;
    font-size: .875rem;
    color: var(--text-color-secondary);
}
</style>
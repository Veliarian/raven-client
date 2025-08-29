<script setup>
import {mdiBellOutline} from "@mdi/js";
import {FIcon} from "@uikit";
import {useNotificationsStore} from "@/modules/notifications/storage/notificationsStore.js";
import {computed, onMounted, onUnmounted, ref} from "vue";
import {subscribeWebsocket} from "@/modules/notifications/services/websocketService.js";
import NotificationsDrop from "@/modules/notifications/components/NotificationsDrop.vue";

const isDisplayDrop = ref(false);

const displayDrop = () => {
    isDisplayDrop.value = !isDisplayDrop.value;
}

const containerRef = ref(null);
const notificationsBtnRef = ref(null);

const handleClickOutside = (event) => {
    const clickedInsideContainer = containerRef.value?.contains(event.target);
    const clickedOnButton = notificationsBtnRef.value?.contains(event.target);
    const clickedOnActionButton = event.target.closest('.action-button');

    if (!clickedInsideContainer && !clickedOnButton && !clickedOnActionButton) {
        isDisplayDrop.value = false;
    }
};

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
    }, 3000);
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
        <notifications-drop v-show="isDisplayDrop" :container-ref="containerRef" :notifications="notifications"
                            :unread-count="unreadCount"/>
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
</style>
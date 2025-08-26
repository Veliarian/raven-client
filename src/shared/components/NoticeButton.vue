<script setup>
import {mdiBellOutline} from "@mdi/js";
import {FButton, FIcon} from "@uikit";
import {useNotificationsStore} from "@/modules/notifications/storage/notificationsStore.js";
import {computed, ref} from "vue";

const notificationsStore = useNotificationsStore();
const unreadCount = computed(() => notificationsStore.unreadCount);

const isShowNotifications = ref(false);
</script>

<template>
<div class="notice-box">
    <div class="notice-button">
        <f-icon :icon="mdiBellOutline" size="26"/>
        <span v-if="unreadCount > 0" class="notice-mark"></span>
    </div>
    <div class="notifications-drop">
        <div v-if="unreadCount === 0" class="empty-notifications">No notifications</div>
        <div v-else class="notifications">
            <div class="notifications-list">
                <div class="notification-item">

                </div>
            </div>
            <f-button size="sm" type="option">View all</f-button>
        </div>
    </div>
</div>
</template>

<style scoped>
.notice-box{
    position: relative;
}

.notice-button{
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

.notice-button:hover{
    cursor: pointer;
    border-color: var(--color-primary);
    transition: border-bottom-color .2s, border-left-color .2s, border-right-color .2s, border-top-color .2s;
}

.notice-mark{
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
}

.notifications {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
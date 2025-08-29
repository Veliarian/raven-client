import {defineStore} from "pinia";
import {notificationsApi} from "@/modules/notifications/api/notificationsApi.js";

export const useNotificationsStore = defineStore('notifications', {
    state: () => ({
        notifications: [],
        unreadCount: 0,
    }),
    actions: {
        async fetchNotifications() {
            this.notifications = await notificationsApi.fetchNotifications();
            this.unreadCount = this.notifications.length;
        },

        addNotification(notification) {
            this.notifications.unshift(notification);
            this.unreadCount++;
        }
    },
    getters: {
        getLastNotifications (state) {
            return state.notifications.slice(0, 5);
        }
    }
});
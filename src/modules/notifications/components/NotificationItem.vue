<script setup>
import {computed, onMounted, ref} from "vue";
import {FActionsButton, FButton, FIcon} from "@uikit";
import {mdiEye, mdiLink, mdiMessageOutline, mdiPencil, mdiShare, mdiTrashCan, mdiVideoOutline} from "@mdi/js";
import {formatDate} from "@/shared/utils/dateUtils.js";
import {useI18n} from "vue-i18n";

const props = defineProps({
    notification: {
        type: Object
    }
})

const {t} = useI18n();

const iconProps = computed(() => {
    switch (props.notification.type) {
        case "MEETING":
            return {icon: mdiVideoOutline, color: "#31A8FF"};
        default:
            return {icon: mdiMessageOutline, color: "#fbbf24"};
    }
});
</script>

<template>
    <div class="notification-item">
        <f-icon :icon="iconProps.icon" :color="iconProps.color" size="30" padding="4"
                enable-background/>
        <div class="notification-content">
            <p>{{ t(notification.code, notification.params) }}</p>
            <p class="subtitle">{{ formatDate(notification.createdAt) }}</p>
        </div>
        <f-actions-button class="action-button">
            <f-button size="sm" type="option" :icon="mdiEye">Mark as read</f-button>
            <f-button size="sm" type="option" :icon="mdiTrashCan">Delete</f-button>
        </f-actions-button>
    </div>
</template>

<style scoped>
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
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;
}
</style>
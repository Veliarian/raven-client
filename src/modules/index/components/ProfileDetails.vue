<script setup>
import {computed, onMounted, onUnmounted, ref} from "vue";
import ProfileImage from "../../../shared/components/ProfileImage.vue";
import {useI18n} from "vue-i18n";
import {mdiAccount, mdiCog, mdiLogout} from "@mdi/js";
import {useUsersStore} from "@/modules/users/store/usersStore.js";
import {FIcon} from "@uikit";

const {t} = useI18n();

const usersStore = useUsersStore();
const username = computed(() => usersStore.currentUser?.username || "Username");

const isDisplayDrop = ref(false);

const displayDrop = () => {
    isDisplayDrop.value = !isDisplayDrop.value;
}

const containerRef = ref(null);
const profileBtnRef = ref(null);

const handleClickOutside = (event) => {
    const clickedInsideContainer = containerRef.value?.contains(event.target);
    const clickedOnButton = profileBtnRef.value?.contains(event.target);

    if (!clickedInsideContainer && !clickedOnButton) {
        isDisplayDrop.value = false;
    }
};

onMounted(() => {
    document.addEventListener("mousedown", handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener('mousedown', handleClickOutside);
});
</script>

<template>
    <div class="profile-details">
        <div class="profile-details-btn" ref="profileBtnRef" @click="displayDrop">
            <profile-image :alt="username[0]"/>
        </div>
        <div class="profile-details-drop" ref="containerRef" :class="{'active': isDisplayDrop}">
            <div class="username">
                <h6>{{ username }}</h6>
            </div>
            <div class="controls">
                <router-link class="details-item" to="/profile">
                    <f-icon :icon="mdiAccount" size="16"/>
                    {{ t("topBar.profile") }}
                </router-link>
                <router-link class="details-item" to="/settings">
                    <f-icon :icon="mdiCog" size="16"/>
                    {{ t("topBar.settings") }}
                </router-link>
            </div>
            <div class="logout">
                <router-link class="details-item" to="/logout">
                    <f-icon :icon="mdiLogout" size="16"/>
                    {{ t("topBar.logout") }}
                </router-link>
            </div>
        </div>
    </div>
</template>

<style scoped>
.profile-details {
    position: relative;
}

.profile-details-btn {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: var(--radius-full);
    color: var(--color-primary);
    border: 2px solid transparent;
    transition: all var(--transition-base);
}

.profile-details-btn:hover {
    cursor: pointer;
    border-color: var(--color-primary);
}

.profile-details-drop {
    min-width: 10rem;
    position: absolute;
    top: 44px;
    right: 0;
    display: none;
    flex-direction: column;
    background-color: var(--surface);
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-primary);
    z-index: 1;
}

.profile-details-drop.active {
    display: flex;
}

.username {
    padding: var(--spacing-xs) var(--spacing-md);
    border-bottom: 1px solid var(--border-color);
}

.controls {
    padding: var(--spacing-sm);
    border-bottom: 1px solid var(--border-color);
    color: var(--text-color-secondary);
    display: flex;
    flex-direction: column;
    gap: .2rem;
}

.logout {
    padding: var(--spacing-sm);
    color: var(--text-color-secondary);
}

.details-item {
    display: flex;
    align-items: center;
    padding: var(--spacing-xs) var(--spacing-sm);
    gap: .2rem;
    width: 100%;
    border-radius: var(--radius-sm);
    transition: background-color .2s;
}

.details-item:hover {
    background-color: var(--bg-color-hover);
    transition: background-color .2s;
}
</style>
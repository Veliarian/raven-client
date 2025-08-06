<script setup>
import {useI18n} from "vue-i18n";
import {
    mdiBookOpenBlankVariantOutline,
    mdiCalendarMonth,
    mdiFolderOutline,
    mdiHomeOutline,
    mdiNoteOutline,
    mdiVideoOutline
} from "@mdi/js";
import {Icon as FIcon} from "@uikit";

const {t, locale} = useI18n();

</script>

<template>
    <div class="sidebar">
        <div class="sidebar-content">
            <div class="sidebar-header">
                <img src="/raven_logo.svg" alt="R" class="logo"/>
                <h1 class="logo-text">aven</h1>
            </div>
            <nav class="sidebar-body">
                <div class="sidebar-list">
                    <router-link class="sidebar-list-item" exact-active-class="active" to="/">
                        <f-icon :icon="mdiHomeOutline"/>
                        <span class="sidebar-list-item-text">{{ t("sidebar.dashboard") }}</span>
                    </router-link>
                    <router-link class="sidebar-list-item" exact-active-class="active" to="/schedule">
                        <f-icon :icon="mdiCalendarMonth"/>
                        <span class="sidebar-list-item-text">{{ t("sidebar.schedule") }}</span>
                    </router-link>
                    <router-link class="sidebar-list-item" exact-active-class="active" to="/lessons">
                        <f-icon :icon="mdiBookOpenBlankVariantOutline"/>
                        <span class="sidebar-list-item-text">{{ t("sidebar.lessons") }}</span>
                    </router-link>
                    <router-link class="sidebar-list-item" exact-active-class="active" to="/materials">
                        <f-icon :icon="mdiFolderOutline"/>
                        <span class="sidebar-list-item-text">{{ t("sidebar.materials") }}</span>
                    </router-link>
                    <router-link class="sidebar-list-item" exact-active-class="active" to="/meetings">
                        <f-icon :icon="mdiVideoOutline"/>
                        <span class="sidebar-list-item-text">{{ t("sidebar.meetings") }}</span>
                    </router-link>
                    <router-link class="sidebar-list-item" exact-active-class="active" to="/notes">
                        <f-icon :icon="mdiNoteOutline"/>
                        <span class="sidebar-list-item-text">{{ t("sidebar.notes") }}</span>
                    </router-link>
                </div>
            </nav>
            <div class="sidebar-footer"></div>
        </div>
    </div>
</template>

<style scoped>
.sidebar {
    width: 16rem;
    height: 100vh;
    z-index: 50;
    background: var(--background);
    border-right: 2px solid var(--border-color);
}

.sidebar-content {
    height: 100%;
    display: flex;
    flex-direction: column;
}

.sidebar-header {
    padding: 1rem;
    display: flex;
    align-items: baseline;
    justify-content: center;
}

.logo {
    height: 2.5rem;
}

.logo-text{
    font-size: 2.5rem;
    color: var(--color-primary);
}

.sidebar-body {
    padding: 0 .75rem 1.5rem .75rem;
    flex: 1 1 0;
}

.sidebar-footer {
    padding: 1rem;
}

.sidebar-list{
    display: flex;
    flex-direction: column;
    gap: .125rem;
}

.sidebar-list-item {
    padding: .5rem .75rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    border-radius: var(--radius-lg);
    color: var(--text-color-secondary);
}

.sidebar-list-item:hover {
    background: var(--color-primary-light);
}

.sidebar-list-item.active {
    background: var(--color-primary);
    color: var(--control-color-light);
}
</style>
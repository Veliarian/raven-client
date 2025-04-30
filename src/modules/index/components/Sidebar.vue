<script setup>
import {useI18n} from "vue-i18n";
import Icon from "@/shared/components/Icon.vue";
import {
    mdiBookOpenBlankVariantOutline,
    mdiCalendarMonth,
    mdiFolderOutline,
    mdiHomeOutline
} from "@mdi/js";

const { t, locale } = useI18n();


</script>

<template>
    <div class="sidebar">
        <div class="sidebar-content">
            <div class="sidebar-header"></div>
            <nav class="sidebar-body">
                <div class="sidebar-list">
                    <router-link class="sidebar-list-item" exact-active-class="active" to="/">
                        <Icon :icon="mdiHomeOutline"/>
                        <span class="sidebar-list-item-text">{{ t("sidebar.dashboard") }}</span>
                    </router-link>
                    <router-link class="sidebar-list-item" exact-active-class="active" to="/schedule">
                        <Icon :icon="mdiCalendarMonth"/>
                        <span class="sidebar-list-item-text">{{ t("sidebar.schedule") }}</span>
                    </router-link>
                    <router-link class="sidebar-list-item" exact-active-class="active" to="/lessons">
                        <Icon :icon="mdiBookOpenBlankVariantOutline"/>
                        <span class="sidebar-list-item-text">{{ t("sidebar.lessons") }}</span>
                    </router-link>
                    <router-link class="sidebar-list-item" exact-active-class="active" to="/materials">
                        <Icon :icon="mdiFolderOutline"/>
                        <span class="sidebar-list-item-text">{{ t("sidebar.materials") }}</span>
                    </router-link>
                </div>
            </nav>
            <div class="sidebar-footer"></div>
        </div>
    </div>
</template>

<style scoped>
.sidebar{
    width: 16rem;
    height: 100vh;
    z-index: 50;
    background: var(--background);
    border-right: 2px solid var(--border-color);
}

.sidebar-content{
    height: 100%;
    display: flex;
    flex-direction: column;
}

.sidebar-header{
    padding: 1rem;
}

.sidebar-body{
    padding: 1.5rem .75rem;
    flex: 1 1 0;
}

.sidebar-footer{
    padding: 1rem;
}

.sidebar-list-item{
    padding: .75rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    border-radius: 1.5rem;
    color: var(--text-color-secondary);
    margin-bottom: .2rem;
}

.sidebar-list-item:hover{
    background: var(--color-green-light);
}

.sidebar-list-item.active{
    background: var(--color-green);
    color: var(--text-color-light);
}
</style>
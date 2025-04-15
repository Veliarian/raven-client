<script setup>

import {useI18n} from "vue-i18n";
import Icon from "@/shared/components/Icon.vue";
import {
    mdiBookOpenBlankVariantOutline,
    mdiCalendarMonth,
    mdiChatOutline,
    mdiFolderOutline, mdiVectorSquareEdit,
    mdiVideoOutline
} from "@mdi/js";
import MiniCard from "@/shared/components/MiniCard.vue";

const {t} = useI18n();

</script>

<template>
    <div class="dashboard-view">
        <header class="dashboard-header">
            <h1>{{ t("dashboard.header") }}</h1>
            <button class="start-lesson-btn">
                <Icon :icon="mdiVideoOutline"/>
                <span>
                    {{ t("dashboard.startClass") }}
                </span>
            </button>
        </header>
        <main class="dashboard-main">
            <div class="quick-links">
                <router-link class="quick-link" to="/schedule">
                    <MiniCard class="schedule" :icon="mdiCalendarMonth"
                              :title="t('sidebar.schedule')"
                              :sub="t('sidebar.scheduleAdditional')"
                              color="#7dae78"/>
                </router-link>
                <router-link class="quick-link" to="/lessons">
                    <MiniCard :icon="mdiBookOpenBlankVariantOutline"
                              :title="t('sidebar.lessons')"
                              :sub="t('sidebar.lessonsAdditional')"
                              color="#ffcf47"/>
                </router-link>
                <router-link class="quick-link" to="/materials">
                    <MiniCard :icon="mdiFolderOutline"
                              :title="t('sidebar.materials')"
                              :sub="t('sidebar.materialsAdditional')"
                              color="#edaaca"/>
                </router-link>
                <router-link class="quick-link" to="/chat">
                    <MiniCard :icon="mdiChatOutline"
                              :title="t('sidebar.chat')"
                              :sub="t('sidebar.chatAdditional')"
                              color="#b0ceea"/>
                </router-link>
                <router-link class="quick-link" to="/whiteboard">
                    <MiniCard :icon="mdiVectorSquareEdit"
                              :title="t('sidebar.materials')"
                              :sub="t('sidebar.materialsAdditional')"
                              color="#7dae78"/>
                </router-link>
            </div>
        </main>
    </div>
</template>

<style scoped>
.dashboard-view{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.dashboard-header{
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.dashboard-main{
    display: flex;
    flex-direction: column;
}

.quick-links{
    display: flex;
    gap: 1rem;
}

.quick-link{
    width: 100%;
    height: 100%;
}
</style>
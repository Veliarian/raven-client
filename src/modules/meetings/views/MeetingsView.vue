<script setup>

import {useI18n} from "vue-i18n";
import Icon from "@/shared/components/icons/Icon.vue";
import {mdiCalendarMonthOutline, mdiVideoOutline} from "@mdi/js";
import MultiButton from "@/shared/components/MultiButton.vue";

const i18n = useI18n();
const {t} = i18n;

</script>

<template>
<div class="view">
    <header class="view-header">
        <div class="title-box">
            <h3>{{ t("pages.meetings.title") }}</h3>
            <p class="subtitle">{{ t("pages.meetings.subtitle") }}</p>
        </div>
        <button>
            <Icon :icon="mdiVideoOutline"/>
            <span>{{ t("pages.meetings.controls.createRoom") }}</span>
        </button>
    </header>
    <main>
        <multi-button>
            <button>
                <Icon :icon="mdiVideoOutline"/>
                <span>Rooms</span>
            </button>
            <button>
                <Icon :icon="mdiCalendarMonthOutline"/>
                <span>Scheduled</span>
            </button>
        </multi-button>


    </main>
</div>
</template>

<style scoped>

</style>
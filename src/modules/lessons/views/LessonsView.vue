<script setup>

import {useI18n} from "vue-i18n";
import Icon from "../../../shared/components/Icon.vue";
import {mdiPlus} from "@mdi/js";

const { t, locale } = useI18n();
</script>

<template>
    <div class="lessons-view">
        <header>
            <h1>{{ t("lessons.header") }}</h1>
            <button>
                <Icon :icon="mdiPlus" :size="19" />
                {{ t("lessons.createLessonBtn") }}
            </button>
        </header>
        <main></main>
    </div>
</template>

<style scoped>
    .lessons-view{
        width: 100%;
        height: 100%;
    }

    header{
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    button{
        display: flex;
        align-items: center;
        gap: .2rem;
        background-color: var(--green);
        color: var(--text-color-contrast);
        border: none;
        padding: .5rem;
        border-radius: 1.2rem;
    }

    button:hover{
        cursor: pointer;
    }
</style>
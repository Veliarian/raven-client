<script setup>

import {useI18n} from "vue-i18n";
import {mdiEarth, mdiPen, mdiPlus, mdiTextBoxMultiple} from "@mdi/js";
import {computed, onMounted, ref} from "vue";
import {useLessonsStore} from "@/modules/lessons/store/lessonsStore.js";
import {FButton, FHorizontalSelect, FSearchInput, FTitle} from "@uikit";
import LessonEditor from "@/modules/lessons/components/LessonEditor.vue";

const {t} = useI18n();
const lessonsStore = useLessonsStore();

const isCreating = ref(false);

function startCreating() {
    isCreating.value = true;
}

function cancelCreating() {
    isCreating.value = false;
}

const lessons = computed(() => lessonsStore.lessons);

const lessonsType = ref("all");
const editingLessonId = ref(null);
const editableLesson = ref(null);

const selectLessonsType = (type) => {
    if (lessonsType.value !== type) {
        lessonsType.value = type;
    }
}

function startEditing(lesson) {
    editingLessonId.value = lesson.id;
    editableLesson.value = {...lesson};
}

function cancelEditing() {
    editingLessonId.value = null;
    editableLesson.value = null;
}

onMounted(() => {
    lessonsStore.fetchLessonsIfNeeded();
});
</script>

<template>
    <div class="lessons-view" v-if="!isCreating">
        <f-title :title="t('lessons.header')">
            <f-button :icon="mdiPlus" @click="startCreating">{{ t("lessons.createLessonBtn") }}</f-button>
        </f-title>
        <main class="lessons-main">
            <div class="lessons-filters">
                <div class="lessons-filters-item">
                    <f-search-input :placeholder="t('lessons.search')"/>
                </div>
                <div class="lessons-filters-item">
                    <f-horizontal-select
                        v-model="lessonsType"
                        :options="[
                          { id: 'all', icon: mdiTextBoxMultiple, label: 'All'},
                          { id: 'pub', icon: mdiEarth, label: 'Published' },
                          { id: 'draft', icon: mdiPen, label: 'Drafts'}
                        ]"
                    />
                </div>
            </div>
            <div class="lessons-list">

            </div>
        </main>
    </div>

    <lesson-editor v-else @cancel="cancelCreating"/>
</template>

<style scoped>
.lessons-view {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.lessons-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.lessons-main {
    display: flex;
    flex-direction: column;
}

.lessons-filters {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.lessons-filters-item {
    display: flex;
}

.lessons-list {
    display: flex;
}
</style>
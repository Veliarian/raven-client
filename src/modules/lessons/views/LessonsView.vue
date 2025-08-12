<script setup>

import {useI18n} from "vue-i18n";
import Icon from "@/shared/components/Icon.vue";
import {mdiClock, mdiEarth, mdiPen, mdiPlus, mdiPublish, mdiShare, mdiTextBoxMultiple} from "@mdi/js";
import SearchInput from "@/shared/components/SearchInput.vue";
import MultiButton from "@/shared/components/MultiButton.vue";
import {computed, onMounted, ref} from "vue";
import {useLessonsStore} from "@/modules/lessons/store/lessonsStore.js";
import CreateLessonForm from "@/modules/lessons/components/CreateLessonForm.vue";
import {FButton, FHorizontalSelect, FSearchInput, FTitle} from "@uikit";

const {t} = useI18n();
const lessonsStore = useLessonsStore();

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
    <div class="lessons-view">
        <f-title :title="t('lessons.header')">
            <f-button :icon="mdiPlus">{{ t("lessons.createLessonBtn") }}</f-button>
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

<!--    <create-lesson-form/>-->
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
<script setup>

import {useI18n} from "vue-i18n";
import Icon from "@/shared/components/Icon.vue";
import {mdiPlus} from "@mdi/js";
import SearchInput from "@/shared/components/SearchInput.vue";
import MultiButton from "@/shared/components/MultiButton.vue";
import {computed, onMounted, ref} from "vue";
import {useLessonsStore} from "@/modules/lessons/store/lessonsStore.js";
import CreateLessonForm from "@/modules/lessons/components/CreateLessonForm.vue";

const {t} = useI18n();
const lessonsStore = useLessonsStore();

const lessons = computed(() => lessonsStore.lessons);

console.log(lessons[0]);

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
        <header class="lessons-header">
            <h1>{{ t("lessons.header") }}</h1>
            <button>
                <Icon :icon="mdiPlus"/>
                {{ t("lessons.createLessonBtn") }}
            </button>
        </header>
        <main class="lessons-main">
            <div class="lessons-filters">
                <div class="lessons-filters-item">
                    <SearchInput :placeholder="t('lessons.search')"/>
                </div>
                <div class="lessons-filters-item">
                    <multi-button>
                        <button :class="{'active': lessonsType === 'all'}" @click="selectLessonsType('all')">
                            {{ t('lessons.filters.all') }}
                        </button>
                        <button :class="{'active': lessonsType === 'pub'}" @click="selectLessonsType('pub')">
                            {{ t('lessons.filters.publish') }}
                        </button>
                        <button :class="{'active': lessonsType === 'dr'}" @click="selectLessonsType('dr')">
                            {{ t('lessons.filters.draft') }}
                        </button>
                    </multi-button>
                </div>
            </div>
            <div class="lessons-list">

            </div>
        </main>
    </div>

    <create-lesson-form/>
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
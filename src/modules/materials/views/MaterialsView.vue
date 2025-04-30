<script setup>
import {computed, onMounted, ref} from "vue";
import {useI18n} from "vue-i18n";
import {
    mdiFileDocumentOutline,
    mdiFileOutline,
    mdiImageOutline, mdiTrayArrowUp,
    mdiVideoOutline
} from "@mdi/js";
import SearchInput from "@/shared/components/SearchInput.vue";
import MultiButton from "@/shared/components/MultiButton.vue";
import MiniCard from "@/shared/components/MiniCard.vue";
import {useMediaFilesStore} from "@/modules/materials/store/mediaFilesStore.js";
import UploadFileForm from "@/modules/materials/components/UploadFileForm.vue";
import Icon from "@/shared/components/Icon.vue";
import MaterialsTable from "@/modules/materials/components/MaterialsTable.vue";

const {t} = useI18n();

const mediaFilesStore = useMediaFilesStore();
const mediaFiles = computed(() => mediaFilesStore.mediaFiles);

const materialsType = ref("all");
const isOpenForms = ref(false);
const isOpenUploadFileForm = ref(false);

const selectMaterialsType = (type) => {
    if (materialsType.value !== type) {
        materialsType.value = type;
    }
};

const openUploadFileForm = () => {
    isOpenForms.value = true;
    isOpenUploadFileForm.value = true;
}

const closeUploadFileForm = () => {
    isOpenForms.value = false;
    isOpenUploadFileForm.value = false;
}

onMounted(() => {
    mediaFilesStore.fetchMediaFiles();
});
</script>

<template>
    <div class="materials-view">
        <header class="materials-header">
            <div class="materials-header-title-box">
                <h1 class="header-title">{{ t("materials.title") }}</h1>
                <p class="header-subtitle">{{ t("materials.subtitle") }}</p>
            </div>
            <button @click="openUploadFileForm">
                <Icon :icon="mdiTrayArrowUp"/>
                {{ t("materials.controls.upload") }}
            </button>
        </header>
        <main class="materials-main">
            <div class="materials-filters">
                <div class="materials-filters-item">
                    <SearchInput :placeholder="t('materials.controls.search')"/>
                </div>

                <div class="materials-filters-item">
                    <multi-button>
                        <button :class="{'active': materialsType === 'all'}" @click="selectMaterialsType('all')">
                            {{ t('materials.controls.all') }}
                        </button>
                        <button :class="{'active': materialsType === 'rec'}" @click="selectMaterialsType('rec')">
                            {{ t('materials.controls.recent') }}
                        </button>
                    </multi-button>
                </div>

                <h4>{{ t("materials.overview") }}</h4>

                <div class="materials-filters-item cards-box">
                    <MiniCard class="type-card"
                              :icon="mdiImageOutline"
                              :title="t('materials.controls.images')"
                              sub="123 files"
                              color="#ffcf47"
                    />
                    <MiniCard class="type-card"
                              :icon="mdiVideoOutline"
                              :title="t('materials.controls.videos')"
                              sub="123 files"
                              color="#edaaca"
                    />
                    <MiniCard class="type-card"
                              :icon="mdiFileDocumentOutline"
                              :title="t('materials.controls.documents')"
                              sub="123 files"
                              color="#7dae78"
                    />
                    <MiniCard class="type-card"
                              :icon="mdiFileOutline"
                              :title="t('materials.controls.others')"
                              sub="123 files"
                              color="#b0ceea"
                    />
                </div>
            </div>

            <h4>{{ t("materials.all") }}</h4>

            <MaterialsTable :files="mediaFiles"/>
        </main>
    </div>

    <div class="forms-container" v-if="isOpenForms">
        <UploadFileForm v-if="isOpenUploadFileForm" @close-form="closeUploadFileForm"/>
    </div>
</template>

<style scoped>
.materials-view {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.materials-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.header-subtitle {
    color: var(--text-color-secondary);
}

.materials-main {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.materials-filters {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.materials-filters-item {
    display: flex;
}

.materials-filters-item.cards-box {
    gap: 1rem;
}

.type-card {
    width: 100%;
    height: 100%;
}

.forms-container{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--background-opacity);
}
</style>
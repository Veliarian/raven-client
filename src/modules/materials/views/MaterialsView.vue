<script setup>
import {computed, onMounted, ref} from "vue";
import {useI18n} from "vue-i18n";
import {
    mdiClock,
    mdiFileDocumentOutline,
    mdiFileMultiple,
    mdiFileOutline,
    mdiFilter,
    mdiImageOutline,
    mdiShare,
    mdiTrayArrowUp,
    mdiVideoOutline
} from "@mdi/js";
import {useMediaFilesStore} from "@/modules/materials/store/mediaFilesStore.js";
import UploadFileForm from "@/modules/materials/components/UploadFileForm.vue";
import {FButton, FCard, FFilterParamsContainer, FHorizontalSelect, FSearchInput, FTable, FTitle} from "@uikit";
import FSwitch from "../../../uikit/components/FSwitch.vue";
import FileIcon from "@/shared/components/icons/FileIcon.vue";
import MaterialsTable from "@/modules/materials/components/MaterialsTable.vue";

const {t} = useI18n();

const mediaFilesStore = useMediaFilesStore();
const mediaFiles = computed(() => mediaFilesStore.mediaFiles);

const formatFileSize = (bytes) => {
    const sizes = ['B', 'KB', 'MB', 'GB']
    if (bytes === 0) return '0 B'
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i]
}

const fileFilters = ref({
    name: "",
    type: [],
    viewType: "all",
    storedDate: null,
});

const handleAddFilter = (filter) => {
    if (!fileFilters.value.type.find(f => f === filter)) {
        fileFilters.value.type = [...fileFilters.value.type, filter];
    }
}

const handleDeleteFilterType = (filter) => {
    fileFilters.value.type = fileFilters.value.type.filter(f => f !== filter);
}

const isOpenUploadFileForm = ref(false);

const handleShowUploadFileForm = () => {
    isOpenUploadFileForm.value = !isOpenUploadFileForm.value;
}

onMounted(() => {
    mediaFilesStore.fetchMediaFiles();
});
</script>

<template>
    <div class="materials-view">
        <f-title :title="t('materials.title')" :subtitle="t('materials.subtitle')">
            <f-button :icon="mdiTrayArrowUp" @click="handleShowUploadFileForm">
                {{ t("materials.controls.upload") }}
            </f-button>
        </f-title>
        <main class="materials-main">
            <div class="material-filters">
                <div class="material-filters-item">
                    <f-search-input placeholder="Type for search your files..." v-model="fileFilters.name"/>
                    {{ fileFilters.name }}
                    <f-button :icon="mdiFilter">Filter</f-button>
                </div>

                <div v-if="fileFilters.type.length > 0" class="material-filters-item">
                    <f-filter-params-container :filters="fileFilters.type" @delete="handleDeleteFilterType"/>
                </div>

                <div class="material-filters-item">
                    <f-horizontal-select
                        v-model="fileFilters.viewType"
                        :options="[
                          { id: 'all', icon: mdiFileMultiple, label: 'All'},
                          { id: 'rec', icon: mdiClock, label: 'Recent' },
                          { id: 'share', icon: mdiShare, label: 'Share with me'}
                        ]"
                    />
                </div>

                <h4>{{ t("materials.overview") }}</h4>

                <div class="material-filters-item cards-box">
                    <f-card
                        title="Images"
                        sub="123 files"
                        :icon="mdiImageOutline"
                        color="#31A8FF"
                        @click="handleAddFilter('Images')"
                    />
                    <f-card
                        title="Videos"
                        sub="123 files"
                        :icon="mdiVideoOutline"
                        color="#f5c518"
                        @click="handleAddFilter('Videos')"
                    />
                    <f-card
                        title="Documents"
                        sub="123 files"
                        :icon="mdiFileDocumentOutline"
                        color="#2b579a"
                        @click="handleAddFilter('Documents')"
                    />
                    <f-card
                        title="Others"
                        sub="123 files"
                        :icon="mdiFileOutline"
                        color="#999999"
                        @click="handleAddFilter('Others')"
                    />
                </div>
            </div>

            <h4>{{ t("materials.all") }}</h4>

            <materials-table :files="mediaFiles"/>
        </main>
    </div>

    <upload-file-form v-if="isOpenUploadFileForm" @close-form="handleShowUploadFileForm"/>
</template>

<style scoped>
.materials-view {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
}

.materials-main {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
}

.material-filters {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
}

.material-filters-item {
    display: flex;
    gap: var(--spacing-md);
}

.material-filters-item.cards-box {
    gap: 1rem;
}

.type-card {
    width: 100%;
    height: 100%;
}
</style>
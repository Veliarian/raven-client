<script setup>
import {computed, onMounted, ref, watch} from "vue";
import {useI18n} from "vue-i18n";
import {mdiClock, mdiFileDocumentOutline, mdiFileOutline, mdiFilter, mdiImageOutline, mdiShare, mdiTrayArrowUp, mdiVideoOutline, mdiFileMultiple} from "@mdi/js";
import {useMediaFilesStore} from "@/modules/materials/store/mediaFilesStore.js";
import UploadFileForm from "@/modules/materials/components/UploadFileForm.vue";
import {FButton, FCard, FFilterParamsContainer, FHorizontalSelect, FSearchInput, FTitle} from "@uikit";
import MaterialsTable from "@/modules/materials/components/MaterialsTable.vue";

const {t} = useI18n();

const mediaFilesStore = useMediaFilesStore();
const mediaFiles = computed(() => mediaFilesStore.mediaFiles);

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

const fileTypes = ref([]); // [{type: "Document", count: 7}]
const typeMap = {
    IMAGE: "Images",
    VIDEO: "Videos",
    AUDIO: "Others",
    WORD: "Documents",
    EXCEL: "Documents",
    POWERPOINT: "Documents",
    PDF: "Documents",
    DOCUMENT: "Documents",
    RECORDING: "Others",
    AVATAR: "Others",
    OTHER: "Others"
};

const updateFileTypes = () => {
    const counts = {};

    for (const file of mediaFiles.value) {
        const category = typeMap[file.mediaType] || "Others";
        counts[category] = (counts[category] || 0) + 1;
    }

    fileTypes.value = Object.entries(counts).map(([type, count]) => ({
        type,
        count
    }));
}

watch(mediaFiles, updateFileTypes, { deep: true });

const filteredFiles = computed(() => {
    return mediaFiles.value.filter(file => {
        // Фільтр по назві
        const matchName = fileFilters.value.name
            ? file.originalName.toLowerCase().includes(fileFilters.value.name.toLowerCase())
            : true;

        // Фільтр по типу
        const matchType = fileFilters.value.type.length
            ? fileFilters.value.type.includes(typeMap[file.mediaType] || "Others")
            : true;

        return matchName && matchType;
    });
});

const isOpenUploadFileForm = ref(false);

const handleShowUploadFileForm = () => {
    isOpenUploadFileForm.value = !isOpenUploadFileForm.value;
}

onMounted(() => {
    mediaFilesStore.fetchMediaFiles();
});
</script>

<template>
    <div class="full-view">
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
                        :sub="`${fileTypes.find(t => t.type === 'Images')?.count || 0} files`"
                        :icon="mdiImageOutline"
                        color="#31A8FF"
                        @click="handleAddFilter('Images')"
                    />
                    <f-card
                        title="Videos"
                        :sub="`${fileTypes.find(t => t.type === 'Videos')?.count || 0} files`"
                        :icon="mdiVideoOutline"
                        color="#f5c518"
                        @click="handleAddFilter('Videos')"
                    />
                    <f-card
                        title="Documents"
                        :sub="`${fileTypes.find(t => t.type === 'Documents')?.count || 0} files`"
                        :icon="mdiFileDocumentOutline"
                        color="#2b579a"
                        @click="handleAddFilter('Documents')"
                    />
                    <f-card
                        title="Others"
                        :sub="`${fileTypes.find(t => t.type === 'Others')?.count || 0} files`"
                        :icon="mdiFileOutline"
                        color="#999999"
                        @click="handleAddFilter('Others')"
                    />
                </div>
            </div>

            <h4>{{ t("materials.all") }}</h4>

            <materials-table :files="filteredFiles"/>
        </main>
    </div>

    <upload-file-form v-if="isOpenUploadFileForm" @close-form="handleShowUploadFileForm"/>
</template>

<style scoped>
.materials-main {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
}

.material-filters {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
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
<script setup>
import FSwitch from "@uikit/components/FSwitch.vue";
import FileIcon from "@/shared/components/icons/FileIcon.vue";
import {FButton, FConfirmDialog, FTable} from "@uikit";
import FActionsButton from "@uikit/components/buttons/FActionsButton.vue";
import {mdiLink, mdiPencil, mdiShare, mdiTrashCan} from "@mdi/js";
import {capitalize} from "@/shared/utils/string.js";
import {useMediaFilesStore} from "@/modules/materials/store/mediaFilesStore.js";
import {ref} from "vue";
import {formatDate} from "../../../shared/utils/dateUtils.js";

const props = defineProps({
    files: {
        type: Array,
        default: []
    }
});

const columns = [
    {key: 'originalName', label: 'Name', sortable: true, width: '20rem'},
    {key: 'mediaType', label: "Type", sortable: true},
    {key: 'size', label: 'Size', sortable: true},
    {key: 'uploadedAt', label: 'Last Modified', sortable: true},
    {key: 'isPublic', label: 'Public', sortable: false},
    {key: 'actions', label: ''}
];

const formatFileSize = (bytes) => {
    const sizes = ['B', 'KB', 'MB', 'GB']
    if (bytes === 0) return '0 B'
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i]
}

const mediaFilesStore = useMediaFilesStore();
const confirmDialog = ref(null);

const handleMoveToTrash = async (id, inTrash) => {
    const message = inTrash
        ? "Remove from basket permanently?"
        : "Move file to trash?";

    if (await confirmDialog.value.show(message)) {
        return inTrash
            ? mediaFilesStore.deleteFile(id)
            : mediaFilesStore.moveToTrash(id);
    }
};

</script>

<template>
    <f-table :columns="columns" :rows="files" class="materials-table" :initial-sort="{ key: 'uploadedAt', dir: 'desc' }" :page-size="6">
        <template #cell-originalName="{ row }">
            <div class="col-name">
                <file-icon :type="row.mediaType"/>
                <span class="file-name">{{ row.originalName }}</span>
            </div>
        </template>
        <template #cell-mediaType="{ row }">
            <span class="media-type">{{ capitalize(row.mediaType) }}</span>
        </template>
        <template #cell-size="{ row }">
            {{ formatFileSize(row.size) }}
        </template>
        <template #cell-uploadedAt="{ row }">
            {{ formatDate(row.uploadedAt) }}
        </template>
        <template #cell-isPublic="{ row }">
            <f-switch :checked="row.isPublic"/>
        </template>
        <template #cell-actions="{ row }">
            <f-actions-button>
                <f-button size="sm" type="option" :icon="mdiPencil">Edit</f-button>
                <f-button size="sm" type="option" :icon="mdiLink">Attach</f-button>
                <f-button size="sm" type="option" :icon="mdiShare">Share</f-button>
                <f-button size="sm" type="option" :icon="mdiTrashCan" @click="handleMoveToTrash(row.id, row.inTrash)">Delete</f-button>
            </f-actions-button>
        </template>
    </f-table>

    <f-confirm-dialog ref="confirmDialog"/>
</template>


<style>
.col-name {
    max-width: 20rem;
    width: 100%;
    display: flex;
    align-items: center;
    gap: .5rem;
}

.file-name {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.media-type {
    font-size: var(--font-size-sm);
}
</style>
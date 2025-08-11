<script setup>
import {computed, ref} from "vue";
import FSwitch from "@uikit/components/FSwitch.vue";
import {useColorUtils} from "@/shared/utils/colorUtils.js";
import FileIcon from "@/shared/components/icons/FileIcon.vue";
import {FTable} from "@uikit";

const props = defineProps({
    files: {
        type: Array,
        default: []
    }
});

const columns = [
    {key: 'originalName', label: 'Name', sortable: true, class: 'col-name'},
    {key: 'size', label: 'Size', sortable: true},
    {key: 'uploadedAt', label: 'Last Modified', sortable: true},
    {key: 'isPublic', label: 'Public', sortable: false}
];


const formatFileSize = (bytes) => {
    const sizes = ['B', 'KB', 'MB', 'GB']
    if (bytes === 0) return '0 B'
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i]
}


function formatDate(date) {
    const d = new Date(date);

    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Місяці від 0 до 11
    const year = d.getFullYear();

    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');

    return `${day}.${month}.${year} ${hours}:${minutes}`;
}
</script>

<template>
    <f-table :columns="columns" :rows="files">
        <template #cell-originalName="{ row }">
            <file-icon :type="row.mediaType"/>
            <span>{{ row.originalName }}</span>
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
    </f-table>
</template>

<style scoped>
.col-name {
    max-width: 20rem;
}

.materials-table {
    max-height: 24rem;
    border: 2px solid var(--border-color);
    border-radius: .75rem;
    overflow: hidden;
}

.scroll-box {
    width: 100%;
    height: 100%;
    overflow-y: auto;
}

.files-table {
    width: 100%;
    text-indent: 0;
    border-collapse: collapse;
    border-spacing: 0;
}

thead {
    position: sticky;
    top: 0;
    background-color: var(--background);
    z-index: 1;
}

th {
    font-weight: 500;
    text-align: start;
    padding: .75rem 1rem;
}

tr {
    border-bottom: 1px solid var(--border-color);
}

td {
    padding: .75rem 1rem;
}

tbody tr:last-child td {
    border-bottom: none;
}

td.name {
    max-width: 20rem;
}

.file-info {
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

.options {

}
</style>
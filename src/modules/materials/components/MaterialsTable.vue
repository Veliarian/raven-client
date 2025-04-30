<script setup>
import {computed, ref} from "vue";
import SortIcon from "@/shared/components/SortIcon.vue";
import Icon from "@/shared/components/Icon.vue";
import {
    mdiFileDocumentOutline,
    mdiFileOutline,
    mdiImageOutline,
    mdiMusicNoteOutline,
    mdiPresentation,
    mdiVideoOutline
} from "@mdi/js";

const props = defineProps({
    files: {
        type: Array,
        default: []
    }
});

const sort = ref({key: "name", asc: true});

const sortedFiles = computed(() => {
    return [...props.files].sort((a, b) => {
        const aVal = a[sort.value.key]
        const bVal = b[sort.value.key]
        if (aVal < bVal) return sort.value.asc ? -1 : 1
        if (aVal > bVal) return sort.value.asc ? 1 : -1
        return 0
    })
})

const sortBy = (key) => {
    if (sort.value.key === key) {
        sort.value.asc = !sort.value.asc
    } else {
        sort.value.key = key
        sort.value.asc = true
    }
}

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

const getFileIcon = (mediaType) => {
    switch (mediaType){
        case "IMAGE": return mdiImageOutline;
        case "VIDEO": return mdiVideoOutline;
        case "AUDIO": return mdiMusicNoteOutline;
        case "DOCUMENT": return mdiFileDocumentOutline;
        case "PRESENTATION": return mdiPresentation;
        default: return mdiFileOutline;
    }
}
</script>

<template>
    <div class="materials-table">
        <div class="scroll-box">
            <table class="files-table">
                <thead>
                <tr>
                    <th>Name <SortIcon :asc="sort.asc" :active="sort.key === 'originalName'"/></th>
                    <th>Size</th>
                    <th>Last Modified</th>
                    <th>Public</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="file in sortedFiles" :key="file.id">
                    <td class="name"><Icon :icon="getFileIcon(file.mediaType)" :size="20" /> {{ file.originalName }}</td>
                    <td>{{ formatFileSize(file.size) }}</td>
                    <td>{{ formatDate(file.uploadedAt) }}</td>
                    <td></td>
                    <td></td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
.materials-table{
    max-height: 24rem;
    border: 2px solid var(--border-color);
    border-radius: .75rem;
    overflow: hidden;
}

.scroll-box{
    width: 100%;
    height: 100%;
    overflow-y: auto;
}

.files-table{
    width: 100%;
    text-indent: 0;
    border-collapse: collapse;
    border-spacing: 0;
}

thead{
    position: sticky;
    top: 0;
    background-color: var(--background);
}

th {
    font-weight: 500;
    text-align: start;
    padding: .75rem 1rem;
}

tr{
    border-bottom: 1px solid var(--border-color);
}

td {
    padding: .75rem 1rem;
}

td.name{
    max-width: 4rem;
}

tbody tr:last-child td {
    border-bottom: none;
}
</style>
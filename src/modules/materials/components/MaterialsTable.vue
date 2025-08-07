<script setup>
import {computed, ref} from "vue";
import SortIcon from "@/shared/components/SortIcon.vue";
import Icon from "@/shared/components/icons/Icon.vue";
import {
    mdiDotsVertical,
    mdiFileDocumentOutline,
    mdiFileOutline,
    mdiImageOutline,
    mdiMusicNoteOutline, mdiPencil,
    mdiPresentation, mdiTrashCanOutline,
    mdiVideoOutline
} from "@mdi/js";
import FSwitch from "@uikit/components/FSwitch.vue";
import {useColorUtils} from "@/shared/utils/colorUtils.js";
import FileIcon from "@/shared/components/icons/FileIcon.vue";
import OptionsButton from "@/shared/components/buttons/OptionsButton.vue";

const props = defineProps({
    files: {
        type: Array,
        default: []
    }
});

const colorUtils = useColorUtils()

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

const editFile = (id) => {
    console.log(id);
}

const deleteFile = (id) => {

}
</script>

<template>
    <div class="materials-table">
        <div class="scroll-box">
            <table class="files-table">
                <thead>
                <tr>
                    <th>Name
                        <SortIcon :asc="sort.asc" :active="sort.key === 'originalName'"/>
                    </th>
                    <th>Size</th>
                    <th>Last Modified</th>
                    <th>Public</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="file in sortedFiles" :key="file.id">
                    <td class="name">
                        <div class="file-info">
                            <FileIcon :type="file.mediaType"/>
                            <span class="file-name">{{ file.originalName }}</span>
                        </div>
                    </td>
                    <td class="size">{{ formatFileSize(file.size) }}</td>
                    <td class="date">{{ formatDate(file.uploadedAt) }}</td>
                    <td class="public">
                        <FSwitch :checked="file.isPublick"/>
                    </td>
                    <td class="options">
                        <options-button>
                            <button class="" @click="editFile(file.id)">
                                <Icon :icon="mdiPencil" :size="16"/>
                                Edit
                            </button>
                            <button class="delete" @click="deleteFile(file.id)">
                                <Icon :icon="mdiTrashCanOutline" :size="16"/>
                                Delete
                            </button>
                        </options-button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
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
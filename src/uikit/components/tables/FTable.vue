<script setup>
import {computed, ref, toRaw} from 'vue'
import {FButton} from "@uikit";

/**
 * columns: [
 *   { key: 'id', label: 'ID', sortable: true, sortFn: (a,b) => a - b },
 *   { key: 'name', label: 'Name', sortable: true }
 * ]
 *
 * rows: Array of objects
 */

const props = defineProps({
    columns: {
        type: Array,
        required: true
    },
    rows: {
        type: Array,
        required: true
    },
    // initial sort: { key: 'name', dir: 'asc' | 'desc' } or null
    initialSort: {
        type: Object,
        default: null
    },
    // pagination
    pageSize: {
        type: Number,
        default: 0 // 0 => no pagination
    },
    // whether to show header sort UI
    showSortIcons: {
        type: Boolean,
        default: true
    }
})

const emit = defineEmits(['update:sort', 'sort-changed'])

// reactive state
const sortKey = ref(props.initialSort?.key || null)
const sortDir = ref(props.initialSort?.dir || 'asc')

// pagination state
const currentPage = ref(1)

// helper: toggle sort
function toggleSort(col) {
    if (!col.sortable) return
    if (sortKey.value !== col.key) {
        sortKey.value = col.key
        sortDir.value = 'asc'
    } else {
        sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
    }
    currentPage.value = 1
    emit('update:sort', {key: sortKey.value, dir: sortDir.value})
    emit('sort-changed', {key: sortKey.value, dir: sortDir.value})
}

// comparator using column.sortFn if provided or default
function comparator(a, b) {
    const col = props.columns.find(c => c.key === sortKey.value)
    if (!col) return 0
    const aVal = a[sortKey.value]
    const bVal = b[sortKey.value]

    if (typeof col.sortFn === 'function') {
        return col.sortFn(aVal, bVal)
    }

    // default comparison
    if (aVal == null && bVal == null) return 0
    if (aVal == null) return -1
    if (bVal == null) return 1

    // numbers
    if (typeof aVal === 'number' && typeof bVal === 'number') {
        return aVal - bVal
    }

    // date objects
    if (aVal instanceof Date && bVal instanceof Date) {
        return aVal - bVal
    }

    // fallback string compare
    return String(aVal).localeCompare(String(bVal), undefined, {numeric: true, sensitivity: 'base'})
}

const sortedRows = computed(() => {
    if (!sortKey.value) return props.rows.slice()
    // clone raw data to avoid mutating reactive structures
    const raw = toRaw(props.rows) || []
    const arr = raw.slice()
    arr.sort((x, y) => {
        const cmp = comparator(x, y)
        return sortDir.value === 'asc' ? cmp : -cmp
    })
    return arr
})

// pagination computed
const totalPages = computed(() => {
    if (!props.pageSize || props.pageSize <= 0) return 1
    return Math.max(1, Math.ceil(sortedRows.value.length / props.pageSize))
})

const paginatedRows = computed(() => {
    if (!props.pageSize || props.pageSize <= 0) return sortedRows.value
    const start = (currentPage.value - 1) * props.pageSize
    return sortedRows.value.slice(start, start + props.pageSize)
})

function goToPage(n) {
    if (n < 1) n = 1
    if (n > totalPages.value) n = totalPages.value
    currentPage.value = n
}
</script>

<template>
    <div class="f-table">
        <table>
            <thead>
            <tr>
                <th v-for="col in columns"
                    :key="col.key"
                    :class="{ sortable: col.sortable }"
                    @click="toggleSort(col)">
                    <div class="th-content">
                        <span>{{ col.label }}</span>
                        <span v-if="col.sortable && showSortIcons" class="sort-icons">
                            <span v-if="sortKey === col.key">
                                <svg v-if="sortDir === 'asc'" width="12" height="12" viewBox="0 0 24 24" fill="none">
                                    <path d="M6 15l6-6 6 6"
                                          stroke="currentColor"
                                          stroke-width="2"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"/>
                                </svg>
                                <svg v-else width="12" height="12" viewBox="0 0 24 24" fill="none">
                                    <path d="M18 9l-6 6-6-6"
                                          stroke="currentColor"
                                          stroke-width="2"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"/>
                                </svg>
                            </span>
                            <span v-else class="sort-placeholder">
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                                    <path d="M6 9l6 6 6-6"
                                          stroke="currentColor"
                                          stroke-width="1.2"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"/></svg>
                            </span>
                        </span>
                    </div>
                </th>
            </tr>
            </thead>

            <tbody>
            <tr v-for="(row, idx) in paginatedRows" :key="row.id ?? idx">
                <td v-for="col in columns" :key="col.key" :style="{width: col.width}">
                    <!-- specific cell slot: cell-{key} -->
                    <slot :name="'cell-' + col.key" :row="row" :col="col">
                        <!-- fallback universal cell slot -->
                        <slot name="cell" :row="row" :col="col">
                            <!-- default rendering -->
                            <span>{{ row[col.key] }}</span>
                        </slot>
                    </slot>
                </td>
            </tr>

            <!-- empty state -->
            <tr v-if="paginatedRows.length === 0">
                <td :colspan="columns.length" class="empty">No data</td>
            </tr>
            </tbody>
        </table>

        <!-- pagination -->
        <div v-if="pageSize && pageSize > 0" class="pagination">
            <f-button size="sm" @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">Prev</f-button>
            <span>Page {{ currentPage }} / {{ totalPages }}</span>
            <f-button size="sm" @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">Next</f-button>
        </div>
    </div>
</template>

<style scoped>
.f-table {
    width: 100%;
    overflow-x: auto;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
}

table {
    width: 100%;
    border-collapse: collapse;
}

th, td {
    padding: 0.6rem 0.75rem;
    border-bottom: 1px solid var(--border-color);
    text-align: left;
    vertical-align: middle;
    font-size: 0.95rem;
}

th {
    font-weight: var(--font-weight-medium);
    cursor: default;
    user-select: none;
}

th.sortable {
    cursor: pointer;
}

.th-content {
    display: flex;
    gap: 0.5rem;
    align-items: center;
}

.sort-icons {
    display: inline-flex;
    align-items: center;
}

.sort-placeholder svg {
    opacity: 0.35;
}

tbody tr:hover {
    background: rgba(0, 0, 0, 0.02);
}

.empty {
    text-align: center;
    color: var(--text-color-secondary);
    padding: 1.2rem;
}

.pagination {
    padding: var(--spacing-s-m);
    display: flex;
    gap: 0.5rem;
    align-items: center;
    justify-content: flex-end;
}
</style>
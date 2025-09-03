<script setup>
import {computed, ref} from 'vue';
import {mdiClose} from "@mdi/js";
import {FIcon, FInput} from "@uikit";

const props = defineProps({
    users: Array, // всі доступні користувачі
    modelValue: Array, // масив обраних user.id
});

const emit = defineEmits(["update:modelValue"]);

const searchQuery = ref('');

const selectedUsers = computed(() =>
    props.users.filter((user) => props.modelValue.includes(user.id))
);

const availableUsers = computed(() =>
    props.users.filter((user) => !props.modelValue.includes(user.id))
);

const filteredUsers = computed(() => {
    const query = searchQuery.value.trim().toLowerCase();
    if (!query) return availableUsers.value;

    return availableUsers.value.filter((user) =>
        user.username.toLowerCase().includes(query)
    );
});

const addUser = (user) => {
    if (!props.modelValue.includes(user.id)) {
        emit('update:modelValue', [...props.modelValue, user.id]);
        searchQuery.value = ""; // очистити поле пошуку після вибору
    }
};

const removeUser = (user) => {
    emit(
        'update:modelValue',
        props.modelValue.filter((id) => id !== user.id)
    );
};
</script>

<template>
    <div class="multi-select">
        <div v-if="selectedUsers.length > 0" class="selected-items">
            <span
                v-for="user in selectedUsers"
                :key="user.id"
                class="selected-item"
            >
                {{ user.username }}
                <button @click="removeUser(user)" class="remove-btn">
                    <f-icon :icon="mdiClose"/>
                </button>
            </span>
        </div>

        <f-input
            v-model="searchQuery"
            type="text"
            placeholder="Search"
        />

        <ul v-if="filteredUsers.length" class="user-list">
            <li
                v-for="user in filteredUsers"
                :key="user.id"
                @click="addUser(user)"
                class="user-list-item"
            >
                {{ user.username }}
            </li>
        </ul>

        <p v-else class="no-results">Користувачів не знайдено</p>
    </div>
</template>

<style scoped>
.multi-select {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    border: 1px solid var(--color-primary);
    border-radius: calc(var(--radius-lg) + var(--spacing-xs));
    overflow: hidden;
    padding: var(--spacing-xs);
}

.selected-items {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.selected-item {
    background: var(--surface);
    border: 1px solid var(--color-primary);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius-lg);
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: .5rem;
}

.selected-item button {
    border: none;
    background: transparent;
    cursor: pointer;
    color: var(--color-danger);
    padding: 0;
}

.user-list {
    list-style: none;
    margin: 0;
    padding: 0;
    border-radius: var(--radius-sm);
    max-height: 150px;
    overflow-y: auto;
}

.user-list-item {
    padding: 0.5rem;
    cursor: pointer;
    border-radius: var(--radius-lg);
}

.user-list-item:hover {
    background-color: var(--bg-color-hover);
}

.no-results {
    color: #999;
    font-size: 0.9rem;
}
</style>

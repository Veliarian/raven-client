<script setup>
import {computed, ref} from "vue";
import {useRoomsStore} from "@/modules/meetings/store/roomsStore.js";
import UserMultiSelect from "@/shared/components/selects/UserMultiSelect.vue";
import {useUsersStore} from "@/modules/users/store/usersStore.js";
import {FButton, FInput} from "@uikit";
import {mdiClose} from "@mdi/js";

const emit = defineEmits(["close"]);

const roomName = ref("");
const startTime = ref();
const selectedUserIds = ref([]);

const usersStore = useUsersStore();
const allUsers = computed(() => usersStore.allUsers);

const roomsStore = useRoomsStore();
const createRoom = () => {
    roomsStore.createRoom(roomName.value, startTime.value, selectedUserIds.value);
    emit("close");
}
</script>

<template>
<form class="form">
    <header class="form-header">
        <h3>Create new room</h3>
        <f-button :icon="mdiClose" type="transparent" @click.prevent="$emit('close')"/>
    </header>
    <main class="form-main">
        <div class="form-field">
            <label for="room-name">Room name</label>
            <f-input type="text" v-model="roomName" placeholder="Enter room name"/>
        </div>
        <div class="form-field">
            <label for="start-time">Start time</label>
            <f-input type="datetime-local" v-model="startTime"/>
        </div>
        <div class="form-field">
            <label for="users">Select users</label>
            <UserMultiSelect
                :users="allUsers"
                v-model="selectedUserIds"
            />
        </div>
        <f-button size="sm" @click.prevent="createRoom">Create</f-button>
    </main>
</form>
</template>

<style scoped>

</style>
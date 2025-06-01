<script setup>
import CloseButton from "@/shared/components/buttons/CloseButton.vue";
import {ref} from "vue";
import {useRoomsStore} from "@/modules/meetings/store/roomsStore.js";

const roomsStore = useRoomsStore();

const emit = defineEmits(["close"]);

const roomName = ref("");

const createRoom = () => {
    roomsStore.createRoom(roomName.value);
    closeForm();
}

const closeForm = () => {
    emit("close");
}
</script>

<template>
<form class="form create-room-form" @submit.prevent="createRoom">
    <header class="form-header">
        <h3>Create new room</h3>
        <CloseButton/>
    </header>
    <main class="form-main">
        <div class="form-field">
            <label for="room-name">Room name</label>
            <input type="text" v-model="roomName" placeholder="Enter room name">
        </div>
        <button type="submit">Create</button>
    </main>
</form>
</template>

<style scoped>

</style>
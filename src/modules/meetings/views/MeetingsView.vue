<script setup>
import {useI18n} from "vue-i18n";
import {mdiCalendarMonthOutline, mdiVideoOutline} from "@mdi/js";

import Icon from "@/shared/components/icons/Icon.vue";
import MultiButton from "@/shared/components/MultiButton.vue";
import RoomsList from "@/modules/meetings/components/RoomsList.vue";
import RoomCard from "@/modules/meetings/components/RoomCard.vue";
import FormContainer from "@/shared/components/FormContainer.vue";
import CreateRoomForm from "@/modules/meetings/components/CreateRoomForm.vue";
import {computed, onMounted, ref} from "vue";
import {useRoomsStore} from "@/modules/meetings/store/roomsStore.js";
import RoomView from "@/modules/meetings/views/RoomView.vue";
import {useUserStore} from "@/modules/user/store/userStore.js";

const i18n = useI18n();
const {t} = i18n;

const roomsStore = useRoomsStore();
const userStore = useUserStore();

const rooms = computed(() => roomsStore.rooms);

const isOpenedForm = ref(false);
const isOpenedRoomForm = ref(false);
const activeRoom = ref(null);

const openRoomForm = () => {
    isOpenedForm.value = true;
    isOpenedRoomForm.value = true;
}

const closeRoomForm = () => {
    isOpenedForm.value = false;
    isOpenedRoomForm.value = false;
}

const joinRoom = (roomId) => {
    activeRoom.value = rooms.value.find(room => room.id === roomId);
}

const leaveRoom = () => {
    activeRoom.value = null;
}

onMounted(() => {
    roomsStore.fetchRooms();
})
</script>

<template>
    <div v-if="!activeRoom" class="view">
        <header class="view-header">
            <div class="title-box">
                <h3>{{ t("pages.meetings.title") }}</h3>
                <p class="subtitle">{{ t("pages.meetings.subtitle") }}</p>
            </div>
            <button @click="openRoomForm">
                <Icon :icon="mdiVideoOutline"/>
                <span>{{ t("pages.meetings.controls.createRoom") }}</span>
            </button>
        </header>
        <main>
            <multi-button>
                <button>
                    <Icon :icon="mdiVideoOutline"/>
                    <span>Rooms</span>
                </button>
                <button>
                    <Icon :icon="mdiCalendarMonthOutline"/>
                    <span>Scheduled</span>
                </button>
            </multi-button>

            <rooms-list>
                <RoomCard v-for="room in rooms"
                          :name="room.name"
                          :status="room.status"
                          @join-room="joinRoom(room.id)"
                />
<!--                <RoomCard name="Test Room" status="active" :participants="['John', 'Mary']"/>-->
<!--                <RoomCard name="Test Room" status="scheduled" :participants="['John', 'Mary']"/>-->
<!--                <RoomCard name="Test Room" status="active" :participants="['John', 'Mary']"/>-->
<!--                <RoomCard name="Test Room" status="scheduled" :participants="['John', 'Mary']"/>-->
            </rooms-list>
        </main>
    </div>

    <RoomView v-if="activeRoom"
              :room-name="activeRoom.name"
              :participant-name="userStore.user.username"
              @leave-room="leaveRoom"/>

    <form-container v-if="isOpenedForm">
        <CreateRoomForm v-if="isOpenedRoomForm" @close="closeRoomForm"/>
    </form-container>
</template>

<style scoped>

</style>
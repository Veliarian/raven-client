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
import {useUsersStore} from "@/modules/users/store/usersStore.js";

const i18n = useI18n();
const {t} = i18n;

const roomsStore = useRoomsStore();
const usersStore = useUsersStore();

const rooms = computed(() => roomsStore.rooms);

const filterMeetingsStatus = ref("active");
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

const selectMeetingStatus = (status) => {
    if(filterMeetingsStatus.value !== status) {
        filterMeetingsStatus.value = status;
    }
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
    <div v-if="!activeRoom" class="full-view">
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
                <button :class="{'active': filterMeetingsStatus === 'active'}" @click="selectMeetingStatus('active')">
                    <Icon :icon="mdiVideoOutline"/>
                    <span>Active</span>
                </button>
                <button :class="{'active': filterMeetingsStatus === 'scheduled'}" @click="selectMeetingStatus('scheduled')">
                    <Icon :icon="mdiCalendarMonthOutline"/>
                    <span>Scheduled</span>
                </button>
            </multi-button>

            <rooms-list>
                <RoomCard v-for="room in rooms"
                          :name="room.name"
                          :status="room.status"
                          :participant-ids="room.participantIds"
                          @join-room="joinRoom(room.id)"
                />
            </rooms-list>
        </main>
    </div>

    <RoomView v-if="activeRoom"
              :room-name="activeRoom.name"
              :participant-name="usersStore.user.username"
              @leave-room="leaveRoom"/>

    <form-container v-if="isOpenedForm">
        <CreateRoomForm v-if="isOpenedRoomForm" @close="closeRoomForm"/>
    </form-container>
</template>

<style scoped>
main{
    display: flex;
    flex-direction: column;
    gap: var(--spacing-4);
}
</style>
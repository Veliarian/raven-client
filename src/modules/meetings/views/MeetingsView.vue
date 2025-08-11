<script setup>
import {computed, onMounted, ref} from "vue";
import {useI18n} from "vue-i18n";
import {useRoomsStore} from "@/modules/meetings/store/roomsStore.js";
import {useUsersStore} from "@/modules/users/store/usersStore.js";
import {mdiVideoOutline} from "@mdi/js";
import {FButton, FHorizontalSelect, FTitle} from "@uikit";
import RoomsList from "@/modules/meetings/components/RoomsList.vue";
import RoomCard from "@/modules/meetings/components/RoomCard.vue";
import CreateRoomForm from "@/modules/meetings/components/CreateRoomForm.vue";
import RoomView from "@/modules/meetings/views/RoomView.vue";

const i18n = useI18n();
const {t} = i18n;


const usersStore = useUsersStore();

const roomsStore = useRoomsStore();
const rooms = computed(() => roomsStore.rooms);
const filterMeetingsStatus = ref("all");

const filteredRooms = computed(() => {
    const status = filterMeetingsStatus.value;

    if (status === "all") {
        return rooms.value;
    }

    return rooms.value.filter(
        (room) => room.status?.toLowerCase() === status
    );
});

const isOpenedForm = ref(false);
const isOpenedRoomForm = ref(false);
const activeRoom = ref(null);

const openRoomForm = () => toggleRoomForm(true);
const closeRoomForm = () => toggleRoomForm(false);

const toggleRoomForm = (value) => {
    isOpenedForm.value = value;
    isOpenedRoomForm.value = value;
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
        <f-title :title="t('pages.meetings.title')" :subtitle="t('pages.meetings.subtitle')">
            <f-button :icon="mdiVideoOutline" @click="openRoomForm">
                {{ t("pages.meetings.controls.createRoom") }}
            </f-button>
        </f-title>
        <main>
            <f-horizontal-select
                v-model="filterMeetingsStatus"
                :options="[
                      { id: 'all', icon: mdiVideoOutline, label: 'All'},
                      { id: 'active', icon: mdiVideoCheckOutline, label: 'Active' },
                      { id: 'scheduled', icon: mdiCalendarMonthOutline, label: 'Scheduled' },
                ]"
            />
            <rooms-list>
                <room-card v-for="room in filteredRooms"
                           :key="room.id"
                           :name="room.name"
                           :status="room.status"
                           :participant-ids="room.participantIds"
                           @join-room="joinRoom(room.id)"
                />
            </rooms-list>
        </main>
    </div>

    <room-view v-if="activeRoom"
               :room-name="activeRoom?.name"
               :participant-name="usersStore.currentUser?.username"
               @leave-room="leaveRoom"/>

    <transition name="fade">
        <create-room-form v-if="isOpenedRoomForm" @close="closeRoomForm"/>
    </transition>
</template>

<style scoped>
main {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
}

.fade-enter-active, .fade-leave-active {
    transition: opacity var(--transition-fast) ease;
}

.fade-enter-from, .fade-leave-to {
    opacity: 0;
}
</style>
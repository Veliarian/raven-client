import {defineStore} from "pinia";
import {roomsApi} from "@/modules/meetings/api/roomsApi.js";

export const useRoomsStore = defineStore("rooms", {
    state: () => ({
        rooms: [],
    }),

    actions: {
        setRooms(rooms) {
            this.rooms = rooms;
        },

        async fetchRooms(){
            const rooms = await roomsApi.fetchRooms();
            if(rooms) {
                this.setRooms(rooms);
            }
        },

        async createRoom(name, startTime, participantIds){
            const room = await roomsApi.createRoom(name, startTime, participantIds);
            if(room) {
                this.setRooms([...this.rooms, room]);
            }
        },

        setRoomStatus(roomId, status){
            const index = this.rooms.findIndex(r => r.id === roomId);
            if (index !== -1) {
                this.rooms[index] = { ...this.rooms[index], status };
            }
        }
    },

    persist: {
        enable: true,
        strategies: [
            {
                key: "rooms",
                storage: localStorage,
            },
        ],
    },
});
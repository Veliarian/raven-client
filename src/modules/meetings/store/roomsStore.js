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

        async createRoom(name, startTime){
            const room = await roomsApi.createRoom(name, startTime);
            if(room) {
                this.setRooms([...this.rooms, room]);
            }
        },
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
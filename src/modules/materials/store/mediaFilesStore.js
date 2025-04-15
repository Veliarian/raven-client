import {defineStore} from "pinia";
import {mediaFilesApi} from "@/modules/materials/api/mediaFilesApi.js";
import axios from "axios";

export const useMediaFilesStore = defineStore("mediaFiles", {
    state: () => ({
        mediaFiles: [],
    }),

    actions: {
        setMediaFiles(mediaFiles){
            this.mediaFiles = mediaFiles;
        },

        async fetchMediaFiles() {
            const mediaFiles = await mediaFilesApi.fetchMediaFiles();
            this.setMediaFiles(mediaFiles);
        },

        async uploadFile(file){
            const mediaFile = await mediaFilesApi.uploadFile(file);
            if(mediaFile !== null) {
                this.mediaFiles = [...this.mediaFiles, mediaFile];
            }
        },
    },

    persist: {
        enable: true,
        strategies: [
            {
                key: "mediaFiles",
                storage: localStorage,
            },
        ],
    },
});
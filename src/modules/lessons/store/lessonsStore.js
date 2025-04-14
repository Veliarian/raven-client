import {defineStore} from "pinia";
import {useUserStore} from "@/modules/user/store/userStore.js";
import {lessonsApi} from "@/modules/lessons/api/lessonsAPI.js";

export const useLessonsStore = defineStore("lessons", {
    state: () => ({
        lessons: [],
        lastUpdate: null
    }),

    actions: {
        setLessons(lessons) {
            this.lessons = lessons;
            this.lastUpdate = Date.now();
        },

        setLesson(updatedLesson) {
            const index = this.lessons.findIndex(l => l.id === updatedLesson.id);
            if (index !== -1) {
                this.lessons[index] = updatedLesson;
            }
        },

        async fetchLessonsIfNeeded() {
            const tenMinutes = 1000 * 60 * 10;
            const now = Date.now();

            if (!this.lessons.length || !this.lastUpdate || (now - this.lastUpdate > tenMinutes)) {
                await this.fetchLessons();
            }
        },

        async fetchLessons(){
            const userStore = useUserStore();
            const lessons = await lessonsApi.fetchLessons(userStore.user.id);
            if(lessons) {
                this.setLessons(lessons);
            }
        }
    },

    persist: {
        enable: true,
        strategies: [
            {
                key: "lessons",
                storage: localStorage,
            },
        ],
    },
});
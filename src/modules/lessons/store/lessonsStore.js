import {defineStore} from "pinia";

export const useLessonsStore = defineStore("lessons", {
    state: () => ({
        lessons: [],
    }),

    actions: {
        setLessons(lessons) {
            this.lessons = lessons;
        },
    },
});
import AuthView from "../views/AuthView.vue";
import OAuthCallback from "../components/OAuthCallback.vue";
import {useAuthStore} from "@/modules/auth/store/authStore.js";
import {useNotesStore} from "@/modules/notes/store/notesStore.js";
import {authApi} from "@/modules/auth/api/authAPI.js";
import {useLessonsStore} from "@/modules/lessons/store/lessonsStore.js";
import {useMediaFilesStore} from "@/modules/materials/store/mediaFilesStore.js";
import {useRoomsStore} from "@/modules/meetings/store/roomsStore.js";
import {useProfilePictureStore} from "@/modules/users/store/profilePictureStore.js";
import {useThemeStore} from "@/shared/store/themeStore.js";
import {useUsersStore} from "@/modules/users/store/usersStore.js";

export default [
    {
        path: "/auth",
        name: "Auth",
        component: AuthView,
    },
    {
        path: "/oauth2/callback",
        name: "OAuthCallback",
        component: OAuthCallback
    },
    {
        path: "/logout",
        name: "Logout",
        beforeEnter: async (to, from, next) => {
            const authStore = useAuthStore();
            const notesStore = useNotesStore();
            const lessonsStore = useLessonsStore();
            const mediaFilesStore = useMediaFilesStore();
            const roomsStore = useRoomsStore();
            const profilePictureStore = useProfilePictureStore();
            const themeStore = useThemeStore();
            const usersStore = useUsersStore();

            await authApi.logout();

            authStore.$reset();
            notesStore.$reset();
            lessonsStore.$reset();
            mediaFilesStore.$reset();
            roomsStore.$reset();
            profilePictureStore.$reset();
            themeStore.$reset();
            usersStore.$reset();

            next('/auth');
        }
    }
];
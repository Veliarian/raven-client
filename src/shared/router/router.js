import {createRouter, createWebHistory} from "vue-router";

import authRoutes from "@/modules/auth/route/routes.js";
import profileRoutes from "@/modules/user/route/routes.js"

import {useAuthStore} from "@/modules/auth/store/authStore.js";
import {useUserStore} from "@/modules/user/store/userStore.js";

import IndexView from "@/modules/index/views/IndexView.vue";
import DashboardView from "@/modules/dashboard/views/DashboardView.vue";
import LessonsView from "@/modules/lessons/views/LessonsView.vue";
import NotFound from "../views/NotFound.vue";

import {jwtDecode} from "jwt-decode";
import MaterialsView from "@/modules/materials/views/MaterialsView.vue";
import MeetingsView from "@/modules/meetings/views/MeetingsView.vue";


const router = createRouter({
    history: createWebHistory(),
    routes: [
        ...authRoutes,
        ...profileRoutes,
        {
            path: "",
            component: IndexView,
            meta: {
                requiresAuth: true,
                requiresUser: true,
            },
            children: [
                {
                    path: "",
                    component: DashboardView
                },
                {
                    path: "lessons",
                    component: LessonsView
                },
                {
                    path: "materials",
                    component: MaterialsView
                },
                {
                    path: "meetings",
                    component: MeetingsView
                }
            ],
        },

        {
            path: "/:pathMatch(.*)*",
            component: NotFound
        }
    ],
});

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    const token = authStore.token;

    if (to.meta.requiresAuth) {
        if (!token) {
            return next("/auth");
        }

        try {
            const decoded = jwtDecode(token);
            const currentTime = Math.floor(Date.now() / 1000);

            if (decoded.exp && decoded.exp < currentTime) {
                authStore.logout?.();
                return next("/auth")
            }

            const requiredRoles = to.meta.roles;
            const userRoles = decoded?.roles || [];

            if (requiredRoles && !requiredRoles.some(role => userRoles.includes(role))) {
                return next("/forbidden");
            }

        } catch (e) {
            authStore.logout?.();
            return next("/auth");
        }
    }

    const userStore = useUserStore();
    const user = userStore.user;

    if (to.meta.requiresUser) {
        if(!user || user === {}){
            userStore.fetchUser();
        }
    }

    next();
});

export default router;
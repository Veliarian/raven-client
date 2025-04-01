import {createRouter, createWebHistory} from "vue-router";
import authRoutes from "../modules/auth/routes";
import {useAuthStore} from "../modules/auth/store/authStore.js";

import IndexView from "../modules/index/views/IndexView.vue";
import DashboardView from "../modules/dashboard/views/DashboardView.vue";

import NotFound from "./views/NotFound.vue";

const requireAuth = (to, from, next) => {
    const authStore = useAuthStore();
    if(!authStore.token){
        next("/auth");
    } else {
        next();
    }
}

const router = createRouter({
   history: createWebHistory(),
   routes: [
       ...authRoutes,
       {
           path: "/",
           component: IndexView,
           beforeEnter: requireAuth,
           children: [
               {
                   path: "",
                   component: DashboardView
               }
           ],
       },

       {
           path: "/:pathMatch(.*)*",
           component: NotFound
       }
   ],
});

export default router;
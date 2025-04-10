import {createRouter, createWebHistory} from "vue-router";
import authRoutes from "../../modules/auth/routes.js";
import {useAuthStore} from "../../modules/auth/store/authStore.js";

import IndexView from "../../modules/index/views/IndexView.vue";
import DashboardView from "../../modules/dashboard/views/DashboardView.vue";

import NotFound from "../views/NotFound.vue";
import {jwtDecode} from "jwt-decode";
import LessonsView from "../../modules/lessons/views/LessonsView.vue";

const router = createRouter({
   history: createWebHistory(),
   routes: [
       ...authRoutes,
       {
           path: "",
           component: IndexView,
           meta: {
               requiresAuth: true,
           },
           children: [
               {
                   path: "",
                   component: DashboardView
               },
               {
                   path: "lessons",
                   component: LessonsView
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

   if(to.meta.requiresAuth) {
       if(!token){
           return next("/auth");
       }

       try{
           const decoded = jwtDecode(token);
           const currentTime = Math.floor(Date.now() / 1000);

           if(decoded.exp && decoded.exp < currentTime) {
               authStore.logout?.();
               return next("/auth")
           }

           const requiredRoles = to.meta.roles;
           const userRoles = decoded?.roles || [];

           if(requiredRoles && !requiredRoles.some(role => userRoles.includes(role))){
               return next("/forbidden");
           }

           return next();
       }catch (e) {
           authStore.logout?.();
           return next("/auth");
       }
   }

   next();
});

export default router;
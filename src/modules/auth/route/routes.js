import AuthView from "../views/AuthView.vue";
import OAuthCallback from "../components/OAuthCallback.vue";

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
    }
];
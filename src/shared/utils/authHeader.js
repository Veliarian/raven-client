import { useAuthStore } from "@/modules/auth/store/authStore.js";

export const authHeader = () => {
    const authStore = useAuthStore(); // виклик всередині функції
    const token = authStore.token;

    return {
        ...(token && { Authorization: `Bearer ${token}` }),
        "Content-Type": "application/json",
    };
};




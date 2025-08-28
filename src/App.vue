<script setup>
import {onMounted} from "vue";
import {connectWebsocket} from "@/modules/notifications/services/websocketService.js";
import {useNotificationsStore} from "@/modules/notifications/storage/notificationsStore.js";

onMounted(() => {
    const notificationsStore = useNotificationsStore();
    notificationsStore.fetchNotifications();

    connectWebsocket();
});
</script>

<template>
  <RouterView/>
</template>

<style scoped>

</style>

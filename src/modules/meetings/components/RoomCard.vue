<script setup>
import {mdiAccountPlusOutline, mdiTrayArrowDown} from "@mdi/js";
import Icon from "@/shared/components/icons/Icon.vue";
import ProfileImage from "@/shared/components/ProfileImage.vue";
import {useUsersStore} from "@/modules/users/store/usersStore.js";
import {computed} from "vue";

const props = defineProps({
    name: String,
    status: {
        type: String,
        default: "active"
    },
    participantIds: Array
});

const usersStore = useUsersStore();

const emit = defineEmits(["joinRoom"]);

const joinRoom = () => {
    emit("joinRoom");
}

const firstLetterToUpperCase = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

console.log(props.participantIds)
</script>

<template>
<div class="room-card">
    <header class="room-card-header">
        <h6>{{ name }}</h6>
        <span class="status" :class="status.toLowerCase()">{{ firstLetterToUpperCase(status) }}</span>
    </header>
    <main>
        <div class="participants-list">
            <ProfileImage
                v-for="participantId in participantIds"
                :profile-picture="usersStore.getProfilePictureByUserId(participantId)"
                class="participant-image"
            />
        </div>
        <div class="actions-box">
            <button>
                <Icon :icon="mdiAccountPlusOutline"/>
                <span>Invite</span>
            </button>
            <button @click="joinRoom" :disabled="status.toLowerCase() === 'scheduled'">
                <Icon :icon="mdiTrayArrowDown" class="join-icon"/>
                <span>Join</span>
            </button>
        </div>
    </main>
</div>
</template>

<style scoped>
.room-card {
    flex: 1 1 calc(33.333% - 1rem);
    min-width: 16rem;
    max-width: calc(33.333% - 1rem);
    padding: var(--spacing-4);
    border-radius: var(--radius-lg);
    border: 1px solid var(--border-color);
    background-color: var(--surface);
    display: flex;
    flex-direction: column;
    gap: .75rem;
}

.room-card-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.status {
    padding: var(--spacing-1) var(--spacing-2);
    color: var(--text-color-light);
    font-size: var(--font-size-xs);
    border-radius: var(--radius-full);
}

.status.active {
    background-color: var(--color-green);
}

.status.scheduled {
    background-color: var(--color-yellow);
}

main{
    display: flex;
    flex-direction: column;
    gap: .75rem;
}

.participants-list{
    width: 100%;
    max-width: 100%;
    display: flex;
}

.participant-image{
    width: 3rem;
    height: 3rem;
    border: 2px solid var(--color-green);
}

.participants-list .participant-image:not(:first-child){
    transform: translateX(-1.5rem);
}

.actions-box{
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.join-icon{
    transform: rotate(270deg);
}
</style>
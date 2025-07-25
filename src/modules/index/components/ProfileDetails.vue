<script setup>

import ProfileImage from "../../../shared/components/ProfileImage.vue";
import {computed, onMounted, onUnmounted, ref} from "vue";
import {useI18n} from "vue-i18n";
import Icon from "../../../shared/components/Icon.vue";
import {mdiAccount, mdiCog} from "@mdi/js";
import {useUsersStore} from "@/modules/users/store/usersStore.js";
const {t} = useI18n();

const usersStore = useUsersStore();

const username = computed(() => usersStore.user?.username || "Username");

const isDisplayDrop = ref(false);
const containerRef = ref(null);

const displayDrop = () => {
    isDisplayDrop.value = !isDisplayDrop.value;
}

const handleClickOutside = (event) => {
    if (containerRef.value && !containerRef.value.contains(event.target)) {
        isDisplayDrop.value = false;
    }
};

onMounted(() => {
   document.addEventListener("mousedown", handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener('mousedown', handleClickOutside);
});
</script>

<template>
    <div class="profile-details">
        <div class="profile-details-btn" @click="displayDrop">
            <ProfileImage class="profile-img"/>
        </div>
        <div class="profile-details-drop" ref="containerRef" :class="{'active': isDisplayDrop}">
            <header>
                <h5>{{ username }}</h5>
            </header>
            <main>
                <router-link class="details-item" to="/profile">
                    <Icon :icon="mdiAccount" class="details-item-icon"/>
                    {{ t("topBar.profile") }}
                </router-link>
                <router-link class="details-item" to="/settings">
                    <Icon :icon="mdiCog" class="details-item-icon"/>
                    {{ t("topBar.settings") }}
                </router-link>
            </main>
            <footer>
                <router-link class="details-item" to="/logout">{{ t("topBar.logout") }}</router-link>
            </footer>
        </div>
    </div>
</template>

<style scoped>
.profile-details {
    position: relative;
}

.profile-details-btn {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 9999px;
    color: var(--color-green);
    border: .15rem solid transparent;
    transition: border-bottom-color .2s, border-left-color .2s, border-right-color .2s, border-top-color .2s;
}

.profile-details-btn:hover {
    cursor: pointer;
    border: .15rem solid var(--color-green);
    transition: border-bottom-color .2s, border-left-color .2s, border-right-color .2s, border-top-color .2s;
}

.profile-img {
    width: 100%;
    height: 100%;
}

.profile-details-drop {
    min-width: 240px;
    position: absolute;
    top: 44px;
    right: 0;
    display: none;
    flex-direction: column;
    background-color: var(--surface);
    border-radius: var(---radius-lg);
}

.profile-details-drop.active{
    display: flex;
}

header {
    padding: .5rem .75rem;
    border-bottom: 1px solid var(--border-color);
}

h5{
    padding: .2rem;
}

main{
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: .2rem;
    padding: .5rem;
    color: var(--text-color-secondary);
}

footer{
    width: 100%;
    padding: .5rem;
    border-top: 1px solid var(--border-color);
    color: var(--text-color-secondary);
}

.details-item{
    display: flex;
    align-items: center;
    gap: .2rem;
    width: 100%;
    padding: .2rem .5rem;
    border-radius: var(---radius-lg);
    transition: background-color .2s;
}

.details-item:hover{
    background-color: var(--color-green-light);
    transition: background-color .2s;
}

.details-item-icon{
    width: 16px;
    height: 16px;
}
</style>
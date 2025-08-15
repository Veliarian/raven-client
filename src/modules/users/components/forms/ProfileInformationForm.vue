<script setup>

import {useI18n} from "vue-i18n";
import {useUsersStore} from "@/modules/users/store/usersStore.js";
import {computed, onMounted, reactive} from "vue";
import {FButton, FInput, FTextArea} from "@uikit";

const {t} = useI18n();
const usersStore = useUsersStore();
const user = computed(() => usersStore.currentUser);

const editableUser = reactive({
    username: user.value.username,
    email: user.value.email,
    firstname: user.value.firstName,
    lastname: user.value.lastName,
    patronymic: user.value.patronymic,
    bio: user.value.bio ?? "",
});

const handleSave = () => {
    console.log(editableUser.bio)
    usersStore.updateCurrentUser(editableUser);
};

onMounted(() => {
   console.log(user.value)
});

</script>

<template>
    <div class="profile-information-form">
        <form>
            <div class="horizontal-block">
                <div class="input-box">
                    <label for="firstname">{{ t("profile.firstname") }}</label>
                    <f-input type="text" id="firstname" v-model="editableUser.firstname"/>
                </div>
                <div class="input-box">
                    <label for="username">{{ t("profile.username") }}</label>
                    <f-input type="text" id="username" v-model="editableUser.username"/>
                </div>
            </div>
            <div class="horizontal-block">
                <div class="input-box">
                    <label for="lastname">{{ t("profile.lastname") }}</label>
                    <f-input type="text" id="lastname" v-model="editableUser.lastname"/>
                </div>
                <div class="input-box">
                    <label for="email">{{ t("profile.email") }}</label>
                    <f-input type="email" id="email" v-model="editableUser.email"/>
                </div>
            </div>
            <div class="half-block">
                <div class="input-box">
                    <label for="patronymic">{{ t("profile.patronymic") }}</label>
                    <f-input type="text" id="patronymic" v-model="editableUser.patronymic"/>
                </div>
            </div>
            <div class="full-block">
                <div class="input-box">
                    <label for="bio">{{ t("profile.bio") }}</label>
                    <f-text-area id="bio" base-height="6rem" v-model="editableUser.bio"/>
                </div>
            </div>
            <div>
                <f-button @click.prevent="handleSave">{{ t("controls.save") }}</f-button>
            </div>
        </form>
    </div>
</template>

<style scoped>

form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.horizontal-block {
    display: flex;
    justify-content: space-between;
    gap: 2rem;
}

.half-block {
    width: calc(50% - 1rem);
}

.full-block {
    width: 100%;
}

.input-box {
    display: flex;
    flex-direction: column;
    flex: 1;
}
</style>
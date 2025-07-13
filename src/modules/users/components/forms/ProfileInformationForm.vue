<script setup>

import {useI18n} from "vue-i18n";
import {useUsersStore} from "@/modules/users/store/usersStore.js";
import {computed, reactive} from "vue";

const {t} = useI18n();
const usersStore = useUsersStore();
const user = computed(() => usersStore.currentUser);

const editableUser = reactive({
    username: user.value.username,
    email: user.value.email,
    firstName: user.value.firstName,
    lastName: user.value.lastName,
    patronymic: user.value.patronymic,
    bio: user.value.bio ?? "",
});

const handleSave = () => {
    usersStore.updateCurrentUser(editableUser);
};

</script>

<template>
    <div class="profile-information-form">
        <form @submit.prevent="handleSave">
            <div class="horizontal-block">
                <div class="input-box">
                    <label for="lastname">{{ t("profile.lastname") }}</label>
                    <input type="text" id="lastname" v-model="editableUser.lastName">
                </div>
                <div class="input-box">
                    <label for="username">{{ t("profile.username") }}</label>
                    <input type="text" id="username" min="2" max="256" v-model="editableUser.username">
                </div>
            </div>
            <div class="horizontal-block">
                <div class="input-box">
                    <label for="firstname">{{ t("profile.firstname") }}</label>
                    <input type="text" id="firstname" v-model="editableUser.firstName">
                </div>
                <div class="input-box">
                    <label for="email">{{ t("profile.email") }}</label>
                    <input type="email" id="email" v-model="editableUser.email">
                </div>
            </div>
            <div class="half-block">
                <div class="input-box">
                    <label for="patronymic">{{ t("profile.patronymic") }}</label>
                    <input type="text" id="patronymic" v-model="editableUser.patronymic">
                </div>
            </div>
            <div class="full-block">
                <div class="input-box">
                    <label for="bio">{{ t("profile.bio") }}</label>
                    <textarea class="bio-textarea" id="bio" v-model="editableUser.bio"></textarea>
                </div>
            </div>
            <button class="submit-btn" type="submit">{{ t("controls.save") }}</button>
        </form>
    </div>
</template>

<style scoped>
.profile-information-form{

}

form{
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.horizontal-block{
    display: flex;
    justify-content: space-between;
    gap: 2rem;
}

.half-block{
    width: calc(50% - 1rem);
}

.full-block{
    width: 100%;
}

.input-box{
    display: flex;
    flex-direction: column;
    flex: 1;
}

.bio-textarea{
    height: 6rem;
    resize: none;
}
</style>
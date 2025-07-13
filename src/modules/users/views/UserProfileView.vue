<script setup>
import {useI18n} from "vue-i18n";
import {useRouter} from "vue-router";
import Icon from "@/shared/components/Icon.vue";
import {
    mdiAccountOutline,
    mdiArrowLeft,
    mdiBellOutline,
    mdiKeyOutline,
    mdiTrashCanOutline,
    mdiTrayArrowUp
} from "@mdi/js";
import MultiButton from "@/shared/components/MultiButton.vue";
import {ref} from "vue";
import ProfileImageForm from "@/modules/users/components/forms/ProfileImageForm.vue";
import ProfileInformationForm from "@/modules/users/components/forms/ProfileInformationForm.vue";

const router = useRouter();
const { t } = useI18n();

const activeTab = ref("profile");

const goBack = () => {
    router.back();
}

const switchTab = (tab) => {
    if(activeTab.value !== tab){
        activeTab.value = tab;
    }
}
</script>

<template>
<div class="profile-view">
    <div class="profile-view-content">
        <header class="profile-view-header">
            <div class="header-title">
                <h1>{{ t("profile.profileSettings") }}</h1>
                <p class="additional-info">{{ t("profile.additionalMessage") }}</p>
            </div>
            <button @click="goBack" class="back-btn">
                <Icon class="back-btn-icon" :icon="mdiArrowLeft"/>
                <span>{{ t("controls.back") }}</span>
            </button>
        </header>
        <main class="profile-view-main">
            <multi-button>
                <button :class="{'active': activeTab === 'profile'}" @click="switchTab('profile')">
                    <Icon :icon="mdiAccountOutline"/>
                    {{ t("controls.profile") }}
                </button>
                <button :class="{'active': activeTab === 'account'}" @click="switchTab('account')">
                    <Icon :icon="mdiKeyOutline"/>
                    {{ t("controls.account") }}
                </button>
                <button :class="{'active': activeTab === 'notifications'}" @click="switchTab('notifications')">
                    <Icon :icon="mdiBellOutline"/>
                    {{ t("controls.notifications") }}
                </button>
            </multi-button>
            <div class="tabs-container">
                <div class="tab" v-if="activeTab === 'profile'">
                    <header class="tab-header">
                        <h2 class="tab-header-h">{{ t("profile.profileSettingsHeader") }}</h2>
                        <p class="tab-header-p">{{ t("profile.profileSettingsAdditional") }}</p>
                    </header>
                    <main class="tab-main">
                        <ProfileImageForm/>
                        <ProfileInformationForm/>
                    </main>
                </div>
                <div class="tab" v-else-if="activeTab === 'account'">
                    <header class="tab-header">
                        <h2 class="tab-header-h">{{ t("profile.changePassword") }}</h2>
                        <p class="tab-header-p">{{ t("profile.changePasswordAdditional") }}</p>
                    </header>
                </div>
                <div class="tab" v-else-if="activeTab === 'notifications'">
                    <header class="tab-header">
                        <h2 class="tab-header-h">{{ t("profile.notificationPreferences") }}</h2>
                        <p class="tab-header-p">{{ t("profile.notificationPreferencesAdditional") }}</p>
                    </header>
                </div>
            </div>
        </main>
    </div>
</div>
</template>

<style scoped>
.profile-view{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    background-color: var(--background);
    overflow-x: hidden;
}

.profile-view-content{
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 2rem 0;
}

.profile-view-header{
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.additional-info{
    color: var(--text-color-secondary);
}

.back-btn-icon{
    width: 16px;
    height: 16px;
}

.profile-view-main{
    display: flex;
    flex-direction: column;
    gap: .75rem;
}

.tabs-container{
    display: flex;
    border: 2px solid var(--border-color);
    border-radius: var(---radius-lg);
}

.tab{
    width: 66%;
    min-width: 992px;
    padding: 1rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.tab-header{
    display: flex;
    flex-direction: column;
}

.tab-header-p{
    color: var(--text-color-secondary);
}

.tab-main{
    display: flex;
    flex-direction: column;
    gap: 2rem;
}
</style>
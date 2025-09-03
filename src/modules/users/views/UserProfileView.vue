<script setup>
import {useI18n} from "vue-i18n";
import {useRouter} from "vue-router";
import {mdiArrowLeft} from "@mdi/js";
import {ref} from "vue";
import ProfileImageForm from "@/modules/users/components/forms/ProfileImageForm.vue";
import ProfileInformationForm from "@/modules/users/components/forms/ProfileInformationForm.vue";
import {FButton, FHorizontalSelect, FTitle} from "@uikit";

const router = useRouter();
const {t} = useI18n();

const activeTab = ref("profile");

const goBack = () => {
    router.back();
}
</script>

<template>
    <div class="profile-view">
        <div class="profile-view-content">
            <f-title :title="t('profile.profileSettings')" :subtitle="t('profile.additionalMessage')">
                <f-button :icon="mdiArrowLeft" @click="goBack">{{ t("controls.back") }}</f-button>
            </f-title>
            <main class="profile-view-main">
                <f-horizontal-select
                    v-model="activeTab"
                    :options="[
                      { id: 'profile', icon: mdiAccount, label: t('controls.profile') },
                      { id: 'account', icon: mdiKey, label: t('controls.account') },
                      { id: 'notifications', icon: mdiBell, label: t('controls.notifications') },
                ]"
                />
                <div class="tabs-container">
                    <div class="tab" v-if="activeTab === 'profile'">
                        <f-title :title="t('profile.profileSettingsHeader')"
                                 :subtitle="t('profile.profileSettingsAdditional')"/>
                        <main class="tab-main">
                            <profile-image-form/>
                            <profile-information-form/>
                        </main>
                    </div>
                    <div class="tab" v-else-if="activeTab === 'account'">
                        <f-title :title="t('profile.changePassword')"
                                 :subtitle="t('profile.changePasswordAdditional')"/>
                    </div>
                    <div class="tab" v-else-if="activeTab === 'notifications'">
                        <f-title :title="t('profile.notificationPreferences')"
                                 :subtitle="t('profile.notificationPreferencesAdditional')"/>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<style scoped>
.profile-view {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    background-color: var(--surface);
    overflow-x: hidden;
}

.profile-view-content {
    width: 66%;
    min-width: 996px;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 2rem 0;
}

.profile-view-main {
    display: flex;
    flex-direction: column;
    gap: .75rem;
}

.tabs-container {
    display: flex;
    border: 2px solid var(--border-color);
    border-radius: var(--radius-lg);
}

.tab {
    width: 100%;
    padding: var(--spacing-md) var(--spacing-lg);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
}

.tab-main {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xlg);
}
</style>
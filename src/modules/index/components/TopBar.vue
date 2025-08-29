<script setup>
import {FSearchInput} from "@uikit";
import ThemeSwitch from "@/shared/components/ThemeSwitch.vue";
import NoticeButton from "@/modules/notifications/components/NoticeButton.vue";
import ProfileDetails from "@/modules/index/components/ProfileDetails.vue";
</script>

<template>
    <header class="top-bar">
        <div class="top-bar-content">
            <div class="top-bar-content-box">

            </div>
            <div class="top-bar-content-box">
                <div class="top-bar-search-input">
                    <f-search-input/>
                </div>
                <theme-switch/>
                <div class="user-actions">
                    <notice-button/>
                    <profile-details/>
                </div>
            </div>
        </div>
    </header>
</template>

<style scoped>
.top-bar {
    padding: 1rem;
    border-bottom: 2px solid var(--border-color);
}

.top-bar-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.top-bar-content-box {
    display: flex;
    align-items: center;
    gap: 2.5rem;
}

.top-bar-search-input {
    width: 300px;
}

.user-actions {
    display: flex;
    gap: 1rem;
}
</style>
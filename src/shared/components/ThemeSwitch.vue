<script setup>

import {mdiWeatherNight, mdiWhiteBalanceSunny} from "@mdi/js";
import Icon from "./Icon.vue";
import Switch from "./Switch.vue";
import {onMounted, ref, watch} from "vue";
import {useThemeStore} from "../store/themeStore.js";

const themeStore = useThemeStore();

const isEnabled = ref(false);

onMounted(() => {
    isEnabled.value = themeStore.theme === "dark";
});

watch(isEnabled, (value) => {
   const newTheme = value ? "dark" : "light";
   themeStore.setTheme(newTheme);
});

</script>

<template>
    <div class="theme-switch">
        <Icon :icon="mdiWhiteBalanceSunny" class="theme-icon day" :class="{'active': !isEnabled}"/>
        <Switch v-model="isEnabled"/>
        <Icon :icon="mdiWeatherNight" class="theme-icon night" :class="{'active': isEnabled}"/>
    </div>
</template>

<style scoped>
.theme-switch {
    display: flex;
    align-items: center;
    gap: .5rem;
}

.theme-icon {
    width: 20px;
    height: 20px;
    opacity: 0;
    transform: rotate(90deg);
    transition: opacity .3s, transform .2s;

}

.theme-icon.active {
    opacity: 1;
    transform: rotate(0deg);
    transition: opacity .3s, transform .2s;
}

.theme-icon.day {
    color: var(--color-green);
}

.theme-icon.night {
    color: var(--color-green);
}
</style>
<script setup>
import {onMounted, ref, watch} from "vue";
import {mdiWeatherNight, mdiWhiteBalanceSunny} from "@mdi/js";
import {Icon as FIcon, Switch as FSwitch} from "@uikit";
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
        <f-icon :icon="mdiWhiteBalanceSunny" class="theme-icon day" :class="isEnabled ? '' : 'active'"/>
        <f-switch v-model="isEnabled"/>
        <f-icon :icon="mdiWeatherNight" class="theme-icon night" :class="isEnabled ? 'active' : ''"/>
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
    color: var(--color-primary);
}

.theme-icon.night {
    color: var(--color-primary);
}
</style>
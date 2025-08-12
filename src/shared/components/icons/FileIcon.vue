<script setup>
import {onMounted, ref} from "vue";
import {
    mdiFileExcelOutline,
    mdiFileOutline,
    mdiFilePdfBox,
    mdiFilePowerpointOutline,
    mdiFileVideoOutline,
    mdiFileWordOutline,
    mdiImage,
    mdiMusicBox
} from "@mdi/js";
import {FIcon} from "@uikit";

const props = defineProps({
    type: {
        type: String,
        default: "FILE"
    },
});

const iconStyle = ref({color: "", icon: ""});

const setIconStyle = () => {
    switch (props.type) {
        case "WORD":
            iconStyle.value = {color: "#2b579a", icon: mdiFileWordOutline};
            break;
        case "EXCEL":
            iconStyle.value = {color: "#217346", icon: mdiFileExcelOutline};
            break;
        case "POWERPOINT":
            iconStyle.value = {color: "#d24726", icon: mdiFilePowerpointOutline};
            break;
        case "PDF":
            iconStyle.value = {color: "#fa0f00", icon: mdiFilePdfBox};
            break;
        case "IMAGE":
            iconStyle.value = {color: "#31A8FF", icon: mdiImage};
            break;
        case "VIDEO":
            iconStyle.value = {color: "#F5C518", icon: mdiFileVideoOutline};
            break;
        case "AUDIO":
            iconStyle.value = {color: "#1DB954", icon: mdiMusicBox};
            break;
        case "FILE":
            iconStyle.value = {color: "#999999", icon: mdiFileOutline};
            break;
        default:
            iconStyle.value = {color: "#999999", icon: mdiFileOutline};
            break;
    }
}

onMounted(() => {
    setIconStyle();
});
</script>

<template>
    <f-icon :icon="iconStyle.icon"
            :color="iconStyle.color"
            :enable-background="true"
            :size="30"
            :padding="4"
    />
</template>

<style scoped>

</style>
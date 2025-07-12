<script setup>
import UserVideo from "@/modules/meetings/components/UserVideo.vue";

defineProps({
    contentType: {
        type: String,
    },
    contentData: {
        type: Object,
    }
});

function getComponentForType(type) {
    switch (type) {
        case 'video':
            return UserVideo;
        case 'whiteboard':
            return 'WhiteboardCanvas';
        case 'presentation':
            return 'PresentationViewer';
        default:
            return 'UnknownContent';
    }
}
</script>

<template>
    <div class="main-stage">
        <div class="main-stage-inner">
            <component
                :is="getComponentForType(contentType)"
                v-bind="contentData"
            />
        </div>
    </div>
</template>

<style scoped>
.main-stage {
    position: absolute;
    top: 0;
    width: 100%;
    height: calc(100% - 8.5rem);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden; /* ❗ Обмеження */
}

.main-stage-inner {
    width: 100%;
    height: 100%;
    max-height: 100%;
    max-width: 100%;
    aspect-ratio: 16 / 9;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
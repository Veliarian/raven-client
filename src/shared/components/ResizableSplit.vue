<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const container = ref(null)
const leftWidth = ref(0)
let isDragging = false

const startDragging = (e) => {
    isDragging = true
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', stopDragging)
}

const handleMouseMove = (e) => {
    if (!isDragging || !container.value) return
    const rect = container.value.getBoundingClientRect()
    const newWidth = e.clientX - rect.left
    if (newWidth > 100 && newWidth < rect.width - 100) {
        leftWidth.value = newWidth
    }
}

const stopDragging = () => {
    isDragging = false
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', stopDragging)
}

onMounted(() => {
    const rect = container.value.getBoundingClientRect()
    leftWidth.value = rect.width * 0.8 // 👉 80% початкова ширина
})
</script>

<template>
    <div class="split-container" ref="container">
        <div class="left-pane" :style="{ width: leftWidth + 'px' }">
            <slot name="left" />
        </div>
        <div class="resizer" @mousedown="startDragging"></div>
        <div class="right-pane">
            <slot name="right" />
        </div>
    </div>
</template>

<style scoped>
.split-container {
    display: flex;
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
}

.left-pane {
    height: 100%;
    overflow: auto;
}

.right-pane {
    flex: 1;
    height: 100%;
    overflow: auto;
}

.resizer {
    width: 6px;
    background-color: #ccc;
    cursor: ew-resize;
    height: 100%;
    z-index: 10;
    margin: 0 .24rem;
}
</style>
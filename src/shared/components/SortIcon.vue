<script setup>
import Icon from "@/shared/components/Icon.vue";
import {mdiTriangleSmallDown, mdiTriangleSmallUp} from "@mdi/js";

defineProps({
    asc: Boolean,
    active: Boolean,
})
</script>

<template>
  <span v-if="active">
      <Icon :icon="mdiTriangleSmallUp"/>
      <Icon :icon="mdiTriangleSmallDown"/>
  </span>
</template>

<style scoped>

</style>
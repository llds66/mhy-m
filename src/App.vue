<script setup lang="ts">
import { useBackgroundDots } from '@composables/useBackgroundDots'
import { onMounted, ref } from 'vue'

const bg = ref<HTMLDivElement | null>(null)
onMounted(() => {
  document.documentElement.style.viewTransitionName = 'root'
  if (bg.value) {
    useBackgroundDots(bg.value, true)
  }
})
</script>

<template>
  <div ref="bg" class="h-full w-full fixed" />
  <RouterView />
</template>

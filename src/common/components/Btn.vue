<script setup lang='ts'>
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  link?: string
  title?: string
  icon?: string
}>(), {
  link: 'https://mhym.csx.pw/',
})

const iconClass = computed(() => {
  return `${props.icon || 'i-mingcute-github-line'} hover:${props.icon || 'i-mingcute-github-fill'} text-lg`
})
</script>

<template>
  <div>
    <a
      target="_blank" :href="link"
      class="p-2 rounded-md flex transition-colors duration-200 hover:bg-#f3f4f7"
    >
      <span v-show="title" class="text-sm">{{ title }}</span>
      <div v-show="icon" :class="iconClass" />
    </a>
  </div>
</template>

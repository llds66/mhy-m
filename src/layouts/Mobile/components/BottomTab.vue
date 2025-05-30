<script setup lang="ts">
import { motion } from 'motion-v'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

function toPage(item: any) {
  router.push(item.path)
}
const tabs = ref([
  {
    path: '/home',
    icon: 'i-iconamoon-ticket-light',
  },
  {
    path: '/other',
    icon: 'i-iconamoon-attention-circle-light',
  },
])
</script>

<template>
  <div class="bottom-tab">
    <div
      v-for="tab in tabs" :key="tab.path"
      :class=" route.path === tab.path ? 'filterbox' : ''"
      class="flex flex-col items-center"
      @click="toPage(tab)"
    >
      <motion.div
        :while-hover="{ scale: 1.1 }"
        :while-press="{ scale: 0.9 }"
        :class="[tab.icon, route.path === tab.path ? 'text-#43CF7C' : 'text-white']"
        class="icon"
      />
      <motion.div v-if="route.path === tab.path" layout-id="navbar" class="dot" :class=" route.path === tab.path ? 'bg-#43CF7C' : 'bg-white'" />
      <motion.div v-if="route.path !== tab.path" class="h-1.2 w-1.2" />
    </div>
  </div>
</template>

<style scoped>
.bottom-tab{
  --uno:'rounded-full bg-stone-800 flex-center gap-col-10 h-15 w-60';
}
.filterbox {
  filter: drop-shadow(0 0 4px #43cf7c) drop-shadow(0 0 8px #43cf7c) drop-shadow(0 0 8px #43cf7b49);
  transition: filter 0.3s ease;
}
.icon{
  --uno:'text-4xl ';
}
.dot{
  --uno:'rounded-full  h-1.2 w-1.2';
}
</style>

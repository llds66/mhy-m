<script setup lang='ts'>
import { Window } from '@tauri-apps/api/window'
import { ref } from 'vue'

const isMax = ref(false)
const appWindow = new Window('main')

async function mmEvent() {
  await appWindow.toggleMaximize()
  isMax.value = await appWindow.isMaximized()
}
</script>

<template>
  <div data-tauri-drag-region class="bg-stone-50 flex h-10 w-full items-center dark:bg-neutral-900">
    <div class="px-2">
      <img src="/favicon.png" class="h-6 w-6" alt="">
    </div>
    <div class="text-sm text-stone-800">
      mhy-m
    </div>
    <div data-tauri-drag-region class="flex-1 h-10" />
    <div data-tauri-drag-region class="pr-1 flex-center gap-2">
      <div class="btn-bg-hover flex-center h-8 w-8" @click="appWindow.minimize()">
        <div class="i-iconamoon-sign-minus-light text-xl" />
      </div>
      <div class="btn-bg-hover flex-center h-8 w-8" @click="mmEvent">
        <div
          :class=" isMax ? 'i-iconamoon-screen-full-light' : 'i-iconamoon-screen-normal-light'"
          class="text-xl"
        />
      </div>
      <div class="btn-bg-hover flex-center h-8 w-8" @click="appWindow.close()">
        <div class="i-iconamoon-close-light text-xl" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.btn-bg-hover{
  --uno:"p-2 rounded-md hover:bg-#f3f4f7 transition-colors duration-200 dark:hover:bg-#27272a"
}
</style>

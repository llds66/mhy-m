<script setup lang="ts">
import { motion } from 'motion-v'
import { ref } from 'vue'

const isUpdate = ref(false)
</script>

<template>
  <div class="p-5 dot-bg h-screen">
    <div class="h-15" />
    <div class="flex gap-col-3">
      <div class="flex flex-1/3 flex-col gap-row-3">
        <motion.a
          href="https://mhymd.csx.pw"
          target="_blank"
          :while-hover="{ scale: 1.1 }"
          :while-press="{ scale: 0.9 }"
          class="item flex-center h-15 select-none"
        >
          <div class="text-sm font-bold flex gap-2 items-center">
            官网
            <div class="i-iconamoon-arrow-top-right-1-light" />
          </div>
        </motion.a>
        <motion.a
          href="https://github.com/llds66/mhym"
          target="_blank"
          :while-hover="{ scale: 1.1 }"
          :while-press="{ scale: 0.9 }"
          class="item flex-center h-15 select-none"
        >
          <div class="i-mingcute-github-line text-xl font-bold" />
        </motion.a>
      </div>
      <motion.div
        :while-hover="{ scale: 1.1 }"
        :while-press="{ scale: 0.9 }"
        class="item p-3 flex flex-2/3 flex-col gap-row-2 h-33 select-none"
      >
        <span class="text-sm font-bold text-center">反馈与交流</span>
        <span class="text-sm">Q群：206011327</span>
        <span class="text-sm">微群：暂无</span>
        <span class="text-sm">邮箱：lldsshun@163.com</span>
      </motion.div>
    </div>
    <motion.a
      href="https://docs.minizzz.xyz"
      target="_blank"
      :while-hover="{ scale: 1.1 }"
      :while-press="{ scale: 0.9 }"
      class="item mt-3 flex-center h-15 select-none"
    >
      <div class="flex gap-2 items-center">
        <img src="/logo.png" class="h-5 w-5">
        <span class="font-bold">miniZZZ</span>
        <span class="text-sm">仿绝区零绳网平台（构建中）</span>
        <div class="i-iconamoon-arrow-top-right-1-light" />
      </div>
    </motion.a>

    <div class="mt-10 p-x-2 flex">
      <span class="text-sm text-stone-600">当前版本 V 0.1</span>
      <div class="text-sm text-stone-600 flex flex flex-1 gap-col-2 items-center justify-end">
        <motion.div v-if="isUpdate" :while-press="{ scale: 0.9 }" class="flex-center gap-col-2">
          有新版本，前往下载
          <div class="i-iconamoon-arrow-top-right-1-light" />
        </motion.div>
        <motion.div v-else :while-press="{ scale: 0.9 }" class="flex-center gap-col-2">
          检查更新
          <div class="i-iconamoon-synchronize-light" />
        </motion.div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.item{
    --uno:'border border-stone-50/20 rounded-xl bg-stone-50/30 border-#E5E5E5 shadow-md backdrop-blur-lg opacity-80'
}
</style>

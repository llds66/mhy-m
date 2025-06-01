<script setup lang='ts'>
import Event from '@components/Event.vue'
import { motion } from 'motion-v'
</script>

<template>
  <div class="dot-bg h-screen">
    <div class="h-15" />
    <div
      class="text-center flex-center select-none"
    >
      <motion.div
        class="p-x-4 p-y-2 rounded-lg flex-center gap-col-3"
        :while-hover="{ scale: 1.1 }"
        :while-press="{ scale: 0.9 }"
      >
        <span class="text-2xl text-stone-800 font-bold">近期活动</span>
      </motion.div>
    </div>
    <div class="h-5" />
    <div class="flex-center">
      <div class="flex flex-col gap-row-5 w-85% items-center justify-center">
        <Event
          game="绝区零"
          avatar="/juequling.png"
          title="绝区零2025生日会"
          due-date="2025-06-07 19:30:00"
          image="http://sx6mbttvl.hb-bkt.clouddn.com/hd1.png"
        />
      </div>
    </div>
  </div>
</template>

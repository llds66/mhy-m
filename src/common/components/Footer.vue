<script setup lang='ts'>
import { motion } from 'motion-v'
</script>

<template>
  <div class="py-3 flex-center">
    <motion.a
      target="_blank"
      :while-hover="{ scale: 1.05 }"
      href="https://github.com/llds66"
      class="text-sm text-stone-400 hover:text-stone-600"
    >
      @LsAng
    </motion.a>
  </div>
</template>

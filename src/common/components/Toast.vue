<script setup lang="ts">
import { motion } from 'motion-v'
import { ref, watch } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  msg: {
    type: String,
    default: 'message',
  },
  duration: {
    type: Number,
    default: 1500,
  },
})

const emit = defineEmits(['update:show'])
const isShow = ref(props.show)

let timer: ReturnType<typeof setTimeout> | null = null

watch(() => props.show, (newVal) => {
  isShow.value = newVal
  if (newVal) {
    timer = setTimeout(() => {
      isShow.value = false
      emit('update:show', false)
    }, props.duration)
  }
  else if (timer) {
    clearTimeout(timer)
    timer = null
  }
})
</script>

<template>
  <motion.div
    v-if="isShow"
    :initial="{ opacity: 0, y: -100, scale: 0 }"
    :animate="{ opacity: 1, y: 0, scale: 1 }"
    :transition="{ duration: 0.5, ease: 'easeInOut' }"
    class="toast"
  >
    {{ msg }}
    <div class="i-iconamoon-check-circle-1-duotone text-sm" />
  </motion.div>
</template>

<style scoped>
.toast {
    --uno:'fixed top-2 text-sm left-1/2 -translate-x-1/2 bg-black/80 text-white px-4 py-1.5 rounded-full shadow-lg z-50 flex-center gap-col-2 backdrop-blur-lg opacity-80';
}
</style>

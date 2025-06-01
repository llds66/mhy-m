<script setup lang='ts'>
import NumberFlow, { NumberFlowGroup } from '@number-flow/vue'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { motion } from 'motion-v'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

const props = withDefaults(defineProps<{
  game?: string
  avatar?: string
  title?: string
  image?: string
  dueDate?: string | number
}>(), {
  game: '游戏名称',
  avatar: '/juequling.png',
  title: '游戏活动',
  image: 'http://sx6mbttvl.hb-bkt.clouddn.com/hd1.png',
  dueDate: '2025-07-29 18:00:00',
})

dayjs.extend(utc)
dayjs.extend(timezone)
const seconds = ref(0)
watch(
  () => props.dueDate,
  (newDueDate) => {
    const nowDate = dayjs().tz('Asia/Shanghai')
    const due = dayjs(newDueDate).tz('Asia/Shanghai')
    seconds.value = due.diff(nowDate, 'second')
  },
  { immediate: true },
)
const isExpired = ref(false)
const dd = computed(() => Math.floor(seconds.value / (60 * 60 * 24)))
const hh = computed(() => Math.floor((seconds.value % (60 * 60 * 24)) / 3600))
const mm = computed(() => Math.floor((seconds.value % 3600) / 60))
const ss = computed(() => seconds.value % 60)

let timer: number | any

onMounted(() => {
  if (seconds.value < 0) {
    isExpired.value = true
    return
  }
  timer = setInterval(() => {
    if (seconds.value > 0) {
      seconds.value--
    }
    else {
      clearInterval(timer)
    }
  }, 1000)
})

onUnmounted(() => {
  if (timer)
    clearInterval(timer)
})
</script>

<template>
  <motion.div :while-press="{ scale: 0.95 }" :while-hover="{ scale: 1.03 }" class="card-box flex flex-col gap-row-2 w-80 select-none">
    <div class="p-x-2 p-t-4 flex gap-col-2 items-center">
      <img :src="`${avatar}`" class="rounded-full h-6 w-6">
      <span>{{ game }}</span>
      <!-- 倒计时 -->
      <div class="flex flex-1 h-5 w-15 items-center justify-end">
        <div class="text-sm">
          <NumberFlowGroup>
            <div
              class="text-sm text-stone-800 font-semibold flex items-baseline"
            >
              <NumberFlow
                class="p-r-2"
                suffix="天"
                :trend="-1"
                :value="dd"
                :format="{ minimumIntegerDigits: 1 }"
              />
              <NumberFlow :trend="-1" :value="hh" :format="{ minimumIntegerDigits: 2 }" />
              <NumberFlow
                prefix=":"
                :trend="-1"
                :value="mm"
                :digits="{ 1: { max: 5 } }"
                :format="{ minimumIntegerDigits: 2 }"
              />
              <NumberFlow
                prefix=":"
                :trend="-1"
                :value="ss"
                :digits="{ 1: { max: 5 } }"
                :format="{ minimumIntegerDigits: 2 }"
              />
            </div>
          </NumberFlowGroup>
        </div>
      </div>
    </div>
    <div>
      <span class="text-lg font-bold p-x-2">{{ title }}</span>
    </div>
    <img :src="image" class="rounded-b-md w-full">
  </motion.div>
</template>

<style scoped>
.card-box{
  --uno:'rounded-md shadow-lg border-white  bg-white/60';
}
</style>

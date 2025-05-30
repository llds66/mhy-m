<script setup lang="ts">
import NumberFlow, { NumberFlowGroup } from '@number-flow/vue'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { motion } from 'motion-v'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import showToast from '@/common/composables/useToast'

const props = withDefaults(defineProps<{
  game?: string
  avatar?: string
  codeArr?: string[]
  dueDate?: string | number
  boxColor?: 'blue' | 'orange' | 'green'
}>(), {
  game: 'game',
  codeArr: () => ['AAAAAAAAAA', 'BBBBBBBBBBB', 'CCCCCCCCCCCC'],
  dueDate: '2025-05-29 18:00:00',
  boxColor: 'blue',
})

const cardClass = computed(() => ({
  'border-#43CF7C/80 bg-#43CF7C shadow-#43CF7C/60': props.boxColor === 'green',
  'border-#FF8D1A/80 bg-#FF8D1A shadow-#FF8D1A/60': props.boxColor === 'orange',
  'border-#2A82E4/80 bg-#2A82E4 shadow-#2A82E4/60': props.boxColor === 'blue',
}))

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

const hh = computed(() => Math.floor(seconds.value / 3600))
const mm = computed(() => Math.floor((seconds.value % 3600) / 60))
const ss = computed(() => seconds.value % 60)

let timer: number | any
const isExpired = ref(false)
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

// 创建一个对象存储每个 code 的 loading 状态
const loadingStates = ref<Record<string, boolean>>({})

// 复制函数
async function copyTextToClipboard(code: string) {
  try {
    // 设置对应 code 的 loading 状态为 true
    loadingStates.value[code] = true
    await navigator.clipboard.writeText(code)
    console.log('Text successfully copied to clipboard')
    showToast('已复制', { duration: 2000 })
    setTimeout(() => {
      // 设置对应 code 的 loading 状态为 false
      loadingStates.value[code] = false
    }, 2000)
  }
  catch (err) {
    console.error('Failed to copy: ', err)
    loadingStates.value[code] = false // 复制失败时也要恢复 loading 状态
  }
}
</script>

<template>
  <div class="flex w-80">
    <motion.div
      :while-press="{ scale: 1.03 }"
      class="card-box"
      :class="cardClass"
    >
      <div class="flex gap-col-2 items-center">
        <!-- Work avatar and name -->
        <img :src="`${avatar}`" class="rounded-full h-6 w-6">
        <span class="font-bold">{{ game }}</span>
        <!-- Time -->
        <div class="flex flex-1 h-5 w-15 items-center justify-end">
          <div class="text-sm">
            <NumberFlowGroup v-if="!isExpired">
              <div
                class="text-sm text-stone-900 font-semibold flex items-baseline"
              >
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
            <span v-else :class="isExpired ? 'text-stone-800' : 'text-stone-900'">已过期</span>
          </div>
        </div>
      </div>
      <!-- Code and Copy -->
      <div class="flex flex-col gap-row-3">
        <div v-for="code in codeArr" :key="code" class="flex gap-col-5 items-center justify-between">
          <span class="text-xl" :class="isExpired ? 'text-stone-900' : 'text-stone-950 font-bold'">{{ code }}</span>
          <motion.div
            :while-hover="{ scale: 1.1 }"
            :while-press="{ scale: 0.9 }"
            class="text-xl font-bold"
            :class="loadingStates[code] ? 'i-iconamoon-check-light' : 'i-iconamoon-copy-light'"
            @click="copyTextToClipboard(code)"
          />
        </div>
      </div>
    </motion.div>
  </div>
</template>

<style scoped>
.card-box{
  --uno:'p-x-4 p-y-2 border-1 rounded-lg  flex flex-1 flex-col gap-row-5 shadow-lg backdrop-blur-lg opacity-80';
}
</style>

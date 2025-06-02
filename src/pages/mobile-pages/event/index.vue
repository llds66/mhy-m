<script setup lang='ts'>
import Event from '@components/Event.vue'
import showToast from '@composables/useToast'
import { motion } from 'motion-v'
import { onMounted, ref } from 'vue'

interface DataItem {
  version: string
  name: string
  avatar: string
  dueDate: string
  codeArr: string[]
  boxColor: 'blue' | 'orange' | 'green'
}
interface EventItem {
  id: number
  game: string
  avatar: string
  title: string
  dueDate: string
  image: string
}
interface ApiResponse {
  codes: DataItem[]
  events: EventItem[]
}

const eventList = ref<EventItem[]>([])

async function getData() {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 4000)

    const res = await fetch('https://llds.tech/data', {
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!res.ok)
      throw new Error(`HTTP error! Status: ${res.status}`)

    const data: ApiResponse = await res.json()
    eventList.value = data.events
    console.log('✅ 成功获取数据:', data)
  }
  catch (err: any) {
    if (err.name === 'AbortError') {
      console.error('❌ 请求超时')
      showToast('请求超时', { duration: 2000 })
    }
    else {
      showToast('请求失败', { duration: 2000 })
      console.error('❌ 请求失败:', err)
    }
  }
}
onMounted(() => {
  getData()
})
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
          v-for="item in eventList" :key="item.game"
          :game="item.game"
          :avatar="item.avatar"
          :title="item.title"
          :due-date="item.dueDate"
          :image="item.image"
        />
      </div>
    </div>
  </div>
</template>

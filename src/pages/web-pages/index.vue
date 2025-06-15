<script setup lang='ts'>
import Btn from '@components/Btn.vue'
import Code from '@components/Code.vue'
import Event from '@components/Event.vue'
import showToast from '@composables/useToast'
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

const dataList = ref<DataItem[]>([])
const eventList = ref<EventItem[]>([])

const loading = ref(false)
async function getData(bool: boolean = false) {
  try {
    loading.value = true

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 4000)

    const res = await fetch('https://llds.tech/data', {
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!res.ok)
      throw new Error(`HTTP error! Status: ${res.status}`)

    const data: ApiResponse = await res.json()
    dataList.value = data.codes
    eventList.value = data.events
    console.log(eventList.value)

    if (bool) {
      showToast('刷新成功', { duration: 2000 })
    }
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
  finally {
    loading.value = false
  }
}

onMounted(() => {
  getData()
})
</script>

<template>
  <div class="mx-auto flex container">
    <div class="mx-auto mt-10">
      <div class="flex-center gap-col-5">
        <Btn link="https://mhymd.csx.pw/" title="官网" />
        <Btn link="https://github.com/llds66/mhy-m" icon="i-mingcute-github-line" />
      </div>
      <div class="m-y-5 flex-center md:m-y-10">
        <span class="text-2xl font-bold">米哈游兑换码</span>
      </div>
      <div class="flex-center flex-wrap gap-5">
        <Code
          v-for="item in dataList" :key="item.version"
          :version="item.version"
          :due-date="item.dueDate"
          :avatar="item.avatar"
          :game="item.name"
          :code-arr="item.codeArr"
          :box-color="item.boxColor"
        />
      </div>

      <div class="m-y-5 flex-center md:m-y-10">
        <span class="text-2xl font-bold">近期活动</span>
      </div>

      <div class="flex-center flex-wrap gap-5">
        <div v-if="eventList.length">
          <Event
            v-for="item in eventList"
            :key="item.game"
            :game="item.game"
            :avatar="item.avatar"
            :title="item.title"
            :due-date="item.dueDate"
            :image="item.image"
          />
        </div>
        <div v-else class="text-sm text-stone-500">
          暂无数据
        </div>
      </div>
    </div>
  </div>
</template>

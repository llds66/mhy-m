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
const dataList = ref<DataItem[]>([])

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

    const data = await res.json()
    dataList.value = data
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
  <div class="mx-auto flex h-screen container">
    <div class="mx-auto mt-10">
      <div class="flex-center gap-col-5">
        <span class="text-sm">v0.2.0</span>
        <Btn link="https://mhymd.csx.pw/" title="官网" />
        <Btn link="https://github.com/llds66/mhy-m" icon="i-mingcute-github-line" />
        <Btn link="https://qm.qq.com/q/RTW81z5CUK" icon="i-mingcute-qq-line" />
        <Btn link="mailto:lldsshun@163.com" icon="i-mingcute-mail-line" />
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

<script setup lang='ts'>
import Code from '@components/Code.vue'
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
  <div class="dot-bg h-screen">
    <div class="h-15" />
    <div
      class="text-center flex-center select-none"
    >
      <motion.div
        class="p-x-4 p-y-2 rounded-lg flex-center gap-col-3"
        :while-hover="{ scale: 1.1 }"
        :while-press="{ scale: 0.9 }"
        @click="getData(true)"
      >
        <span class="text-2xl text-stone-800 font-bold">米哈游兑换码</span>
        <motion.div
          :animate="{ rotate: loading ? 150 : 0 }"
          class="i-iconamoon-synchronize-duotone text-xl"
        />
      </motion.div>
    </div>
    <div class="h-5" />
    <div class="flex-center">
      <div class="flex flex-col gap-row-5 w-85% items-center justify-center">
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
    </div>
    <div class="text-sm text-stone-300 mx-auto mt-10 text-center">
      Made by LsAng
    </div>
  </div>
</template>

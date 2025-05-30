<script setup lang='ts'>
import Code from '@components/Code.vue'
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

    const res = await fetch('http://llds.tech/data', {
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
        <div>
          <a
            target="_blank" href="https://mhymd.csx.pw/"
            class="p-2 rounded-md flex transition-colors duration-200 hover:bg-#f3f4f7"
          >
            <span class="text-sm">官网</span>
          </a>
        </div>
        <div>
          <a
            target="_blank" href="https://github.com/llds66/mhy-m"
            class="p-2 rounded-md flex transition-colors duration-200 hover:bg-#f3f4f7"
          >
            <div class="i-mingcute-github-line text-lg" />
          </a>
        </div>
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
      <div class="text-sm text-stone-600 mt-10 text-center flex-center flex-col gap-2 md:mt-20 md:gap-2">
        <div> QQ群：2558496669</div>
        <div>邮箱：lldsshun@163.com</div>
      </div>
    </div>
  </div>
</template>

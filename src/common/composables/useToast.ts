import Toast from '@components/Toast.vue'
import { createApp } from 'vue'

interface ToastOptions {
  duration?: number
}

function showToast(msg: string, options: ToastOptions = { duration: 1500 }) {
  const { duration } = options
  const div = document.createElement('div')

  // 创建组件实例并传递 props
  const componentInstance = createApp(Toast, {
    show: true,
    msg,
    duration,
  })

  // 挂载并插入到 body
  componentInstance.mount(div)
  document.body.appendChild(div)

  let timer: ReturnType<typeof setTimeout> | null = null
  if (timer) {
    clearTimeout(timer)
  }

  // 控制定时器来关闭 toast
  timer = setTimeout(() => {
    componentInstance.unmount()
    document.body.removeChild(div)
  }, duration)
}

export default showToast

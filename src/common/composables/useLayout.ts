import Desktop from '@layouts/Desktop/index.vue'
import Mobile from '@layouts/Mobile/index.vue'
import Web from '@layouts/Web/index.vue'
import { platform } from '@tauri-apps/plugin-os'
import { ref, shallowRef } from 'vue'

/**
 * 获取系统布局
 */
export function useLayout() {
  const layoutName = ref('')
  const layout = shallowRef(Web)
  try {
    const platformName = platform()
    if (platformName === 'android') {
      layout.value = Mobile
      layoutName.value = 'Mobile'
    }
    else if (platformName === 'windows') {
      layout.value = Desktop
      layoutName.value = 'Desktop'
    }
  }
  catch {
    layout.value = Web
    layoutName.value = 'Web'
  }

  return { layout, layoutName }

  /**
   * Test layout
   */
  layout.value = Mobile
  layoutName.value = 'Mobile'
  return { layout, layoutName }
}

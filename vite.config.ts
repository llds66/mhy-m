import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import MotionResolver from 'motion-v/resolver'
import UnoCSS from 'unocss/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

const host = process.env.TAURI_DEV_HOST

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [
    vue(),
    UnoCSS(),
    Components({
      dts: true,
      resolvers: [MotionResolver()],
    }),
  ],
  // 别名配置
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@pages': resolve(__dirname, 'src/pages'),
      '@layouts': resolve(__dirname, 'src/layouts'),
      '@components': resolve(__dirname, 'src/common/components'),
      '@composables': resolve(__dirname, 'src/common/composables'),
      '@assets': resolve(__dirname, 'src/common/assets'),
      '@apis': resolve(__dirname, 'src/common/apis'),
      '@http': resolve(__dirname, 'src/common/http'),
      '@utils': resolve(__dirname, 'src/common/utils'),
      '@pinia': resolve(__dirname, 'src/pinia'),
    },
  },

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
          protocol: 'ws',
          host,
          port: 1421,
        }
      : undefined,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ['**/src-tauri/**'],
    },
  },
}))

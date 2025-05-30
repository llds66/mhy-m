import pinia from '@pinia/index'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'virtual:uno.css'
import './style.css'

const app = createApp(App)

app
  .use(router)
  .use(pinia)
  .mount('#app')

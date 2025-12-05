import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import {createI18n} from "vue-i18n";
import zh from './locale/zh.json'

const i18n = createI18n({
  legacy: false,           // 👈 Must be false to use Composition API
  globalInjection: true,
  locale: 'zh',
  fallbackLocale: 'zh',
  messages: {
    zh,
  }
})

const app = createApp(App)

app.use(router)
app.use(i18n)

app.mount('#app')

import { createI18n } from 'vue-i18n'

// Base JSON locales
import zhBase from '@/locale/zh.json'
import kzBase from '@/locale/kz.json'   // create an empty file first if you don't have it yet
import ruBase from '@/locale/ru.json'   // same here

// Modular messages (e.g., products)
import { productMessages } from './products'
// Expected shape: { zh?: {...}, kz?: {...}, ru?: {...} }

export type Lang = 'zh' | 'kz' | 'ru'
const SUPPORTED: Lang[] = ['zh', 'kz', 'ru']

import type { LText } from './types'

export function L(t: LText | undefined, locale?: string): string {
  if (!t) return ''
  if (typeof t === 'string') return t
  const lang = locale ?? currentLocale.value // however you store it
  return (t as any)[lang] ?? t.en ?? t.zh ?? ''
}

function detectLocale(): Lang {
  // 1) URL prefix
  const prefix = location.pathname.split('/')[1]
  if (SUPPORTED.includes(prefix as Lang)) return prefix as Lang

  // 2) localStorage
  const saved = localStorage.getItem('locale')
  if (SUPPORTED.includes(saved as Lang)) return saved as Lang

  // 3) browser language
  const nav = (navigator.language || '').toLowerCase()
  if (nav.startsWith('ru')) return 'ru'
  if (nav.startsWith('kk') || nav.startsWith('kz')) return 'kz'
  return 'zh'
}

function mergeMessages(base: Record<string, any>, mod?: Record<string, any>) {
  // Shallow merge is enough for typical i18n trees; adjust if you need deep merge
  return { ...base, ...(mod ?? {}) }
}

const messages = {
  zh: mergeMessages(zhBase as object, productMessages.zh),
  kz: mergeMessages(kzBase as object, productMessages.kz ?? productMessages.zh),
  ru: mergeMessages(ruBase as object, productMessages.ru ?? productMessages.zh),
}

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: detectLocale(),
  fallbackLocale: 'zh',
  messages,
})
i18n.global.setLocaleMessage('zh', messages.zh as any)
i18n.global.setLocaleMessage('kz', messages.kz as any)
i18n.global.setLocaleMessage('ru', messages.ru as any)


export function setLocale(lang: Lang) {
  i18n.global.locale.value = lang   // must be .value
  localStorage.setItem('locale', lang)
  document.documentElement.setAttribute('lang', lang)
}

export default i18n

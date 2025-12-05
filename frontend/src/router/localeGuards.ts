// src/router/guard.i18n.ts
import { i18n } from '@/i18n'

const SUPPORTED = ['zh', 'kz', 'ru'] as const
type Lang = typeof SUPPORTED[number]

export function installI18nGuard(router: any) {
  router.beforeEach((to: any, _from: any, next: any) => {
    const lang = to.params.locale as string | undefined

    // If URL has a valid locale, use it
    if (lang && SUPPORTED.includes(lang as Lang)) {
      if (i18n.global.locale.value !== lang) {
        i18n.global.locale.value = lang as Lang
        document.documentElement.lang = lang === 'zh' ? 'zh-CN' : lang === 'kz' ? 'kk-KZ' : 'ru-RU'
      }
      return next()
    }

    // No/invalid locale in URL → inject current (or default) locale into the path
    const current = (i18n.global.locale.value as Lang) || 'zh'
    const clean = to.fullPath.startsWith('/') ? to.fullPath : `/${to.fullPath}`
    return next({ path: `/${current}${clean}`, replace: true })
  })
}

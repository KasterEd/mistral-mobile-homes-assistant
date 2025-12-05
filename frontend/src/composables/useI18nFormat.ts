// useI18nFormat.ts
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

// Map our app locales → Intl locales
const mapLocale = (l: string) => (l === 'zh' ? 'zh-CN' : l === 'kz' ? 'kk-KZ' : 'ru-RU')

export function useI18nFormat() {
  const { locale } = useI18n({ useScope: 'global' })

  // Rebuild when locale changes
  const dateFormatter = computed(() =>
    new Intl.DateTimeFormat(mapLocale(locale.value), { year: 'numeric', month: '2-digit', day: '2-digit' })
  )

  function formatDate(d: string | number | Date) {
    return dateFormatter.value.format(new Date(d))
  }

  return { formatDate }
}

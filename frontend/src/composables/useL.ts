import { useI18n } from 'vue-i18n';
import type { Lang, LText } from '@/types/localized';

export function useL() {
  const { locale } = useI18n();

  function L(text?: LText, fallback = ''): string {
    if (!text) return fallback;
    const lang = (locale.value as Lang) ?? 'zh';
    return text[lang] ?? text.zh ?? fallback;
  }

  function LP(list?: LText[]): string[] {
    if (!list) return [];
    return list.map((t) => L(t));
  }

  return { L, LP, locale };
}

<template>
  <article class="group rounded-2xl border bg-white overflow-hidden hover:shadow-md transition">
    <RouterLink :to="detailPath" class="block bg-gray-100 aspect-[4/3]">
      <img
        v-if="item.cover"
        :src="item.cover"
        :alt="L(item.title)"
        class="w-full h-full object-cover group-hover:scale-105 transition"
      />
    </RouterLink>

    <div class="p-4">
      <RouterLink :to="detailPath" class="block font-semibold text-gray-900 group-hover:text-blue-600 line-clamp-2">
        {{ L(item.title) }}
      </RouterLink>

      <p v-if="item.excerpt" class="mt-2 text-sm text-gray-600 line-clamp-2">
        {{ L(item.excerpt) }}
      </p>

      <div class="mt-3 text-xs text-gray-400">{{ formattedDate }}</div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import type { NewsItem, LocalizedText } from '@/data/news'
import {useL} from "@/composables/useL.ts";

const props = defineProps<{ item: NewsItem }>()
const route = useRoute()
const { locale } = useI18n({ useScope: 'global' })

/** Keep /zh|kz|ru prefix if present */
const localizedPath = (target: string) => {
  const m = route.fullPath.match(/^\/(zh|kz|ru)(\/|$)/)
  if (m) {
    const lang = m[1]
    const clean = target.startsWith('/') ? target : `/${target}`
    return `/${lang}${clean === '/' ? '' : clean}`
  }
  return target
}

const detailPath = computed(() =>
  localizedPath(`/news/${props.item.category}/${props.item.slug}`)
)

/** Localized text with safe fallback to zh */
const {L} = useL()
/** Locale date formatting (no function in template) */
function mapBCP47(l: string) { return l === 'zh' ? 'zh-CN' : l === 'kz' ? 'kk-KZ' : 'ru-RU' }
const dateFormatter = computed(
  () => new Intl.DateTimeFormat(mapBCP47(locale.value), { year: 'numeric', month: '2-digit', day: '2-digit' })
)
const formattedDate = computed(() => {
  const d = new Date(props.item.publishedAt)
  return isNaN(d.getTime()) ? '' : dateFormatter.value.format(d)
})
</script>

<template>
  <section class="max-w-7xl mx-auto px-4 py-8">
    <!-- Breadcrumb -->
<!--    <nav class="text-sm text-gray-500 mb-4 flex items-center gap-2">-->
<!--      <RouterLink :to="localizedPath('/')" class="hover:text-blue-600">{{ L(TEXT.home) }}</RouterLink>-->
<!--      <span>/</span>-->
<!--      <RouterLink :to="localizedPath('/news')" class="hover:text-blue-600">{{ L(TEXT.news) }}</RouterLink>-->
<!--      <span v-if="categoryName">/</span>-->
<!--      <span v-if="categoryName" class="text-gray-700">{{ categoryName }}</span>-->
<!--    </nav>-->

    <!-- Title -->
<!--    <header class="mb-6">-->
<!--      <h1 class="text-2xl sm:text-3xl font-semibold text-gray-900">-->
<!--        {{ categoryName || L(TEXT.news) }}-->
<!--      </h1>-->
<!--      <p v-if="intro.length" class="mt-2 text-gray-600">-->
<!--        {{ L(intro[0]) }}-->
<!--      </p>-->
<!--    </header>-->

    <!-- Grid/List -->
    <div v-if="items.length" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <RouterLink
        v-for="n in items"
        :key="n.slug"
        :to="localizedPath(`/news/${category}/${n.slug}`)"
        class="block group rounded-lg overflow-hidden border bg-white hover:shadow transition relative"
        :aria-label="L(n.title)"
      >
        <!-- cover -->
        <div class="relative aspect-[16/9] bg-gray-100 overflow-hidden">
          <img
            v-if="n.cover"
            :src="n.cover"
            :alt="L(n.title)"
            class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
          <!-- hover overlay -->
          <div class="pointer-events-none absolute inset-0 transition-colors duration-200 group-hover:bg-black/10"></div>
        </div>

        <!-- meta -->
        <div class="p-4">
          <div class="text-blue-600 text-sm font-semibold">{{ formatDate(n.publishedAt) }}</div>
          <h3 class="mt-1 font-medium text-gray-900 line-clamp-2">
            {{ L(n.title) }}
          </h3>
          <p v-if="n.excerpt" class="mt-1 text-sm text-gray-600 line-clamp-2">
            {{ asText(n.excerpt) }}
          </p>
        </div>
      </RouterLink>
    </div>

    <div v-else class="py-16 text-center text-gray-500">
      {{ L(TEXT.empty) }}
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useL } from '@/composables/useL'
import type { LText } from '@/types/localized'
import { newsData, newsContent } from '@/data/news'

const route = useRoute()
const { locale } = useI18n({ useScope: 'global' })
const { L } = useL()

// const category = String(route.params.category || '') // '' means /news root
const category = computed(() => String(route.params.category || '')) // '' means /news root
/** Items for this category (prefer flat newsData; fallback to newsContent[category].items) */
// const items = computed(() => {
//   if (!category) return [...newsData].sort(byDateDesc)
//   const flat = newsData.filter(n => n.category === category).sort(byDateDesc)
//   if (flat.length) return flat
//   const grouped = (newsContent as any)?.[category]?.items ?? []
//   return [...grouped].sort(byDateDesc)
// })
const items = computed(() => {
   if (!category.value) return [...newsData].sort(byDateDesc)
   const flat = newsData.filter(n => n.category === category.value).sort(byDateDesc)
   if (flat.length) return flat
   const grouped = (newsContent as any)?.[category.value]?.items ?? []
   return [...grouped].sort(byDateDesc)
})
/** Category title + intro */
const categoryName = computed(() => {
  const labelFromGroup = (newsContent as any)?.[category.value]?.title as LText | undefined
  // if (labelFromGroup) return L(labelFromGroup)
  const fallback: Record<string, LText> = {
    company:  { zh:'公司新闻', kz:'Компания жаңалықтары', ru:'Новости компании' },
    industry: { zh:'行业动态', kz:'Сала жаңалықтары',   ru:'Новости отрасли'  },
  }
  return category.value ? L(fallback[category.value] ?? { zh: category.value, kz: category.value, ru: category.value }) : ''
})

const intro = computed<LText[]>(() => {
  const group = (newsContent as any)?.[category.value]
  return Array.isArray(group?.content) ? group.content : []
})

/** helpers */
function byDateDesc(a:any, b:any) {
  const ad = new Date(a.publishedAt || 0).getTime()
  const bd = new Date(b.publishedAt || 0).getTime()
  return bd - ad
}
function asText(v: unknown): string {
  if (!v) return ''
  if (typeof v === 'string') return v
  return L(v as LText)
}
/** locale-aware date */
function mapBCP47(l: string) { return l === 'zh' ? 'zh-CN' : l === 'kz' ? 'kk-KZ' : 'ru-RU' }
function formatDate(d: string | number | Date) {
  return new Intl.DateTimeFormat(mapBCP47(locale.value), { year:'numeric', month:'2-digit', day:'2-digit' })
    .format(new Date(d))
}
/** keep /zh|kz|ru prefix */
function localizedPath(target: string) {
  const m = route.fullPath.match(/^\/(zh|kz|ru)(\/|$)/)
  if (m) {
    const lang = m[1]
    const clean = target.startsWith('/') ? target : `/${target}`
    return `/${lang}${clean === '/' ? '' : clean}`
  }
  return target
}

/** localized UI strings */
const TEXT = {
  home:  { zh:'首页', kz:'Басты бет',   ru:'Главная' } as LText,
  news:  { zh:'新闻中心', kz:'Жаңалықтар', ru:'Новости' } as LText,
  empty: { zh:'暂无新闻', kz:'Жаңалықтар жоқ', ru:'Новостей пока нет' } as LText,
} as const
</script>

<style scoped>
.line-clamp-2 { display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
</style>

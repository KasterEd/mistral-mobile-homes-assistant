<template>
  <section class="max-w-7xl mx-auto px-4 py-8">
    <!-- Breadcrumb -->
    <nav class="text-sm text-gray-500 mb-4 flex items-center gap-2">
      <RouterLink :to="localizedPath('/')" class="hover:text-blue-600">{{ L(TEXT.home) }}</RouterLink>
      <span>/</span>
      <RouterLink :to="localizedPath('/news')" class="hover:text-blue-600">{{ L(TEXT.news) }}</RouterLink>
      <span v-if="categoryName">/</span>
      <RouterLink
        v-if="categoryName"
        :to="localizedPath(`/news/${category}`)"
        class="hover:text-blue-600"
      >
        {{ categoryName }}
      </RouterLink>
      <span v-if="article">/</span>
      <span v-if="article" class="text-gray-700 line-clamp-1">{{ L(article.title) }}</span>
    </nav>

    <!-- Not Found -->
    <div v-if="!article" class="py-16 text-center text-gray-500">
      {{ L(TEXT.notFound) }}
      <div class="mt-4">
        <RouterLink :to="localizedPath(`/news/${category}`)" class="text-blue-600 hover:underline">
          ← {{ L(TEXT.backToCategory) }}
        </RouterLink>
      </div>
    </div>

    <!-- Article -->
    <article v-else>
      <!-- Title & Meta -->
      <header class="mb-6">
        <h1 class="text-2xl sm:text-3xl font-semibold text-gray-900">
          {{ L(article.title) }}
        </h1>
        <div class="mt-2 text-sm text-gray-500 flex flex-wrap items-center gap-x-3 gap-y-1">
          <time v-if="article.publishedAt" :datetime="String(article.publishedAt)">
            {{ formatDate(article.publishedAt) }}
          </time>
          <span v-if="categoryName" class="hidden sm:inline">·</span>
          <RouterLink v-if="categoryName" :to="localizedPath(`/news/${category}`)" class="hover:text-blue-600">
            {{ categoryName }}
          </RouterLink>
        </div>
      </header>

      <!-- Cover image -->
      <div v-if="article.cover" class="mb-6">
        <img :src="article.cover" :alt="L(article.title)" class="w-full h-auto rounded-lg border" />
      </div>

      <!-- Body -->
      <div class="prose max-w-none prose-gray">
        <!-- Flexible: supports string | LText | LText[] -->
        <template v-if="Array.isArray(article.content)">
          <p v-for="(p,i) in article.content" :key="i">{{ asText(p) }}</p>
        </template>
        <template v-else-if="article.content">
          <p>{{ asText(article.content) }}</p>
        </template>
        <template v-else>
          <!-- Fallback to category intro paragraph if article lacks content -->
          <p v-for="(p,i) in categoryIntro" :key="i">{{ L(p) }}</p>
        </template>
      </div>

      <!-- Prev / Next -->
      <footer class="mt-10 border-t pt-6 flex flex-col sm:flex-row justify-between gap-3 text-sm">
        <RouterLink
          v-if="prev"
          :to="localizedPath(`/news/${category}/${prev.slug}`)"
          class="text-gray-700 hover:text-blue-600"
        >← {{ L(prev.title) }}</RouterLink>

        <span class="flex-1"></span>

        <RouterLink
          v-if="next"
          :to="localizedPath(`/news/${category}/${next.slug}`)"
          class="text-gray-700 hover:text-blue-600 text-right"
        >{{ L(next.title) }} →</RouterLink>
      </footer>

      <!-- Back -->
      <div class="mt-8">
        <RouterLink :to="localizedPath(`/news/${category}`)" class="inline-flex items-center gap-1 text-blue-600 hover:underline">
          ← {{ L(TEXT.backToCategory) }}
        </RouterLink>
      </div>
    </article>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useL } from '@/composables/useL'
import type { LText } from '@/types/localized'

// Your existing data modules
// newsData: flat list of items (category, slug, title, publishedAt, cover?, content?)
// newsContent: grouped content per category { company:{ items:[...] }, industry:{ items:[...] } }
import { newsData, newsContent } from '@/data/news'

const route = useRoute()
const { locale } = useI18n({ useScope: 'global' })
const { L } = useL()

const category = computed(() => String(route.params.category || ''))
const slug = String(route.params.slug || '')

/** Find article: prefer newsData (flat), fallback to newsContent[category].items */
const fromData = computed(() => newsData.find(n => n.slug === slug && n.category === category.value))

const fromContent = computed(() => {
  const group = (newsContent as any)?.[category.value]?.items || []
  return group.find((n: any) => n.slug === slug)
})

const article = computed(() => fromData.value || fromContent.value || null)

/** Category label (localized) */
const categoryName = computed(() => {
  // try newsContent title for category if available, else hardcode names
  const labelFromGroup = (newsContent as any)?.[category.value]?.title as LText | undefined
  if (labelFromGroup) return L(labelFromGroup)
  const fallback: Record<string, LText> = {
    company:  { zh:'公司新闻', kz:'Компания жаңалықтары', ru:'Новости компании' },
    industry: { zh:'行业动态', kz:'Сала жаңалықтары', ru:'Новости отрасли' },
  }
  return fallback[category.value] ? L(fallback[category.value]) : ''
})

/** Fallback intro paragraph(s) if article has no content */
const categoryIntro = computed<LText[]>(() => {
  const group = (newsContent as any)?.[category.value]
  return Array.isArray(group?.content) ? group.content : []
})

/** Prev/Next within same category, sorted by publishedAt desc */
const sortedInCat = computed(() => {
  return [...newsData.filter(n => n.category === category.value)]
    .sort((a, b) => (new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()))
})
const idx = computed(() => sortedInCat.value.findIndex(n => n.slug === slug))
const prev = computed(() => (idx.value > 0 ? sortedInCat.value[idx.value - 1] : null))
const next = computed(() => (idx.value >= 0 && idx.value < sortedInCat.value.length - 1 ? sortedInCat.value[idx.value + 1] : null))

/** Locale-aware date */
function mapBCP47(l: string) { return l === 'zh' ? 'zh-CN' : l === 'kz' ? 'kk-KZ' : 'ru-RU' }
function formatDate(d: string | number | Date) {
  return new Intl.DateTimeFormat(mapBCP47(locale.value), { year:'numeric', month:'2-digit', day:'2-digit' })
    .format(new Date(d))
}

/** Convert mixed shapes (string | LText) into a display string */
function asText(v: unknown): string {
  if (!v) return ''
  if (typeof v === 'string') return v
  return L(v as LText)
}

/** Keep current /zh|kz|ru prefix for links */
function localizedPath(target: string) {
  const m = route.fullPath.match(/^\/(zh|kz|ru)(\/|$)/)
  if (m) {
    const lang = m[1]
    const clean = target.startsWith('/') ? target : `/${target}`
    return `/${lang}${clean === '/' ? '' : clean}`
  }
  return target
}

/** Localized UI strings */
const TEXT = {
  home: { zh:'首页', kz:'Басты бет', ru:'Главная' } as LText,
  news: { zh:'新闻中心', kz:'Жаңалықтар', ru:'Новости' } as LText,
  backToCategory: { zh:'返回该分类', kz:'Санатқа қайта оралу', ru:'Назад к категории' } as LText,
  notFound: { zh:'未找到该新闻', kz:'Жаңалық табылмады', ru:'Новость не найдена' } as LText,
} as const
</script>

<style scoped>
.prose :where(img) { margin: 0; }
</style>

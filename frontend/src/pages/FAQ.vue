<template>
  <section class="max-w-7xl mx-auto px-4 py-8">
    <!-- Breadcrumb -->
    <nav class="text-sm text-gray-500 mb-4 flex items-center gap-2">
      <RouterLink :to="localizedPath('/')" class="hover:text-blue-600">{{ L(TEXT.home) }}</RouterLink>
      <span>/</span>
      <span class="text-gray-700">{{ L(TEXT.faq) }}</span>
    </nav>

    <!-- Title + blurb -->
    <header class="mb-6">
      <h1 class="text-2xl sm:text-3xl font-semibold text-gray-900">
        {{ L(TEXT.faq) }}
      </h1>
      <p class="mt-2 text-gray-600">
        {{ L(TEXT.subtitle) }}
      </p>
    </header>

    <!-- Category tabs -->
    <div class="border-b mb-4 overflow-x-auto">
      <nav class="-mb-px flex gap-4 min-w-max">
        <button
          v-for="c in categories"
          :key="c.slug"
          type="button"
          class="whitespace-nowrap px-3 py-2 border-b-2 text-sm"
          :class="c.slug===active ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-blue-600 hover:border-blue-600'"
          @click="active = c.slug"
        >
          {{ L(c.name) }}
        </button>
      </nav>
    </div>

    <!-- Optional search -->
    <div class="mb-6">
      <input
        v-model.trim="kw"
        :placeholder="L(TEXT.searchPlaceholder)"
        class="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        type="search"
      />
    </div>

    <!-- Accordion list -->
    <div class="divide-y rounded-lg border bg-white">
      <details
        v-for="(item, i) in filtered"
        :key="i"
        class="group open:bg-gray-50"
      >
        <summary class="list-none cursor-pointer px-4 py-3 flex items-center justify-between">
          <span class="font-medium text-gray-900">{{ L(item.q) }}</span>
          <svg class="h-4 w-4 text-gray-400 transition-transform group-open:rotate-180" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clip-rule="evenodd"/>
          </svg>
        </summary>
        <div class="px-4 pb-4 text-gray-700 text-sm leading-relaxed">
          <template v-if="Array.isArray(item.a)">
            <p v-for="(p, j) in item.a" :key="j" class="mt-2 first:mt-0">{{ L(p) }}</p>
          </template>
          <template v-else>
            <p>{{ L(item.a) }}</p>
          </template>
        </div>
      </details>
    </div>

    <!-- Bottom links -->
    <div class="mt-10 flex flex-wrap gap-3 text-sm">
      <RouterLink :to="localizedPath('/contact')" class="text-blue-600 hover:underline">
        {{ L(TEXT.contact) }}
      </RouterLink>
      <RouterLink :to="localizedPath('/products')" class="text-blue-600 hover:underline">
        {{ L(TEXT.products) }}
      </RouterLink>
      <RouterLink :to="localizedPath('/news/company')" class="text-blue-600 hover:underline">
        {{ L(TEXT.news) }}
      </RouterLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useL } from '@/composables/useL'
import type { LText } from '@/data/faq'
import { faqCategories } from '@/data/faq'

const { L } = useL()
const route = useRoute()
const { locale } = useI18n({ useScope: 'global' })

const TEXT = {
  home: { zh:'首页', kz:'Басты бет', ru:'Главная' } as LText,
  faq: { zh:'常见问题', kz:'Жиі қойылатын сұрақтар', ru:'Вопросы и ответы' } as LText,
  subtitle: {
    zh:'以下是客户最常见的问题与解答，若未找到答案，请联系我们。',
    kz:'Төменде ең жиі қойылатын сұрақтарға жауаптар берілген. Табылмаса — бізге жазыңыз.',
    ru:'Ниже ответы на популярные вопросы. Если не нашли нужное — свяжитесь с нами.',
  } as LText,
  searchPlaceholder: { zh:'搜索问题关键字…', kz:'Сұрақ бойынша іздеу…', ru:'Поиск по вопросам…' } as LText,
  contact: { zh:'联系我们', kz:'Байланыс', ru:'Контакты' } as LText,
  products: { zh:'产品中心', kz:'Өнімдер', ru:'Продукция' } as LText,
  news: { zh:'新闻中心', kz:'Жаңалықтар', ru:'Новости' } as LText,
}

const categories = faqCategories
const active = ref<string>(categories[0]?.slug || 'general')
const kw = ref('')

const currentItems = computed(() => categories.find(c => c.slug === active.value)?.items || [])

const filtered = computed(() => {
  const needle = kw.value.toLowerCase()
  if (!needle) return currentItems.value
  const lang = (locale.value as 'zh'|'kz'|'ru') || 'zh'
  return currentItems.value.filter(it => {
    const q = (it.q as any)[lang] as string
    const a = Array.isArray(it.a)
      ? (it.a as any[]).map(p => (p as any)[lang] as string).join('\n')
      : ((it.a as any)[lang] as string)
    return [q, a].join('\n').toLowerCase().includes(needle)
  })
})

/** keep /zh|kz|ru prefix in links */
function localizedPath(target: string) {
  const m = route.fullPath.match(/^\/(zh|kz|ru)(\/|$)/)
  if (m) {
    const lang = m[1]
    const clean = target.startsWith('/') ? target : `/${target}`
    return `/${lang}${clean === '/' ? '' : clean}`
  }
  return target
}
</script>

<style scoped>
details + details { border-top: 1px solid #eee; }
details[open] summary { background: #f9fafb; }
summary::-webkit-details-marker { display: none; }
</style>

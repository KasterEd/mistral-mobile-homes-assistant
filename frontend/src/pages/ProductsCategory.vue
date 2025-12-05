<template>
  <section class="w-full">
    <!-- Top breadcrumb + category tabs -->
    <div class="bg-gray-50 border-b">
      <div class="mx-auto max-w-7xl px-4 py-3 text-sm text-gray-600 flex items-center gap-2">
        <RouterLink to="/" class="hover:text-blue-600">{{ L(TEXT.breadcrumb.home) }}</RouterLink>
        <span>/</span>
        <RouterLink
          :to="{ name: 'products', params: { category: activeCategory?.slug ?? '' } }"
          class="hover:text-blue-600"
        >
          {{ L(TEXT.breadcrumb.products) }}
        </RouterLink>
        <span v-if="activeCategory">/ {{ L(activeCategory.name) }}</span>
      </div>
    </div>

    <!-- Mega category bar (scrollable on mobile) -->
    <div class="sticky top-[64px] z-10 bg-white/90 backdrop-blur border-b">
      <div class="mx-auto max-w-7xl px-4 overflow-x-auto">
        <div class="flex gap-3 py-3 min-w-max">
          <RouterLink
            v-for="c in productCategories"
            :key="c.slug"
            :to="{ name: 'products', params: { category: c.slug } }"
            class="px-3 py-2 rounded-full border text-sm whitespace-nowrap"
            :class="c.slug===route.params.category ? 'bg-blue-600 text-white border-blue-600' : 'hover:bg-gray-50'"
          >
            {{ L(c.name) }}
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- Title + blurb -->
    <div class="mx-auto max-w-7xl px-4 text-center">
      <h1 class="text-2xl sm:text-3xl font-semibold tracking-tight mt-8">
        {{ pageTitle }}
      </h1>
      <p class="mt-2 text-gray-500 text-sm">
        {{ pageBlurb }}
      </p>
    </div>

    <!-- Grid of cards (6 per page) -->
    <div class="mx-auto max-w-7xl px-4 mt-6">
      <div v-if="paged.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProductCard v-for="p in paged" :key="p.slug" :product="p" />
      </div>
      <div v-else class="text-center text-gray-500 py-20">
        {{ L(TEXT.empty) }}
      </div>

      <Pagination
        class="mb-12"
        v-model:page="page"
        :total="list.length"
        :per-page="6"
        :labels="{ prev: L(TEXT.prev), next: L(TEXT.next) }"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProductCard from '@/components/ProductCard.vue'
import Pagination from '@/components/Pagination.vue'

import { useL } from '@/composables/useL'
import {products, productCategories, type ProductCategory} from '@/data/products'
import type { LText } from '@/types/localized'

const route = useRoute()
const router = useRouter()
const { L } = useL()

/** Localized UI text for this page */
const TEXT = {
  breadcrumb: {
    home:      { zh:'首页',   kz:'Басты бет',   ru:'Главная' } as LText,
    products:  { zh:'产品中心', kz:'Өнімдер',     ru:'Продукция' } as LText,
  },
  title:        { zh:'产品中心', kz:'Өнімдер',     ru:'Продукция' } as LText,
  empty:        { zh:'暂无产品', kz:'Өнімдер жоқ', ru:'Пока нет товаров' } as LText,
  prev:         { zh:'上一页',   kz:'Алдыңғы',     ru:'Назад' } as LText,
  next:         { zh:'下一页',   kz:'Келесі',       ru:'Вперёд' } as LText,
} as const

/** Active category by route param */
const activeCategory = computed(() =>
  productCategories.find(c => c.slug === String(route.params.category))
)

/** Derived title + blurb (from productCategoryContent) */
const pageTitle = computed(() => {
  const slug = activeCategory.value?.slug
  if (!slug) return L(TEXT.title)
  const copy = productCategories[slug]
  return copy ? L(copy.title) : L(activeCategory.value!.name)
})
const pageBlurb = computed(() => {
  const slug = activeCategory.value?.slug
  if (!slug) return ''
  const copy = productCategories[slug]
  // show the first paragraph if present
  return copy?.content?.length ? L(copy.content[0]) : ''
})

/** Pagination state in query */
const page = ref(Number(route.query.page ?? 1) || 1)
watch(() => route.query.page, v => { page.value = Number(v || 1) })
watch(page, p => {
  router.replace({ name: 'products', params: { category: activeCategory.value?.slug ?? '' }, query: { ...route.query, page: String(p) } })
  if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' })
})

/** List & paged items */
const list = computed(() => {
  const slug = activeCategory.value?.slug
  return slug ? products.filter(p => p.category === slug) : []
})
const paged = computed(() => {
  const start = (page.value - 1) * 6
  return list.value.slice(start, start + 6)
})
</script>

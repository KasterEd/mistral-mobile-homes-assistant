<!-- src/pages/ProductDetail.vue -->
<template>
  <section class="max-w-7xl mx-auto px-4 py-8">
    <!-- Breadcrumb -->
    <nav class="text-sm text-gray-500 mb-4 flex items-center gap-2">
      <RouterLink :to="localizedPath('/')" class="hover:text-blue-600">{{ L(TEXT.home) }}</RouterLink>
      <span>/</span>
      <RouterLink :to="localizedPath(`/products/${category}`)" class="hover:text-blue-600">
        {{ categoryName || category }}
      </RouterLink>
      <span>/</span>
      <span class="text-gray-700">
        {{ product ? L(product.title) : L(TEXT.notFound) }}
      </span>
    </nav>

    <!-- When product is found -->
    <div v-if="product" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <img
          v-if="product.cover"
          :src="product.cover"
          :alt="L(product.title)"
          class="w-full h-auto rounded-lg border"
        />
        <div v-if="product.gallery?.length" class="mt-3 grid grid-cols-4 gap-2">
          <img
            v-for="(g,i) in product.gallery"
            :key="i"
            :src="g"
            class="w-full h-20 object-cover rounded border"
            :alt="`${L(product.title)} ${i+1}`"
          />
        </div>
      </div>

      <div>
        <h1 class="text-2xl sm:text-3xl font-semibold">{{ L(product.title) }}</h1>
        <p v-if="product.excerpt" class="mt-2 text-gray-600">{{ L(product.excerpt) }}</p>

        <ul v-if="product.bullets?.length" class="mt-4 space-y-2 text-sm text-gray-700 list-disc pl-5">
          <li v-for="(b,i) in product.bullets" :key="i">{{ L(b) }}</li>
        </ul>

        <div class="mt-6">
          <RouterLink
            :to="localizedPath('/contact')"
            class="inline-flex items-center gap-2 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            {{ L(TEXT.cta) }}
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- Fallback description (category intro) and Not Found state -->
    <div class="mt-10 prose max-w-none">
      <h2 class="text-xl font-semibold mb-3">
        {{ product ? L(product.title) : (categoryName || category) }}
      </h2>

      <template v-if="introParagraphs.length">
        <p v-for="(p,i) in introParagraphs" :key="i" class="text-gray-700 leading-relaxed">
          {{ L(p) }}
        </p>
      </template>

      <div v-else class="text-gray-500">
        {{ L(TEXT.noDescription) }}
      </div>
    </div>

  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useL } from '@/composables/useL'
import type { LText } from '@/types/localized'
import { products, productCategories, productContent as productCategoryContent } from '@/data/products'

const route = useRoute()
const { L } = useL()

const category = String(route.params.category || '')
const slug = String(route.params.slug || '')

const product = computed(() => products.find(p => p.slug === slug))

const categoryName = computed(() => {
  const c = productCategories.find(x => x.slug === (product.value?.category || category))
  return c ? L(c.name) : ''
})

const introParagraphs = computed(() => {
  const cc = productCategoryContent[product.value?.category || category]
  return cc?.content ?? []
})

function localizedPath(target: string) {
  const m = route.fullPath.match(/^\/(zh|kz|ru)(\/|$)/)
  if (m) {
    const lang = m[1]
    const clean = target.startsWith('/') ? target : `/${target}`
    return `/${lang}${clean === '/' ? '' : clean}`
  }
  return target
}

const TEXT = {
  home: { zh:'首页', kz:'Басты бет', ru:'Главная' } as LText,
  notFound: { zh:'未找到该产品', kz:'Өнім табылмады', ru:'Товар не найден' } as LText,
  noDescription: { zh:'暂无详细介绍。', kz:'Егжей-тегжейлі сипаттама жоқ.', ru:'Подробного описания пока нет.' } as LText,
  cta: { zh:'获取报价', kz:'Баға сұрау', ru:'Запросить цену' } as LText,
}
</script>

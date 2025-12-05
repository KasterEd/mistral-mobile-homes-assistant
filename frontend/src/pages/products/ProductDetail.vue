<template>
  <section class="w-full">
    <!-- Breadcrumb -->
    <div class="bg-gray-50 border-b">
      <div class="mx-auto max-w-7xl px-4 py-3 text-sm text-gray-600 flex items-center gap-2">
        <RouterLink to="/" class="hover:text-blue-600">{{ t('products.breadcrumb.home') }}</RouterLink>
        <span>/</span>
        <RouterLink
          :to="{ name: 'products', params: { category: fromCategory || product?.category || '' } }"
          class="hover:text-blue-600"
        >
          {{ t('products.breadcrumb.products') }}
        </RouterLink>
        <span v-if="product">/ {{ l(product.title) }}</span>
      </div>
    </div>

    <!-- Main content -->
    <div v-if="product" class="mx-auto max-w-7xl px-4 py-8 grid gap-8 lg:grid-cols-2">
      <!-- Gallery -->
      <div>
        <div class="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
          <img :src="activeImg" :alt="l(product.title)" class="w-full h-full object-cover" />
        </div>
        <div v-if="product.gallery?.length" class="mt-3 grid grid-cols-4 gap-3">
          <button
            v-for="(g,i) in product.gallery"
            :key="i"
            class="aspect-[4/3] rounded-xl overflow-hidden border"
            @click="activeImg = g"
          >
            <img :src="g" :alt="l(product.title)+'-'+(i+1)" class="w-full h-full object-cover" />
          </button>
        </div>
      </div>

      <!-- Info -->
      <div>
        <h1 class="text-2xl sm:text-3xl font-semibold">{{ l(product.title) }}</h1>
        <p v-if="product.excerpt" class="mt-3 text-gray-600">{{ l(product.excerpt) }}</p>

        <div v-if="product.specs && Object.keys(product.specs).length" class="mt-6">
          <h2 class="font-semibold mb-2">{{ t('products.specs') }}</h2>
          <ul class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <li
              v-for="(v,k) in product.specs"
              :key="k"
              class="p-3 rounded-xl bg-gray-50 border"
            >
              <div class="text-xs text-gray-500">{{ k }}</div>
              <div class="text-sm">{{ l(v) }}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { products, type LocalizedText } from '@/data/catalog'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const { t, locale } = useI18n()
const fromCategory = route.params.category as string | undefined

// helper for LocalizedText fields
function l(txt?: LocalizedText) {
  if (!txt) return ''
  return locale.value === 'zh' ? txt.zh : txt.kz
}

const product = computed(() =>
  products.find(p => p.slug === String(route.params.slug))
)

const activeImg = ref(product.value?.gallery?.[0] || product.value?.cover || '')
</script>

<!-- src/components/dropdowns/ProductDropdown.vue -->
<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { productCategories } from '@/data/products'
import { useL } from '@/composables/useL'
const { L } = useL()

// optional header copy
const HEADER = {
  title: { zh:'产品中心', kz:'Өнімдер', ru:'Продукция' },
  desc:  { zh:'按品类浏览全部产品', kz:'Санаттар бойынша шолу', ru:'Просматривайте по категориям' },
}
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 p-2">
    <!-- Left: Title & Text -->
    <div class="md:col-span-2 space-y-3">
      <h3 class="text-2xl font-semibold text-gray-800">{{ L(HEADER.title) }}</h3>
      <p class="text-base text-gray-600 leading-relaxed">{{ L(HEADER.desc) }}</p>
    </div>

    <!-- Right: all categories (scroll if long) -->
    <div class="md:col-span-1 max-h-[60vh] overflow-auto pr-1">
      <div class="grid grid-cols-1 gap-y-3">
        <RouterLink
          v-for="c in productCategories"
          :key="c.slug"
          :to="`/products/${c.slug}`"
          class="flex items-center justify-between px-4 py-2 bg-white rounded-lg hover:bg-gray-50 transition"
        >
          <span class="text-gray-700 truncate">{{ L(c.name) }}</span>
          <svg class="w-4 h-4 text-blue-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L13.586 11H3a1 1 0 110-2h10.586l-3.293-3.293a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
          </svg>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

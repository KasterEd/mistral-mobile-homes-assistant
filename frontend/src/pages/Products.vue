<template>
  <section class="max-w-6xl mx-auto px-4 py-8">
    <!-- Page Title -->
    <h1 class="text-3xl font-bold text-center mb-10">
      {{ L(TEXT.title) }}
    </h1>

    <!-- Product Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <RouterLink
        v-for="item in productCategories"
        :key="item.slug"
        :to="`/products/${item.slug}`"
        class="border rounded shadow hover:shadow-lg transition bg-white"
      >
        <img
          :src="item.image"
          :alt="L(item.name)"
          class="w-full h-48 object-cover rounded-t"
          loading="lazy"
          decoding="async"
        />
        <div class="p-4 text-center text-lg font-medium">
          {{ L(item.name) }}
        </div>
      </RouterLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { productCategories } from '@/data/products'
import { useL } from '@/composables/useL'
import type { LText } from '@/types/localized'

const { L } = useL()

// Localized UI title (avoid t())
const TEXT = {
  title: { zh: '产品中心', kz: 'Өнімдер', ru: 'Продукция' } as LText,
} as const
</script>

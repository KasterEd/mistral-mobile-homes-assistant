<!-- src/components/ProductCard.vue -->
<template>
  <router-link
    :to="`/products/${product.slug}`"
    class="block border rounded overflow-hidden shadow hover:shadow-lg transition"
  >
    <img :src="product.image" :alt="product.name" class="w-full h-48 object-cover" />
    <div class="p-4 text-center text-sm font-medium text-gray-800">
      {{ product.name }}
    </div>
  </router-link>
</template>

<script setup lang="ts">
import type { ProductCategory } from '@/data/products'

defineProps<{
  product: ProductCategory
}>()
</script>

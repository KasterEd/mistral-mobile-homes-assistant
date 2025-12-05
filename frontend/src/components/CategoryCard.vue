<!-- src/components/CategoryCard.vue -->
<template>
  <RouterLink
    :to="to"
    class="block rounded-2xl border bg-white overflow-hidden shadow-sm hover:shadow-md transition"
    :aria-label="nameText"
  >
    <div class="aspect-[4/3] bg-gray-100 overflow-hidden">
      <img
        :src="category.image"
        :alt="nameText"
        class="w-full h-full object-cover transition group-hover:scale-105"
        loading="lazy"
        decoding="async"
      />
    </div>
    <div class="p-4 text-center text-sm sm:text-base font-medium text-gray-800 line-clamp-1">
      {{ nameText }}
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import type { ProductCategory } from '@/data/products'
import { useL } from '@/composables/useL'

const props = defineProps<{ category: ProductCategory }>()
const { L } = useL()

const nameText = computed(() => L(props.category.name))
const to = computed(() => `/products/${props.category.slug}`)
</script>

<template>
  <article
    class="group rounded-2xl border bg-white shadow-sm overflow-hidden hover:shadow-md transition shadow-gray-100"
  >
    <RouterLink :to="detailTo" class="block aspect-[4/3] bg-gray-100 overflow-hidden" :aria-label="titleText">
      <img
        :src="product.cover"
        :alt="titleText"
        class="w-full h-full object-cover group-hover:scale-105 transition"
        loading="lazy"
        decoding="async"
      />
    </RouterLink>

    <div class="p-4">
      <RouterLink
        :to="detailTo"
        class="font-semibold text-gray-900 group-hover:text-blue-600 line-clamp-1"
        :aria-label="titleText"
      >
        {{ titleText }}
      </RouterLink>

      <p v-if="product.excerpt" class="mt-2 text-sm text-gray-500 line-clamp-2">
        {{ excerptText }}
      </p>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Product } from '@/data/products'        // <- make sure your Product uses LText fields
import { useL } from '@/composables/useL'

const props = defineProps<{ product: Product }>()
const { L } = useL()

// Precompute localized strings once (keeps template simple)
const titleText   = computed(() => L(props.product.title))
const excerptText = computed(() => L(props.product.excerpt))

// Keep your existing route shape; adjust if your router names differ
const detailTo = computed(() => ({
  name: 'product-detail',
  params: {
    category: props.product.category, // e.g., 'folding-house'
    slug: props.product.slug,         // e.g., 'fh-01'
  },
}))
</script>

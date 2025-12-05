<template>
  <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
    <a
      v-for="p in items"
      :key="L(p.name)"
      :href="p.url || '#'"
      target="_blank"
      rel="noopener"
      class="group rounded-lg border bg-white p-4 flex flex-col items-center text-center hover:shadow transition"
    >
      <div class="h-16 w-32 flex items-center justify-center overflow-hidden">
        <img :src="p.logo" :alt="L(p.name)" class="max-h-16 object-contain" />
      </div>
      <div class="mt-3 font-medium text-gray-900 line-clamp-1">{{ L(p.name) }}</div>
      <p v-if="p.blurb" class="mt-1 text-xs text-gray-600 line-clamp-2">
        {{ L(p.blurb) }}
      </p>
    </a>
  </div>
</template>

<script setup lang="ts">
import { useL } from '@/composables/useL'
import type { Partner } from '@/data/partners'
const props = defineProps<{ items: Partner[] }>()
const { L } = useL()
</script>

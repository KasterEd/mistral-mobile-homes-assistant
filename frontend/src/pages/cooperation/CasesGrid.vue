<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <RouterLink
      v-for="item in items"
      :key="item.slug"
      :to="localizedPath(`/cooperation?tab=cases&case=${item.slug}`)"
      class="block rounded-lg overflow-hidden border bg-white hover:shadow transition"
      :aria-label="L(item.title)"
    >
      <div class="relative aspect-[4/3] bg-gray-100 overflow-hidden">
        <img :src="item.cover" :alt="L(item.title)" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
      </div>
      <div class="p-4">
        <h3 class="font-semibold text-gray-900 line-clamp-1">{{ L(item.title) }}</h3>
        <div class="mt-1 text-xs text-gray-500">
          <span v-if="item.year">{{ item.year }}</span>
          <span v-if="item.location"> · {{ L(item.location) }}</span>
        </div>
        <p v-if="item.summary" class="mt-2 text-sm text-gray-600 line-clamp-2">
          {{ L(item.summary) }}
        </p>
        <div v-if="item.tags?.length" class="mt-3 flex flex-wrap gap-2">
          <span v-for="(t, i) in item.tags" :key="i" class="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">
            {{ L(t) }}
          </span>
        </div>
      </div>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useL } from '@/composables/useL'
import type { CaseItem } from '@/data/cases'
const props = defineProps<{ items: CaseItem[] }>()
const { L } = useL()
const route = useRoute()
function localizedPath(target: string) {
  const m = route.fullPath.match(/^\/(zh|kz|ru)(\/|$)/)
  if (m) { const lang = m[1]; const clean = target.startsWith('/')?target:`/${target}`; return `/${lang}${clean==='/'?'':clean}` }
  return target
}
</script>

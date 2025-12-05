<template>
  <nav
    v-if="!hideOnSinglePage || totalPages > 1"
    class="mt-8 flex items-center justify-center gap-2"
    aria-label="Pagination"
  >
    <button
      type="button"
      class="px-3 py-2 rounded border text-sm disabled:opacity-50"
      :disabled="page <= 1"
      @click="goTo(page - 1)"
    >
      {{ labels.prev }}
    </button>

    <button
      v-for="p in pages"
      :key="p"
      type="button"
      class="w-9 h-9 rounded border text-sm"
      :class="p === page ? 'bg-blue-600 text-white border-blue-600' : 'hover:bg-gray-50'"
      :aria-current="p === page ? 'page' : undefined"
      @click="p !== page && goTo(p)"
    >
      {{ p }}
    </button>

    <button
      type="button"
      class="px-3 py-2 rounded border text-sm disabled:opacity-50"
      :disabled="page >= totalPages"
      @click="goTo(page + 1)"
    >
      {{ labels.next }}
    </button>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  page: number
  total: number
  perPage?: number
  labels: { prev: string; next: string }
  hideOnSinglePage?: boolean
}>(), {
  perPage: 6,
  hideOnSinglePage: true,
})

const emit = defineEmits<{ (e: 'update:page', value: number): void }>()

const totalPages = computed(() => Math.max(1, Math.ceil(props.total / (props.perPage || 6))))
const pages = computed(() => Array.from({ length: totalPages.value }, (_, i) => i + 1))

function goTo(p: number) {
  const clamped = Math.min(Math.max(1, p), totalPages.value)
  if (clamped !== props.page) emit('update:page', clamped)
}
</script>

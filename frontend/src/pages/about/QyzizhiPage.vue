<template>
  <section class="max-w-7xl mx-auto px-4 py-8">
    <h1 class="text-2xl sm:text-3xl font-semibold mb-4">{{ L(data.title) }}</h1>
    <div class="prose max-w-none prose-gray">
      <p v-for="(p,i) in data.content" :key="i">{{ L(p) }}</p>
    </div>

    <div v-if="data.images?.length" class="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <img v-for="(src,i) in data.images" :key="i" :src="src" class="w-full h-auto rounded border" alt="certificate"/>
    </div>
  </section>
</template>

<script setup lang="ts">
import { aboutContent } from '@/data/about'
import { useL } from '@/composables/useL'
const { L } = useL()
const data = aboutContent.qyzizhi
</script>

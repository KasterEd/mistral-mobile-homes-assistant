<template>
  <section class="max-w-7xl mx-auto px-4 py-8">
    <h1 class="text-2xl sm:text-3xl font-semibold mb-4">{{ L(data.title) }}</h1>

    <ul v-if="data.bullets?.length" class="list-disc pl-5 text-gray-800 space-y-2">
      <li v-for="(b,i) in data.bullets" :key="i">{{ L(b) }}</li>
    </ul>

    <div class="prose max-w-none prose-gray mt-4">
      <p v-for="(p,i) in data.content" :key="i">{{ L(p) }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { aboutContent } from '@/data/about'
import { useL } from '@/composables/useL'
const { L } = useL()
const data = aboutContent.qywh
</script>

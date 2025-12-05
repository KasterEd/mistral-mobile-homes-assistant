<template>
  <section class="max-w-7xl mx-auto px-4 py-8">
    <h1 class="text-2xl sm:text-3xl font-semibold mb-4">{{ L(data.title) }}</h1>
    <div class="prose max-w-none prose-gray">
      <p v-for="(p,i) in data.content" :key="i">{{ L(p) }}</p>
    </div>

    <!-- Example download list -->
    <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <a v-for="d in downloads" :key="d.href" :href="d.href" download
         class="border rounded p-4 hover:shadow bg-white flex items-center justify-between">
        <span class="text-sm">{{ d.name }}</span>
        <span class="text-blue-600 text-xs">↓</span>
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
import { aboutContent } from '@/data/about'
import { useL } from '@/composables/useL'
const { L } = useL()
const data = aboutContent.zlxz

// Replace with real files (move to /public/docs and use /docs/xxx.pdf)
const downloads = [
  { name: '产品手册.pdf', href: '/docs/catalog.pdf' },
  // { name: '安装指南.pdf', href: '/docs/install-guide.pdf' },
]
</script>

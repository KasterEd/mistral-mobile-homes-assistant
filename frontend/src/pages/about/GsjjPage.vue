<template>
  <section class="max-w-7xl mx-auto px-4 py-8">
<!--    <nav class="text-sm text-gray-500 mb-4 flex items-center gap-2">-->
<!--      <RouterLink :to="localizedPath('/')" class="hover:text-blue-600">{{ L(TEXT.home) }}</RouterLink>-->
<!--      <span>/</span>-->
<!--      <span class="text-gray-700">{{ L(data.title) }}</span>-->
<!--    </nav>-->

    <h1 class="text-2xl sm:text-3xl font-semibold mb-4">{{ L(data.title) }}</h1>

    <div class="prose max-w-none prose-gray">
      <p v-for="(p,i) in data.content" :key="i">{{ L(p) }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRoute, RouterLink } from 'vue-router'
import { aboutContent } from '@/data/about'
import { useL } from '@/composables/useL'
const { L } = useL()
const route = useRoute()
const data = aboutContent.gsjj

function localizedPath(target: string) {
  const m = route.fullPath.match(/^\/(zh|kz|ru)(\/|$)/)
  if (m) { const lang = m[1]; const clean = target.startsWith('/')?target:`/${target}`; return `/${lang}${clean==='/'?'':clean}` }
  return target
}
const TEXT = { home: { zh:'首页', kz:'Басты бет', ru:'Главная' } }
</script>

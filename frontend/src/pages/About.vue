<!-- src/pages/about/About.vue -->
<template>
  <section class="max-w-7xl mx-auto px-4 py-6">
    <!-- Breadcrumb -->
    <nav class="text-sm text-gray-500 mb-4 flex items-center gap-2">
      <RouterLink :to="localizedPath('/')" class="hover:text-blue-600">{{ L(TEXT.home) }}</RouterLink>
      <span>/</span>
      <span class="text-gray-700">{{ L(TEXT.about) }}</span>
    </nav>

    <!-- Title -->
    <header class="mb-4">
      <h1 class="text-2xl sm:text-3xl font-semibold text-gray-900">
        {{ L(TEXT.about) }}
      </h1>
    </header>

    <!-- Tabs (no body content here) -->
    <div class="border-b mb-6">
      <nav class="-mb-px flex flex-wrap gap-4">
        <RouterLink
          v-for="tab in tabs"
          :key="tab.slug"
          :to="localizedPath(`/about/${tab.slug}`)"
          class="whitespace-nowrap px-3 py-2 border-b-2 text-sm"
          :class="isActive(tab.slug)
            ? 'border-blue-600 text-blue-600'
            : 'border-transparent text-gray-600 hover:text-blue-600 hover:border-blue-600'"
        >
          {{ L(tab.label) }}
        </RouterLink>
      </nav>
    </div>

    <!-- Child renders the actual page (e.g., GsjjPage, QywhPage, …) -->
    <router-view />
  </section>
</template>

<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { useL } from '@/composables/useL'
import { aboutPages as tabs } from '@/data/about' // uses { slug, label:{zh,kz,ru} }

type LText = { zh:string; kz:string; ru:string }
const { L } = useL()
const route = useRoute()

const TEXT = {
  home:  { zh:'首页',   kz:'Басты бет',        ru:'Главная' } as LText,
  about: { zh:'关于我们', kz:'Біз туралы',       ru:'О нас'   } as LText,
}

function isActive(slug: string) {
  return route.params?.slug === slug
}

/** keep current /zh|kz|ru prefix in links */
function localizedPath(target: string) {
  const m = route.fullPath.match(/^\/(zh|kz|ru)(\/|$)/)
  if (m) {
    const lang = m[1]
    const clean = target.startsWith('/') ? target : `/${target}`
    return `/${lang}${clean === '/' ? '' : clean}`
  }
  return target
}
</script>

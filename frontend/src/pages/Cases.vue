<template>
  <section class="max-w-7xl mx-auto px-4 py-8">
    <header class="mb-6">
      <h1 class="text-2xl sm:text-3xl font-semibold text-gray-900">{{ L(TEXT.cases) }}</h1>
      <p class="mt-2 text-gray-600">{{ L(TEXT.subtitle) }}</p>
    </header>
    <CasesGrid :items="cases" />
  </section>
</template>

<script setup lang="ts">
import { cases } from '@/data/cases'
import CasesGrid from '@/pages/cooperation/CasesGrid.vue'
import { useL } from '@/composables/useL'
type LText = { zh:string; kz:string; ru:string }
const { L } = useL()
const TEXT = {
  cases: { zh:'项目案例', kz:'Жоба кейстері', ru:'Проектные кейсы' } as LText,
  subtitle: {
    zh:'部分代表性项目摘要。',
    kz:'Өкіл жобалардың қысқаша мазмұны.',
    ru:'Краткие сведения по репрезентативным проектам.',
  } as LText,
}
</script>

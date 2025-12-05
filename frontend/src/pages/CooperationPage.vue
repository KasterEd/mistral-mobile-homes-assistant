<template>
  <section class="max-w-7xl mx-auto px-4 py-8">
    <!-- Breadcrumb -->
    <nav class="text-sm text-gray-500 mb-4 flex items-center gap-2">
      <RouterLink :to="localizedPath('/')" class="hover:text-blue-600">{{ L(TEXT.home) }}</RouterLink>
      <span>/</span>
      <span class="text-gray-700">{{ L(TEXT.cooperation) }}</span>
    </nav>

    <!-- Title -->
    <header class="mb-4">
      <h1 class="text-2xl sm:text-3xl font-semibold text-gray-900">
        {{ L(TEXT.cooperation) }}
      </h1>
      <p class="mt-2 text-gray-600">{{ L(TEXT.subtitle) }}</p>
    </header>

    <!-- Tabs -->
    <div class="border-b mb-6">
      <nav class="-mb-px flex gap-4">
        <button
          v-for="t in tabs"
          :key="t.key"
          class="px-3 py-2 border-b-2 text-sm"
          :class="isActive(t.key) ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-blue-600 hover:border-blue-600'"
          @click="goTab(t.key)"
        >
          {{ L(t.label) }}
        </button>
      </nav>
    </div>

    <!-- Content -->
    <div v-if="active==='cases'">
      <CasesGrid :items="casesList" />
    </div>
    <div v-else>
      <PartnersGrid :items="partnersList" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useL } from '@/composables/useL'
import CasesGrid from '@/pages/cooperation/CasesGrid.vue'
import PartnersGrid from '@/pages/cooperation/PartnersGrid.vue'
import { cases } from '@/data/cases'
import { partners } from '@/data/partners'

type LText = { zh:string; kz:string; ru:string }
const { L } = useL()
const route = useRoute()
const router = useRouter()

const TEXT = {
  home: { zh:'首页', kz:'Басты бет', ru:'Главная' } as LText,
  cooperation: { zh:'合作与伙伴', kz:'Ынтымақтастық және серіктестер', ru:'Сотрудничество и партнёры' } as LText,
  subtitle: {
    zh:'精选项目案例与合作伙伴，展示模块化交付与服务能力。',
    kz:'Жобалар мен серіктестер — модульді жеткізу және сервисті көрсетеміз.',
    ru:'Избранные кейсы и партнёры — демонстрация модульных поставок и сервиса.',
  } as LText,
}
const tabs = [
  { key: 'cases',    label: { zh:'案例', kz:'Кейстер', ru:'Кейсы' } as LText },
  { key: 'partners', label: { zh:'伙伴', kz:'Серіктестер', ru:'Партнёры' } as LText },
]

const active = computed(() => (String(route.query.tab || 'cases') === 'partners' ? 'partners' : 'cases'))
const casesList = computed(() => cases)
const partnersList = computed(() => partners)

function goTab(key: 'cases' | 'partners') {
  router.replace({ query: { ...route.query, tab: key } })
}

function isActive(key: string) {
  return active.value === key
}
function localizedPath(target: string) {
  const m = route.fullPath.match(/^\/(zh|kz|ru)(\/|$)/)
  if (m) { const lang = m[1]; const clean = target.startsWith('/')?target:`/${target}`; return `/${lang}${clean==='/'?'':clean}` }
  return target
}
</script>

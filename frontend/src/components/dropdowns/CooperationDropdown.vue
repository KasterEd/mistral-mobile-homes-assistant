<!--&lt;!&ndash; src/components/dropdowns/CooperationDropdown.vue &ndash;&gt;-->
<!--<template>-->
<!--  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">-->
<!--    &lt;!&ndash; Left Column: Title & Text &ndash;&gt;-->
<!--    <div class="md:col-span-2 space-y-3">-->
<!--      <h3 class="text-2xl font-semibold text-gray-800">-->
<!--        {{ tr('cooperation.title') }}-->
<!--      </h3>-->
<!--      <p class="text-base text-gray-600 leading-relaxed">-->
<!--        {{ tr('cooperation.lead') }}-->
<!--      </p>-->
<!--    </div>-->

<!--    &lt;!&ndash; Right Column: Link Cards &ndash;&gt;-->
<!--    <div class="md:col-span-1 grid grid-rows-2 gap-y-3">-->
<!--      <RouterLink-->
<!--        v-for="item in items"-->
<!--        :key="item.slug"-->
<!--        :to="localizedPath(`/cooperation?tab=${item.slug}`)"-->
<!--        class="flex items-center justify-between px-4 py-2 bg-white rounded-lg hover:bg-gray-50 transition"-->
<!--      >-->
<!--        <span class="text-gray-700 truncate">{{ labelOf(item) }}</span>-->
<!--        <svg class="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">-->
<!--          <path-->
<!--            fill-rule="evenodd"-->
<!--            d="M10.293 15.707a1 1 0 010-1.414L13.586 11H3a1 1 0 110-2h10.586l-3.293-3.293a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"-->
<!--            clip-rule="evenodd"-->
<!--          />-->
<!--        </svg>-->
<!--      </RouterLink>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script setup lang="ts">-->
<!--import { useI18n } from 'vue-i18n'-->
<!--import { useRoute } from 'vue-router'-->
<!--import { useL } from '@/composables/useL'-->
<!--import { caseTabs } from '@/data/cases' // [{ slug: 'partners'|'cases', labelKey?: string, label?: LocalizedText|string }]-->

<!--const { t: tr } = useI18n({ useScope: 'global' })-->
<!--const route = useRoute()-->
<!--const L = useL()-->

<!--/** Keep current /zh|kz|ru prefix if URL is like /zh/... /kz/... /ru/... */-->
<!--const localizedPath = (target: string) => {-->
<!--  const m = route.fullPath.match(/^\/(zh|kz|ru)(\/|$)/)-->
<!--  if (m) {-->
<!--    const lang = m[1]-->
<!--    const clean = target.startsWith('/') ? target : `/${target}`-->
<!--    return `/${lang}${clean === '/' ? '' : clean}`-->
<!--  }-->
<!--  return target-->
<!--}-->

<!--/** Resolve label from i18n key or inline LocalizedText/string in caseTabs */-->
<!--function labelOf(tab: any) {-->
<!--  if (tab.labelKey) return tr(tab.labelKey)-->
<!--  if (tab.label && typeof tab.label === 'object') return L(tab.label)-->
<!--  return tab.label || tab.slug-->
<!--}-->

<!--// Show provided tabs as-is-->
<!--const items = caseTabs-->
<!--</script>-->
<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { cooperationDropdown, cooperationDropdownHeader } from '@/data/ui.dropdowns'
import { useL } from '@/composables/useL'
const { L } = useL()
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 p-2">
    <!-- Left: Title & Text -->
    <div class="md:col-span-2 space-y-3">
      <h3 class="text-2xl font-semibold text-gray-800">
        {{ L(cooperationDropdownHeader.title) }}
      </h3>
      <p class="text-base text-gray-600 leading-relaxed">
        {{ L(cooperationDropdownHeader.desc) }}
      </p>
    </div>

    <!-- Right: Link Cards -->
    <div class="md:col-span-1 grid grid-rows-3 gap-y-3">
      <RouterLink
        v-for="link in cooperationDropdown"
        :key="link.to"
        :to="link.to"
        class="flex items-center justify-between px-4 py-2 bg-white rounded-lg hover:bg-gray-50 transition"
      >
        <span class="text-gray-700 truncate">{{ L(link.title) }}</span>
        <svg class="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path
            fill-rule="evenodd"
            d="M10.293 15.707a1 1 0 010-1.414L13.586 11H3a1 1 0 110-2h10.586l-3.293-3.293a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </RouterLink>
    </div>
  </div>
</template>

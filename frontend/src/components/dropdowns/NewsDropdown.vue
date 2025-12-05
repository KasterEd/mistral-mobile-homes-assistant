<!--&lt;!&ndash; src/components/dropdowns/NewsDropdown.vue &ndash;&gt;-->
<!--<template>-->
<!--  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">-->
<!--    &lt;!&ndash; Left Column: Title & Text &ndash;&gt;-->
<!--    <div class="md:col-span-2 space-y-3">-->
<!--      <h3 class="text-2xl font-semibold text-gray-800">-->
<!--        {{ tr('news.breadcrumb.news') }}-->
<!--      </h3>-->
<!--      <p class="text-base text-gray-600 leading-relaxed">-->
<!--        {{ tr('dropdowns.news.desc') }}-->
<!--      </p>-->
<!--    </div>-->

<!--    &lt;!&ndash; Right Column: Link Cards &ndash;&gt;-->
<!--    <div class="md:col-span-1 grid grid-rows-3 gap-y-3">-->
<!--      <RouterLink-->
<!--        v-for="item in items"-->
<!--        :key="item.slug"-->
<!--        :to="localizedPath(`/news/${item.slug}`)"-->
<!--        class="flex items-center justify-between px-4 py-2 bg-white rounded-lg hover:bg-gray-50 transition"-->
<!--      >-->
<!--        <span class="text-gray-700 truncate">{{ tr(item.labelKey) }}</span>-->
<!--        <svg class="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">-->
<!--          <path fill-rule="evenodd"-->
<!--                d="M10.293 15.707a1 1 0 010-1.414L13.586 11H3a1 1 0 110-2h10.586l-3.293-3.293a1 1 0 011.414-1.414l5 5a1 1 0 01-1.414 0z"-->
<!--                clip-rule="evenodd" />-->
<!--        </svg>-->
<!--      </RouterLink>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script setup lang="ts">-->
<!--import { useI18n } from 'vue-i18n'-->
<!--import { useRoute } from 'vue-router'-->

<!--const { t: tr } = useI18n({ useScope: 'global' })-->
<!--const route = useRoute()-->

<!--/** Keep current locale prefix if URL is like /zh/... /kz/... /ru/... */-->
<!--const localizedPath = (target: string) => {-->
<!--  const m = route.fullPath.match(/^\/(zh|kz|ru)(\/|$)/)-->
<!--  if (m) {-->
<!--    const lang = m[1]-->
<!--    const clean = target.startsWith('/') ? target : `/${target}`-->
<!--    return `/${lang}${clean === '/' ? '' : clean}`-->
<!--  }-->
<!--  return target-->
<!--}-->

<!--/** Three news buckets */-->
<!--const items = [-->
<!--  { slug: 'company',  labelKey: 'news.company'  },-->
<!--  { slug: 'industry', labelKey: 'news.industry' },-->
<!--  { slug: 'faq',      labelKey: 'news.faq'      },-->
<!--]-->
<!--</script>-->
<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { newsDropdown, newsDropdownHeader } from '@/data/ui.dropdowns'
import { useL } from '@/composables/useL'
const { L } = useL()
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 p-2">
    <!-- Left: Title & Text -->
    <div class="md:col-span-2 space-y-3">
      <h3 class="text-2xl font-semibold text-gray-800">
        {{ L(newsDropdownHeader.title) }}
      </h3>
      <p class="text-base text-gray-600 leading-relaxed">
        {{ L(newsDropdownHeader.desc) }}
      </p>
    </div>

    <!-- Right: Link Cards -->
    <div class="md:col-span-1 grid grid-rows-3 gap-y-3">
      <RouterLink
        v-for="link in newsDropdown"
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

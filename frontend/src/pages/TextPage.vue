<template>
<!--  <section class="max-w-screen-xl mx-auto px-6 py-10 space-y-6">-->
    <!-- Page Title (from nav.aboutPages.<slug>) -->
<!--    <header>-->
<!--      <h1 class="text-2xl sm:text-3xl font-semibold">-->
<!--        {{ tr(titleKey) }}-->
<!--      </h1>-->
<!--      <p v-if="descKey && te(descKey)" class="mt-2 text-gray-600">-->
<!--        {{ tr(descKey) }}-->
<!--      </p>-->
<!--    </header>-->

    <!-- Specific page component if registered; otherwise fallback -->
    <component v-if="Resolved" :is="Resolved" />
<!--    <div v-else class="prose max-w-none">-->
<!--      <p v-if="contentKey && te(contentKey)">-->
<!--        {{ tr(contentKey) }}-->
<!--      </p>-->
<!--      <p v-else class="text-gray-500">-->
<!--        {{ tr('home.common.noIntro') }}-->
<!--      </p>-->
<!--    </div>-->
<!--  </section>-->
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

// Dedicated about pages (use any that exist; others can be omitted safely)
import GsjjPage from '@/pages/about/GsjjPage.vue'
import QywhPage from '@/pages/about/QywhPage.vue'
import QyzizhiPage from '@/pages/about/QyzizhiPage.vue'
import ShezerenPage from '@/pages/about/ShezerenPage.vue'
import ShfwPage from '@/pages/about/ShfwPage.vue'
import ZiliaoxiazaiPage from '@/pages/about/ZiliaoxiazaiPage.vue'

// Props passed from router:
//   props: route => ({ section: route.params.slug, type: 'about' })
const props = defineProps<{
  section: string
  type?: 'about'
}>()

const { t: tr, te } = useI18n({ useScope: 'global' })

/**
 * Registry: map about slugs to specific components.
 * If a slug is not listed here, the page will render a generic i18n-based block.
 */
const registry: Record<string, any> = {
  gsjj: GsjjPage,
  qywh: QywhPage,
  qyzizhi: QyzizhiPage,
  shezeren: ShezerenPage,
  shfw: ShfwPage,
  'ziliao-xiazai': ZiliaoxiazaiPage,
}

const Resolved = computed(() => registry[props.section])

/**
 * Title comes from nav.aboutPages.<slug> so we don't require about.<slug>.title.
 * Description/content are looked up under about.<slug>.* if present.
 */
const titleKey = computed(() => `nav.aboutPages.${props.section}`)
const descKey = computed(() => {
  // Prefer a <slug>.description if it exists (e.g., about.gsjj.description)
  const key = `about.${props.section}.description`
  return te(key) ? key : ''
})
const contentKey = computed(() => {
  // Optional longer text array or paragraph, adjust to your structure if needed
  // Example tries `about.<slug>.content[0]` style → fall back to `about.<slug>.subtitle`
  const base = `about.${props.section}`
  const contentArray0 = `${base}.content.0`
  if (te(contentArray0)) return contentArray0
  const subtitle = `${base}.subtitle`
  return te(subtitle) ? subtitle : ''
})
</script>

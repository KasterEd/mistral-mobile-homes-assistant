<template>
  <div class="home-page">
    <!-- Hero Swiper -->
   <!-- Full-screen Hero Carousel -->
  <section class="relative w-full">
    <Swiper
      :modules="[Autoplay, Pagination]"
      :loop="true"
      :autoplay="{ delay: 3000, disableOnInteraction: false }"
      :pagination="{ clickable: true }"
      :slides-per-view="1"
      class="w-full h-full"
    >
<!--    <SwiperSlide v-for="(image, i) in images" :key="i">-->
<!--      <img :src="image" class="w-full h-full object-cover" :alt="`Slide ${i+1}`" />-->
<!--    </SwiperSlide>-->
      <SwiperSlide v-for="(image, i) in localeImages" :key="i">
       <img :src="image" class="w-full h-full object-cover" :alt="`Slide ${i+1}`" />
      </SwiperSlide>
    </Swiper>

  <!-- optional gradient overlay
  <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
  -->
  </section>


    <!-- Featured Products -->
    <section class="max-w-7xl mx-auto px-4 py-10">
      <h2 class="text-2xl font-bold text-center mb-6">{{ L(HOME.featured.title) }}</h2>
      <div class="text-center text-gray-600 text-sm mb-6">
        {{ L(HOME.featured.blurb) }}
      </div>
<!--      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">-->
<!--        <CategoryCard-->
<!--          v-for="c in productCategories"-->
<!--          :key="c.slug"-->
<!--          :category="c"-->
<!--        />-->
<!--      </div>-->

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <template v-for="c in productCategories" :key="c.slug">
          <CategoryCard
            v-for="(img, i) in c.image"
            :key="c.slug + '-' + i"
            :category="{ ...c, image: img }"
          />
        </template>
      </div>


    </section>

    <!-- Four-Panel Hover Highlights -->
    <section class="w-full bg-black text-white mt-8">
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        <div
          v-for="sec in homeSections"
          :key="sec.slug"
          class="relative group h-64 md:h-96 overflow-hidden bg-center bg-cover"
          :style="{ backgroundImage: `url(${sec.image})` }"
        >
          <div class="absolute inset-0 bg-black bg-opacity-30 transition-opacity group-hover:bg-opacity-60"></div>

          <div class="absolute bottom-4 left-4 text-lg font-medium">
            {{ L(sec.label) }}
          </div>

          <div class="absolute inset-0 p-6 bg-black bg-opacity-80 text-white opacity-0 group-hover:opacity-100 transition-opacity">
  <h3 class="text-2xl font-semibold mb-2">
    {{ L(getAboutTitle(sec.slug)) || L(toLText(sec.label)) }}
  </h3>
  <p class="text-sm leading-relaxed line-clamp-3">
    {{ L(getAboutBlurb(sec.slug)) || L(HOME.common.noIntro) }}
  </p>

  <RouterLink
    :to="localizedPath(`/about/${sec.slug}`)"
    class="inline-block mt-4 text-blue-400 hover:underline text-sm"
  >
    {{ L(HOME.common.learnMore) }} →
  </RouterLink>
</div>

        </div>
      </div>
    </section>

    <!-- News Focus -->
    <section class="max-w-7xl mx-auto px-4 py-10">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold">{{ L(HOME.news.title) }}</h2>
        <RouterLink :to="localizedPath('/news')" class="border px-4 py-1 text-sm">
          {{ L(HOME.news.all) }}
        </RouterLink>
      </div>
      <p class="text-gray-600 text-sm mb-6">
        {{ L(HOME.news.blurb) }}
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Company News Card -->
        <RouterLink :to="localizedPath('/news/company')" class="relative group block h-64 overflow-hidden rounded-lg">
          <img :src="newsImages.company" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div class="absolute inset-0 bg-black bg-opacity-30"></div>
          <div class="absolute bottom-4 left-4 text-white">
            <h3 class="font-semibold text-lg">{{ L(HOME.news.categories.company) }}</h3>
            <p class="text-xs mt-1 line-clamp-1">
              {{ L(newsContent.company.items[0]?.title) }}
            </p>
          </div>
          <div class="absolute top-4 right-4 text-white text-2xl">＋</div>
        </RouterLink>

        <!-- Industry News Card -->
        <RouterLink :to="localizedPath('/news/industry')" class="relative group block h-64 overflow-hidden rounded-lg">
          <img :src="newsImages.industry" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div class="absolute inset-0 bg-black bg-opacity-30"></div>
          <div class="absolute bottom-4 left-4 text-white">
            <h3 class="font-semibold text-lg">{{ L(HOME.news.categories.industry) }}</h3>
            <p class="text-xs mt-1 line-clamp-1">
              {{ L(newsContent.industry.items[0]?.title) }}
            </p>
          </div>
          <div class="absolute top-4 right-4 text-white text-2xl">＋</div>
        </RouterLink>
      </div>

      <!-- Horizontal News List -->
      <div class="mt-8 overflow-x-auto pb-4">
        <div class="flex space-x-4">
          <RouterLink
            v-for="n in homeNews"
            :key="n.slug"
            :to="localizedPath(`/news/${n.category}/${n.slug}`)"
            class="min-w-[280px] bg-white rounded shadow p-4 hover:shadow-md transition"
          >
            <div class="text-blue-600 text-lg font-bold">
              {{ formatDate(n.publishedAt) }}
            </div>
            <h4 class="font-medium mt-2 line-clamp-2">
              {{ L(n.title) }}
            </h4>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- 服务支持 / Service Support -->
    <section
        class="relative bg-fixed bg-center bg-cover"
        :style="{backgroundImage: `url(${lnebg})`}"
    >
      <div class="absolute inset-0 bg-black bg-opacity-50"></div>

      <div class="relative max-w-screen-xl mx-auto px-6 py-24 text-white">
        <h2 class="text-3xl font-semibold mb-4">{{ L(HOME.service.title) }}</h2>
        <p class="max-w-2xl mx-auto text-center text-sm leading-relaxed">
          {{ L(HOME.service.blurb) }}
        </p>

        <!-- Stats -->
        <div class="mt-12 flex flex-col sm:flex-row justify-center gap-12">
          <div class="text-center">
            <div class="text-5xl font-bold">264+</div>
            <div class="mt-1 text-sm">{{ L(HOME.service.clients) }}</div>
          </div>
          <div class="text-center">
            <div class="text-5xl font-bold">30+</div>
            <div class="mt-1 text-sm">{{ L(HOME.service.regions) }}</div>
          </div>
        </div>

        <!-- Links -->
        <div class="mt-12 flex justify-center space-x-12 text-sm">
          <RouterLink
            :to="localizedPath('/cooperation?tab=demo')"
            class="hover:underline border-b border-transparent hover:border-white pb-1"
          >
            {{ L(HOME.service.cooperation) }}
          </RouterLink>
          <RouterLink
            :to="localizedPath('/about/service')"
            class="hover:underline border-b border-transparent hover:border-white pb-1"
          >
            {{ L(HOME.service.afterSales) }}
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- 免费咨询服务 / Free Consultation -->
    <section class="max-w-screen-xl mx-auto px-6 py-16 space-y-8">
      <h2 class="text-3xl font-semibold text-center">{{ L(HOME.consult.title) }}</h2>
      <p class="max-w-2xl mx-auto text-center text-gray-700 text-sm leading-relaxed">
        {{ L(HOME.consult.blurb) }}
      </p>

      <p class="text-center font-medium text-gray-800">
        {{ L(HOME.consult.hotline) }} <span class="text-blue-600"><strong>Wechat: </strong> ywyy1986 </span>
      </p>

      <form @submit.prevent="onSubmit" class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <input
          v-model="form.message"
          type="text"
          :placeholder="L(HOME.consult.placeholder.message)"
          required
          class="w-full sm:w-1/3 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          v-model="form.email"
          type="email"
          :placeholder="L(HOME.consult.placeholder.email)"
          required
          class="w-full sm:w-1/3 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          :disabled="loading"
          class="w-full sm:w-auto bg-blue-600 text-white rounded px-6 py-2 hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <span v-if="!loading">{{ L(HOME.consult.submit) }}</span>
          <span v-else>Sending…</span>
        </button>
      </form>

<p v-if="errorMsg" class="text-red-600 text-center text-sm mt-2">{{ errorMsg }}</p>
<p v-if="submitted && !errorMsg" class="text-green-700 text-center text-sm mt-2">
  {{ L(HOME.consult.thanks) }}
</p>

    </section>
  </div>
</template>

<script setup lang="ts">
import {reactive, computed, ref} from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

import { useI18n } from 'vue-i18n'
import { useL } from '@/composables/useL'
import ProductCard from '@/components/FeatureCard.vue'

import { products } from '@/data/products'
import { homeSections } from '@/data/homeSections'
import { aboutContent } from '@/data/about'
import { newsContent, newsData } from '@/data/news'
import { HOME } from '@/data/ui.home'

import { productCategories } from '@/data/products'
import CategoryCard from '@/components/CategoryCard.vue'
import lnebg from '/images/home/lne-bg.jpg'

// safe helpers for Home hover cards
import type { LText } from '@/types/localized'

function toLText(v: unknown): LText | undefined {
  if (!v) return undefined
  if (typeof v === 'string') return { zh: v, kz: v, ru: v }
  return v as LText
}

function getAboutTitle(slug: string): LText | undefined {
  const page = (aboutContent as Record<string, any>)[slug]
  if (!page) return undefined
  const t = page.title
  return Array.isArray(t) ? t[0] : t
}

function getAboutBlurb(slug: string): LText | undefined {
  const page = (aboutContent as Record<string, any>)[slug]
  if (!page) return undefined
  const c = page.content
  // allow either a single LText or an array of LText
  const first = Array.isArray(c) ? c[0] : c
  return first
}


const { locale } = useI18n({ useScope: 'global' })
const { L } = useL()
const route = useRoute()
const router = useRouter()

// Hero images
const images = [
  '/images/carousel/slide1.jpg',
  '/images/carousel/slide2.jpg',
  '/images/carousel/slide3.jpg',
  '/images/carousel/slide4.jpg'
]

/** Keep current /zh|kz|ru prefix for links */
function localizedPath(target: string) {
  const m = route.fullPath.match(/^\/(zh|kz|ru)(\/|$)/)
  if (m) {
    const lang = m[1]
    const clean = target.startsWith('/') ? target : `/${target}`
    return `/${lang}${clean === '/' ? '' : clean}`
  }
  return target
}

/** Locale-aware date formatting */
function mapBCP47(l: string) { return l === 'zh' ? 'zh-CN' : l === 'kz' ? 'kk-KZ' : 'ru-RU' }
function formatDate(d: string | number | Date) {
  return new Intl.DateTimeFormat(
    mapBCP47(locale.value),
    { year: 'numeric', month: '2-digit', day: '2-digit' }
  ).format(new Date(d))
}

/** Latest N items (sorted desc by publishedAt) */
const homeNews = computed(() =>
  [...newsData].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1)).slice(0, 10)
)

// News section images
const newsImages = {
  company: '/images/news/comp.jpg',
  industry: '/images/news/industry.jpg'
}

const form = reactive({ message: '', email: '' })
const loading = ref(false)
const errorMsg = ref('')
const submitted = ref(false)

const endpoint = '/api/contact'  // same-origin proxy to FastAPI

async function onSubmit() {
  if (loading.value) return
  errorMsg.value = ''
  submitted.value = false
  loading.value = true
  try {
    const payload = {
      name: 'Homepage Visitor',              // no name field in this form
      email: form.email,
      subject: 'Homepage Consultation Form', // fixed subject
      message: form.message,
    }

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const text = await res.text().catch(() => '')
      throw new Error(text || `Request failed with ${res.status}`)
    }

    submitted.value = true
    form.message = ''
    form.email = ''
  } catch (e:any) {
    console.error('[home consult] send failed', e)
    errorMsg.value = e?.message || 'Send failed. Please try again.'
  } finally {
    loading.value = false
  }
}


const imagesByLocale: Record<string, string[]> = {
  zh: [
    '/images/carousel/slide1.jpg',
    '/images/carousel/slide2.jpg',
    '/images/carousel/slide3.jpg',
  ],
  kz: [
    '/images/carousel/slide1.jpg',
    '/images/carousel/slide2.jpg',
    '/images/carousel/slide3.jpg',
  ],
  ru: [
    '/images/carousel/slide1.jpg',
    '/images/carousel/slide2.jpg',
    '/images/carousel/slide3.jpg',
  ]
}

const localeImages = computed(() => {
  const key = ['zh','kz','ru'].includes(locale.value) ? locale.value : 'zh'
  return imagesByLocale[key]
})

</script>

<style scoped>
@media (max-width: 1024px) {
  .grid-cols-1.md\:grid-cols-2.xl\:grid-cols-4 { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .grid-cols-1.md\:grid-cols-2.xl\:grid-cols-4 { grid-template-columns: 1fr; }
}
.line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
.line-clamp-1 { display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; }
section[style] { background-attachment: fixed; }
</style>

<template>
  <header class="relative bg-white shadow overflow-visible">
    <nav
      class="relative max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between"
      @mouseleave="scheduleClose()"
    >
      <!-- Left: Logo -->
      <RouterLink to="/" class="flex items-center gap-2 shrink-0">
        <img src="/images/logo.jpg" alt="logo" class="h-7 w-auto" />
        <span class="font-semibold">SinoMod</span>
      </RouterLink>

      <!-- Desktop tabs -->
      <ul class="hidden md:flex items-center space-x-8 text-sm font-medium">
        <li
          v-for="item in navItems"
          :key="item.key"
          class="relative"
          @mouseenter="onTriggerEnter(item.key, item.hasDropdown)"
          @mouseleave="onTriggerLeave"
        >
          <RouterLink
            :to="localizedPath(item.to)"
            class="text-gray-700 hover:text-blue-600 transition"
          >
            {{ L(item.label) }}
          </RouterLink>
        </li>
      </ul>

      <!-- Right: Desktop language + Mobile burger -->
      <div class="flex items-center gap-2">
        <!-- Desktop language -->
        <div class="relative hidden md:block" ref="langRef">
          <button
            class="flex items-center gap-2 border rounded-full px-3 py-1.5 text-sm hover:bg-gray-50"
            aria-haspopup="menu"
            :aria-expanded="langOpen ? 'true' : 'false'"
            @click="toggleLang"
            @keydown.escape.prevent="closeLang"
          >
            <span class="uppercase">{{ currentLocaleLabel }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clip-rule="evenodd"/>
            </svg>
          </button>

          <ul
            v-if="langOpen"
            class="absolute right-0 mt-2 w-40 bg-white border shadow-lg rounded-md py-1 z-50"
            role="menu"
          >
            <li><button class="w-full text-left px-3 py-2 hover:bg-gray-50" @click="switchLang('zh')">中文（ZH）</button></li>
            <li><button class="w-full text-left px-3 py-2 hover:bg-gray-50" @click="switchLang('kz')">ҚАЗАҚ (KZ)</button></li>
            <li><button class="w-full text-left px-3 py-2 hover:bg-gray-50" @click="switchLang('ru')">РУССКИЙ (RU)</button></li>
          </ul>
        </div>

        <!-- Mobile: hamburger -->
        <button
          class="md:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-100"
          aria-label="Open menu"
          @click="openMobile()"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>

      <!-- Desktop mega dropdown panel -->
      <div
        v-show="active && dropdownMap[active]"
        class="absolute inset-x-0 top-full bg-white shadow-lg z-40 border-t hidden md:block"
        @mouseenter="onPanelEnter"
        @mouseleave="onPanelLeave"
        ref="dropdownRef"
      >
        <div class="max-w-screen-xl mx-auto px-8 py-6">
          <div class="min-h-56 max-h-[70vh] overflow-auto rounded-xl">
            <component :is="dropdownMap[active!]" />
          </div>
        </div>
      </div>
    </nav>

    <!-- Hover bridge (desktop only) -->
    <div
      v-show="!!active"
      class="absolute inset-x-0 top-full h-3 z-40 hidden md:block"
      @mouseenter="onPanelEnter"
      @mouseleave="onPanelLeave"
    ></div>

    <!-- Mobile drawer + backdrop -->
    <transition enter-active-class="transition opacity-200" leave-active-class="transition opacity-200">
      <div
        v-if="mobileOpen"
        class="fixed inset-0 bg-black/40 z-[60]"
        @click="closeMobile()"
      />
    </transition>

    <transition
      enter-active-class="transform transition duration-200"
      enter-from-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transform transition duration-200"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <aside
        v-if="mobileOpen"
        class="fixed right-0 top-0 bottom-0 z-[61] w-[86%] max-w-sm bg-white shadow-xl flex flex-col"
        @keydown.escape.prevent="closeMobile()"
      >
        <div class="flex items-center justify-between px-4 py-3 border-b">
          <div class="flex items-center gap-2">
            <img src="/images/logo.jpg" alt="logo" class="h-7 w-auto" />
            <span class="font-semibold">SinoMod</span>
          </div>
          <button class="p-2 rounded-md hover:bg-gray-100" @click="closeMobile()" aria-label="Close menu">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Scrollable content -->
        <div class="flex-1 overflow-y-auto px-2 py-2">
          <!-- Mobile links with accordion for items that have dropdowns -->
          <ul class="divide-y">
            <li v-for="item in navItems" :key="item.key">
              <div class="flex items-center justify-between">
                <RouterLink
                  :to="localizedPath(item.to)"
                  class="block w-full px-3 py-3 text-gray-800 text-base"
                  @click="closeMobile()"
                >
                  {{ L(item.label) }}
                </RouterLink>

                <button
                  v-if="item.hasDropdown && dropdownMap[item.key]"
                  class="px-3 py-3"
                  @click="toggleMobileSection(item.key)"
                  :aria-expanded="mobileSections[item.key] ? 'true' : 'false'"
                  aria-controls="mobile-section"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-transform"
                       :class="{'rotate-180': mobileSections[item.key]}"
                       viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clip-rule="evenodd"/>
                  </svg>
                </button>
              </div>

              <!-- Lazy-render dropdown content -->
              <transition
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="opacity-0 -translate-y-1"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition duration-150 ease-in"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 -translate-y-1"
              >
                <div v-if="mobileSections[item.key]" class="px-3 pb-3">
                  <div class="rounded-lg border bg-white">
                    <component :is="dropdownMap[item.key]" />
                  </div>
                </div>
              </transition>
            </li>
          </ul>

          <!-- Language inside drawer -->
          <div class="mt-4 p-3 border rounded-lg">
            <div class="text-sm font-medium mb-2">{{ L({ zh:'语言', kz:'Тіл', ru:'Язык' }) }}</div>
            <div class="flex items-center gap-2">
              <button
                class="px-3 py-1.5 border rounded-full text-sm"
                :class="{'bg-gray-900 text-white': locale === 'zh'}"
                @click="switchLangAndStay('zh')"
              >ZH</button>
              <button
                class="px-3 py-1.5 border rounded-full text-sm"
                :class="{'bg-gray-900 text-white': locale === 'kz'}"
                @click="switchLangAndStay('kz')"
              >KZ</button>
              <button
                class="px-3 py-1.5 border rounded-full text-sm"
                :class="{'bg-gray-900 text-white': locale === 'ru'}"
                @click="switchLangAndStay('ru')"
              >RU</button>
            </div>
          </div>
        </div>

        <!-- Footer (optional) -->
        <div class="px-4 py-3 border-t text-xs text-gray-500">
          © {{ new Date().getFullYear() }} SinoMod
        </div>
      </aside>
    </transition>

    <!-- Debug badge -->
    <div class="fixed bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
      lang={{ currentLocaleLabel }} | home={{ L({ zh:'首页', kz:'Басты бет', ru:'Главная' }) }}
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { RouterLink, useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

import AboutDropdown from '@/components/dropdowns/AboutDropdown.vue'
import ProductDropdown from '@/components/dropdowns/ProductDropdown.vue'
import NewsDropdown from '@/components/dropdowns/NewsDropdown.vue'
import CooperationDropdown from '@/components/dropdowns/CooperationDropdown.vue'

import { setLocale, type Lang } from '@/i18n'
import { useL } from '@/composables/useL'
import { navItems } from '@/data/ui.nav'

const router = useRouter()
const route = useRoute()
const { locale } = useI18n({ useScope: 'global' })
const { L } = useL()

/* ---------- Mega menu (desktop) ---------- */
const active = ref<string | null>(null)
const dropdownRef = ref<HTMLElement | null>(null)
let openTimer: ReturnType<typeof setTimeout> | null = null
let closeTimer: ReturnType<typeof setTimeout> | null = null
const OPEN_DELAY = 120
const CLOSE_DELAY = 360

function scheduleOpen(key: string) {
  if (closeTimer) { clearTimeout(closeTimer); closeTimer = null }
  if (openTimer) clearTimeout(openTimer)
  openTimer = setTimeout(() => { active.value = key }, OPEN_DELAY)
}
function scheduleClose() {
  if (openTimer) { clearTimeout(openTimer); openTimer = null }
  if (closeTimer) clearTimeout(closeTimer)
  closeTimer = setTimeout(() => { active.value = null }, CLOSE_DELAY)
}
function onTriggerEnter(key: string, hasDropdown?: boolean) {
  if (!hasDropdown) { active.value = null; return }
  scheduleOpen(key)
}
function onTriggerLeave() { scheduleClose() }
function onPanelEnter() { if (closeTimer) { clearTimeout(closeTimer); closeTimer = null } }
function onPanelLeave() { scheduleClose() }

/* ---------- Dropdown mapping ---------- */
const dropdownMap: Record<string, any> = {
  products: ProductDropdown,
  news: NewsDropdown,
  cases: CooperationDropdown,
  about: AboutDropdown,
}

/* ---------- Desktop language ---------- */
const langOpen = ref(false)
const langRef = ref<HTMLElement | null>(null)
const currentLocaleLabel = computed(() => (locale.value || 'zh').toUpperCase())
function openLang() { langOpen.value = true }
function closeLang() { langOpen.value = false }
function toggleLang() { langOpen.value = !langOpen.value }

async function switchLang(lang: Lang) {
  closeLang()
  setLocale(lang)
  locale.value = lang
  const path = route.fullPath
  const prefixRE = /^\/(zh|kz|ru)(\/|$)/
  if (prefixRE.test(path)) {
    router.push(path.replace(prefixRE, `/${lang}$2`))
  }
}
function onDocClick(e: MouseEvent) {
  const el = langRef.value
  if (!el) return
  if (!el.contains(e.target as Node)) closeLang()
}
onMounted(() => {
  document.addEventListener('click', onDocClick, { passive: true })
})
onBeforeUnmount(() => {
  document.removeEventListener('click', onDocClick)
})

/* ---------- Mobile drawer ---------- */
const mobileOpen = ref(false)
const mobileSections = ref<Record<string, boolean>>({})

function lockBody(lock: boolean) {
  const b = document.body
  if (lock) {
    b.style.overflow = 'hidden'
    b.style.touchAction = 'none'
  } else {
    b.style.overflow = ''
    b.style.touchAction = ''
  }
}
function openMobile() {
  mobileOpen.value = true
  lockBody(true)
}
function closeMobile() {
  mobileOpen.value = false
  lockBody(false)
  // collapse all sections to avoid huge DOM when reopening
  mobileSections.value = {}
}
function toggleMobileSection(key: string) {
  mobileSections.value[key] = !mobileSections.value[key]
}

/* Keep mobile closed on route change */
watch(() => route.fullPath, () => {
  closeMobile()
  active.value = null
  closeLang()
})

/* Mobile language quick switch (stay on drawer) */
function switchLangAndStay(lang: Lang) {
  setLocale(lang)
  locale.value = lang
  const path = route.fullPath
  const prefixRE = /^\/(zh|kz|ru)(\/|$)/
  if (prefixRE.test(path)) {
    router.replace(path.replace(prefixRE, `/${lang}$2`))
  } else {
    // If your app expects a prefix, you can optionally add it here:
    // router.replace(`/${lang}${path.startsWith('/') ? '' : '/'}${path}`)
  }
}

/* ---------- Optional: localized path helper ---------- */
function localizedPath(target: string) {
  const path = route.fullPath
  const prefixMatch = path.match(/^\/(zh|kz|ru)(\/|$)/)
  if (prefixMatch) {
    const currentLang = prefixMatch[1]
    const clean = target.startsWith('/') ? target : `/${target}`
    return `/${currentLang}${clean === '/' ? '' : clean}`
  }
  return target
}
</script>

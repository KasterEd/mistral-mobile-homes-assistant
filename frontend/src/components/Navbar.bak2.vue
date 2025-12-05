<template>
  <header class="sticky top-0 z-40 bg-white/95 backdrop-blur border-b">
    <nav
      class="relative mx-auto max-w-screen-xl px-4 lg:px-6 py-3 flex items-center justify-between"
    >
      <!-- Logo -->
      <RouterLink to="/" class="flex items-center gap-2 shrink-0">
        <img src="/images/logo.jpg" alt="logo" class="h-8 w-auto" />
        <span class="font-semibold text-base sm:text-lg">SinoMod</span>
      </RouterLink>

      <!-- Right controls (desktop) -->
      <div class="hidden md:flex items-center gap-3">
        <!-- Language switcher (optional) -->
        <select
          class="border rounded-md px-2 py-1 text-sm"
          :value="locale.value"
          @change="onChangeLang(($event.target as HTMLSelectElement).value as Lang)"
        >
          <option value="zh">中文</option>
          <option value="ru">Рус</option>
          <option value="kz">Қаз</option>
          <option value="en">EN</option>
        </select>
        <!-- Contact / CTA -->
        <RouterLink
          :to="localizedPath('/contact')"
          class="inline-flex items-center rounded-xl border px-3 py-1.5 text-sm hover:bg-gray-50"
        >
          {{ L('联系我们', 'Связаться', 'Байланыс', 'Contact') }}
        </RouterLink>
      </div>

      <!-- Mobile hamburger -->
      <button
        class="md:hidden inline-flex items-center justify-center p-2 rounded-lg border"
        @click="mobileOpen = !mobileOpen"
        :aria-expanded="mobileOpen ? 'true' : 'false'"
        aria-controls="mobile-menu"
      >
        <span class="sr-only">Toggle menu</span>
        <svg v-if="!mobileOpen" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor"><path d="M6.225 4.811 4.811 6.225 10.586 12l-5.775 5.775 1.414 1.414L12 13.414l5.775 5.775 1.414-1.414L13.414 12l5.775-5.775-1.414-1.414L12 10.586z"/></svg>
      </button>
    </nav>

    <!-- Desktop nav row -->
    <div class="hidden md:block border-t">
      <div class="mx-auto max-w-screen-xl px-4 lg:px-6">
        <!-- Scrollable tab row if overflow -->
        <ul class="flex items-stretch gap-6 text-sm font-medium overflow-x-auto no-scrollbar py-2"
            @mouseleave="scheduleClose()">
          <li v-for="item in navItems" :key="item.slug" class="relative">
            <div
              class="inline-flex items-center gap-1 py-2 border-b-2"
              :class="activeClass(item)"
              @mouseenter="openMenu(item.slug)"
            >
              <RouterLink
                v-if="!item.dropdown"
                :to="localizedPath(item.to ?? '/')"
                class="px-1.5 whitespace-nowrap hover:text-blue-600"
              >
                {{ L(item.label) }}
              </RouterLink>
              <button
                v-else
                type="button"
                class="px-1.5 whitespace-nowrap hover:text-blue-600"
                @click="toggleMenu(item.slug)"
                @mouseenter="openMenu(item.slug)"
                :aria-expanded="openId === item.slug ? 'true' : 'false'"
              >
                {{ L(item.label) }}
                <span class="inline-block align-middle">
                  ▼
                </span>
              </button>
            </div>

            <!-- Desktop dropdown panels -->
            <transition name="fade">
              <div
                v-if="openId === item.slug && item.dropdown"
                class="absolute left-0 top-full mt-2 w-[min(96vw,920px)] bg-white border shadow-2xl rounded-2xl p-5"
                @mouseenter="keepOpen()"
                @mouseleave="scheduleClose()"
              >
                <component
                  :is="getDropdownComponent(item.slug)"
                  @navigate="closeAll"
                />
              </div>
            </transition>
          </li>
        </ul>
      </div>
    </div>

    <!-- Mobile menu -->
    <transition name="slide">
      <div
        v-show="mobileOpen"
        id="mobile-menu"
        class="md:hidden border-t bg-white"
      >
        <div class="px-4 py-3 space-y-1">
          <!-- Language & CTA in mobile menu -->
          <div class="flex items-center gap-3 pb-3 border-b">
            <select
              class="border rounded-md px-2 py-1 text-sm"
              :value="locale.value"
              @change="onChangeLang(($event.target as HTMLSelectElement).value as Lang)"
            >
              <option value="zh">中文</option>
              <option value="ru">Рус</option>
              <option value="kz">Қаз</option>
              <option value="en">EN</option>
            </select>
            <RouterLink
              :to="localizedPath('/contact')"
              class="ml-auto inline-flex items-center rounded-xl border px-3 py-1.5 text-sm hover:bg-gray-50"
              @click="mobileOpen=false"
            >
              {{ L('联系我们', 'Связаться', 'Байланыс', 'Contact') }}
            </RouterLink>
          </div>

          <!-- Collapsible nav items -->
          <div class="divide-y">
            <div v-for="item in navItems" :key="item.slug" class="py-2">
              <div class="flex items-center">
                <RouterLink
                  v-if="!item.dropdown"
                  :to="localizedPath(item.to ?? '/')"
                  class="flex-1 py-2"
                  @click="mobileOpen = false"
                >
                  {{ L(item.label) }}
                </RouterLink>

                <button
                  v-else
                  class="flex-1 text-left py-2"
                  @click="mobileAccordion = mobileAccordion === item.slug ? null : item.slug"
                  :aria-expanded="mobileAccordion === item.slug ? 'true' : 'false'"
                >
                  {{ L(item.label) }}
                </button>
                <span v-if="item.dropdown" class="ml-2">
                  <svg v-if="mobileAccordion!==item.slug" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M6 9l6 6 6-6"/></svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18 15l-6-6-6 6"/></svg>
                </span>
              </div>

              <transition name="accordion">
                <div v-if="item.dropdown && mobileAccordion === item.slug" class="pl-3 pt-1">
                  <!-- Reuse dropdown content but stacked for mobile -->
                  <component
                    :is="getDropdownComponent(item.slug)"
                    :mobile="true"
                    @navigate="mobileOpen = false"
                  />
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter, useRoute, RouterLink } from 'vue-router'

import AboutDropdown from '@/components/dropdowns/AboutDropdown.vue'
import ProductDropdown from '@/components/dropdowns/ProductDropdown.vue'
import NewsDropdown from '@/components/dropdowns/NewsDropdown.vue'
import CooperationDropdown from '@/components/dropdowns/CooperationDropdown.vue'

import { setLocale, type Lang, i18n } from '@/i18n'
import { useL } from '@/composables/useL'
import { navItems } from '@/data/ui.nav'

const router = useRouter()
const route = useRoute()
const { locale } = i18n.global
const { L } = useL()

/** desktop dropdown state */
const openId = ref<string | null>(null)
let closeTimer: number | null = null

/** mobile state */
const mobileOpen = ref(false)
const mobileAccordion = ref<string | null>(null)

function activeClass(item: any) {
  const isActive =
    (item.to && route.path.startsWith(item.to)) || openId.value === item.slug
  return isActive ? 'border-blue-600 text-blue-600' : 'border-transparent'
}

function openMenu(slug: string) {
  if (closeTimer) cancelAnimationFrame(closeTimer)
  openId.value = slug
}

function toggleMenu(slug: string) {
  openId.value = openId.value === slug ? null : slug
}

function keepOpen() {
  if (closeTimer) cancelAnimationFrame(closeTimer)
}

function scheduleClose() {
  if (closeTimer) cancelAnimationFrame(closeTimer)
  closeTimer = requestAnimationFrame(() => (openId.value = null))
}

function getDropdownComponent(slug: string) {
  switch (slug) {
    case 'about':
      return AboutDropdown
    case 'products':
      return ProductDropdown
    case 'news':
      return NewsDropdown
    case 'cases':
    case 'cooperation':
      return CooperationDropdown
    default:
      return AboutDropdown
  }
}

function onChangeLang(lang: Lang) {
  setLocale(lang)
}

/* Close menus when clicking outside on desktop */
function onDocClick(e: MouseEvent) {
  const target = e.target as HTMLElement
  if (!target.closest('header')) {
    openId.value = null
  }
}

onMounted(() => {
  document.addEventListener('click', onDocClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onDocClick)
})

/* ---------- Keep locale prefix if present ---------- */
function localizedPath(target: string) {
  const path = route.fullPath
  const prefixMatch = path.match(/^\/(zh|kz|ru|en)(\/|$)/)
  if (prefixMatch) {
    const currentLang = prefixMatch[1]
    const clean = target.startsWith('/') ? target : `/${target}`
    return `/${currentLang}${clean === '/' ? '' : clean}`
  }
  return target
}
</script>

<style scoped>
/* smooth transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity .15s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform .2s ease, opacity .2s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateY(-8px);
  opacity: 0;
}

/* mobile accordion */
.accordion-enter-active,
.accordion-leave-active {
  transition: height .2s ease, opacity .2s ease;
}
.accordion-enter-from,
.accordion-leave-to {
  opacity: 0;
}

/* hide scrollbar on overflow-x-auto tab row */
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>

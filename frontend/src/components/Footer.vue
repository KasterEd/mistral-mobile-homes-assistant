<template>
  <footer class="bg-gray-900 text-gray-300">
    <!-- Top -->
    <div class="mx-auto max-w-7xl px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      <!-- Brand -->
      <div>
        <RouterLink :to="localizedPath('/')" class="inline-flex items-center gap-2">
          <img src="/images/logo.jpg" alt="logo" class="h-8 w-auto" />
          <span class="text-white text-lg font-semibold">{{ L(FOOTER.brand.name) }}</span>
        </RouterLink>
        <p class="mt-3 text-sm text-gray-400 leading-relaxed">
          {{ L(FOOTER.brand.blurb) }}
        </p>
      </div>

      <!-- About -->
      <div>
        <h3 class="text-white font-semibold mb-3">{{ L(FOOTER.cols.about.title) }}</h3>
        <ul class="space-y-2 text-sm">
          <li v-for="it in FOOTER.cols.about.links" :key="it.to">
            <RouterLink :to="localizedPath(it.to)" class="hover:text-white">
              {{ L(it.label) }}
            </RouterLink>
          </li>
        </ul>
      </div>

      <!-- Products -->
      <div>
        <h3 class="text-white font-semibold mb-3">{{ L(FOOTER.cols.products.title) }}</h3>
        <ul class="space-y-2 text-sm">
          <li v-for="it in FOOTER.cols.products.links" :key="it.to">
            <RouterLink :to="localizedPath(it.to)" class="hover:text-white">
              {{ L(it.label) }}
            </RouterLink>
          </li>
          <li class="pt-1">
            <RouterLink
              :to="localizedPath(FOOTER.cols.products.more.to)"
              class="inline-flex items-center gap-1 text-blue-300 hover:text-blue-200"
            >
              <span>{{ L(FOOTER.cols.products.more.label) }}</span>
              <svg class="w-3 h-3" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L13.586 11H3a1 1 0 110-2h10.586l-3.293-3.293a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
              </svg>
            </RouterLink>
          </li>
        </ul>
      </div>

      <!-- Support / Contact -->
      <div>
        <h3 class="text-white font-semibold mb-3">{{ L(FOOTER.cols.support.title) }}</h3>
        <ul class="space-y-2 text-sm mb-4">
          <li v-for="it in FOOTER.cols.support.links" :key="it.to">
            <RouterLink :to="localizedPath(it.to)" class="hover:text-white">
              {{ L(it.label) }}
            </RouterLink>
          </li>
        </ul>

        <div class="space-y-1 text-sm">
          <div class="text-gray-400">{{ L(FOOTER.cols.contact.title) }}</div>
          <div><span class="text-gray-400">{{ L(FOOTER.cols.contact.addressTitle) }}：</span>{{ L(FOOTER.cols.contact.address) }}</div>
          <div><span class="text-gray-400">{{ L(FOOTER.cols.contact.phoneTitle) }}：</span><a :href="`tel:${FOOTER.cols.contact.phone}`" class="hover:text-white">{{ FOOTER.cols.contact.phone }}</a></div>
          <div><span class="text-gray-400">{{ L(FOOTER.cols.contact.emailTitle) }}：</span><a :href="`mailto:${FOOTER.cols.contact.email}`" class="hover:text-white">{{ FOOTER.cols.contact.email }}</a></div>
        </div>
      </div>
    </div>

    <!-- Bottom -->
    <div class="border-t border-white/10">
      <div class="mx-auto max-w-7xl px-4 py-4 text-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div class="text-gray-400">
          {{ L(FOOTER.brand.copyrightPrefix) }} {{ new Date().getFullYear() }}
          <span class="mx-1">·</span>
          <RouterLink :to="localizedPath('/')" class="hover:text-white">{{ L(FOOTER.brand.name) }}</RouterLink>
        </div>
        <div class="flex items-center gap-4">
          <RouterLink
            v-for="it in FOOTER.bottom.links"
            :key="it.to"
            :to="localizedPath(it.to)"
            class="text-gray-400 hover:text-white"
          >
            {{ L(it.label) }}
          </RouterLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useL } from '@/composables/useL'
import { FOOTER } from '@/data/ui.footer'

const { L } = useL()
const route = useRoute()
const { locale } = useI18n({ useScope: 'global' })

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
</script>

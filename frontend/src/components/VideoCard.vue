<!-- src/components/VideoCard.vue -->
<template>
  <!-- Choose link type based on URL -->
  <component
    :is="isExternal ? 'a' : RouterLink"
    :href="isExternal ? video.url : undefined"
    :to="!isExternal ? to : undefined"
    :target="isExternal ? '_blank' : undefined"
    :rel="isExternal ? 'noopener' : undefined"
    class="block group"
    :aria-label="titleText"
  >
    <div class="relative aspect-video overflow-hidden bg-gray-100 rounded-lg">
      <!-- Thumbnail (hidden when preview video plays on hover for local files) -->
      <img
        v-if="!showPreview"
        :src="thumbUrl"
        :alt="titleText"
        class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
        decoding="async"
      />

      <!-- Optional hover preview for local mp4 (non-interactive) -->
      <video
        v-else
        :src="video.url"
        class="h-full w-full object-cover pointer-events-none"
        muted
        playsinline
        preload="metadata"
        ref="previewRef"
      />

      <!-- duration badge -->
      <div class="absolute right-2 top-2 rounded-sm bg-black/80 px-1.5 py-0.5 text-[10px] leading-none text-white">
        {{ video.duration }}
      </div>

      <!-- hover dark overlay + play icon (non-interactive overlays) -->
      <div class="absolute inset-0 transition-colors duration-200 group-hover:bg-black/40 pointer-events-none">
        <div class="absolute inset-0 hidden items-center justify-center group-hover:flex pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
               class="h-10 w-10 fill-white/90 drop-shadow">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
      </div>
    </div>

    <div class="mt-2 text-sm">
      <div class="line-clamp-2 font-medium">{{ titleText }}</div>
    </div>
  </component>
</template>

<script lang="ts" setup>
import { computed, onMounted, onBeforeUnmount, ref, getCurrentInstance } from 'vue'
import { RouterLink } from 'vue-router'
import type { VideoItem } from '@/data/videos'
import { useL } from '@/composables/useL'

const props = defineProps<{ video: VideoItem }>()
const { L } = useL()

const titleText = computed(() => L(props.video.title))

// treat absolute http(s) as external; everything else (e.g. local mp4 or route) as internal
const isExternal = computed(() => /^https?:\/\//i.test(props.video.url))

// for internal navigation, route to /video/:slug (adjust to your route name/path)
const to = computed(() => ({ name: 'video-detail', params: { slug: props.video.slug } }))

// if you have thumbs later, wire them here; otherwise fallback to a poster frame or a placeholder
const thumbUrl = computed(() => undefined as unknown as string)

/** Optional: hover preview only for local mp4 */
const isLocalMp4 = computed(() => props.video.url.endsWith('.mp4') && !isExternal.value)

// showPreview becomes true on hover for local mp4 (auto-play muted)
const showPreview = ref(false)
const previewRef = ref<HTMLVideoElement | null>(null)

function onEnter() {
  if (!isLocalMp4.value) return
  showPreview.value = true
  // play after the video element appears
  requestAnimationFrame(() => previewRef.value?.play().catch(() => {}))
}
function onLeave() {
  if (!isLocalMp4.value) return
  previewRef.value?.pause()
  showPreview.value = false
}

onMounted(() => {
  // delegate hover events on the component root
  const el = (getCurrentInstance() as any)?.vnode?.el as HTMLElement | undefined
  if (el) {
    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mouseleave', onLeave)
  }
})
onBeforeUnmount(() => {
  const el = (getCurrentInstance() as any)?.vnode?.el as HTMLElement | undefined
  if (el) {
    el.removeEventListener('mouseenter', onEnter)
    el.removeEventListener('mouseleave', onLeave)
  }
})
</script>

<template>
  <section class="max-w-7xl mx-auto px-4 py-10">
    <h1 class="mb-6 text-2xl font-bold">视频展示</h1>

    <!-- grid of video cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <VideoCard
        v-for="item in paged"
        :key="item.slug"
        :video="item"
        class="group"
      />
    </div>

    <!-- pagination -->
    <div class="mt-8 flex items-center justify-center gap-1">
      <button
        class="px-2 py-1 text-sm text-gray-500 hover:text-gray-800 disabled:opacity-40"
        :disabled="currentPage === 1"
        @click="go(currentPage - 1)"
        aria-label="Prev"
      >
        ‹
      </button>

      <button
        v-for="n in totalPages"
        :key="n"
        class="mx-0.5 rounded-sm border px-2.5 py-1 text-sm"
        :class="n === currentPage
          ? 'border-blue-600 bg-blue-600 text-white'
          : 'border-gray-300 text-gray-700 hover:bg-gray-100'"
        @click="go(n)"
      >
        {{ n }}
      </button>

      <button
        class="px-2 py-1 text-sm text-gray-500 hover:text-gray-800 disabled:opacity-40"
        :disabled="currentPage === totalPages"
        @click="go(currentPage + 1)"
        aria-label="Next"
      >
        ›
      </button>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { videos } from '@/data/videos'
import VideoCard from '@/components/VideoCard.vue'

export default defineComponent({
  name: 'VideoPage',
  components: { VideoCard },
  setup() {
    const pageSize = 4        // 4 per page to match the reference layout
    const currentPage = ref(1)
    const totalPages = Math.max(1, Math.ceil(videos.length / pageSize))

    const paged = computed(() => {
      const start = (currentPage.value - 1) * pageSize
      return videos.slice(start, start + pageSize)
    })

    function go(n: number) {
      if (n < 1 || n > totalPages) return
      currentPage.value = n
      // optional: scroll to top of grid on page change
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return { currentPage, totalPages, paged, go }
  },
})
</script>

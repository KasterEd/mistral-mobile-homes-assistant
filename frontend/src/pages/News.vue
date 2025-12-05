<!-- src/pages/News.vue -->
<template>
  <section class="max-w-7xl mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">新闻中心</h1>

    <!-- Tabs -->
    <div class="flex gap-4 border-b mb-6">
      <RouterLink
        class="pb-2 -mb-px"
        :class="[
          'border-b-2',
          activeCategory === 'company' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-blue-600'
        ]"
        :to="`/${lang}/news/company`"
      >
        企业新闻
      </RouterLink>

      <RouterLink
        class="pb-2 -mb-px"
        :class="[
          'border-b-2',
          activeCategory === 'industry' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-blue-600'
        ]"
        :to="`/${lang}/news/industry`"
      >
        行业动态
      </RouterLink>
    </div>

    <RouterView />
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const lang = computed(() => (route.params.lang as string) || "zh");
const activeCategory = computed(() => (route.params.category as string) || "company");
</script>

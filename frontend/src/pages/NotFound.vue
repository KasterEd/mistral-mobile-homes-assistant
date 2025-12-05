<template>
  <section class="flex flex-col items-center justify-center h-screen">
    <h1 class="text-6xl font-extrabold mb-4">404</h1>
    <p class="text-xl mb-6">抱歉，您访问的页面不存在。</p>
    <router-link to="/" class="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700">
      返回首页
    </router-link>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NotFound',
});
</script>

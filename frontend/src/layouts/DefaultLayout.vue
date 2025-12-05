<!-- src/layouts/DefaultLayout.vue -->
<template>
  <div class="flex flex-col min-h-screen text-gray-800">
    <Navbar />

    <main class="flex-1">
      <router-view />
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
</script>

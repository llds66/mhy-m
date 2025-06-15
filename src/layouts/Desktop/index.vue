<script setup lang="ts">
import Footer from '@/common/components/Footer.vue'
import TopNav from '@/common/components/TopNav.vue'
</script>

<template>
  <div class="flex flex-col h-100vh relative z-1">
    <TopNav class="top-0 z-2" absolute />
    <div class="flex-1">
      <RouterView />
    </div>
    <Footer />
  </div>
</template>

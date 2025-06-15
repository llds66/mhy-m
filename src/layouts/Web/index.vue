<script setup lang="ts">
import Footer from '@/common/components/Footer.vue'
</script>

<template>
  <div class="flex flex-col h-100vh relative z-1">
    <div class="flex-1">
      <RouterView />
    </div>
    <Footer />
  </div>
</template>

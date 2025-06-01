<script setup lang="ts">
import BottomTab from './components/BottomTab.vue'
import MainContainer from './components/MainContainer.vue'
</script>

<template>
  <div>
    <MainContainer />
    <BottomTab class="bottom-tab" />
  </div>
</template>

<style scoped>
.bottom-tab{
  --uno:'w-70% transform-translate-x--50% bottom-2 left-1/2 fixed';
}
</style>

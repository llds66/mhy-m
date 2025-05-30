<script setup lang="ts">
import { useLayout } from '@composables/useLayout'

const { layout } = useLayout()
</script>

<template>
  <component :is="layout" />
</template>

<template>
  <div class="c-sidebar-item">
    <div class="text-subtitle-1 font-weight-medium">
      {{ title }}
    </div>
    <v-divider class="mt-2 mb-4" />
  </div>
</template>

<script setup>

defineProps({
  title: {
    type: String,
    required: true
  },
})

</script>

<style lang="scss">
.c-sidebar-item {}
</style>

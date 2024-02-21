<template>
  <div class="c-sidebar-item">
    <div class="text-subtitle-1 font-weight-medium">
      {{ title }}
    </div>
    <v-divider class="mt-1 mb-3" />
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

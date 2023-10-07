<template>
  <div class="c-perk">
    <div class="d-flex align-baseline">
      <div class="mr-2">{{ perk.emoji }}</div>
      <div class="text-body-2">{{ perk.description }}</div>
    </div>
    <v-divider v-if="isLast" class="my-2" />
  </div>
</template>

<script setup>

defineProps({
  perk: {
    type: Object,
    required: true
  },
  isLast: {
    type: Boolean,
    required: true,
  }
})

</script>

<style lang="scss">
.c-perks {}
</style>

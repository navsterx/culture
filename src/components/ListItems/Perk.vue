<template>
  <div class="c-perk">
    <div class="d-flex">
      <div class="mr-2 c-perk__emoji">{{ perk.emoji }}</div>
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
});

</script>

<style lang="scss">
.c-perk {
  &__emoji {
    font-size: 20px;
    line-height: 20px;
  }
}
</style>

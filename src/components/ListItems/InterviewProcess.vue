<template>
  <div class="c-interview-process">
    <div class="d-flex mt-2">
      <div class="ml-2 mr-4 text-body-2 font-weight-medium">{{ index + 1 }}.</div>
      <div class="text-body-2">{{ interviewProcess.step }}</div>
    </div>
    <v-divider v-if="isLast" class="my-2" />
  </div>
</template>

<script setup>

defineProps({
  interviewProcess: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  },
  isLast: {
    type: Boolean,
    required: true,
  }
})

</script>

<style lang="scss">
.c-interview-process {}
</style>

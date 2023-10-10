<template>
  <div class="c-interview-process">
    <div class="d-flex mt-2">
      <div class="ml-2 mr-2 text-body-2 font-weight-medium">{{ index + 1 }}.</div>
      <div class="text-body-2">{{ interviewProcess.step }}</div>
    </div>
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
  }
})

</script>

<style lang="scss">
.c-interview-process {}
</style>

<template>
  <v-list lines="one" class="c-jobs">
    <v-list-item :border="true" :href="job.url" target="_blank" v-for="(job, index) in jobs" :key="index"
      :base-color="company.brand_color" :class="{
        'mb-4': index < jobs.length - 1,
        'pa-3': true
      }
        " rounded="lg">
      <div class="text-body-1 font-weight-medium">
        {{ job.role }}
      </div>
      <div class="text-body-2 font-weight-regular">
        {{ job.location }}
        {{ job.type ? "/ " + job.type : '' }}
        {{ job.salary ? "/ " + job.salary : '' }}
      </div>
      <template v-slot:append>
        <v-icon icon="mdi-open-in-new" :color="company.brand_color" size="small"></v-icon>
      </template>
    </v-list-item>
  </v-list>
</template>

<script setup>

defineProps({
  jobs: {
    type: Array,
    required: true
  },
  company: {
    type: Object,
    required: true
  }
});

</script>

<style lang="scss">
.c-jobs {}
</style>

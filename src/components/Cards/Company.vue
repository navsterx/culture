<template>
  <v-sheet class="pa-4" elevation="1" rounded>
    <router-link :to="`/company/${company.vanity_url}`" class="c-company-card__item">
      <div class="d-flex align-center mb-2">
        <v-img :max-width="50" :max-height="50" eager :src="company.logo" class="mr-3 rounded-circle"
          :alt="company.name" />
        <div>
          <div class="text-body-1 font-weight-medium text-textPrimary">{{ company.name }}</div>
          <div class="text-body-2 text-textPrimary" v-if="company.jobs">
            <span class="font-weight-medium">{{ company.jobs.length }}</span>
            role{{ company.jobs.length === 1 ? '' : 's' }} available
          </div>
          <div class="text-body-2 text-textPrimary" v-else>
            No roles available right now
          </div>
        </div>
      </div>
      <v-divider class="my-4" />
      <div class="text-body-2 text-textPrimary">
        {{ company.description }}
      </div>
    </router-link>
    <v-divider class="mt-4 mb-1" v-if="company.perks" />
    <div class="d-flex flex-wrap" v-if="company.perks">
      <v-tooltip v-for="(perk, index) in company.perks" :key="index" :text="perk.description" location="top"
        max-width="300">
        <template v-slot:activator="{ props }">
          <div v-bind="props" class="mr-3 mt-3 c-company-card__emoji">
            {{ perk.emoji }}
          </div>
        </template>
      </v-tooltip>
    </div>
    <div v-else class="pt-4"></div>
  </v-sheet>

  <v-sheet class="ml-10 mt-4 pa-4" elevation="1" rounded v-if="showJobs">
    <div class="text-subtitle-1 font-weight-medium">Available Opportunities</div>
    <jobs :jobs="company.jobs" :company="company" />
  </v-sheet>
</template>

<script setup>
import Jobs from '@/components/Cards/Jobs.vue';

defineProps({
  company: {
    type: Object,
    required: true
  },
  showJobs: {
    type: Boolean,
    required: false,
    default: false
  }
});

</script>

<style lang="scss">
.c-company-card {
  &__item {
    color: #292929;
    text-decoration: none;
  }

  &__emoji {
    cursor: pointer;
    font-size: 20px;
    line-height: 20px;
  }
}
</style>

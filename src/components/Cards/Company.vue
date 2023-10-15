<template>
  <v-sheet class="pa-4" elevation="1" rounded>
    <router-link :to="`/company/${company.vanity_url}`" class="c-company-card__item">
      <div class="d-flex align-center mb-2">
        <img width="50" :src="company.logo" class="mr-3 rounded-circle" />
        <div>
          <div class="text-body-1 font-weight-medium text-textPrimary">{{ company.name }}</div>
          <div class="text-body-2 text-textPrimary" v-if="company.jobs" @click.prevent="letsGo(company.vanity_url)">
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
    <v-divider class="my-4" v-if="company.perks" />
    <div class="d-flex flex-wrap" v-if="company.perks">
      <v-tooltip v-for="(perk, index) in company.perks" :key="index" :text="perk.description" location="top"
        max-width="300">
        <template v-slot:activator="{ props }">
          <div v-bind="props" class="mr-3 c-company-card__emoji">
            {{ perk.emoji }}
          </div>
        </template>
      </v-tooltip>
    </div>
    <div v-else class="pt-4"></div>
  </v-sheet>

  <v-sheet class="ml-10 mt-4 pa-4" elevation="1" rounded v-if="showJobs">
    <div v-for="(job, index) in company.jobs" :key="index">
      <div class="text-body-1 font-weight-medium">
        {{ job.role }}
      </div>
      <div class="text-body-2 font-weight-regular">
        {{ job.location }}
      </div>
      <v-divider v-if="index < company.jobs.length - 1" class="my-2" />
    </div>
  </v-sheet>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()

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

const letsGo = (vanity_url) => {
  router.push(`/company/${vanity_url}#jobs`);
}

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

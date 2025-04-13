<template>
  <div class="p-home">
    <v-sheet color="primary" class="py-4">
      <v-container>
        <div class="text-h4 text-white font-weight-medium text-center mb-2">
          Discover UK tech companies that align with you
        </div>
        <div class="text-body-1 text-white text-center mb-6">
          Search for a role and/or filter on the benefits & perks to see what companies have to offer!
        </div>
        <div class="d-flex p-home__filters">
          <div class="p-home__job mr-4">
            <input-filter v-model="searchedRole" :companies="companies" />
          </div>
          <div class="p-home__perks">
            <v-autocomplete color="primary" density="compact" variant="solo" chips closable-chips clearable
              label="Benefits & Perks" v-model="selectedPerks" :items="filteredPerks" item-title="key"
              item-value="value" multiple hide-details></v-autocomplete>
          </div>
        </div>
      </v-container>
    </v-sheet>
    <v-fade-transition hide-on-leave>
      <v-container v-if="isLoaded" key="loaded-content">
        <div class="text-center pa-8 text-body-1" v-if="filteredCompanies.length === 0">
          Sorry, no companies were found that match your criteria, please try again
        </div>
        <template v-if="searchedRole">
          <v-row>
            <v-col cols="12" md="12" v-for="(company, index) in filteredCompanies" :key="index">
              <company-card :company="company" :show-jobs="true" />
            </v-col>
          </v-row>
        </template>
        <template v-else>
          <masonry-wall :items="filteredCompanies" :ssr-columns="3" :column-width="300" :gap="16">
            <template #default="{ item, index }">
              <company-card :key="index" :company="item" :selected-perks="selectedPerks" :show-jobs="false" />
            </template>
          </masonry-wall>
        </template>
      </v-container>
      <v-container v-else>
        <div class="d-flex pa-10 justify-center">
          <v-progress-circular indeterminate color="primary" :size="50"></v-progress-circular>
        </div>
      </v-container>
    </v-fade-transition>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { supabase } from '/src/supabase';
import MasonryWall from '@yeger/vue-masonry-wall'
import { useHead, useSeoMeta } from '@unhead/vue';

import InputFilter from '@/components/Inputs/Filter.vue';
import CompanyCard from '@/components/Cards/Company.vue';

const searchedRole = ref(null);
const selectedPerks = ref([]);
let companies = ref([]);
let isLoaded = ref(false);

useHead({
  title: 'Awesome Culture - Discover UK tech companies that align with you'
})

useSeoMeta({
  title: `Awesome Culture - Discover UK tech companies that align with you`,
  description: 'Easily filter companies based on the perks they offer, delve into detailed information about their culture, day-to-day operations, and training opportunities. The goal is to provide the insights you need to make informed decisions when searching for your next job.',
  ogDescription: 'Easily filter companies based on the perks they offer, delve into detailed information about their culture, day- to - day operations, and training opportunities.The goal is to provide the insights you need to make informed decisions when searching for your next job.',
  ogTitle: 'Awesome Culture - Discover UK tech companies that align with you',
  ogImage: '/logo.png',
  twitterCard: 'summary_large_image',
})

onMounted(() => {
  getCompanies()
})

async function getCompanies() {
  try {
    const { data: data } = await supabase
      .rpc('getCompanies')
    companies.value = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  } catch (error) {
    console.log('error ', error);
  } finally {
    isLoaded.value = true;
  }
}

const filterCompaniesByRole = (companies, searchedRole) => {
  if (!searchedRole || searchedRole.trim() === '') {
    return companies;
  }

  return companies.map((company) => {
    if (!Array.isArray(company.jobs)) return null;

    const filteredJobs = company.jobs.filter((job) => (
      job.role &&
      job.role.toLowerCase().includes(searchedRole.toLowerCase())
    ));

    return filteredJobs.length > 0
      ? { ...company, jobs: filteredJobs }
      : null;
  }).filter(Boolean);
};

const filterCompaniesByPerks = (companies, selectedPerks) => {
  if (selectedPerks.length === 0) {
    return companies;
  }

  return companies.filter((company) => (
    company.perks.some((perk) => selectedPerks.includes(perk.category))
  ));
};

const filteredCompanies = computed(() => {
  if (searchedRole.value === null) {
    return filterCompaniesByPerks(companies.value, selectedPerks.value);
  }

  return filterCompaniesByPerks(
    filterCompaniesByRole(companies.value, searchedRole.value),
    selectedPerks.value
  );
});

const filteredPerks = computed(() => {
  const uniquePerks = new Map();

  // Define the source of companies to use (all or filtered)
  const sourceCompanies = filteredCompanies.value.length === 0 ? companies.value : filteredCompanies.value;

  sourceCompanies.forEach((company) => {
    if (company.perks) {
      company.perks.forEach((perk) => {
        uniquePerks.set(perk.category, perk.emoji);
      });
    }
  });

  const sortedPerks = Array.from(uniquePerks.entries())
    .map(([category, emoji]) => ({ key: `${emoji} ${category}`, value: category }))
    .sort((a, b) => a.value.localeCompare(b.value));

  return sortedPerks;
});

</script>

<style lang="scss">
.p-home {
  &__job {
    width: 25%;
  }

  &__perks {
    width: 75%;
  }

  @media (max-width: 768px) {
    &__filters {
      flex-direction: column;
    }

    &__job,
    &__perks {
      width: 100%;
      margin: 5px 0 5px 0;
    }
  }
}
</style>

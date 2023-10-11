<template>
  <div class="p-home">
    <div class="bg-primary py-4">
      <v-container>
        <div class="text-h4 text-white font-weight-medium text-center mb-2">
          Discover UK tech companies that align with you
        </div>
        <div class="text-body-1 text-white text-center mb-6">
          Search for a role and/or filter on the benefits & perks to see what companies have to offer!
        </div>
        <div class="d-flex p-home__filters">
          <div class="p-home__job mr-4">
            <input-filter v-model="searchedRole" :delay="1000" />
          </div>
          <div class="p-home__perks">
            <v-autocomplete color="primary" density="compact" variant="solo" chips closable-chips clearable
              label="Benefits & Perks" v-model="selectedPerks" :items="filteredPerks" item-title="key" item-value="value"
              multiple hide-details></v-autocomplete>
          </div>
        </div>
      </v-container>
    </div>
    <v-fade-transition hide-on-leave>
      <v-container v-if="isLoaded" key="loaded-content">
        <div class="text-center pa-8 text-body-1" v-if="filteredCompanies.length === 0">Sorry, no companies were found
          that match your
          criteria, please try again</div>
        <masonry-wall v-else :items="filteredCompanies" :ssr-columns="3" :column-width="300">
          <template #default="{ item, index }">
            <company-card :key="index" :company="item" />
          </template>
        </masonry-wall>
      </v-container>
      <v-container v-else key="skeleton-loader">
        <v-row>
          <v-col cols="12" md="4" v-for="i in 5" :key="i">
            <v-skeleton-loader class="mx-auto border" max-width="370"
              type="list-item-avatar, divider, paragraph, paragraph"></v-skeleton-loader>
          </v-col>
          <v-skeleton-loader boilerplate></v-skeleton-loader>
        </v-row>
      </v-container>
    </v-fade-transition>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { supabase } from '/src/supabase';
import MasonryWall from '@yeger/vue-masonry-wall'

import InputFilter from '@/components/Inputs/Filter.vue';
import CompanyCard from '@/components/Cards/Company.vue';

const searchedRole = ref(null);
const selectedPerks = ref([]);
let companies = ref([]);
let isLoaded = ref(false);

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

const filteredCompanies = computed(() => {
  if (selectedPerks.value.length === 0 && (searchedRole.value === null || searchedRole.value === '')) {
    return companies.value;
  } else {
    const filtered = companies.value.filter(company =>
      (selectedPerks.value.length === 0 || (company.perks && selectedPerks.value.every(perk => company.perks.map(p => p.category).includes(perk)))) &&
      (searchedRole.value === null || (company.jobs && company.jobs.some(role => role.role.toLowerCase().includes(searchedRole.value.toLowerCase()))))
    );
    return [...filtered]; // Create a new array with filtered results
  }
});

const filteredPerks = computed(() => {
  let uniquePerks;
  if (filteredCompanies.value.length === 0) {
    uniquePerks = new Map();
    companies.value.forEach((company) => {
      if (company.perks) {
        company.perks.forEach((perk) => {
          uniquePerks.set(perk.category, perk.emoji);
        });
      }
    });
  } else {
    uniquePerks = new Map();
    filteredCompanies.value.forEach((company) => {
      if (company.perks) {
        company.perks.forEach((perk) => {
          uniquePerks.set(perk.category, perk.emoji);
        });
      }
    });
  }

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

<template>
  <div class="p-home">
    <div class="p-home__hero pa-4">
      <v-container>
        <div class="text-h4 text-white font-weight-medium text-center mb-2">
          Discover UK tech jobs that align with you
        </div>
        <div class="text-body-1 text-white text-center mb-6">
          Search for a role and/or filter on the perks!
        </div>
        <div class="my-4">
          <div class="filters d-flex">
            <div class="roleSearch mr-4">
              <v-text-field label="Search for a role" density="compact" variant="solo" clearable="" v-model="searchedRole"
                hide-details />
            </div>
            <div class="perkSelect">
              <v-select density="compact" variant="solo" chips clearable label="Perks" v-model="selectedPerks"
                :items="filteredPerks" item-title="key" item-value="value" multiple hide-details></v-select>
            </div>
          </div>
        </div>
      </v-container>
    </div>
    <v-fade-transition>
      <v-container v-if="isLoaded">
        <v-row no-gutters>
          <CompanyCard v-for="(company, index) in filteredCompanies" :key="index" :company="company" />
        </v-row>
      </v-container>
    </v-fade-transition>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { supabase } from '../supabase'
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

    companies.value = data;

    console.log(data)

  } catch (error) {
    console.log('error ', error);
  } finally {
    isLoaded.value = true;
  }
}

const filteredCompanies = computed(() => {
  if (selectedPerks.value.length === 0 && (searchedRole.value === null)) {
    return companies.value;
  } else {
    return companies.value.filter(company =>
      (selectedPerks.value.length === 0 || (company.perks && selectedPerks.value.every(perk => company.perks.map(p => p.category).includes(perk)))) &&
      (searchedRole.value === null || (company.roles && company.roles.some(role => role.role.toLowerCase().includes(searchedRole.value.toLowerCase()))))
    );
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
  return Array.from(uniquePerks.entries())
    .map(([category, emoji]) => ({ key: `${emoji} ${category}`, value: category }));
});

</script>

<style lang="scss">
.p-home {
  &__hero {
    background: #E84E36;
  }

  .roleSearch {
    width: 25%;
  }

  .perkSelect {
    width: 75%;
  }

  @media (max-width: 768px) {
    .filters {
      flex-direction: column;
    }

    .roleSearch,
    .perkSelect {
      width: 100%;
      margin: 5px 0 5px 0;
    }
  }
}
</style>

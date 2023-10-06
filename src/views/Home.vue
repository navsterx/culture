<template>
  <div class="p-home">
    <div class="hero pa-4">
      <v-container>
        <div class="text-h4 text-white text-center mb-2">
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
                :items="perkCategoriesItems" item-title="key" item-value="value" multiple hide-details></v-select>
            </div>
          </div>
        </div>
      </v-container>
    </div>
    <div class="companies">
      <v-container>
        <v-row no-gutters>
          <CompanyCard v-for="(company, index) in filteredCompanies" :key="index" :company="company" />
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { supabase } from '../supabase'
import CompanyCard from '@/components/Cards/Company.vue';

const searchedRole = ref(null);
const selectedPerks = ref([]);
let companies = ref([]);

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
  }
}

const filteredCompanies = computed(() => {
  if (selectedPerks.value.length === 0 && (searchedRole.value === null || searchedRole.value === '')) {
    return companies.value;
  } else {
    return companies.value.filter(company =>
      (selectedPerks.value.length === 0 || company.perks.some(perk => selectedPerks.value.includes(perk.category))) &&
      (searchedRole.value === null || (company.roles && company.roles.some(role => role.role.toLowerCase().includes(searchedRole.value.toLowerCase())))));
  }
});

// // Create a function to calculate perkCategories based on filtered companies
// const calculatePerkCategories = () => {
//   const categories = new Set();
//   filteredCompanies.value.forEach((company) => {
//     company.perks.forEach((perk) => {
//       categories.add(perk.category);
//     });
//   });
//   if (categories.size === 0) {
//     return null;
//   }
//   return Array.from(categories);
// };

// const perkCategoriesItems = computed(() => {
//   const filteredCategories = calculatePerkCategories();
//   return filteredCategories.map((category) => {
//     const emoji = getEmojiForCategory(category);
//     return {
//       key: emoji + ' ' + category,
//       value: category,
//     };
//   });
// });

// const getEmojiForCategory = (category) => {
//   const company = filteredCompanies.value.find((c) =>
//     c.perks.some((perk) => perk.category === category)
//   );
//   return company ? company.perks.find((perk) => perk.category === category).emoji : '';
// };

</script>

<style lang="scss">
.p-home {
  .hero {
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

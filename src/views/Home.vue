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

onMounted(() => {
  getCompanies()
})

async function getCompanies() {
  try {
    const { data: companies } = await supabase
      .from('companies')
      .select()

    console.log('companies', companies)

  } catch (error) {
    console.log('error ', error);
  }
}

const companies = [
  {
    name: "Huel",
    id: "huel",
    logo: "/logos/huel.png",
    description: "Huel (Human + Fuel) is nutritionally complete food. This means every Huel meal contains a balance of all 26 essential vitamins and minerals, protein, essential fats, carbs, fibre and phytonutrients in a single product.",
    perks: [
      {
        perkParentId: 1,
        category: "Reduced Work Week",
        description: "4 and a half day working week - We finish at 1 pm on a Friday!",
        emoji: "⏰"
      },
      {
        perkParentId: 2,
        category: "Great Holiday Benefits",
        description: "30 days annual leave PLUS bank holidays",
        emoji: "🌴"
      },
      {
        perkParentId: 3,
        category: "Flexible Working",
        description: "Flexible working - including up to 2 days per week at home",
        emoji: "🕖"
      },
      {
        perkParentId: 4,
        category: "Free or Subsidised Products/Services",
        description: "Free Huel to keep you going",
        emoji: "🥤"
      },
      {
        perkParentId: 5,
        category: "Remote Working",
        description: "2 weeks a year to work remotely from anywhere! One week in the Summer and one week at Christmas",
        emoji: "🏖️"
      },
      {
        perkParentId: 6,
        category: "Dog Friendly",
        description: "Dog friendly. If you've seen Daddy Day Care the movie, that's basically our HQ but for doggo's!",
        emoji: "🐾"
      },
      {
        perkParentId: 7,
        category: "Paid Volunteering Days",
        description: "Paid Volunteering Days",
        emoji: "🙋"
      },
    ],
    roles: [
      {
        role: "Senior Front End Developer",
        location: "Birmingham, UK",
        type: "Hybrid",
        link: "https://careers.huel.com/jobs/3231419-senior-frontend-engineer"
      },
      {
        role: "Senior Back End Developer",
        location: "Birmingham, UK",
        type: "Hybrid",
        link: "https://careers.huel.com/jobs/3231419-senior-frontend-engineer"
      },
      {
        role: "QA Engineer",
        location: "Birmingham, UK",
        type: "Hybrid",
        link: "https://careers.huel.com/jobs/3231419-senior-frontend-engineer"
      }
    ]
  },
  {
    name: "IO Studios",
    id: "io-studios",
    logo: "/logos/io-studios.png",
    description: "UK based, leading Software Development Agency, creating bespoke software from conception, all the way through to delivery for 15+ years.",
    perks: [
      {
        perkParentId: 10,
        category: "Celebration Days",
        description: "We love to celebrate our success with regular treats",
        emoji: "🎉"
      },
      {
        perkParentId: 11,
        category: "Free Subscriptions",
        description: "Free Spotify Subscription",
        emoji: "🎧"
      },
      {
        perkParentId: 2,
        category: "Great Holiday Benefits",
        description: "25 days holiday per year increasing with length of service, plus flexible bank holidays",
        emoji: "🌴"
      },
    ],
    roles: [
      {
        role: "Senior Front End Developer",
        location: "Birmingham, UK",
        type: "Hybrid",
        link: "https://careers.huel.com/jobs/3231419-senior-frontend-engineer"
      },
    ]
  },
  {
    name: "UNiDAYS",
    id: "unidays",
    logo: "/logos/unidays.jpg",
    description: "UNiDAYS is the world's largest Student Affinity Network. With over 29 million verified members across 115 markets, we take 800 of the biggest brands into the hearts and minds of tomorrow's professionals.",
    perks: [
      {
        perkParentId: 2,
        category: "Great Holiday Benefits",
        description: "25 days holiday per year increasing with length of service, plus flexible bank holidays",
        emoji: "🌴"
      },
      {
        perkParentId: 3,
        category: "Flexible Working",
        description: "Flexible working - including up to 2 days per week at home",
        emoji: "🕖"
      },
      {
        perkParentId: 8,
        category: "Private Health Insurance",
        description: "Private health insurance (Vitality)",
        emoji: "🏥"
      },
      {
        perkParentId: 9,
        category: "Bonus",
        description: "Company bonus scheme",
        emoji: "💰"
      }
    ],
    roles: [
      {
        role: "DevOps",
        location: "Birmingham, UK",
        type: "Hybrid",
        link: "https://careers.huel.com/jobs/3231419-senior-frontend-engineer"
      }
    ]
  }
];

const searchedRole = ref(null);
const selectedPerks = ref([]);

const filteredCompanies = computed(() => {
  if (selectedPerks.value.length === 0 && searchedRole.value === null) {
    return companies;
  } else {
    return companies.filter(company =>
      (selectedPerks.value.length === 0 || company.perks.some(perk => selectedPerks.value.includes(perk.category))) &&
      (searchedRole.value === null || company.roles.some(role => role.role.toLowerCase().includes(searchedRole.value.toLowerCase()))));
  }
});

// Create a function to calculate perkCategories based on filtered companies
const calculatePerkCategories = () => {
  const categories = new Set();
  filteredCompanies.value.forEach((company) => {
    company.perks.forEach((perk) => {
      categories.add(perk.category);
    });
  });
  return Array.from(categories);
};

const perkCategoriesItems = computed(() => {
  const filteredCategories = calculatePerkCategories();

  return filteredCategories.map((category) => {
    const emoji = getEmojiForCategory(category);
    return {
      key: emoji + ' ' + category,
      value: category,
    };
  });
});

const getEmojiForCategory = (category) => {
  const company = filteredCompanies.value.find((c) =>
    c.perks.some((perk) => perk.category === category)
  );
  return company ? company.perks.find((perk) => perk.category === category).emoji : '';
};

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

<template>
  <div class="p-company">
    <v-fade-transition>
      <div v-if="isLoaded" class="p-company__hero d-flex align-center"
        :style="{ 'background-image': 'url(' + company.header_image + ')' }">
        <v-container class="d-flex justify-center">
          <div style="width: 80%">
            <div class="p-company__hero-text">
              <div class="text-h4 font-weight-bold mb-2">
                {{ company.name }}
              </div>
              <div class="text-body-1 mb-4">
                {{ company.description }}
              </div>
              <div class="d-flex text-body-1 p-company__social-container">
                <div v-if="company.website">
                  <div class="d-flex align-center">
                    <div class="mr-1">
                      <v-icon :min-width="18" :min-height="18">mdi-home</v-icon>
                    </div>
                    <a :href="company.website" class="text-decoration-none p-company__hero-text" target="_blank">{{
                      company.name }}</a>
                  </div>
                </div>
                <div v-if="company.social_linkedin">
                  <div class="d-flex align-center">
                    <div class="mr-2">
                      <v-img eager class="ml-1" src="/images/social/linkedin-white.png" :min-width="18"
                        :min-height="18" />
                    </div>
                    <a :href="`https://www.linkedin.com/company/${company.social_linkedin}`"
                      class="text-decoration-none p-company__hero-text" target="_blank">{{
                        company.social_linkedin }}</a>
                  </div>
                </div>
                <div v-if="company.social_x" class="d-flex align-center">
                  <div class="mr-2">
                    <v-img eager class="ml-1" src="/images/social/x-white.png" :min-width="18" :min-height="18" />
                  </div>
                  <div><a :href="`https://www.x.com/${company.social_x}`" target="_blank"
                      class="text-decoration-none p-company__hero-text">{{
                        company.social_x }}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </v-container>
      </div>
    </v-fade-transition>
    <v-container>
      <v-responsive>
        <v-fade-transition>
          <v-row class="pa-1" v-if="isLoaded">
            <v-col cols="12" lg="4" md="4" sm="12">
              <v-sheet class="pa-3 mb-6" elevation="2" v-if="company.perks" rounded>
                <sidebar-item title="Location" />
                <iframe :src="mapSrc" width="100%" height="275" style="border:0" allowfullscreen
                  referrerpolicy="no-referrer-when-downgrade"></iframe>
              </v-sheet>
              <v-sheet class="pa-3 mb-6" elevation="2" v-if="company.perks" rounded>
                <sidebar-item title="Benefits & Perks" />
                <perk v-for="(perk, index) in company.perks" :key="index" :perk="perk"
                  :isLast="index < company.perks.length - 1" />
              </v-sheet>
              <v-sheet class="pa-3 mb-6" elevation="2" v-if="company.interviewProcess" rounded>
                <sidebar-item title="Interview Process" />
                <interview-process v-for="(interviewProcess, index) in company.interviewProcess" :index="index"
                  :key="index" :interviewProcess="interviewProcess"
                  :isLast="index < company.interviewProcess.length - 1" />
              </v-sheet>
              <v-sheet elevation="2" rounded class="pa-3" v-if="displayedJobs.length > 0">
                <sidebar-item title="Available Opportunities" />
                <jobs :jobs="displayedJobs" :company="company" />
                <v-btn v-if="showAllJobsButton && !showAllJobs" @click="onShowAllJobs()" class="mt-2" size="small"
                  variant="text" color="secondary">
                  Show More
                </v-btn>
              </v-sheet>
            </v-col>
            <v-col lg="8" md="8" sm="12">
              <v-sheet class="pa-3 mb-6 p-company__content" elevation="2" rounded v-for="(item, index) in company.content"
                :key="index" :class="{ 'mb-6': index !== company.content.length - 1 }">
                <sidebar-item :title="`${item.title} at ${company.name}?`" />
                <v-sheet class="text-body-2 font-weight-regular mt-3" v-html="item.content"></v-sheet>
              </v-sheet>
              <v-sheet v-if="company.techstack" class="pa-3 p-company__content" elevation="2" rounded>
                <sidebar-item :title="`What's the tech stack at ${company.name}?`" />
                <div class="p-company__stack d-flex align-center  flex-wrap mt-3">
                  <div v-for="(tech, index) in company.techstack" :key="index">
                    <v-tooltip :text="tech.name" location="bottom">
                      <template v-slot:activator="{ props }">
                        <i v-bind="props" class="colored" :class="tech.class"></i>
                      </template>
                    </v-tooltip>
                  </div>
                </div>
              </v-sheet>
            </v-col>
          </v-row>
        </v-fade-transition>
      </v-responsive>
    </v-container>
  </div>
  <email-capture :timeToDisplay="5000" />
</template>


<script setup>
import { onMounted, ref, computed } from 'vue';
import { supabase } from '../supabase'
import { useRoute } from 'vue-router';
import InterviewProcess from '@/components/ListItems/InterviewProcess.vue';
import Perk from '@/components/ListItems/Perk.vue';
import SidebarItem from '@/components/Cards/SidebarItem.vue';
import EmailCapture from '@/components/Dialogs/EmailCapture.vue';
import Jobs from '@/components/Cards/Jobs.vue';

const INITAL_JOBS = 5;

let company = ref({});
let isLoaded = ref(false);
const vanityUrl = ref(null);
const route = useRoute();
const displayedJobs = ref([]);
const allJobs = ref([]);
const showAllJobs = ref(false);
const googleMapAPIKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
let showAllJobsButton = ref(false);

onMounted(() => {
  vanityUrl.value = route.params.vanityUrl;
  scrollTo(0, 0);
  getCompanyByVanityUrl();
});

async function getCompanyByVanityUrl() {
  try {
    const { data: data } = await supabase
      .rpc('getCompanyByVanityUrl', {
        vanity_url_param: vanityUrl.value
      })
    company.value = data[0];
  } catch (error) {
    console.log('error ', error);
  } finally {
    renderJobsList();
    isLoaded.value = true;
  }
}

const renderJobsList = () => {
  if (company.value.jobs) {
    allJobs.value = company.value.jobs;
    allJobs.value = allJobs.value.sort((a, b) => a.role.localeCompare(b.role));
    if (allJobs.value.length > 3 && showAllJobs.value === false) {
      displayedJobs.value = allJobs.value.slice(0, INITAL_JOBS);
      showAllJobsButton = true;
    } else {
      displayedJobs.value = allJobs.value;
    }
  }
}

const onShowAllJobs = () => {
  showAllJobs.value = true;
  displayedJobs.value = allJobs.value;
}

const mapSrc = computed(() => {
  if (company && isLoaded) {
    return `https://www.google.com/maps/embed/v1/place?key=${googleMapAPIKey}&q=${encodeURIComponent(company.value.name + ", " + company.value.address)}&zoom=10`;
  }
});

</script>

<style lang="scss">
.p-company {
  overflow-x: hidden;

  &__stack {
    font-size: 40px;
    line-height: 40px;
    cursor: pointer;
    gap: 24px;
  }

  &__social-container {
    @media (max-width: 959px) {
      flex-direction: column;
      gap: 16px;
    }

    gap: 24px;
  }

  &__social-icons {
    text-decoration: none;
  }

  &__hero {
    min-height: 425px;
    background-size: cover;
    background-position: top;
    position: relative;
  }

  &__hero::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
    pointer-events: none;
  }

  &__hero-text {
    position: relative;
    z-index: 1;
    color: #fff;
  }

  &__content {
    img {
      width: 100%;
      margin-bottom: 16px;
    }

    ul {
      margin-bottom: 16px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    p {
      margin-bottom: 16px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    ul {
      margin-left: 25px;
    }
  }
}
</style>

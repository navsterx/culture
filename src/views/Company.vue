<template>
  <div class="p-company">
    <v-fade-transition>
      <div v-if="isLoaded">
        <v-sheet :color="company.brand_color" min-height="325"
          style="background: url('https://szesvbwpqmieaxppcjuh.supabase.co/storage/v1/object/public/images/io-studios/team.jpg'); background-repeat: no-repeat; background-size: cover; background-position:top;">
          <v-container style="position: relative">
            <v-row class="p-company__logo-container">
              <v-col cols="12" lg="4" md="4" sm="12">
                <div class="d-flex justify-center">
                  <v-img :src="company.logo" :max-width="175" style="z-index: 1" class="p-company__logo rounded-circle" />
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-sheet>
        <v-sheet class="pa-4" color="white" min-height="125"
          style="position: relative; border-bottom: 1px solid lightgrey">
          <v-container>
            <v-row class="p-company__social">
              <v-col cols="12" lg="4" md="4" sm="12">
              </v-col>
              <v-col cols="12" lg="8" md="4" sm="12">
                <div>
                  <div class="text-h5 font-weight-medium mb-2 text-textPrimary">
                    {{ company.name }}
                  </div>
                  <div class="text-body-2 mb-4">
                    {{ company.description }}
                  </div>
                  <div class="d-flex text-body-2 p-company__social-container">
                    <div v-if="company.website">
                      Website: <a :href="company.website" target="_blank" class="text-decoration-none">{{
                        company.website }}</a>
                    </div>
                    <div v-if="company.social_linkedin">
                      <div class="d-flex align-center">
                        <div class="mr-2">
                          <v-img src="/images/social/linkedin.png" :min-width="14" :min-height="14" />
                        </div>
                        <a :href="`https://www.linkedin.com/company/${company.social_linkedin}`"
                          class="text-decoration-none" target="_blank">{{
                            company.social_linkedin }}</a>
                      </div>
                    </div>
                    <div v-if="company.social_x" class="d-flex align-center">
                      <div class="mr-2">
                        <v-img src="/images/social/logo-black.png" :min-width="14" :min-height="14" />
                      </div>
                      <div><a :href="`https://www.x.com/${company.social_x}`" target="_blank"
                          class="text-decoration-none">{{
                            company.social_x }}</a>
                      </div>
                    </div>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-sheet>
      </div>
    </v-fade-transition>
    <v-container>
      <v-responsive>
        <v-fade-transition>
          <v-row class="pa-1" v-if="isLoaded">
            <v-col cols="12" lg="4" md="4" sm="12">
              <v-sheet class="pa-4 mb-6" elevation="1" v-if="company.perks" rounded>
                <sidebar-item title="Benefits & Perks" />
                <perk v-for="(   perk, index   ) in    company.perks   " :key="index" :perk="perk"
                  :isLast="index < company.perks.length - 1" />
              </v-sheet>
              <v-sheet class="pa-4 mb-6" elevation="1" v-if="company.interviewProcess" rounded>
                <sidebar-item title="Interview Process" />
                <interview-process v-for="(   interviewProcess, index   ) in    company.interviewProcess   "
                  :index="index" :key="index" :interviewProcess="interviewProcess"
                  :isLast="index < company.interviewProcess.length - 1" />
              </v-sheet>
              <v-sheet elevation="1" rounded class="pa-4">
                <sidebar-item title="Available Opportunities" />
                <v-list lines="one">
                  <v-list-item :border="true" :href="job.url" target="_blank"
                    v-for="(   job, index   ) in    displayedJobs   " :key="index" :base-color="company.brand_color"
                    :class="{
                      'mb-4': index < displayedJobs.length - 1,
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
              </v-sheet>
            </v-col>
            <v-col lg="8" md="8" sm="12">
              <v-sheet class="pa-4 mb-6 p-company__content" elevation="1" rounded
                v-for="(   item, index   ) in    company.content   " :key="index"
                :class="{ 'mb-6': index !== company.content.length - 1 }">
                <sidebar-item :title="`${item.title} at ${company.name}?`" />
                <div class="text-body-2 font-weight-regular mt-4" v-html="item.content"></div>
              </v-sheet>
              <v-sheet v-if="company.techstack" class="pa-4 p-company__content" elevation="1" rounded>
                <sidebar-item :title="`What's the tech stack at ${company.name}?`" />
                <div class="p-company__stack d-flex align-center  flex-wrap">
                  <div v-for="(   tech, index   ) in    company.techstack   " :key="index">
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
import { onMounted, ref } from 'vue';
import { supabase } from '../supabase'
import { useRoute } from 'vue-router';
import InterviewProcess from '@/components/ListItems/InterviewProcess.vue';
import Perk from '@/components/ListItems/Perk.vue';
import SidebarItem from '@/components/Cards/SidebarItem.vue';
import EmailCapture from '@/components/Dialogs/EmailCapture.vue';

let company = ref({});
let isLoaded = ref(false);
const vanityUrl = ref(null);
const route = useRoute();
const displayedJobs = ref([]);

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
    isLoaded.value = true;
    if (company.value.jobs) {
      displayedJobs.value = company.value.jobs;
    }
  }
}

</script>

<style lang="scss">
.p-company {
  &__stack {
    font-size: 40px;
    line-height: 40px;
    cursor: pointer;
    gap: 24px;
  }

  &__logo-container {
    position: absolute;
    width: 100%;
    top: 275px
  }

  &__logo {
    border: 3px solid #fff;
    box-shadow: 0 8px 12px 0 rgba(0, 0, 0, 0.096), 0 6px 20px 0 rgba(0, 0, 0, 0.082) !important;
  }

  &__social {
    @media (max-width: 959px) {
      padding-top: 86px;
    }
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

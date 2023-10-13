<template>
  <div class="p-company">
    <v-fade-transition>
      <v-sheet :color="company.brand_color" v-if="isLoaded">
        <v-container>
          <div class="text-h4 font-weight-medium text-center pa-10">
            {{ company.name }}
          </div>
        </v-container>
      </v-sheet>
    </v-fade-transition>
    <v-container>
      <v-responsive>
        <v-fade-transition>
          <v-row class="pa-1" v-if="isLoaded">
            <v-col cols="12" lg="4" md="4" sm="12">
              <v-sheet class="pa-4 mb-6" elevation="1" v-if="company.perks" rounded>
                <sidebar-item title="Benefits & Perks" />
                <perk v-for="(perk, index) in company.perks" :key="index" :perk="perk"
                  :isLast="index < company.perks.length - 1" />
              </v-sheet>
              <v-sheet class="pa-4" elevation="1" v-if="company.interviewProcess" rounded>
                <sidebar-item title="Interview Process" />
                <interview-process v-for="(interviewProcess, index) in company.interviewProcess" :index="index"
                  :key="index" :interviewProcess="interviewProcess" />
              </v-sheet>
            </v-col>
            <v-col lg="8" md="8" sm="12">
              <v-sheet class="pa-4 mb-6 p-company__content" elevation="1" rounded v-for="(item, index) in company.content"
                :index="index">
                <sidebar-item :title="`${item.title} at ${company.name}?`" />
                <div class="text-body-2 font-weight-regular mt-4" v-html="item.content">
                </div>
              </v-sheet>
              <v-sheet elevation="1" rounded class="pa-4">
                <sidebar-item title="Available Opportunities" />
                <v-list lines="one">
                  <v-list-item :border="true" :href="job.url" target="_blank" v-for="(job, index) in displayedJobs"
                    :key="index" base-color="textPrimary" :class="{
                      'mb-4': index < displayedJobs.length - 1,
                      'pa-3': true
                    }" rounded="lg" active-color="red">
                    <div class="text-body-1 font-weight-medium">
                      {{ job.role }}
                    </div>
                    <div class="text-body-2 font-weight-regular">
                      {{ job.location }}
                      {{ job.type ? "/ " + job.type : '' }}
                      {{ job.salary ? "/ " + job.salary : '' }}
                    </div>
                    <template v-slot:append>
                      <v-icon icon="mdi-open-in-new" color="primary" size="small"></v-icon>
                    </template>
                  </v-list-item>
                </v-list>
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
  &__content {
    img {
      width: 100%;
    }

    p {
      margin-bottom: 20px;

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

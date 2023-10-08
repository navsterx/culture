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
      <v-responsive class="align-center">
        <v-fade-transition>
          <v-row class="pa-1" v-if="isLoaded">
            <v-col cols="12" sm="4">
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
            <v-col cols="12" sm="8">

              <v-row class="mb-4">
                <v-col cols="12" sm="6" v-for="(role, index) in company.roles" :key="index">
                  <v-sheet class="pa-4" elevation="1" rounded>
                    <div class="text-body-1 font-weight-medium">{{ role.role }}</div>
                    <div class="text-body-2 font-weight-regular mb-2">{{ role.type }} / {{ role.location }}</div>
                    <v-btn :color="company.brand_color" size="small" elevation="0" :href="role.url"
                      target="_blank">Apply</v-btn>
                  </v-sheet>
                </v-col>
              </v-row>

              <v-sheet class="pa-4" elevation="1" rounded>
                <div class="text-body-2 p-company__content" v-html="company.content">
                </div>
              </v-sheet>
            </v-col>
          </v-row>
        </v-fade-transition>
      </v-responsive>
    </v-container>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { supabase } from '../supabase'
import { useRoute } from 'vue-router';
import InterviewProcess from '@/components/ListItems/InterviewProcess.vue';
import Perk from '@/components/ListItems/Perk.vue';
import SidebarItem from '@/components/Cards/SidebarItem.vue';

let company = ref({});
let isLoaded = ref(false);
const vanityUrl = ref(null);
const route = useRoute();

onMounted(() => {
  vanityUrl.value = route.params.vanityUrl;
  scrollTo(0, 0);
  getCompanyByVanityUrl()
})

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
  }
}
</script>

<style lang="scss">
.p-company {
  &__content {
    ul {
      margin-left: 30px;
      margin-bottom: 20px;

      li {
        line-height: 25px;
      }
    }

    p {
      margin-bottom: 20px;
    }

    h2 {
      margin-bottom: 20px;
      font-weight: 500;
    }

    h3 {
      line-height: 40px;
      font-weight: 500;
    }
  }
}
</style>

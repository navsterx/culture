<template>
  <div class="p-company">
    <div class="p-company__hero">
      <v-fade-transition>
        <v-sheet :color="company.brand_color" v-if="isLoaded">
          <v-container>
            <div class="text-h4 font-weight-medium text-center pa-10">
              {{ company.name }}
            </div>
          </v-container>
        </v-sheet>
      </v-fade-transition>
    </div>
    <v-container>
      <v-responsive class="align-center">
        <v-fade-transition>
          <v-row class="pa-1" v-if="isLoaded">
            <v-col cols="12" sm="4" v-for="(role, index) in displayedRoles" :key="index">
              <v-sheet class="pa-4" elevation="1" rounded>
                <div class="text-body-1 font-weight-medium">{{ role.role }}</div>
                <div class="text-body-2 font-weight-regular mb-2">{{ role.location }}</div>
                <v-btn :color="company.brand_color" size="small" elevation="0" :href="role.url"
                  target="_blank">Apply</v-btn>
              </v-sheet>
            </v-col>
          </v-row>
        </v-fade-transition>
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
              <v-sheet class="pa-4 mb-6 p-company__content" elevation="1" rounded v-for="(item, index) in company.content"
                :index="index">
                <sidebar-item :title="`${item.title} at ${company.name}?`" />
                <div class="text-body-2 font-weight-regular mt-4" v-html="item.content">
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
const displayedRoles = ref([]);

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
    if (company.value.roles) {
      displayedRoles.value = company.value.roles.slice(0, 3);
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

    ul {
      margin-left: 25px;
    }
  }

  &__hero {
    margin-top: 80px !important;
  }
}
</style>

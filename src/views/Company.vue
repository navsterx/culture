<template>
  <v-container class="p-company">
    <v-responsive class="align-center">
      <v-row class="pa-1">
        <v-col cols="12" sm="8">
          <v-sheet class="pa-4" elevation="1">
            <div class="text-h5 font-weight-medium mb-2">
              Life at {{ company.name }}
            </div>
            <div class="text-body-2">
              {{ company.description }}
            </div>
          </v-sheet>
        </v-col>
        <v-col cols="12" sm="4">
          <v-sheet class="pa-4 mb-6" elevation="1">
            <div class="text-subtitle-2 font-weight-medium">
              Perks
            </div>
            <v-divider class="mt-2 mb-4" />
            <div class="d-flex my-2 align-center" v-for="(perk, index) in company.perks" :key="index">
              <div class="mr-2">{{ perk.emoji }}</div>
              <div class="text-body-2">{{ perk.description }}</div>
            </div>
          </v-sheet>
          <v-sheet class="pa-4" elevation="1">
            <div class="text-subtitle-2 font-weight-medium">
              Interview Process
            </div>
            <v-divider class="mt-2 mb-4" />
            <div class="d-flex my-2" v-for="(interviewProcess, index) in company.interviewProcess" :key="index">
              <div class="mr-2 text-body-2 font-weight-medium">{{ index + 1 }}.</div>
              <div class="text-body-2">{{ interviewProcess.step }}</div>
            </div>
          </v-sheet>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { supabase } from '../supabase'
import { useRoute } from 'vue-router';

let company = ref({});
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
  }
}
</script>

<style lang="scss">
.p-company {}
</style>

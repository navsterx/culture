<template>
  <div class="p-company">
    <v-fade-transition>
      <div :style="`background:${company.brand_color}`" v-if="isLoaded">
        <v-container>
          <div class="text-h4 font-weight-medium text-center text-white pa-8">
            {{ company.name }}
          </div>
        </v-container>
      </div>
    </v-fade-transition>
    <v-container>
      <v-responsive class="align-center">
        <v-fade-transition>
          <v-row class="pa-1" v-if="isLoaded">
            <v-col cols="12" sm="4">
              <v-sheet class="pa-4 mb-6" elevation="1" v-if="company.perks">
                <div class="text-subtitle-2 font-weight-medium">
                  Perks
                </div>
                <v-divider class="mt-2 mb-4" />
                <div v-for="(perk, index) in company.perks" :key="index">
                  <div class="d-flex align-center">
                    <div class="mr-2">{{ perk.emoji }}</div>
                    <div class="text-body-2">{{ perk.description }}</div>
                  </div>
                  <v-divider v-if="index < company.perks.length - 1" class="my-2" />
                </div>
              </v-sheet>
              <v-sheet class="pa-4" elevation="1" v-if="company.interviewProcess">
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
            <v-col cols="12" sm="8">
              <v-sheet class="pa-4" elevation="1">
                <div class="text-body-2 mt-4 p-company__content" v-html="company.content">
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

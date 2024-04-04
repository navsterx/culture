<template>
  <v-app class="body">
    <v-row justify="center" class="ma-0 mt-10">
      <v-col cols="12">
        <div class="d-flex justify-center">
          <v-img src="/logo.png" :max-width="300" />
        </div>
        <div class="text-center text-body-1 font-weight-medium mt-2">
          Coming Soon
        </div>
      </v-col>
    </v-row>
    <cookie-policy />
    <email-capture :timeToDisplay="500" :showNoThanks="false" />
    <footer-bar />
  </v-app>
</template>

<script setup>
import EmailCapture from '@/components/Dialogs/EmailCapture.vue';
import CookiePolicy from '@/components/Dialogs/CookiePolicy.vue';
import FooterBar from './FooterBar.vue'

</script>

<style></style>

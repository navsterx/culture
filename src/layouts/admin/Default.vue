<template>
  <v-app class="body pa-4">
    <div class="d-flex mb-4">
      <img src="/logo.png" width="130" />
    </div>
    <default-view />
    <cookie-policy />
  </v-app>
</template>

<script setup>
import DefaultView from './View.vue'
import CookiePolicy from '@/components/Dialogs/CookiePolicy.vue';
</script>

<style>
.body {
  background: rgb(247, 244, 244) !important;
}
</style>

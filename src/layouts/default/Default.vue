<template>
  <v-app class="body">
    <header-bar />
    <default-view />
    <footer-bar />
    <cookie-policy />
  </v-app>
</template>

<script setup>
import HeaderBar from './HeaderBar.vue'
import DefaultView from './View.vue'
import FooterBar from './FooterBar.vue'
import CookiePolicy from '@/components/Dialogs/CookiePolicy.vue';

</script>

<style>
.body {
  background: rgb(247, 244, 244) !important;
}
</style>

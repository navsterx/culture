<template>
  <v-app class="body">
    <header-bar />
    <default-view />
    <footer-bar />
  </v-app>
</template>

<script setup>
import HeaderBar from './HeaderBar.vue'
import DefaultView from './View.vue'
import FooterBar from './FooterBar.vue'
</script>

<style>
.body {
  background: rgb(247, 244, 244) !important;
}
</style>

<template>
  <v-app class="body">
    <default-bar />
    <default-view />
    <footer-bar />
  </v-app>
</template>

<script setup>
  import DefaultBar from './AppBar.vue'
  import DefaultView from './View.vue'
  import FooterBar from './FooterBar.vue'
</script>

<style>
.body {
  background: rgb(247, 244, 244) !important;
}
</style>

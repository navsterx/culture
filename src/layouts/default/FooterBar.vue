<template>
  <div class="c-footer-bar">
    <v-sheet>
      <v-container>
        <div class="text-body-2 text-center">
          © {{ currentYear }} Awesome Culture. All rights reserved. Made with ❤️ in the West Midlands, UK.
        </div>
      </v-container>
    </v-sheet>
  </div>
</template>

<script setup>
const currentYear = new Date().getFullYear();
</script>

<style lang="scss">
.c-footer-bar {}
</style>

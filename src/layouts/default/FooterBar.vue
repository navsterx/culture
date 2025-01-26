<template>
  <div class="c-footer-bar">
    <v-sheet>
      <v-container>
        <div class="text-body-2 text-center">
          © {{ currentYear }} Awesome Culture. All rights reserved.
        </div>
        <div class="text-body-2 text-center c-footer-bar__text">
          Made with ❤️ by <a class="text-primary" href="https://www.develop4.io/" target="_blank">Develop4</a> in the
          West
          Midlands, UK.
        </div>
      </v-container>
    </v-sheet>
  </div>
</template>

<script setup>
const currentYear = new Date().getFullYear();
</script>

<style lang="scss">
.c-footer-bar {
  &__text {
    a {
      text-decoration: none;
    }
  }
}
</style>

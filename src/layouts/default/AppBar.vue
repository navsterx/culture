<template>
  <div class="c-app-bar">
    <v-container>
      <div class="d-flex justify-space-between align-center">
        <router-link to="/" class="mt-2">
          <img src="/logo.png" width="250" />
        </router-link>
        <nav class="text-body-2 font-weight-regular links">
          <router-link to="/listed" class="mr-6 font-weight-medium">Get Listed</router-link>
          <router-link to="/about" class="font-weight-medium">About</router-link>
        </nav>
      </div>
    </v-container>
  </div>
</template>

<script setup>
  //
</script>

<style lang="scss">
.c-app-bar {
  background: #fff;
  .links {
    a {
      text-decoration: none;
      color: #292929;
    }
  }
}
</style>
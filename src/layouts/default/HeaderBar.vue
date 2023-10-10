<template>
  <div class="c-header-bar">
    <v-container>
      <div class="d-flex justify-space-between align-center">
        <router-link to="/" class="mt-2">
          <img src="/logo.png" width="250" />
        </router-link>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" icon color="white" elevation="0">
              <v-icon>mdi-menu</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item to="/listed">
              <v-list-item-title>
                Get Listed
              </v-list-item-title>
            </v-list-item>
            <v-list-item to="/about">
              <v-list-item-title>
                About
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-container>
  </div>
</template>

<script setup>
//
</script>

<style lang="scss">
.c-header-bar {
  position: absolute;
  width: 100%;

  &__links {
    a {
      text-decoration: none;
      color: #292929;
    }
  }
}
</style>

<template>
  <div class="c-header-bar">
    <v-sheet color="white">
      <v-container class="pa-4">
        <div class="d-flex justify-space-between align-center">
          <router-link to="/">
            <v-img src="/logo.png" width="130" />
          </router-link>
          <v-menu location="bottom right">
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" icon color="black" variant="text">
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
    </v-sheet>
  </div>
</template>

<script setup>
//
</script>

<style lang="scss">
.c-header-bar {}
</style>

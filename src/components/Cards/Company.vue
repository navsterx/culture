<template>
  <v-col cols="12" sm="4" class="c-company-card">
    <v-sheet class="ma-2 pa-4" elevation="1">
      <router-link :to="`/company/${company.vanity_url}`" class="c-company-card__item">
        <div class="d-flex align-center mb-2">
          <img width="50" :src="`/logos/${company.vanity_url}.png`" class="mr-4 " />
          <div>
            <div class="text-body-1 font-weight-medium">{{ company.name }}</div>
            <div class="text-body-2" v-if="company.roles">
              <span class="font-weight-medium">{{ company.roles.length }}</span>
              role{{ company.roles.length === 1 ? '' : 's' }} available
            </div>
            <div class="text-body-2" v-else>
              No roles availabe right now
            </div>
          </div>
        </div>
        <v-divider class="my-4" />
        <div class="text-body-2">
          {{ company.description }}
        </div>
      </router-link>
      <v-divider class="my-4" />
      <div class="d-flex flex-wrap">
        <v-tooltip v-for="(perk, index) in company.perks" :key="index" :text="perk.description" location="bottom">
          <template v-slot:activator="{ props }">
            <div v-bind="props" class="mr-2 mb-2 c-company-card__emoji">
              {{ perk.emoji }}
            </div>
          </template>
        </v-tooltip>
      </div>
    </v-sheet>
  </v-col>
</template>

<script setup>

defineProps({
  company: {
    type: Object,
    required: true
  }
})

</script>

<style lang="scss">
.c-company-card {
  &__item {
    color: #292929;
    text-decoration: none;
  }

  &__emoji {
    cursor: pointer;
  }
}
</style>

<template>
  <v-autocomplete v-model="selectedRole" :items="uniqueRoles" density="compact" variant="solo"
    label="Search and select a role" dense clearable hide-details />
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const roles = ref([]);
const selectedRole = ref(null);

const props = defineProps({
  companies: {
    type: Array,
    required: true
  },
});

watch(() => props.companies, (newCompanies) => {
  const allRoles = newCompanies.flatMap(company => {
    if (company.jobs) {
      return company.jobs.map(job => job.role);
    } else {
      return [];
    }
  });
  roles.value = allRoles;
}, { immediate: true });

const uniqueRoles = computed(() => [...new Set(roles.value)].sort());
</script>

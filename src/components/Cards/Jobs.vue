<template>
  <v-list lines="one" class="c-jobs">
    <v-list-item :border="true" @click="displayDialog(job)" target="_blank" v-for="(job, index) in jobs" :key="index"
      :base-color="company.brand_color" :class="{
        'mb-4': index < jobs.length - 1,
        'pa-3': true
      }
        " rounded="lg">
      <div class="text-body-1 font-weight-medium">
        {{ job.role }}
      </div>
      <div class="text-body-2 font-weight-regular">
        {{ job.location }}
        {{ job.type ? "/ " + job.type : '' }}
        {{ job.salary ? "/ " + job.salary : '' }}
      </div>
      <template v-slot:append>
        <v-icon icon="mdi-open-in-new" :color="company.brand_color" size="small"></v-icon>
      </template>
    </v-list-item>
  </v-list>
  <v-dialog v-model="dialog" width="450">
    <v-card class="pa-2">
      <v-card-title>
        {{ selectedJob.role }}
      </v-card-title>
      <v-card-text class="pa-4 pt-2">
        <div class="text-body-2 font-weight-regular mb-4">
          We'll open your selected role in a new tab. Remember, you can return here at anytime to learn more about the
          culture of <span class="font-weight-bold">{{
            company.name }}</span>.
        </div>
        <div class="text-body-2 font-weight-regular">
          Best of luck in your job search, you got this!
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn size="small" variant="tonal" color="primary" @click="navigate">View Role</v-btn>
        <v-btn size="small" variant="tonal" color="error" @click="cancel">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  jobs: {
    type: Array,
    required: true
  },
  company: {
    type: Object,
    required: true
  },
  navigateToCompany: {
    type: Boolean,
    required: false
  }
});

const dialog = ref(false);
const selectedJob = ref({});

const displayDialog = (job) => {
  dialog.value = true;
  selectedJob.value = job;
}

const navigate = () => {
  dialog.value = false;
  if (props.navigateToCompany) {
    window.location = `/company/${props.company.vanity_url}`;
  } else {
    window.scroll(0, 0);
  }
  window.open(selectedJob.value.url);
}

const cancel = () => {
  dialog.value = false;
}

</script>

<template>
  <div class="c-cookie-policy">
    <v-dialog v-model="dialogOpen" width="auto" :max-width="675" persistent>
      <v-card>
        <v-card-text class="text-body-2 pt-6">
          We use cookies and similar technologies to understand how you use our services, improve your experience and
          serve you personalised content and advertising. By clicking "Accept All", you accept all cookies. By clicking
          "Reject All", you reject all cookies except Strictly Necessary cookies.
        </v-card-text>
        <v-card-actions class="ml-4 mb-4">
          <v-btn class="text-body-2" color="primary" variant="flat" @click="accept">Accept All</v-btn>
          <v-btn class="text-body-2" color="lightgrey" variant="flat" @click="reject">Reject All</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { onMounted, ref, computed, watch } from 'vue';

const dialogOpen = ref(false);

const props = defineProps({
  showNoThanks: {
    type: Boolean,
    required: false,
    default: true,
  }
});

const showDialog = computed(() => {
  const cookiesOptIn = localStorage.getItem('cookiesOptIn');
  return !(cookiesOptIn);
});

const accept = () => {
  localStorage.setItem('cookiesOptIn', true);
  dialogOpen.value = false;
  location.reload();
};

const reject = () => {
  localStorage.setItem('cookiesOptIn', false);
  dialogOpen.value = false;
};

onMounted(() => {
  setTimeout(() => {
    dialogOpen.value = showDialog.value;
  }, props.timeToDisplay);
});

const cookiesOptIn = computed(() => localStorage.getItem('cookiesOptIn') ?? false);

watch([cookiesOptIn], () => {
  dialogOpen.value = showDialog.value(cookiesOptIn.value);
});

</script>

<style lang="scss">
.c-cookie-policy {}
</style>

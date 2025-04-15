<template>
  <div class="c-cookie-policy">
    <v-dialog v-model="dialogOpen" width="auto" :max-width="675" persistent>
      <v-card>
        <v-card-text class="text-body-2 pt-6">
          We use cookies and similar technologies to understand how you use our
          services, improve your experience and serve you personalised content
          and advertising. By clicking "Accept All", you accept all cookies. By
          clicking "Reject All", you reject all cookies except Strictly
          Necessary cookies.
        </v-card-text>
        <v-card-actions class="ml-4 mb-4">
          <v-btn
            class="text-body-2"
            color="primary"
            variant="flat"
            @click="accept"
            >Accept All</v-btn
          >
          <v-btn
            class="text-body-2"
            color="lightgrey"
            variant="flat"
            @click="reject"
            >Reject All</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { onMounted, ref, computed, watch } from "vue";
import { useGlobalStore } from "@/stores/global";

const globalStore = useGlobalStore();

const dialogOpen = ref(false);

const props = defineProps({
  showNoThanks: {
    type: Boolean,
    required: false,
    default: true,
  },
  timeToDisplay: {
    type: Number,
    required: false,
    default: 1000, // Default delay before showing the dialog
  },
});

// Computed property to determine if the dialog should be shown
const showDialog = computed(() => {
  return (
    globalStore.cookiesOptIn === null || globalStore.cookiesOptIn === undefined
  );
});

// Accept cookies
const accept = () => {
  globalStore.setCookiesOptIn(true);
  dialogOpen.value = false;
  location.reload();
};

// Reject cookies
const reject = () => {
  globalStore.setCookiesOptIn(false);
  dialogOpen.value = false;
};

// Show the dialog on mount after a delay
onMounted(() => {
  setTimeout(() => {
    dialogOpen.value = showDialog.value;
  }, props.timeToDisplay);
});

// Watch for changes in cookiesOptIn and update dialog visibility
watch(
  () => globalStore.cookiesOptIn,
  (newValue) => {
    dialogOpen.value = showDialog.value;
  }
);
</script>

<style lang="scss">
.c-cookie-policy {
}
</style>

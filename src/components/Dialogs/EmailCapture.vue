<template>
  <div class="c-email-capture">
    <v-fade-transition>
      <div class="c-email-capture__dialog pa-2" v-if="dialogOpen">
        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <div class="text-h6 mb-2 text-white">
                Subscribe for Inspiring Companies!
              </div>
              <div class="text-body-2 text-white">
                Get ready to discover inspiring companies with amazing cultures!
                We'll send you occasional emails featuring these gems. Rest
                assured, your email is safe with us, and you can unsubscribe
                anytime you like.
              </div>
              <div class="text-body-2"></div>
            </v-col>
            <v-col cols="12" md="6">
              <v-form @submit.prevent="subscribe">
                <v-text-field
                  class="mb-4"
                  variant="solo"
                  density="compact"
                  v-model="email"
                  :rules="rules"
                  hide-details="auto"
                  label="Email Address"
                  @focus="onFocus"
                  :class="{ 'v-focus': focused }"
                ></v-text-field>
                <div>
                  <v-btn
                    class="mr-2 text-body-2"
                    color="white"
                    variant="flat"
                    @click="subscribe"
                    >Subscribe</v-btn
                  >
                  <v-btn
                    class="text-body-2"
                    v-if="showNoThanks"
                    color="white"
                    variant="text"
                    @click="cancel"
                    >No thanks</v-btn
                  >
                </div>
              </v-form>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-fade-transition>
    <v-snackbar
      v-model="snackbar"
      :timeout="3000"
      color="success"
      location="top right"
    >
      Great! You have subscribed successfully!
    </v-snackbar>
  </div>
</template>

<script setup>
import { onMounted, ref, computed, watch } from "vue";
import { supabase } from "/src/supabase.js";
import { useGlobalStore } from "@/stores/global";

const globalStore = useGlobalStore();

const dialogOpen = ref(false);
const email = ref("");
const rules = [
  (v) => !!v || "Email is required",
  (v) => /.+@.+\..+/.test(v) || "Email must be valid",
];
const snackbar = ref(false);
const focused = ref(false);

const props = defineProps({
  timeToDisplay: {
    type: Number,
    required: true,
  },
  showNoThanks: {
    type: Boolean,
    required: false,
    default: true,
  },
});

const onFocus = () => {
  focused.value = true;
  window.scrollTo({
    top: window.scrollY + 313,
    behavior: "smooth",
  });
};

const validEmail = computed(() => {
  return email.value && rules.every((rule) => rule(email.value) === true);
});

const showDialog = computed(() => {
  return (
    globalStore.emailOptIn === null || globalStore.emailOptIn === undefined
  );
});

const subscribe = async () => {
  if (validEmail.value) {
    const { data: insertResult, error: insertError } = await supabase
      .from("emailcapture")
      .insert({ email: email.value });

    if (insertError) {
      globalStore.setEmailOptIn(true);
      dialogOpen.value = false;
    } else {
      globalStore.setEmailOptIn(true);
      snackbar.value = true;
      dialogOpen.value = false;
    }
  }
};

const cancel = () => {
  globalStore.setEmailOptIn(false);
  dialogOpen.value = false;
};

onMounted(() => {
  setTimeout(() => {
    dialogOpen.value = showDialog.value;
  }, props.timeToDisplay);
});

watch(
  () => globalStore.emailOptIn,
  () => {
    dialogOpen.value = showDialog.value;
  }
);
</script>

<style lang="scss">
.c-email-capture {
  &__dialog {
    background: rgb(var(--v-theme-primary)) !important;
    position: fixed !important;
    bottom: 0 !important;
    width: 100% !important;
    transition: transform 0.3s ease; // Add transition property for smooth movement
  }
}
</style>

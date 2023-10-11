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
                Every so often we'll send you an email telling you about new companies that have awesome culture. We will
                not
                share your email with anyone else and you can opt-out at any time.
              </div>
              <div class="text-body-2">
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <v-form @submit.prevent="subscribe">
                <v-text-field class="mb-4" variant="solo" density="compact" v-model="email" :rules="rules"
                  hide-details="auto" label="Email Address" @focus="onFocus"
                  :class="{ 'v-focus': focused }"></v-text-field>
                <div>
                  <v-btn color="white" class="mr-2" variant="flat" @click="subscribe">Subscribe</v-btn>
                  <v-btn color="white" variant="text" @click="cancel">No thanks</v-btn>
                </div>
              </v-form>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-fade-transition>
    <v-snackbar v-model="snackbar" :timeout="3000" color="success" location="top right">
      Great! You have subscribed successfully!
    </v-snackbar>
  </div>
</template>

<script setup>
import { onMounted, ref, computed, watch } from 'vue';
import { supabase } from '/src/supabase.js'

const dialogOpen = ref(false);
const email = ref('');
const rules = [
  (v) => !!v || 'Email is required',
  (v) => /.+@.+\..+/.test(v) || 'Email must be valid',
];
const snackbar = ref(false);
const focused = ref(false);

const props = defineProps({
  timeToDisplay: {
    type: Number,
    required: true
  },
});

const onFocus = () => {
  focused.value = true;
  // Calculate how much space there is left to scroll down
  const spaceToScroll = document.body.scrollHeight - (window.scrollY + window.innerHeight);

  // Check if there's enough space to scroll down by 300px
  if (spaceToScroll >= 300) {
    window.scrollTo({
      top: window.scrollY + 300,
      behavior: 'smooth',
    });
  }
}

const validEmail = computed(() => {
  return email.value && rules.every((rule) => rule(email.value) === true);
});

const showDialog = computed(() => {
  const optedOut = localStorage.getItem('optedOut');
  const subscribed = localStorage.getItem('subscribed');
  return !(optedOut || subscribed);
});

const subscribe = async () => {
  if (validEmail.value) {
    const { data: insertResult, error: insertError } = await supabase
      .from("emailcapture")
      .insert({ email: email.value });

    if (insertError) {
      localStorage.setItem('subscribed', true);
      dialogOpen.value = false;
    } else {
      localStorage.setItem('subscribed', true);
      snackbar.value = true;
      dialogOpen.value = false;
    }
  }
};

const cancel = () => {
  localStorage.setItem('optedOut', true);
  dialogOpen.value = false;
};

onMounted(() => {
  setTimeout(() => {
    dialogOpen.value = showDialog.value;
  }, props.timeToDisplay);
});

watch([localStorage.getItem('optedOut'), localStorage.getItem('subscribed')], () => {
  dialogOpen.value = showDialog.value;
});
</script>

<style lang="scss">
.c-email-capture {
  &__dialog {
    background: rgb(var(--v-theme-primary)) !important;
    position: sticky !important;
    bottom: 0 !important;
    width: 100% !important;
    transition: transform 0.3s ease; // Add transition property for smooth movement
  }

}
</style>
<template>
  <div class="c-email-capture">
    <v-dialog v-model="dialogOpen" width="500" persistent>
      <v-form @submit.prevent="subscribe">
        <v-card>
          <v-card-text>
            <div class="text-h6 mb-4">
              Subscribe for Inspiring Companies in Your Inbox!
            </div>
            <div class="text-body-2 mb-4">
              We will not share your details with anyone else and you can opt-out at any time.
            </div>
            <div class="text-body-2">
              <v-text-field variant="outlined" density="compact" v-model="email" :rules="rules" hide-details="auto"
                label="Email Address"></v-text-field>
            </div>
          </v-card-text>
          <v-card-actions class="pl-6 pr-6 pb-6 pt-4">
            <v-btn color="primary" variant="flat" :disabled="!validEmail" @click="subscribe">Subscribe</v-btn>
            <v-btn color="lightgrey" @click="cancel">No thanks</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
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

const props = defineProps({
  timeToDisplay: {
    type: Number,
    required: true
  },
});

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
.c-email-capture {}
</style>
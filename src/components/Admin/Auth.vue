<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="6">
        <v-card class="pa-4">
          <div class="text-center">
          </div>
          <p class="text-body-2 my-4 text-center">Sign in via magic link with your email below</p>
          <v-form @submit.prevent="handleLogin">
            <v-text-field v-model="email" label="Your email" variant="outlined" density="compact" class="mb-4" required
              :rules="emailRules" :valid="validEmail"></v-text-field>
            <v-btn type="submit" elevation="0" :loading="loading" color="primary" :disabled="!validEmail">
              {{ loading ? 'Loading' : 'Send magic link' }}
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { supabase } from '/src/supabase'

const loading = ref(false)
const email = ref('')
const validEmail = computed(() => {
  return emailRules.every(rule => rule(email.value) === true);
});

const getURL = () => {
  const isLocal = window.location.hostname.includes(':3000');
  const baseUrl = isLocal ? 'https://' + window.location.hostname : 'http://' + window.location.hostname + ':3000';
  return baseUrl + '/admin/dashboard';
}

const emailRules = [
  (v) => !!v || 'Email is required',
  (v) => /^\S+@\S+\.\S+$/.test(v) || 'Email must be valid',
]

const handleLogin = async () => {
  if (validEmail.value) {
    try {
      loading.value = true
      const { error } = await supabase.auth.signInWithOtp({
        email: email.value,
        options: {
          emailRedirectTo: getURL()
        }
      })
      if (error) throw error
      alert('Check your email for the login link!')
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      loading.value = false
    }
  }
}
</script>

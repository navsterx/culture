<script setup>
import { onMounted, ref } from 'vue'
import Account from '@/components/Admin/Account.vue'
import Auth from '@/components/Admin/Auth.vue'
import { supabase } from '/src/supabase'

const session = ref()

onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session
  })

  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session
  })
})
</script>

<template>
  <Account v-if="session" :session="session" />
  <Auth v-else />
</template>

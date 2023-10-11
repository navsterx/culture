<script setup>
import { supabase } from '/src/supabase'
import { onMounted, ref, toRefs } from 'vue'

const props = defineProps(['session'])
const { session } = toRefs(props)

const loading = ref(true)
const company_id = ref('')

onMounted(() => {
  getProfile()
})

async function getProfile() {
  try {
    loading.value = true
    const { user } = session.value

    let { data, error, status } = await supabase
      .from('users')
      .select(`company_id`)
      .eq('user_id', user.id)
      .single()

    if (error && status !== 406) throw error

    if (data) {
      company_id.value = data.company_id
    }
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}

async function updateProfile() {
  try {
    loading.value = true
    const { user } = session.value

    const updates = {
      user_id: user.id,
      company_id: company_id.value,
    }

    let { error } = await supabase.from('users').upsert(updates)

    if (error) throw error
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}

async function signOut() {
  try {
    loading.value = true
    let { error } = await supabase.auth.signOut()
    if (error) throw error
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div v-if="!company_id">
    Invite only buddy, sorry
    <button class="button block" @click="signOut" :disabled="loading">Sign Out</button>
  </div>
  <div v-else>
    <form class="form-widget" @submit.prevent="updateProfile">
      <div>
        <label for="email">Email</label>
        <input id="email" type="text" :value="session.user.email" disabled />
      </div>
      <div>
        <label for="company_id">company_id</label>
        <input id="company_id" type="text" v-model="company_id" />
      </div>

      <div>
        <input type="submit" class="button primary block" :value="loading ? 'Loading ...' : 'Update'"
          :disabled="loading" />
      </div>

      <div>
        <button class="button block" @click="signOut" :disabled="loading">Sign Out</button>
      </div>
    </form>
  </div>
</template>
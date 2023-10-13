<template>
  <v-text-field color="primary" label="Search for a role" density="compact" variant="solo" clearable
    v-model="internalValue" hide-details @focus="onFocus" />
</template>

<script setup>
import { ref, watch, defineEmits } from 'vue';

const props = defineProps({
  value: String,
  delay: {
    type: Number,
    default: 3000,
  },
  companies: {
    type: Array,
    required: true
  }
});

const onFocus = () => {
  window.scrollTo({
    top: window.scrollY + 313,
    behavior: 'smooth',
  });
}

const emit = defineEmits();

const internalValue = ref(props.value);
const debouncing = ref(false);
let timeoutId = null;

const updateInternalValue = () => {
  debouncing.value = false;
  emit('update:value', internalValue.value);
};

watch(internalValue, () => {
  debouncing.value = true;

  if (timeoutId) {
    clearTimeout(timeoutId);
  }

  timeoutId = setTimeout(updateInternalValue, props.delay);
});
</script>

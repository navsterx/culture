<template>
  <v-text-field color="primary" label="Search for a role" density="compact" variant="solo" clearable
    v-model="internalValue" hide-details />
</template>

<script>
import { ref, watch } from 'vue';

export default {
  props: {
    value: String,
    delay: {
      type: Number,
      default: 3000,
    },
  },
  setup(props, { emit }) {
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

    return {
      internalValue,
      debouncing,
    };
  },
};
</script>

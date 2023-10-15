<template>
  <v-text-field color="primary" label="Search for a role" density="compact" variant="solo" clearable
    v-model="internalValue" hide-details @input="onInput" />
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
    companies: {
      type: Array,
      required: true,
    },
  },
  setup(props, { emit }) {
    const internalValue = ref(props.value);
    let timeoutId = null;

    const updateInternalValue = () => {
      emit('update:value', internalValue.value);
    };

    const onInput = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        updateInternalValue();
      }, props.delay);
    };

    return {
      internalValue,
      onInput,
    };
  },
};
</script>

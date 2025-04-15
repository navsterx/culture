// stores/counter.js
import { defineStore } from "pinia";
import { ref } from "vue";

export const useGlobalStore = defineStore(
  "globalStore",
  () => {
    const cookiesOptIn = ref();
    const emailOptIn = ref();

    function setCookiesOptIn(value) {
      cookiesOptIn.value = value;
    }

    function setEmailOptIn(value) {
      emailOptIn.value = value;
    }

    return { cookiesOptIn, emailOptIn, setCookiesOptIn, setEmailOptIn };
  },
  {
    persist: true,
  }
);

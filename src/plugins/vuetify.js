/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import { VSkeletonLoader } from 'vuetify/labs/VSkeletonLoader';

// Composables
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  components: {
    VSkeletonLoader,
  },
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#67b583',
          secondary: '#b56799',
          textPrimary: "#232323",
          textSecondary: '#878787',
          lightGrey: "#f5f5f5",
        },
      },
    },
  },
})

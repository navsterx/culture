/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

// Composables
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides

const light = {
  dark: false,
  colors: {
    primary: '#67b583',
    secondary: '#b56799',
    textPrimary: "#232323",
    textSecondary: '#878787',
    lightGrey: "#f5f5f5",
    background: "#ffffff"
  },
};

const dark = {
  dark: true,
  colors: {
    primary: '#67b583',
    secondary: '#b56799',
    textPrimary: "#fff",
    textSecondary: '#fff',
    lightGrey: "#fff",
    background: "#ffffff"
  },
};

export default createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: "light",
    themes: {
      light,
      dark
    },
  },
})

/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import MasonryWall from '@yeger/vue-masonry-wall'

// Plugins
import { registerPlugins } from '@/plugins'

const app = createApp(App)

app.use(MasonryWall)

registerPlugins(app)

app.mount('#app')

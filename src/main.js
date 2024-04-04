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
import { createHead } from '@unhead/vue'

// Plugins
import { registerPlugins } from '@/plugins'

const app = createApp(App)

const head = createHead()
app.use(head)

app.use(MasonryWall)

registerPlugins(app)

app.mount('#app')

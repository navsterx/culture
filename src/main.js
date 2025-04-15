/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";
import MasonryWall from "@yeger/vue-masonry-wall";
import { createHead } from "@unhead/vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

// Plugins
import { registerPlugins } from "@/plugins";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);

const head = createHead();
app.use(head);

app.use(MasonryWall);

registerPlugins(app);

app.use(pinia);
app.mount("#app");

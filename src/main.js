import { createApp } from "vue";
import App from "./App.vue";

// Plugins
import { registerPlugins } from "@/plugins";
import store from "@/store";
import router from "./router";

const app = createApp(App);
registerPlugins(app);

app
    .use(store)
    .use(router)
    .mount("#app");

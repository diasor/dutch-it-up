import { createApp } from "vue";
import App from "./App.vue";
import { loadFonts } from "@/plugins/webfontloader";
import vuetify from "@/plugins/vuetify";

// plugins
import store from "@/store";
import router from "./router";

const app = createApp(App);
loadFonts();
app
    .use(vuetify)
    .use(store)
    .use(router)
    .mount("#app");

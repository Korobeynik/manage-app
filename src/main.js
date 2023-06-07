import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
//import "@mdi/font/css/materialdesignicons.css";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
});

import ToastPlugin from "vue-toast-notification";

import "vue-toast-notification/dist/theme-bootstrap.css";

const app = createApp(App);
app.use(ToastPlugin);
app.use(vuetify);
app.use(store);
app.use(router);
app.mount("#app");

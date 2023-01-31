import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./routes";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/main.css";

const app = createApp(App);

app.use(router);
app.use(createPinia());
app.mount("#app");

import "bootstrap/dist/js/bootstrap.js";

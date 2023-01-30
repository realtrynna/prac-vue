import "bootstrap/dist/css/bootstrap.min.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { functionPlugin } from "./plugins/function";
import { objPlugin } from "./plugins/obj";
import person from "./plugins/person";
import globalComponents from "./plugins/global.component";
import dayjs from "./plugins/date";
import { createPinia } from "pinia";

import "./assets/main.css";

const app = createApp(App);

app.use(globalComponents);
app.use(person);
app.use(dayjs);
app.use(createPinia());
app.use(router);
app.mount("#app");

import "bootstrap/dist/js/bootstrap.js";

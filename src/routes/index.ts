import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import MyPage from "../views/MyPage.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: HomeView,
    },
    {
        path: "/about",
        name: "About",
        component: AboutView,
    },
    {
        path: "/default",
        name: "Default",
        component: MyPage,
        // beforeEnter: (to, from) => {
        //     return { name: "About" };
        // },
    },
];

const router = createRouter({
    history: createWebHistory("/"),
    routes,
});

// router.beforeEach((to, from) => {
//     return { na}
// });

export default router;

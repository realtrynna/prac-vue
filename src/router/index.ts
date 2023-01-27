import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import PostCreateView from "@/views/posts/PostCreateView.vue";
import PostDetailView from "@/views/posts/PostDetailView.vue";
import PostEditView from "@/views/posts/PostEditView.vue";
import PostListView from "@/views/posts/PostListView.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: HomeView,
    },
    {
        path: "/posts",
        name: "PostList",
        component: PostListView,
    },
    {
        path: "/posts/create",
        name: "PostCreate",
        component: PostCreateView,
    },
    {
        path: "/posts/:postId",
        name: "PostDetail",
        component: PostDetailView,
    },
    {
        path: "/posts/:postId/edit",
        name: "PostEdit",
        component: PostEditView,
    },
];
const router = createRouter({
    history: createWebHistory("/"),
    routes,
});

export default router;

<template>
    <div>
        <h2>{{ post.id }}</h2>
        <h3>{{ post.title }}</h3>
        <p>{{ post.content }}</p>
        <hr />
        <div>
            <button @click="pageGoPostList">List</button>
            <button @click="pageGoPostEdit">Edit</button>
            <button>Delete</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { findPostById } from "../../api/posts";

const router = useRouter();
const route = useRoute();

const { postId } = route.params;

const post = ref({});

const pageGoPostList = () => {
    return router.push({
        name: "PostList",
    });
};

const pageGoPostEdit = () => {
    return router.push({
        name: "PostEdit",
        params: {
            postId,
        },
    });
};

onMounted(async () => {
    const result = await findPostById(Number(postId));

    post.value = { ...result };
});
</script>

<style scoped></style>

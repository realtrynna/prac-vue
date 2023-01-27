<template>
    <div>
        <form action="" @submit.prevent>
            <div class="mb-3">
                <label for="title" class="form-label">Title</label>
                <input
                    type="title"
                    class="form-control"
                    v-model="createPostDto.title"
                />
            </div>
            <div class="mb-3">
                <label for="content" class="form-label">Content </label>
                <textarea
                    class="form-control"
                    rows="3"
                    v-model="createPostDto.content"
                ></textarea>
            </div>
            <div class="pt-4">
                <button type="button" @click="pageGoPostList">List</button>
                <button type="submit" @click="createPostBtn">Submit</button>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import { createPost } from "../../api/posts";

const router = useRouter();
const route = useRoute();

const createPostDto = reactive({
    id: 0,
    title: null,
    content: null,
});

const createPostBtn = async () => {
    if (createPostDto.title !== null && createPostDto.content !== null) {
        const { status } = await createPost(
            createPostDto.id,
            createPostDto.title,
            createPostDto.content
        );

        if (status !== 201) return alert("Fail");

        router.push({ name: "PostList" });
    }
};

const pageGoPostList = () => router.push({ name: "PostList" });
</script>

<style scoped></style>

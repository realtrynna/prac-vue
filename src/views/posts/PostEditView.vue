<template>
    <div>
        <form action="" @submit.prevent>
            <div class="mb-3">
                <label for="title" class="form-label">Title</label>
                <input type="email" class="form-control" />
            </div>
            <div class="mb-3">
                <label for="content" class="form-label">Content </label>
                <textarea class="form-control" rows="3"></textarea>
            </div>
            <div class="pt-4">
                <button type="button" @click="pageGoPostDetail">Cancel</button>
                <button type="submit">Edit</button>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const { postId } = route.params;

const pageGoPostDetail = () => {
    return router.push({
        name: "PostDetail",
        params: { postId },
    });
};
</script>

<style scoped></style>

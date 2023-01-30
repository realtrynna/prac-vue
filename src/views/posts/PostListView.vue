<template>
    <div>
        <h3>게시글 리스트</h3>
        <hr />
        <AppLoading v-if="loading"></AppLoading>
        <AppError v-else-if="error" :message="error.message"></AppError>
        <div v-else v-for="post in posts" :key="post.id">
            <PostCard
                :id="post.id"
                :title="post.title"
                :content="post.content"
                @click="pageGoPostDetail(post.id)"
                :condi="useOdd(post.id) === 'Even' ? '짝수' : '홀수'"
            ></PostCard>
        </div>
        <button :class="{ disabled: condition !== 0 }">
            {{ condition }}
        </button>
        {{ userName }}
        {{ userAge }}
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, inject, reactive, toRef, toRefs, isRef } from "vue";
import { getPostList } from "../../api/posts";
import PostCard from "../../components/posts/PostCard.vue";
import AppError from "../../components/AppError.vue";
import AppLoading from "@/components/AppLoading.vue";
// import { posts } from "../../api/posts";
import { useRouter } from "vue-router";
import { useOdd } from "../../hooks/useOdd";

import { useAlert } from "../../hooks/useAlert";

const previewId = ref(null);
const selectPreview = (id) => (previewId.value = id);

const mocking = "disaster";

const router = useRouter();
const { userName, userAge } = useAlert();

const condition = ref(100);

const error = ref(null);
const loading = ref(false);

const errorMessage = ref("Error Occurred!");
const pageGoPostDetail = (postId: number) => {
    // return router.push(`/posts/${postId}`);
    // 또는
    return router.push({
        name: "PostDetail",
        params: {
            postId,
        },
    });
};

const hosting = ref(null);

const userMeta = reactive({
    name: "윤승근",
    age: 30,
});

const { name, age } = toRefs(userMeta);

const decrease = () => age.value--;

const testing = isRef(name);

const posts = ref({});

onMounted(async () => {
    try {
        loading.value = true;
        posts.value = await getPostList();
    } catch (err) {
        console.log(err);
        error.value = err;
        loading.value = false;
    } finally {
        loading.value = false;
    }
});
</script>

<style scoped></style>

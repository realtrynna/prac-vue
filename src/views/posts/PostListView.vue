<template>
    <div>
        <!-- <button @click="gets">Get</button> -->
        <h3>게시글 리스트</h3>
        <hr />
        <div v-for="post in posts" :key="post.id">
            <PostCard
                :id="post.id"
                :title="post.title"
                :content="post.content"
                @click="pageGoPostDetail(post.id)"
            ></PostCard>
        </div>
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item">
                    <a class="page-link" href="#">Previous</a>
                </li>
                <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item">
                    <a class="page-link" href="#">Next</a>
                </li>
            </ul>
        </nav>
        <button :class="{ disabled: condition !== 0 }">
            {{ condition }}
        </button>
        <!-- <button :class="{ disabled: condition === 0 }">Test</button> -->
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getPostList } from "../../api/posts";
import PostCard from "../../components/posts/PostCard.vue";
// import { posts } from "../../api/posts";
import { useRouter } from "vue-router";

const router = useRouter();

const condition = ref(100);

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

const posts = ref({});

onMounted(async () => {
    posts.value = await getPostList();

    console.log(posts.value);
});
</script>

<style scoped></style>

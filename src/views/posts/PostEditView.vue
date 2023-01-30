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
                <button type="submit" @click="vAlert">Edit</button>
            </div>
        </form>
        <AppAlert :condition="checkCondition" />
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import AppAlert from "../../components/AppAlert.vue";

const router = useRouter();
const route = useRoute();

const { postId } = route.params;

const checkCondition = ref(false);

const pageGoPostDetail = () => {
    return router.push({
        name: "PostDetail",
        params: { postId },
    });
};

const vAlert = () => {
    checkCondition.value = true;

    setTimeout(() => (checkCondition.value = false), 3000);
};
</script>

<style scoped></style>

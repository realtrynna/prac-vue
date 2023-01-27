<template>
    <div>
        <nav>
            <RouterLink to="/">Main</RouterLink> |
            <RouterLink to="/posts">Article</RouterLink>
            <button class="create" @click="pageGoPostCreate">Create</button> |
        </nav>
        <main>
            <RouterView></RouterView>
        </main>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const pageGoPostCreate = () => {
    return router.push({
        name: "PostCreate",
    });
};
</script>

<style scoped>
.create {
    margin-left: 20px;
}
</style>

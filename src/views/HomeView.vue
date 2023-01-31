<template>
    <div>
        <h3>Main Page</h3>
        <p>{{ userMeta.name }}</p>
        <p>{{ userMeta.age }}</p>
        <br />
        <p>Computed: {{ getUser }}</p>
        <button @click="goToPage()">ChangeName</button>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import { useRouterStore } from "../stores/router";

const { userMeta, getUser } = storeToRefs(useRouterStore());
const { goToPage } = useRouterStore();
</script>

<style scoped></style>

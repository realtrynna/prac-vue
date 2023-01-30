<template>
    <div>
        <div class="card" style="width: 18rem">
            <img src="..." class="card-img-top" alt="..." />
            <div class="card-body">
                <input type="hidden" :value="id" />
                <h4>{{ condi }}</h4>
                <h5 class="card-title">{{ title }}</h5>
                <p class="card-text">{{ content }}</p>
            </div>
            <button>Execute</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps<{
    id: number;
    title: string;
    content: string;
    condi: string;
}>();
</script>

<style scoped></style>

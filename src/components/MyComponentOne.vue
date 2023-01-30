<template>
    <div>
        <br />
        <h2>Store</h2>
        <hr />

        <p>{{ userName }}</p>
        <p>{{ age }}</p>
        <button @click="store.removeIntroduce()">RemoveIntroduce</button>
        <br />
        <!-- {{ store.addIntroduce }} -->
        <br />
        <p>{{ addIntroduce }}</p>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "../stores/store";
import { storeToRefs } from "pinia";

// const store = useStore();
const { userName, age, addIntroduce } = storeToRefs(useStore());
console.log(addIntroduce.value);
</script>

<style scoped></style>

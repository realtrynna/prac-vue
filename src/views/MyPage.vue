<template>
    <div>
        <h3>Default Page</h3>
        <teleport to="#modal">
            <OneComponent></OneComponent>
        </teleport>
    </div>
</template>

<script setup lang="ts">
import OneComponent from "../components/OneComponent.vue";
</script>

<style scoped></style>

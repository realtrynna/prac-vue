<template>
    <div class="text-center text-danger py-4">
        {{ message }}
    </div>
</template>

<script setup lang="ts">
defineProps({
    message: String,
});
</script>

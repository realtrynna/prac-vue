<template>
    <div v-if="condition" class="alert alert-success app-alert" role="alert">
        Success
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    condition: {
        type: Boolean,
        default: false,
    },
});
</script>

<style scoped>
.app-alert {
    position: fixed;
    top: 10px;
    right: 10px;
}
</style>

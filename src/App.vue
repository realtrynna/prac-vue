<template>
    <div>
        <button @click="change">Change!</button>
    </div>
</template>

<script lang="ts">
import { objectToString } from "@vue/shared";
import {
    ref,
    isRef,
    onUpdated,
    toRefs,
    toRef,
    onMounted,
    reactive,
    computed,
    watch,
} from "vue";

export default {
    setup() {
        const user = reactive({
            name: "윤승근",
            age: 30,
            married: true,
        });

        const change = () => (user.married = false);

        watch(
            () => user,
            (newValue, oldValue) => {
                console.log(newValue);
            },
            { deep: true }
        );
        return { user, change };
    },
};
</script>

<style scoped>
.active {
    background-color: red;
}
</style>

<template>
    <div>
        <input type="checkbox" v-model="values" />

        {{ values }}

        <button @click="check">Check!!</button>
    </div>
</template>

<script lang="ts">
import {
    ref,
    isRef,
    onUpdated,
    toRefs,
    toRef,
    onMounted,
    reactive,
    computed,
} from "vue";

export default {
    setup() {
        const values = reactive([]);

        const check = () => {
            console.log(values);
        };
        return { values, check };
    },
};
</script>

<style scoped>
.active {
    background-color: red;
}
</style>

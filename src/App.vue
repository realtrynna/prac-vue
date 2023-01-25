<template>
    <div>
        <Nav></Nav>
        <Main></Main>
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

import Nav from "./components/Nav.vue";
import Main from "./components/Main.vue";

export default {
    components: {
        Nav,
        Main,
    },
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
@import "./assets/base.css";
</style>

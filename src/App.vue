<template>
    <div>
        <span>{{ reactiveMessage }}</span>
        <button v-on:click="addReactiveMessage">Click</button>
        <br />

        <span>{{ normalMessage }}</span>
        <button v-on:click="addNormalMessage">Click</button>

        <span v-once>{{ value }}</span>

        <button v-on:click="changeValue">테스트!!</button>

        <br />

        <input type="text" v-bind:value="title" />
        <input v-bind="config" />
    </div>
</template>

<script lang="ts">
import { ref, isRef, onUpdated, toRefs, toRef } from "vue";

export default {
    props: {
        age: Number,
    },
    setup(props, { attrs, slots, emit, expose }) {
        // const { age } = toRefs(props);
        const age = toRef(props, "age");

        const config = ref({
            type: "password",
        });

        const value = ref("currentValue");
        const title = ref("title");

        const reactiveMessage = ref("Reactive Message");
        let normalMessage = "Normal Message";

        const addReactiveMessage = () => {
            console.log("실행");
            reactiveMessage.value = "반응형 메세지입니다.";
        };

        const addNormalMessage = () => {
            normalMessage = "일반 메세지입니다.";
        };

        const changeValue = () => {
            value.value = "change Value!!!!!!!";
        };

        onUpdated(() => {
            console.log("Updated Execute");
        });

        return {
            reactiveMessage,
            normalMessage,
            value,
            title,
            config,
            addReactiveMessage,
            addNormalMessage,
            changeValue,
        };
    },
};
</script>

<style lang="scss" scoped></style>

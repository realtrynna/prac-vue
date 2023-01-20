<template>
    <div>
<<<<<<< HEAD
        <button @click="change">Change!</button>
=======
        <input type="checkbox" v-model="values" />

        {{ values }}

        <button @click="check">Check!!</button>
>>>>>>> d0ccdaaba0e300bd759036f556aef5b9c79b1b85
    </div>
</template>

<script lang="ts">
<<<<<<< HEAD
import { objectToString } from "@vue/shared";
=======
>>>>>>> d0ccdaaba0e300bd759036f556aef5b9c79b1b85
import {
    ref,
    isRef,
    onUpdated,
    toRefs,
    toRef,
    onMounted,
    reactive,
    computed,
<<<<<<< HEAD
    watch,
=======
>>>>>>> d0ccdaaba0e300bd759036f556aef5b9c79b1b85
} from "vue";

export default {
    setup() {
<<<<<<< HEAD
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
=======
        const values = reactive([]);

        const check = () => {
            console.log(values);
        };
        return { values, check };
>>>>>>> d0ccdaaba0e300bd759036f556aef5b9c79b1b85
    },
};
</script>

<style scoped>
.active {
    background-color: red;
}
</style>

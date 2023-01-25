<template>
    <div>
        <main>
            <div class="container text-center py-4">
                <!-- <div v-for="user in users" :key="user.id" class="row gy5">
                    <Card :id="user.id" :name="user.name"></Card>
                </div> -->
                {{ users }}
            </div>
        </main>
    </div>
</template>

<script>
import { reactive } from "vue";
import Card from "./Card.vue";

export default {
    components: {
        Card,
    },
    setup() {
        const users = reactive([
            { id: 1, name: "사용자" },
            { id: 1, name: "사용자" },
            { id: 1, name: "사용자" },
            { id: 1, name: "사용자" },
            { id: 1, name: "사용자" },
        ]);

        return {
            users,
        };
    },
};
</script>

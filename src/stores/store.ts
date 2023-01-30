import { defineStore } from "pinia";

export const useStore = defineStore("userMeta", {
    state: () => ({
        userName: "윤승근",
        age: 30,
    }),
    getters: {
        addIntroduce(state) {
            return "Hello^^";
        },
    },
    actions: {
        removeIntroduce() {
            this.userName = null;
        },
        changeName(name) {
            this.userName = name;
        },
    },
});

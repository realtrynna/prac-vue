import { defineStore } from "pinia";

export const useRouterStore = defineStore("router", {
    state: () => ({
        word: "Application",
        userMeta: {
            name: "윤승근",
            age: 30,
        },
    }),
    getters: {
        complete() {},
        getUser() {
            return this.userMeta;
        },
    },
    actions: {
        goToPage() {
            this.userMeta.name = "근승윤";
        },
    },
});

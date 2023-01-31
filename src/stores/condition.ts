import { defineStore } from "pinia";

export const useConditionStore = defineStore("condition", {
    state: () => ({
        condition: true,
        currentComponent: null,
    }),
    getters: {},
    actions: {
        changeCondition() {
            return this.condition
                ? (this.condition = false)
                : (this.condition = true);
        },
    },
});

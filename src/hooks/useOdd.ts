import { unref, computed } from "vue";

export const useOdd = (num) => {
    if (num % 2 === 0) return "Even";
    else return "Odd";
};

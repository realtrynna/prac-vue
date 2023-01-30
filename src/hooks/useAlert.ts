import { ref } from "vue";

export function useAlert() {
    const userName = ref("윤승근");
    const userAge = ref(30);

    return {
        userName,
        userAge,
    };
}

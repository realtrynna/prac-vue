import App from "../App.vue";

export const objPlugin = {
    install(app, options) {
        console.log("app:", app);
        console.log("options:", options);
        // app.component()
    },
};

export default {
    install(app, options) {
        const person = {
            name: "윤승근",
            introduce() {
                alert(`반갑습니다. 자기 소개 ${this.name}`);
            },
        };
        app.config.globalProperties.$person = person;
        app.provide("person", person);
    },
};

# Vue

자바스크립트 Framework이다. 바닐라 자바스크립트를 기반으로 효율적인 UI 개발이 가능하다.

[https://www.inflearn.com/course/vue-%EC%99%84%EB%B2%BD-%EA%B8%B0%EB%B3%B8/dashboard]

| Date     | Content                                                                                      | Description                                                |
| -------- | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| 23.01.18 | [Section1](#vue), [Section2](#options-api-vvs-composition-api), [Section3](#template-syntax) | Syntax, Directive, Component, Composition API              |
| 23.01.19 | [Section3](#반응형)                                                                          | Reactivity, Computed, Binding, Rendering, Directive, Event |
| 23.01.20 | [Section3](#watch)                                                                           | Watch                                                      |
| 23.01.25 | [Section5](#언어-블록)                                                                       | Watch, watchEffect, Props                                  |

<br>

<details>
<summary><strong>설치</strong></summary>
<div markdown="1">

## 프로젝트 세팅

Vue를 설치하는 방법은 다음과 같다. <br>

1.  Documentation에 **CDN** <br>

2.  **npm** <br>

3.  공식 **CLI**(Scaffold) <br>
    3-1. Vue CLI <br>
    Webpack 기반의 Build Tool이다. Vue CLI는 현재 유지관리 모드에 있으며 특정 Webpack 기능에 의존하지 않는한 Vite를 사용하는 게 좋다. <br>

    3-2. **Vite** <br>
    Vite는 Vue SFC를 지원하고 매우 가볍고 빠른 Build Tool이다. 개발 서버 구동 시 속도가 매우 빠르며 코드 변경 시 Module 전체를 Bundling 하는 게 아니라 변경된 Module만 교체하므로 매우 빠르다.

        <br>

    -   설치

    ```cmd
    npm init vue@latest

    npm i
    ```

</div> 
</details>

<br>

## **Vue 핵심 기능**

1. **_선언적 렌더링_** (Declarative Rendering) <br>
   Vue는 Template 구문 {{}} 키워드를 활용해 Data를 선언적으로 출력(Rendering) 한다.

<br>

2. **_반응성_** (Reactivity) <br>
   Vue는 자바스크립트 **_상태 변경_** 을 자동으로 **_추적_** 하고 변경이 발생하면 DOM을 효율적으로 **_업데이트_** 한다.

<br>

### **디렉티브** (Directive)

**_v-_** 접두어가 붙은 특수 속성을 의미한다.

<br>

-   **_바인딩_** (v-bind) <br>
    Template(**_{{}}_**) 구문 외에도 다음과 같은 방법으로 Element 속성에 Data를 **_바인딩_**(연결) 할 수 있다. <br>
    Tag 안 v-bind 속성은 Data 바인딩 시 사용하는 특수 속성이다. <br>
    바인딩 된 DOM은 placeholder 속성을 Vue Instance의 message 속성으로 최신 상태를 유지한다. (**_반응형 동작_**) <br>

    ```html
    <div id="app">
        <input type="text" v-bind:placeholder="message" />
    </div>
    ```

    ```javascript
    const practice = {
        data() {
            return {
                message: "메세지입니다.",
            };
        },
    };

    Vue.createApp(practice).mount("#app");
    ```

<br>

-   **_이벤트 핸들링_** (v-on) <br>
    사용자가 Application과 상호 작용할 수 있게 하기 위해 **_v-on_** 디렉티브를 사용하여 **_Vue Instance Method_** 를 호출하는 EventListener를 추가할 수 있다. <br>
    사용자가 DOM을 직접 조작하지 않고 App의 상태만 업데이트하며 DOM의 조작은 Vue에 의해 처리된다. <br>
    ```html
    <span>{{ apple }}</span>
    <button type="button" v-on:click="reverseText">reverseText</button>
    ```
    ```javascript
    methods: {
        reverseText() {
            this.apple = this.apple.split("").reverse().join("")
        }
    }
    ```

<br>

-   **_양방향 바인딩_** (v-model) <br>
    Vue는 양식(Input, Select 등)의 입력과 Application의 data를 **_양방향_** 으로 바인딩 하는 v-model 디렉티브를 제공한다. <br>
    ```html
    <p>{{ doubleBinding }}</p>
    <input type="text" v-model="doubleBinding" />
    ```
    ```javascript
    data() {
        return {
            doubleBinding: "서울"
        }
    }
    ```

<br>

-   **_조건문_** (v-if) <br>
    Element 표시 여부는 **_v-if_** 디렉티브로 제어할 수 있다. <br>

    ```html
    <p v-if="visible">show it</p>
    <button type="button" v-on:click="visible = true">visible</button>
    ```

    ```javascript
    data() {
        return {
            visible: false
        }
    }
    ```

<br>

-   **_반복문_** (v-for) <br>
    **_v-for_** 디렉티브로 Array에서 Data를 가져와 반복적으로 요소를 표시한다. <br>

    ```html
    <ul>
        <li v-for="user in users">{{ user }}</li>
    </ul>
    ```

    ```javascript
    data() {
        return {
            users: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        }
    }
    ```

<br>

### **컴포넌트** (Component)

UI(HTML, CSS, Javascript)를 **_재사용_** 할 수 있도록 정의한 코드를 의미한다. <br>
자바스크립트에서의 Module과 동일한 의미이지만 Javascript 코드를 재사용하는 Module과 다르게 **_Component는 HTML, CSS_** 도 재사용이 가능하다.

<br>

#### **Component 사용 이유**

UI를 독립적인 Component로 분리함으로써 코드를 클린 하게 작성할 수 있다. 이는 유지 보수를 용이하게 한다. <br>

Component의 정의 방법으로 **_String Template_**, **_SFC_**(Single File Component) 2가지가 있다.

<br>

1. **String Template** <br>

```javascript
export default {
    data() {
        return {
            subtitle: "제목",
        };
    },
    template: `
        <article>
            <h1>{{ subtitle }}
        </article>
    `,
};
```

<br>

2. **SFC** (Single File Component) <br>
   .vue 확장자를 가진 파일을 의미한다. <br>
   자바스크립트로 복잡한 프로젝트를 개발한다면 다음과 같은 어려움이 존재한다. <br>

    - String Template은 코드의 **가독성** 이 좋지 않다. <br>
    - 자바스크립트 확장자는 CSS Module을 만들 수 없다.

<br>

위 문제점을 해결하기 위해 Vue는 Webpack, Browserify, Vite와 같은 Build Tool을 활용해 .vue 확장자를 가진 **_SFC_** 를 사용한다.

<br>

**_SFC_** 는 template, script, style 크게 3개의 Tag로 구성되어 있다.

```javascript
<template>
	<article>
		<h1>{{ title }}</h1>
	</article>
</template>

<script>
export default {
    data() {
        return {
            title: "제목",
        }
    }
}
</script>

<style scoped>
</style>
```

<br>

### **Component 등록**

Component를 어디에서 사용하냐에 따라 2가지 등록 방법이 있다. <br>

1. Component를 정의하고 <br>
2. Component를 등록하고 <br>
3. Component를 사용한다. <br>

<br>

-   **전역 등록** (Global Registration) <br>
    **_app.component_** 를 이용해 Component를 등록하면 Component는 Application 전역에 등록이 되어 모든 Component Instance의 Template 내부에서 접근이 가능하다. <br>

    -   main.ts

    ```javascript
    import App from "./App.vue";
    import { createApp } from "vue";
    import Card from "./components/Card.vue";

    const app = createApp(App);

    app.component("Card", Card);
    app.mount("#app");
    ```

    <br>

-   **지역 등록** (Local Registration) <br>
    전역 등록은 이상적이지 않다. Build Took을 사용하는 경우 Component를 전역 등록하게 되면 Component를 사용하지 않더라도 최종 Build 단계에 포함된다. <br>
    이는 사용자가 다운로드하는 **_파일의 크기가 증가_** 함을 의미한다. <br>

<br>

Vue Instance **_내부 components 속성_** 에 정의한다.

```javascript
const app = createApp({
    components: {
        MainComponent,
    },
});
```

<br>

Component는 **_template Tag_** 안에서 사용할 수 있다. <br>
PascalCase로 등록된 Component는 PascalCase, Kebab case **_둘 다_** 사용 가능하다. <br>
Kebab case로 등록된 Component는 Kebab case로만 사용할 수 있다. <br>

```javascript
<template>
    <MainComponent></MainComponent>
</template>
```

<br>

#### **Naming Rule**

Component Naming은 **_Pascal Case_** 가 권장되며 이점은 다음과 같다. <br>

1. Pascal Case 이름은 유효한 자바스크립트 식별자이며 IDE의 자동 완성 기능을 받을 수 있다. <br>
2. Pascal Case는 template의 기본 HTML Tag가 아닌 Vue 구성 요소라는 걸 구분할 수 있다. Vue 구성 요소를 사용자 정의 요소(웹 구성 요소)와 구별한다.

<br>

> String Template, SFC에서 Pascal Case를 사용해야 하며 DOM Template에서는 Kebab case를 사용해야 한다. <br>

<br>

### **Component System**

Component System는 Vue의 중요한 개념 중 하나다. **_작고 독립적_** 이며 재사용할 수 있는 Component로 구성된 대규모 Application을 구축할 수 있게 해주는 추상적 개념이다.

<br>

-   **_작은 의미_**: 재사용 가능한 Component <br>
-   **_넒은 의미_**: 모든 Vue Instance는 Component이다.

<br>

> Vue는 Component로 구성된 Application을 의미함.

<br>

## Options API Vvs Composition API

Vue2 Options API의 단점을 개선한 Vue3의 **_Composition API_** (Vue3에서도 Options API 사용 가능) <br>

<br>

### **Options API**

**_data_**, **_methods_**, **_mounted_** 키워드를 사용한다.

```javascript
<template>
	<div>
		<button @click="increment">Counter: {{ counter }}</button>
	</div>
</template>

<script>
export default {
	data() {
		return {
			counter: 0,
		};
	},
	methods: {
		increment() {
			this.counter++;
		},
	},
	mounted() {
		console.log('애플리케이션이 마운트 되었습니다!');
	},
};
</script>

<style lang="scss" scoped></style>
```

<br>

### **Composition API**

반응형 코드를 작성하는 단일 **_setup_** 함수가 존재한다. <br>

```javascript
<template>
    <div>
        <button>값 {{ value }}</button>
    </div>
</template>

<script>
import { onMounted, ref } from "vue"

export default {
    setup() {
        const value = ref(0)
        const changeValue = () => {
            value.value = "값이 변경되었습니다."
        }

        onMounted(() => {
            console.log("Application Mounted")
        })

        return {
            value,
            changeValue,
        }
    }
}
</script>
```

<br>

### **Composition API** 등장 배경

Composition API는 옵션(data, methods, mounted) 키워드를 선언하는 대신 가져온(import) **_함수_**(onMounted, ref)를 사용해 Vue Component를 작성할 수 있는 API Set이다. <br>

-   **Options API의 한계**
    동일한 **_논리적 관심사_**(users)를 처리하는 코드가 분산돼있어 로직에 집중하기 어렵다. <br>
    코드가 복합해지고 길어진다면 Scroll 해야 하므로 매우 비효율적이다. <br>
    논리적 관심사 로직을 Util로 추출하려는 경우 분산되어 있는 코드를 찾는 비용이 증가한다. <br>

```javascript
export default {
    data() {
        return {
            counter: 0,
            users: [],
        };
    },
    methods: {
        increment() {
            this.counter++;
        },
        addUser() {
            this.users.push({ name, age });
        },
    },
    computed: {
        adminUser() {
            return this.users[0];
        },
    },
    mounted() {
        console.log("Application Mounted");
    },
};
```

<br>

-   **Composition API**
    동일한 논리적 관심사가 **_그룹화_** 되어 코드 분석이 쉽고 유지 보수가 용이해진다. <br>

    ```javascript
    import {(onMounted, reactive, ref)} from "vue"

    const counter = ref(0)
    const increment = () => counter.value++

    const users = reactive([])
    const addUser = ({(name, age)}) => {users.push(name, age)}

    onMounted(() => {console.log("Application Mounted")})
    ```

Composition API의 가장 큰 장점은 Composable Function의 형태로 **_로직의 재사용_** 이 가능하다는 점이다. <br>
(Options API의 로직 재사용 메커니즘인 **_Mixins_** 의 모든 단점을 해결)

<br>

Options API가 가지고 있던 다음과 같은 제한 사항을 해결하였다. <br>

1. hook을 사용해 관련 코드 조각을 그룹화한다. <br>
2. Composable를 사용하면 Application 전체에서 코드를 매우 쉽게 **_재사용_** 할 수 있다. <br>

<br>

## **Composition API**

1.  **_반응형 API_** (Reactivity API) <br>
    ref(), reactive()와 같은 API를 사용해 **_reactive stats_**(반응 상태), **_computed state_**(계산된 상태), **_watcher_**(감시자)와 같은 기능을 구현할 수 있다.

        ref():      반응형 값으로 설정(String, Number, boolean)
        isRef():    반응형 값인지 검증

    ```html
    <template>
        <div>
            <h2>Reactivity</h2>
            <span>{{ reactivityMessage }}</span>
            <button v-on:click="addReactivityMessage">addMessage</button>
            <br />
            <h2>Normal</h2>
            <span>{{ normalMessage }}</span>
            <button v-on:click="addNormalMessage">addMessage</button>
        </div>
    </template>
    ```

    ```javascript
    import { isRef, onUpdated, ref } from "vue";

    export default {
        setup() {
            // 반응형 상태 선언
            const reactiveMessage = ref("Reactive Message");
            let normalMessage = "Normal Message";

            const addReactiveMessage = () => {
                console.log("실행");
                reactiveMessage.value = "반응형 메세지입니다.";
            };

            const addNormalMessage = () => {
                normalMessage = "일반 메세지입니다.";
            };

            onUpdated(() => {
                console.log("Updated Execute");
            });

            return {
                reactiveMessage,
                normalMessage,
                addReactiveMessage,
                addNormalMessage,
            };
        },
    };
    ```

<br>

2.  **_라이프 사이클 훅_** (LifeCycle Hook) <br>
    LifeCycle 단계에서 실행되는 함수를 의미한다. <br>
    onMounted(), onUnmounted()와 같은 API를 사용해 프로그래밍 방식으로 **_Component LifeCycle_** 에 **_접근_** 할 수 있다. <br>
    즉 LifeCycle 특정 시점에 이러한 함수로 코드를 삽입할 수 있다.

<br>

    Vue Instance나 Component 생성 시 미리 사전에 정의된 몇 단계의 과정을 거치게 되는데 이를 LifeCycle이라 한다. <br>
    Vue Instance는 생성(Create) 되고 DOM에 부착(Mount) 되고 업데이트(Update) 되며 제거(Destroy) 되는 4단계를 거친다. <br>
    <br>

3.  **_종속성 주입_** (Dependency Injection) <br>
    provide(), inject()는 Reactivity API를 사용하는 동안 Vue의 의존성 주입 시스템을 활용할 수 있게 해준다.

<br>

### **Setup Hook**

setup() 함수는 Composition API 사용을 위한 **_진입점 역할_** 을 한다. <br>
setup() 함수는 Component Instance가 **_생성되기 전_** 실행된다.

<br>

### Setup

반응형 API를 사용해 반응형 **_상태_**(ref) 를 선언하고 **_setup()의 Return Value_** 를 이용해 template에서 사용할 수 있으며 Return Value는 구성 요소 내부 **_Instance_** 에서도 사용 가능하다.

```javascript
import { ref } from "vue";

export default {
    setup() {
        const currentValue = ref("현재값");

        return {
            currentValue,
        };
    },
    mounted() {
        console.log(this.currentValue);
    },
};
```

<br>

setup() 함수의 처음 매개변수는 pro ps이며 props는 반응형 객체이다. <br>
구조 분해 할당 시 반응성을 상실한다. <br>

```javascript
export default {
    props: {
        age: Number;
    },
    setup(props) {
        console.log(props.age);
    }
}
```

toRef() ,toRefs()를 이용해 반응성을 **_유지_** 하면서 구조 분해 할당할 수 있다. <br>

```javascript
import { toRef, toRefs } from "vue";

export default {
    setup(props) {
        const { age } = toRefs(props);
        const age = toRef(props, "age");
    },
};
```

<br>

### **Setup Context**

setup() 함수에 전달된 매개 변수로 **_Context_** 객체이다. Context는 setup 함수 내에서 유용하게 사용할 수 있는 속성을 가지고 있다. <br>
context는 반응형이 아니며 안전하게 구조 분해 할당할 수 있다.

```javascript
export default {
    setup(props, { attrs, slots, emit, expose }) {
        attrs; // $attrs와 동일한 비반응형 객체
        slots; // @slots에 해당하는 비반응성 개체
        emit; // @emit에 해당하는 함수
        expose; // public한 속성 함수를 외부에 노출 시 사용
    },
};
```

<br>

**attrs, slots** <br>
attrs, slots은 Component 자체가 업데이트될 경우 항상 업데이트되는 **_상태 저장 객체_** 다. 이러한 속성은 구조 분해 할당을 피해야 하며 항상 속성을 attrs.x 또는 slots.x로 접근해야 한다. <br>

props와 달리 attrs, slots의 속성은 반응형 이지않다. <br>
attrs 또는 slots 변경에 따라 작업을 하려고 하는 경우 onBeforeUpdate LifeCycle Hook 내에서 수행할 수 있다. <br>

**expose** <br>
expose는 template refs를 통해 상위 Component에서 Component Instance 접근 시 노출되는 속성을 명시적으로 제한하는 데 사용하는 함수다. <br>

```javascript
export default {
    setup(props, { expose }) {
        expose();

        const publicCount = ref(0);
        const privateCount = ref(0);

        expose({ count: publicCount });
    },
};
```

<br>

### **Template Syntax**

Vue는 Template Syntax를 사용해 Rendering 된 Component Instance Data에 **_선언적_** 으로 바인딩 할 수 있다. <br>

1.  **텍스트 보간법** <br>
    Data 바인딩의 가장 기본 형태는 {{ value }} 이다. <br>
    **_이중 괄호_** 를 사용하면 해당 문법은 Component Instance의 value 값으로 대체된다. <br>
    value 속성이 변경될 시점마다 **_갱신_**(반응) 된다. <br>

    ```javascript
    import { ref } from "vue";

    export default {
        setup() {
            const value = ref("value");

            return {
                value,
            };
        },
    };
    ```

        <br>

    -   **_v-once_** 디렉티브를 사용해 데이터가 변경되어도 **_갱신_**(반응) 되지 않는 **_일회성 보간_** 을 수행할 수 있다. <br>

    ```html
    <span v-once>{{ value }}</span>
    ```

<br>

2. **속성 바인딩** (v-bind) <br>
   이중 괄호는 Tag 속성에 사용할 수 없으므로 **_v-bind_** 디렉티브를 사용한다. <br>

    ```html
    <input type="text" v-bind:value="title" />

    <div :title="title"><div></div></div>
    <input v-bind="config" />
    ```

    ```javascript
    setup() {
        const title = ref("제목")
        const config = ref({
            type: "password",
        })

        return {
            title,
            config,
        }
    }
    ```

<br>

### **반응형**

자바스크립트 객체에서 반응형 상태를 생성하기 위해서 **_reactive()_** 함수를 사용한다.

```javascript
import { reactive } from "vue";

// 반응형 상태
const state = reactive({ count: 0 });
```

<br>

Component template에서 사용하려면 **_setup()_** 함수에서 **_Return_** 해야 한다. <br>
_ 반환된 상태는 반응형 객체다. <br>
_ Component의 data()에서 객체를 반환할 경우 내부적으로 reactive()에 의해 반응형으로 만들어진다. <br>

```javascript
import { reactive } from "vue";

export default {
    setup() {
        const state = reactive({ count: 0 });

        return {
            state,
        };
    },
};
```

```html
<div>{{ stats.count }}</div>
```

<br>

**ref로 원시값 반응형 데이터 생성** <br>
reactive() 함수는 **_객체 타입_** 에만 동작하며 **_기본 타입_**(String, Number, boolean)을 반응형으로 만들 경우 **_ref_** 를 사용한다. <br>

```javascript
import { ref } from "vue";

const str = ref("String");
const num = ref("Number");
```

<br>

ref는 변이(**_mutable_**) 가능한 객체를 반환한다. 이 객체 안에는 value라는 속성을 포함하며 value 값은 ref() **_Method_** 에서 매개변수로 받은 값을 가지고 있다. <br>
이 객체는 내부의 value 값에 대한 반응형 **_참조_**(reference) 역할을 한다. <br>

```javascript
import { ref } from "vue";

const count = ref(0);

count.value++; // count 1
```

<br>

**template에서 사용**
template에서 사용할 경우 자동으로 내부 값(value)를 풀어내므로 .value로 접근하지 않고 사용 가능하다. <br>

```html
<template>
    <div>{{ count }}</div>
    <button @click="count++"></button>
</template>
```

<br>

**반응형 객체의 ref UnWarping** <br>
ref의 반응형 객체 속성으로 접근 시 자동적으로 내부 값으로 해제하여 일반적인 속성과 마찬가지로 동작하며 반응형은 **_연결_** 되어 있다. <br>

```javascript
import { ref, reactive } from "vue";

const count = ref(0);
const state = reactive({
    count,
});

count.value++;
count.value; // 1
state.count; // 1
```

<br>

**반응형 상태 구조 분해** <br>
반응형 객체를 구조 분해 시 반응형을 **_상실_** 한다. <br>

```javascript
import { reactive } from "vue";

const user = reactive({
    name: "윤승근",
    age: 30,
});

const { name, age } = user;
```

<br>

반응형 객체를 일련의 ref들도 변환하며 ref들은 소스 객체에 대한 반응형 **_연결을 유지_** 한다. <br>

```javascript
import { reactive, toRefs } from "vue";

const user = reactive({
    name: "윤승근",
    age: 30,
    gender: true,
});

const { gender } = toRefs(user);

gender.value; // true
```

<br>

### **Computed**

template 문법({{}})은 매우 편리하지만 코드가 길어질 경우 **_가독성_** 확보가 어려워 **_유지 보수_** 가 힘들다. <br>

```javascript
const user = reactive({
    name: "윤승근",
    age: 30,
    useLanguage: {
        java: "하",
        javascript: "상",
        typescript: "상",
        vue: "하",
    },
});

return {
    user,
};
```

```html
<p>{{ user.useLanguage.vue }}</p>
```

<br>

**computed를 통해 다음과 같이 작성할 수 있다.** <br>
computed는 **_Cache_** 된다. <br>
Method는 **_Parameter_** 가 올 수 있다. <br>
Component Rendering 시 computed의 비용이 더 **_적다._** <br>

```javascript
const user = reactive({
    name: "윤승근",
    age: 30,
    useLanguage: {
        java: "하",
        javascript: "상",
        typescript: "상",
        vue: "하",
    },
});

const languageResult = computed(() => {
    return user.useLanguage.vue === "상" || user.useLanguage.vue === "중"
        ? "잘하시네요."
        : "하수시네요.";
});

return {
    user,
    languageResult,
};
```

```html
<div>{{ languageResult }}</div>
```

<br>

#### Writable Computed

computed는 기본적으로 getter(**_ReadOnly_**)다. 계산된 속성에 새 값을 할당 할 수 없다. <br>
계산된 속성이 필요한 경우 **_getter와 setter를_** 모두 제공하여 속성을 만들 수 있다. <br>

```javascript
const framework = "Express";

const result = computed({
    get() {
        return framework.value;
    },
    set(value) {
        result.value = value;
    },
});

framework.value = "NestJS";
```

<br>

### Class와 Style Binding

1.  클래스 Binding <br>

    -   **객체 바인딩** <br>
        Class를 동적으로 Binding 하기 위해 **_:class="v-bind"_** 사용

        ```html
        <div class="text" :class="{ active: isActive }"></div>
        ```

    -   객체를 반환하는 **_computed Binding_**

        ```html
        <div class="text" :class="classObject"></div>
        ```

        ```javascript
        const classObject = computed(() => {
            return {
                active: isActive.value && !hasError.value,
                "text-danger": !isActive.value && hasError.value,
            };
        });
        ```

            ````

    -   **배열 바인딩** <br>
        배열에 :class를 Binding 하여 **_Class 목록_** 을 적용할 수 있다.

        ```javascript
        const activeClass = ref("active");
        const errorClass = ref("text-danger");
        ```

        ```html
        <div :class="[activeClass, errorClass]"></div>
        ```

<br>

2.  스타일 Binding <br>
    HTML style 속성에 **_객체_** 를 Binding할 수 있다. <br>

    ```javascript
    const styleObject = reactive({
        color: "red",
        fontSize: "13px";
    })
    ```

    ```html
    <div :style="styleObject"></div>
    ```

<br>

### 조건부 렌더링

-   **v-if**

```html
<h2 v-if="condition">Invisible</h2>
<h2 v-else>Not Invisible</h2>
<button @click="showing"></button>
```

```javascript
const condition = ref(false);

const showing = () => (condition.value = true);

return {
    condition,
    showing,
};
```

<br>

-   **v-else-if**

```html
<div v-if="showing === `갤럭시`">갤럭시</div>
<div v-else-if="showing === `아이폰`">아이폰</div>
<div v-else-if="showing === `샤오미`">샤오미</div>
<div v-else>etc</div>
<button @click="submit">Change!</button>
```

```javascript
const showing = ref("나머지");

const submit = () => (showing.value = "아이폰");
return {
    showing,
    submit,
};
```

<br>

-   **template v-if**

```html
<template v-if="condition">
    <h1>Title</h1>
</template>
```

<br>

-   **v-show**

```html
<h2 v-show="condition">Title</h2>
<button @click="condition = true">Change!!</button>
```

<br>

-   **v-if와 v-show** <br>
    v-if는 **_실제_**(Real)로 Rendering 된다. 전환 시 Block 내부의 Component들이 **_제거되고 새로 생성_** 된다. <br>
    v-if는 **_게으르다_**. (Lazy) 초기 Rendering 시 조건이 False일 경우 아무 동작도 하지 않는다. <br>
    조건부 Block은 조건이 처음으로 True가 될 시점까지 Rendering 되지 않는다. <br>

    <br>

    이에 비해 v-show는 간단하다. Element **_CSS 기반 전환_** 으로 초기 조건과 관계없이 항상 Rendering 된다. <br>
    일반적으로 **_v-if_** 는 **_전환 비용_** 이 높고 **_v-show_** 는 **_초기 Rendering_** 비용이 높다. <br>
    그러므로 전환이 자주 일어난다면 v-show를 사용하고 Runtime 시 조건이 변경되지 않는다면 v-if를 사용해야 한다. <br>

<br>

-   **v-if와 v-for**
    v-if와 v-for를 같이 사용하는 건 권장되지 않는다. <br>
    동일한 Element에 v-if와 v-for를 같이 사용한다면 v-if가 더 높은 우선순위를 갖는다. <br>

<br>

### **목록 렌더링**

-   v-for
    v-for 디렉티브를 사용해 배열의 목록을 렌더링 할 수 있다. <br>
    **_v-for="item in items"_** 로 배열의 순회한다. <br>
    **_v-for="(item, index) in items"_** 로 배열의 인덱스를 가져올 수 있다. <br>
    항목 나열 시 :key 속성에는 고유한 값을 지정해야 한다. <br>

    ```html
    <li v-for="(user, index) in result" :key="user.id">{{ user.age }}</li>
    <li v-for="(value, key, index) in obj" :key="key">{{ value }}</li>
    ```

    ```javascript
    const users = [
        { id: 1, name: "사용자 1", age: 30 },
        { id: 2, name: "사용자 2", age: 29 },
        { id: 3, name: "사용자 3", age: 28 },
        { id: 4, name: "사용자 4", age: 27 },
        { id: 5, name: "사용자 5", age: 26 },
    ];

    const result = reactive(users);

    const obj = reactive({
        title: "Title",
        content: "Content",
        author: "Writer",
    });

    return {
        result,
        obj,
    };
    ```

<br>

### **_디렉티브_** (Directive)

직역하면 지시라는 의미로 v- 접두사가 붙은 특수 속성을 의미한다. <br>
기능 상 중요한 역할인 Component(또는 DOM)에게 "**_~하게 작동하라_**"라고 지시를 해주는 지시문의 역할을 수행한다. <br>

-   디렉티브 구성 <br>
    전달 인자(**_Argument_**)와 수식어(**_Modifiers_**)로 구성되어 있다. <br>

    1. **전달 인자** <br>
       일부 디렉티브는 디렉티브명 뒤 **_콜론_**(:)으로 표기되는 전달 인자를 가질 수 있다.
       v-bind 디렉티브는 반응적으로 **_HTML 속성을 갱신_** 하는데 사용한다. <br>

        > 대괄호를 사용하여 전달 인자를 **_동적_** 으로 삽입할 수 있다. <br>
        > <a v-bind:[attributeName]="url">...</a>

    2. **수식어** <br>
       수식어는 **_점_**(.)으로 표시되는 특수 접미사로 디렉티브가 특별한 방식으로 **_Binding_** 되어야 함을 나타낸다. <br>

<br>

### **Event**

이벤트 처리는 **_v-on_** 디렉티브로 사용 가능하다. v-on 이벤트는 자주 사용하므로 **_@_** 단축 표현 키워드로 사용된다. <br>

```html
<div>
    <button @click="counter += 1">{{ counter }}</button>
</div>
```

```javascript
const counter = ref(0);
```

-   **Method Event** Handler <br>
    v-on 디렉티브에서 Method를 호출할 수 있으며 매개변수로 **_event 객체_** 를 받는다.

```javascript
const submit = (event) => {
    console.log(event);
};
```

```html
<button @click="submit">Submit!</button>
```

<br>

-   **event** 객체 접근

```html
<button @click="submit("message", $event)>submit!</button>
```

```javascript
const submit = (message, event) => {
    console.log(message, event);
};
```

<br>

-   **event** 수식어 (Modifiers)
    이벤트 조작 시 event.preventDefault() 또는 event.stopPropagation()을 호출할 수 있다.

    -   .stop = e.stopPropagation()
    -   .prevent = e.preventDefault()
    -   .capture = 캡쳐 모드 사용 시 Event Listener 사용 가능
    -   .self = 오로지 자기 자신만 호출할 수 있다. (Target이 self)
    -   .once = 해당 이벤트는 한 번만 실행된다.
    -   .passive = 일반적으로 모바일 장치의 성능을 개선하기 위해 사용하며 Touch Event Listener와 같이 사용된다.

<br>

-   **Key** 수식어
    키보드 이벤트 수신 시 사용한다. v-on 또는 @ 디렉티브에 Key 수식어가 제공된다.

<br>

-   **System Key** 수식어
    다음 수식어를 사용해 해당 수식어 키가 눌러진 경우에만 Mouse 또는 Keyboard Event Listener를 Trigger 한다. <br>

    -   .ctrl
    -   .atl
    -   .shift
    -   .meta(Mac에서 meta는 command key, Window에서 meta는 window key)

    ```javascript
    // Alt + Enter
    <input @keyup.alt.enter="clear" />
    // Control + Enter
    <input @keyup.ctrl.enter="send" />
    // Control + Click
    <input @keyup.ctrl.click="submit" />
    ```

<br>

-   .**exact** 수식어
    .exact 수식어는 조합이 정확해야 할 경우 사용한다. <br>
    ```javascript
    // Alt 또는 Shift 와 같이 눌렀을 경우 실행
    <button @click.ctrl="submit">submit</button>
    // Ctrl 키 눌렀을 경우 실행
    <button @click.ctrl.exact="submit">submit</button>
    // System Key가 눌리지 않은 상태에서 실행
    <button @click.exact="submit">submit</button>
    ```

<br>

-   **Mouse Button** 수식어
    -   .left
    -   .right
    -   .middle

<br>

### **양방향 바인딩**

입력 양식 처리 시 **_입력 요소_**(Input)의 상태와 **_자바스크립트 상태_**(State)를 동기화해야 할 경우가 많다. <br>
value를 Binding 하고 @input 이벤트로 text를 변경하는 건 매우 번거롭다. <br>

<br>

-   기존

```html
<input :value="text" @input="event => text = event.target.value" />
```

<br>

-   v-model

```html
<input v-model="text" @input="change" />

<span>{{ text }}</span>
```

```javascript
const text = ref("");

const change = (event) => {
    text.value = event.target.value;
};

return {
    text,
    change,
};
```

<br>

-   checkbox, radio, select <br>
    v-model은 내부적으로 HTML Element가 어떤 요소냐에 따라 서로 다른 속성(**_:value_**)과 이벤트(**_@input_**)를 사용한다. <br>
    input type="text"와 textarea는 value 속성과 input 이벤트를 사용한다. <br>
    select Tag는 value 속성과 change 이벤트를 사용한다. <br>

<br>

-   checkbox <br>
    :checked, @change

    ```html
    <input
        type="checkbox"
        :checked="checkboxValue"
        @change="event => checkboxValue = event.target.checked"
    />
    ```

    <br>

    하나의 checkbox는 단일 **_Boolean_** 값을 가진다.

    ```html
    <input type="Checkbox" v-model="checkboxValue" />
    ```

    <br>

    여러 개의 checkbox는 **_배열_** 을 Binding한다.

    ```html
    <input type="Checkbox" v-model="checkboxValues" />HTML
    <input type="Checkbox" v-model="checkboxValues" />CSS
    <input type="Checkbox" v-model="checkboxValues" />JAVASCRIPT

    <span>checkboxValues</span>
    ```

<br>

-   radio <br>
    v-model
    ```html
    <label>
        <input type="radio" name="type" value="O" v-model="radioValue" />
        O형
    </label>
    <label>
        <input type="radio" name="type" value="A" v-model="radioValue" />
        A형
    </label>
    ```

<br>

-   select <br>
    v-model
    ```html
    <select v-model="selectValue">
        <option value="html">HTML</option>
        <option value="css">CSS</option>
    </select>
    ```

<br>

-   v-model 수식어
    .lazy <br>
    기본적으로 v-model은 각 input 이벤트 후 입력과 데이터를 **_동기화_** 한다. <br>
    **_lazy_** 수식어를 추가하여 change 이벤트 이후에 동기화할 수 있다.

    ```javascript
    <input v-model.lazy="text"/>
    ```

    <br>

    .number <br>
    사용자 입력 데이터를 number 타입으로 변환한다.

    ```javascript
    <input v-model.number"text" />
    ```

    <br>

    .trim <br>
    사용자가 입력한 내용에서 자동으로 앞뒤 공백을 제거한다.

    ```javascript
    <input v-model.trim="text"
    ```

<br>

### **Watch**

반응형 상태가 변경되었을 경우 감지하여 다른 작업(API Request)을 수행해야 할 경우가 있다. <br>

어떠한 상태가 변경되었을 경우 DOM을 변경하거나 비동기 작업을 수행해 다른 상태를 변경해야 할 경우 사용한다. <br>

Composition API watch 함수를 사용해 반응형 상태가 변경되었을 경우 특정 작업을 수행할 수 있다. <br>

```html
<span>{{ condition }}</span> <button @click="changeCondition">변경!!</button>
```

```typescript
const condition = ref("Value");

const changeCondition = () => {
    condition.value = condition.value.split("").reverse().join("");
};

watch(condition, (newValue, oldValue) => {
    console.log("NewValue", newValue);
    console.log("OldValue", oldValue);
});
```

<br>

#### **Watch Source Type**

처음 Parameter로 다양한 Type이 될 수 있다. (ref, reactive, computed, getter, array)

```javascript
watch(/* Source Type */, (newValue, oldValue) => {

})
```

```javascript
const a = ref(0);
const b = ref(0);

// single ref
watch(x, (newX) => {
    newX
});

// getter
watch(
    () => a.value + b.value,
    (sum) => sum;
)

// array of multiple sources
watch([a, () => b.value], ([newA, newB]) => {
    newA;
    newB;
})
```

<br>

-   반응형 객체의 속성은 볼 수 없다.

```javascript
const obj = reactive({ count: 0 });

watch(obj.count, (newValue) => {
    newValue;
});
```

-   getter 사용

```javascript
const obj = reactive({ count: 0 });
watch(
    () => obj.count,
    (newValue, oldValue) => {
        newValue;
    }
);
```

<br>

### **Deep Option**

반응형 객체를 직접 watch 시 암시적으로 **_깊은 감시자_** 가 생성되며 속성뿐 아니라 모든 중첩된 속성에도 Trigger 된다. <br>

```javascript
const user = reactive({
    name: "윤승근",
    age: 30,
    gender: true,
});

watch(user, (newValue, oldValue) => {});
```

<br>

**_getter function_** 으로 객체를 넘길 경우 객체의 값이 변경될 경우에만 Trigger된다. 중첩된 속성은 Trigger되지 않는다. <br>

```javascript
const user = {
    name: "윤승근",
    age: 30,
    married: true,
};

const changeAge = () => (user.age = 300);

watch(
    () => user.age,
    (newValue) => newValue
);
```

<br>

#### **deep**

deep Method를 사용해 깊은 감시자로 강제할 수 있다. <br>
큰 데이터 구조에서 deep 사용 시 비용이 많이 들어가므로 필요한 경우에만 사용해야 한다. <br>

```javascript
watch(
    () => user.age,
    (newValue) => {
        newValue;
    },
    { deep: true }
);
```

<br>

#### **immediate**

**_immediate_** Method를 사용해 최초에 즉시 실행할 수 있다. <br>

```javascript
const message = ref("message");
const reverseMessage = ref("");

watch(
    message,
    (newValue) => {
        reverseMessage.value = newValue.split("").reverse().join("");
    },
    {
        immediate: true,
    }
);
```

<br>

-   함수를 외부에 선언해 즉시 실행 (**_watchEffect_** 로 간소화 가능)

```javascript
const message = ref("message");
const reverseMessage = ref("");

const reverse = () => {
    reverseMessage.value = message.split("").reverse().join("");
};

watch(message, reverse);

reverse();
```

<br>

#### **computed와 watch**

둘 다 동일한 역할을 한다.

1. computed <br>
   Vue Instance State(**_ref_**, **_reactive_**)의 종속 관계를 자동으로 세팅하고자 할 경우 **_computed_** 사용 <br>
   위 reverseMessage는 message의 값에 따라 결정되는 종속 관계에 있다. <br>
   종속 관계 코드가 복잡해지면 **_watch_** 로 구현할 경우 더 복잡해지거나 중복 계산 또는 에러 발생 확률이 올라간다.

<br>

2. watch <br>
   Vue Instance State(ref, reactive)의 **_변겅 시점_** 에 특정 액션(**_API Call_**, **_Route Push_**)을 취하고자 할 경우 사용한다. <br>
   대게의 경우 computed로 구현 가능하다면 watch가 아니라 **_computed_** 를 사용하는 게 옳다.

<br>

#### **watchEffect**

watch와 watchEffect 둘 다 관련 작업(API Call, Route Push)을 **_반응적_** 으로 수행할 수 있으며 가장 큰 차이점은 반응형 데이터를 **_추적_** 하는 방식이다. <br>

-   **_watch_** <br>
    명시적으로 **_관찰된 Data_** 만 추적한다. CallBack 내에서 Access 한 항목은 추적하지 않는다. <br>
    Data가 실제로 변경된 경우에만 Trigger 되며 watch 종속성 추적을 부작용과 분리하여 CallBack이 실행되어야 하는 시기를 보다 **_정확하게_** 제어할 수 있다.

<br>

-   **_watchEffect_** <br>
    종속성 추적과 부작용을 한 단계로 결합한다. <br>
    동기 실행 중 Access 되는 모든 반응 속성을 **_자동_** 으로 추적한다. <br>
    이 방법은 더 편리하고 일반적으로 더 간결한 코드를 작성할 수 있지만 반응송 종속성을 덜 명시적으로 만든다.

<br>

### **SFC** (Single File Component)

Vue Instance template, script, style을 하나의 File로 **_캡슐화_** 하는 특수 파일 형식이다. 확장자는 **_.vue_** 이다.

<br>

#### **언어 블록**

1. template <br>
   .vue 파일에 하나의 top-level <template></template> Block을 포함할 수 있다. <br>
   Content는 추출되어 **_@vue/compiler-dom_** 으로 전달되고 자바스크립트 **_Rendering_** 기능으로 사전 Compile 되고 Render Option으로 내보내어 **_Component에 첨부_** 된다. <br>

<br>

2. script <br>
   .vue 파일에 하나의 <script></script> Block을 포함할 수 있다. <br>
   Script는 ES Module로 실행되고 **_default export_** 는 일반 **_객체_** 또는 defineComponent의 반환 값으로 **_Vue Component Option_** 객체여야 한다. <br>

<br>

3. script setup <br>
   .vue 파일에 하나의 <script setup></script> Block을 포함할 수 있다. (Normal Script 제외)<br>
   script setup 은 사전에 처리되어 Component의 **_setup()_** 함수로 사용된다. <br>
   즉 Component의 각 Instance에 대해 실행되며 script setup Binding은 template에서 자동으로 노출된다. <br>

<br>

4. style <br>
   .vue 파일에 여러 개의 <style></style> Tag가 포함될 수 있다.

<br>

#### **Custom Block**

프로젝트별 요구 사항에 따라 .vue 파일에 Custom Block(사용자 정의 블록)을 추가할 수 있다.

<br>

#### **전 처리기**

<script lang="ts"></script> lang 속성을 사용해 전 처리기 언어를 선언할 수 있다.

<br>

#### **src**

.vue Component를 여러 파일로 분할 한 경우 src 속성을 사용해 language block에 대한 외부 파일을 가져올 수 있다. <br>

```javascript
<template src="./template.html"></template>
```

<br>

### **Props**

Component에 등록할 수 있는 사용자 정의 속성이다. 게시글 Component에 사용자 정의 속성을 선언하면 해당 Component를 사용하는 부모 Component에서 데이터를 전달할 수 있다. <br>

블로그 구축 시 게시글을 나타내는 Component가 있다고 가정할 경우 모든 블로그 게시글의 UI나 Layout은 동일하지만 게시글의 Title, Content와 같은 Data는 각각 다르다. <br>
각 Component 별로 Title, Content 공유가 필요할 경우 props를 사용하여 Component 간 Data를 전달할 수 있다. <br>

#### **Props 선언**

Vue Component는 명시적으로 **_Props_** 선언이 필요하다. Component에 전달된 외부 Props가 fallthrough 속성으로 처리되어야 함을 알 수 있다.

<br>

> fallthrough 이란 props 또는 emits에 명시적으로 선언되지 않은 속성 또는 이벤트를 의미한다.

<br>

-   **배열 선언**

    -   Parent Component

    ```html
    <Card title="1번 제목" content="1번 본문"></Card>
    ```

    <br>

    -   Child Parent

    ```html
    {{ title }} {{ content}}
    ```

    ```javascript
    export default {
        props: ["title", "content"],
        setup(props) {
            props.title;
            props.content;
        },
    };
    ```

<br>

-   **객체 선언**

    -   Parent Component

    ```html
    <Card title="1번 제목" content="1번 본문"></Card>
    ```

    <br>

    -   Child Parent

    ```html
    {{ title }} {{ content }}
    ```

    ```javascript
    export default {
        props: {
            title: String,
            content: String,
        },
        setup(props) {},
    };
    ```

<br>

#### **단방향 데이터 흐름**

모든 props는 상위 속성과 하위 속성 간 데이터는 **_단방향으로 Binding_** 돼있다. 만약 상위 속성이 업데이트되면 하위 속성도 업데이트되지만 반대는 아니다. <br>
상위 Component가 업데이트될 경우 하위 Component의 모든 props는 **_초기화_** 되며 자식 Component 내부에서 전달받은 props를 변경하지 않아야 한다. <br>

```javascript
export default {
    props: ["title"],
    setup(props) {
        // Warning
        props.title = "Change Title";
    },
};
```

<br>

-   props를 하위 Component에서 변경하고 싶은 2가지 경우

    1. props는 **_초기값_** 을 전달하는 데 사용된다. (자식 Component에서 속성 값을 Local Data 속성으로 사용할 경우) <br>
       이 경우 props를 초기값으로 사용하는 Local 변수로 선언하는 게 좋다.

    ```javascript
    export default {
        props: ["name"],
        // name은 props.name 값으로 초기화되며 props 업데이트의 연결이 끊어짐
        setup(props) {
            const name = props.name;

            return {
                name,
            };
        },
    };
    ```

    <br>

    2. props 값의 변경이 필요한 경우 <br>
       이 경우 **_computed_** 를 사용하며 상위 속성의 변경을 유지할 수 있다. <br>

    ```javascript
    export default {
        props: ["size"],
        setup(props) {
            const size = computed(() => props.size.trim().toUpperCase());

            return {
                size,
            };
        },
    };
    ```

<br>

#### **객체 또는 배열 props Update**

객체나 배열이 전달될 경우 자식 Component에서는 prop Binding(값 변경)을 변경할 수 없지만 겍체 또는 배열의 중첩 속성은 변경할 수 있다.

<br>

#### **Boolean Casting**

Boolean Type props는 특별한 캐스팅 규칙은 다음과 같다.

```javascript
export default {
    props: {
        disabled: Boolean,
    },
};
```

```html
<!-- true -->
<MyComponent disabled></MyComponent>

<!-- false -->
<MyComponent></MyComponent>
```

<br>

## **Events**

자식 Component에서도 부모 Component로 Data를 전달 또는 Trigger의 목적으로 Event를 발생시킬 수 있으며 emit Method를 사용한다. <br>

1.  template에 emit Method 사용

    -   **자식 Component**

    ```html
    <template>
        <button @click="emit(`emitEvent`,  `First`, 'Second')">submit</button>
    </template>
    ```

    <br>

    -   **부모 Component**

    ```html
    <ChildComponent @emit-event="submit"></ChildComponent>

    <script>
        export default {
            setup() {
                const submit = (first, second) => {
                    console.log(first, second);
                };

                return { submit };
            },
        };
    </script>
    ```

<br>

2. setup() Method에 **context.emit()** Method 활용

    - **자식 Component**

    ```html
    <template>
        <button @click="showing">here</button>
    </template>
    ```

    ```javascript
    export default {
        setup(props, context) {
            const showing = (one, two) => {
                context.emit("emitEvent", "First", "Second");
            };

            return { showing };
        },
    };
    ```

    <br>

    - **부모 Component**

    ```html
    <button @emit-event="showing"></button>
    ```

    ```javascript
    export default {
        setup() {
            const showing = (one, two) => {
                console.log(one, two);
            };
        },
    };
    ```

<br>

### Event 선언

emits 옵션을 사용해 Event를 선언할 수 있다. <br>
문자 배열과 객체 문법 2가지 선언 방법이 있으며 자바스크립트 코드에서 이벤트를 내보낼 경우 setup() 함수의 파라미터로 넘어온 context.emit() Method를 사용할 수 있다.

<br>

1. 문자열 배열 선언

    ```javascript
    export default {
        emits: ["someEvent"],
        setup(props, context) {
            context.emit("someEvent", "First");
        },
    };
    ```

<br>

2. 객체 문법 선언 <br>
   객체 문법으로 선언할 경우 validation 로직을 추가할 수 있으며 만약 validation이 없다면 null로 설장한다. <br>
    ```javascript
    export default {
        emits: {
            // 유효성 검사 없음
            someEvent: null,
            // 유효성 검사 있음
            someSubmit: (result) => {
                if (email && password) return true;
                else return false;
            },
        },
        setup(props, context) {
            context.emit("someEvent", "First");
        },
    };
    ```

<br>

## **v-model**

Component를 만든 후 해당 Component에 v-model을 적용하려면 @update:modelValue Event를 사용해야 한다. <br>
일반적으로 기본 HTML 요소인 input Tag에 v-model은 다음과 같이 사용한다.

```html
<input v-model="username" />
```

또는 <br>

```html
<input :value="username" @input="username = $event.target.value" />
```

<br>

## **Slot**

HTML Element와 마찬가지로 Component에 Content를 전달할 수 있으면 좋다.

<br>

-   자식 Component

    ```html
    <template>
        <button>here</button>
        <slot></slot>
    </template>

    <!-- 부모 Component에서 Slot Content가 제공되지 않았을 경우 Slot에 대한 Fallback(Default Content)을 지정할 수 있다. -->
    <template>
        <button>here</button>
        <slot></slot>
    </template>
    ```

<br>

-   부모 Component
    ```html
    <FancyButton>This is slot</FancyButton>
    ```

<br>

## **Provide Inject**

Provide와 Inject를 사용하면 상위 Component는 Dependency Provider 역할을 한다. <br>
데이터를 받는 하위 Component는 깊이에 관계 없이 Dependency Provider가 제공하는 종속성(Data, Function 등)을 주입받을 수 있다.

<br>

-   부모 Component (provide) <br>
    처음 파라미터 주입 Key(String Or Symbol) / 하위 Component에서 주입된 값을 조회하는 데 사용함. <br>
    제공될 값 / refs와 같은 반응형 데이터를 포함한 모든 유형이 될 수 있다.

    ```javascript
    import { ref, provide } from "vue";

    const value = ref("value");

    provide("key", value);
    ```

<br>

-   자식 Component (Inject) <br>
    inject를 사용해 provide Data를 받을 수 있다. <<br>

    ```javascript
    import { inject } from "vue";

    const result = inject("key");
    ```

<br>

## **LifeCycle Hooks**

Component Instance는 생성과 소멸 시 사전에 정의된 단계를 거치는 과정을 LifeCycle이라 하며 LifeCycle 단계에서 실행할 수 있는 기능을 Hooks 라고 한다. <br>

Component Rendering 완료 후 DOM Node를 만든 후 onMounted Hooks를 사용해 코드를 실행할 수 있다. <br>

```javascript
onMounted(() => {
    console.log("Component Mounted");
});
```

<br>

1.  **Creation** (생성) <br>
    Compoonent 초기화 단계이며 Creation Hooks는 LifeCycle 단계에서 **_가장 먼저_** 실행된다. <br>
    Component가 DOM에 추가되기 전이므로 DOM에 접근할 수 없다. <br>
    Server Rendering에서 지원되는 단계 <br>
    Client나 Server Rendering 단계에서 실행돼야 할 작업이 있으면 이 단계에서 실행

    <br>

    -   beforeCreate <br>
        Component Instance 초기화 시 실행 data() 또는 computed와 같은 다른 옵션을 처리하기 전 즉시 호출 <br>

    -   created <br>
        Component Instanc 초기화 완료 후 실행 <br>

    -   setup <br>
        Composition API의 setup()은 Options API Hook보다 먼저 실행된다. <br

<br>

2.  **Mounting** (장착) <br>
    DOM에 Component를 **_삽입_** 하는 단계이며 onBeforeMount와 onMounted가 있다. <br>
    Server Rendering에서 지원되지 않는다. <br>
    초기 Rendering 직전에 DOM을 변경하고자 한다면 이 단계에서 활용할 수 있다.

    <br>

    -   onBeforeMount <br>
        Component가 Mount 되기 직전 호출 <br>

    -   onMounted <br>
        Component가 Mount 된 후 호출되며 DOM에 접근할 수 있다. <br>
        모든 자식 Component가 Mount 되었음을 의미한다. <br>
        자체 DOM Tree가 생성되어 상위 Component에 삽입되었음을 의미한다. <br>

<br>

3.  **Updating** (수정) <br>
    Component에 사용되는 반응형 Data가 **_변경_** 되거나 어떠한 이유로 **_재렌더링_** 될 경우 호출된다. <br>

    -   onBeforeUpdate <br>
        반응형 상태 변경으로 인해 Component가 DOM Tree를 Update 하기 직전 호출 <br>
    -   onUpdated <br>
        반응 상태 변경으로 인해 Component가 DOM Tree를 Update 한 후 호출 <br>

<br>

4. **Destruction** (소멸) <br>
   **_해체단계_** 이며 onBeforeUnmount와 onUmounted가 있다.

    - onBeforeUnmount <br>
      Component가 Mount 해제되기 직전 호출 <br>

    - onUnmounted <br>
      Component가 Mount 해제된 후 호출 <br>

<br>

## **Template refs**

선언적 Rendering Model은 대부분의 직접적인 DOM의 작업을 대신 수행하지만 간혹 DOM 요소에 직접 접근해야 할 경우가 있다. <br>
ref 특수 속성을 사용해 접근할 수 있다. <br>

```html
<input type="test" ref="input" />
```

<br>

> ref는 특수 속성이므로 Mount 된 DOM 요소 또는 자식 Component에 대한 참조를 얻을 수 있다.

<br>

-   Tag의 속성값과 동일한 이름의 변수를 선언해야하며 Component가 Mount 된 후 접근할 수 있다. <br>

<br>

## **Vue Router**
SPA 구현 시 사용되는 공식 라이브러리다. Router란 네트워크 간 데이터를 전송하는 장치를 말하며 Vue의 Router는 URL에 따라 어떤 View를 보여줄지 Mapping해준다. <br>
/home 경로로 들어오면 Home.vue Component를 화면에 Rendering한다.

<br>

```cmd
npm i vue-router
```

<br>

### **Custom Directives**
Vue Core에서 기본으로 제공하는 Directive(v-if, v-for) 외에도 Vue를 사용하면 직접 Custom Directive를 만들 수 있다.

<br>

### **상태 관리**
Vue Instance는 자체적으로 상태 관리를 한다. <br>

-   **State** <br>
    Component 내부 선언된 상태 <br>
-   **View** <br>
    상태가 선언적으로 Mapping 된 Template <br>
-   **Actions** <br>
    View에서 사용자의 입력에 대한 반응으로 State를 변경

<br>

```javascript
import { ref } from "vue"

// State
const currentNum = ref(0);

// Action
const increase = () => currentNum.value++;
```
```html
<!-- View -->
<template>
    {{ currentNum }}
</template>
```

<br>

#### Component 간 공통된 상태 공유
1. 공유하고자 하는 상태를 부모 Component로 두고 Props로 전달 <br>
    이 방법은 깊은 계층구조를 가진 Component에서 Prop Drilling 문제 발생 <br>

2. Template Refs를 사용해 부모/자식 Instance에 직접 접근하거나 Emits Event를 통해 여러 복사본의 상태를 동기화 <br>
    이 방법은 유지 보수가 불가능함

<br>

#### Reactivity API 상태 관리
여러 Component에서 공유해야 하는 상태가 있는 경우 reactive()를 사용해 반응형 객체 생성 후 여러 Component에서 사용 <br>
```javascript
// store.js
import { reactive } from "vue"

export const store = reactive({
    currentNum: 0,
})
```
```javascript
// ComponentA
import { store } from ""
```
```html
<template>
    {{ store.count }}
<template>
```
```javascript
// ComponentB
import { store } from ""
```
```html
<template>
    {{ store.count }}
<template>
```

<br>

```cmd
npm i pinia
```

<br>

-   defineStore <br>
    1. state: 상태 <br>
    2. getters: computed를 사용해 state 값을 계산해 반환(Return)하는 역할 <br> 
    3. actions: store를 변경할 수 있는 Method(Function)
```javascript
// store.js
import { defineStore } from "pinia";

export const useStore = defineStore("userMeta", {
    state: () => ({
        name: "윤승근",
        age: 30,
    }),                              // data
    getters: {
        addIntroduce(state) {
            state.name = `안녕하세요 ${state.name}입니다.`;
        }
    },                                    // computed
    actions: {
        removeIntroduce() {
            this.name = null;
        }
    },                                    // methods
});
```
```javascript
import { useStore } from ""

// reactive Mapping Object
const store = useStroe();
```
```html
<template>
    <h3>Name: {{ store.name }}</h3>
    
    <button @click="store.addIntroduce">AddIntroduce</button>
    <button @click="store.removeIntroduce">RemoveIntroduce</button>
</template>
```

<br>

-   구조 분해 할당
    state와 getters는 storeToRefs 사용 <br>
    actions는 일반 구조 분해 할당 <br>
    ```javascript
    import { storeToRefs } from "pinia"
    import { useStore } from ""

    const stroe = useStore();
    
    const { name, age, addIntroduce } = storeToRefs(store);
    const { removeIntroduce } = store;
    ```

<br>

## **Navigation Guard**
Vue Router에서 제공하는 Navigation Guard는 Page Redirection 또는 Cancel 하여 특정 Page 진입을 보호하는 데 사용한다. <br>

Route Search Process는 Global, Route, Component 3가지가 있다.

<br>

1. **Global Guard** <br>
    router.beforeEach() Method 사용 <br>
    Navigation이 Trigger 될 경우 Guard가 작성 순서에 따라 호출되기 전 모든 경우에 발생한다. <br>
    Guard는 비동기로 실행될 수 있고 Navigation은 모든 Hook이 해결되기 전까지 보류 증으로 간주된다. <br>
    <br>
    #### **Parameters**
    -   **_to_**: Routing 되는 위치 정보를 담고 있는 객체 <br>
    -   **_from_**: Routing 되기 전의 위치 정보를 담고 있는 객체 <br>
    #### **Return Values**
    -   **_undefined_** | **_true_**: Navigation Guard 검증 완료이므로 다음 Navigation Guard 수행 <br>
    -   **_false_**: 현재 Routing Cancel <br>
    ```javascript
    const router = createRouter()

    router.beforeEach((to, from) => {
        return false
    })
    ```

<br>

2. **Route Guard** <br>
    beforeEnter() Method 사용 <br>
    beforeEnter는 해당 Route 진입 시 Trigger된다. 같은 URL이면서 params, query, hash의 변경이 일어날 경우 Trigger되지 않는다. <br>
    Guard는 오직 다른 Route로 Navigation 할 경우에만 Trigger 된다. <br>
    { name: "path" } Redirection
    ```javascript
    const routes = [
        {
            path: "/user/:userId",
            component: UserDetail,
            beforeEnter: (to, from) => {
                return false // Reject Navigation
            }
        }
    ]
    ```

<br>

3. **Component Guard** <br>
    Composition API: onBeforeRouteUpdate(), onBeforeRouteLeave() Method 사용 <br>
    Options API: setup 보다 먼저 실행되므로 beforeRouteEnter() Method 사용 <br>
    ```javascript
    import { onBeforeRouteLeave, onBeforeRouteUpdate } from "vue-router";

    onBeforeRouteUpdate(() => {
        console.log("onBeforeRouteUpdate");
    });

    onBeforeRouteLeave(() => {
        console.log("onBeforeRouteLeave");
    });
    ```

    ```javascript
    export default {
        beforeRouteEnter(to, from) {
            console.log("beforeRouteEnter");
        },
    };
    ```

<br>

## Dynamic Component <br>
Component를 동적으로 변경하고 싶을 경우 v-bind:is 속성을 사용해 변경한다. <br>
Dynamic Component는 Tab Interface와 같이 Component 간에 동적으로 전환해야 할 경우 사용한다. <br>

-   :is 속성에 전달된 값은 다음 중 하나를 포함할 수 있다. <br>
    등록된 Component에 문자열 이름 string <br>
    실제 가져온 Component Object

    <br>

```html
<MyComponent :is="currentTabComponent"></MyComponent>
```

<br>

> <MyComponent :is="...">을 사용해 여러 Component간 전환하면 Component 간 mount가 해제된다. <br>
> <KeepAlive> 내장 Component를 사용해 비활성 Component들의 활성 상태를 유지할 수 있게 강제할 수 있다.

<br>




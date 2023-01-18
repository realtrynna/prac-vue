# Vue

자바스크립트 Framework이다. 바닐라 자바스크립트를 기반으로 효율적인 UI 개발이 가능하다.

<br>

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

SFC는 template, script, style 크게 3개의 Tag로 구성되어 있다.

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
    **_app.component_** 를 이용해 Component를 등록하면 Component는 Application 전역에 등록이 되어 모든 Component Instance의 Template 내부에서 접근이 가능하다.

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

자바스크립트 객체에서 반응형 상태를 생성하기 위해서 reactive() 함수를 사용한다.

```javascript
const state = reactive({ count: 0 });
```

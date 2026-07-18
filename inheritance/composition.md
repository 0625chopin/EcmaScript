# composition.js — 합성 (Composition)

## 개요
상속(`extends`) 대신, 독립된 기능 단위를 조합해 객체를 만드는 방식. 필요한 능력만 골라 합친다.

## 핵심 개념
- 각 능력을 "state를 받아 메서드를 담은 객체를 반환하는 함수"로 만든다.
- 팩토리 함수에서 `Object.assign`으로 여러 능력을 하나의 객체에 합친다.
- "~는 ~의 한 종류다(is-a)"인 상속과 달리, **"~할 수 있다(can-do)"** 능력을 조합한다. 상속보다 유연하다.

## 코드 설명
```js
const canBark = (state) => ({ bark: () => console.log(`${state.name} barks!`) });
const canRun  = (state) => ({ run:  () => console.log(`${state.name} runs!`) });

const createDog = (name) => {
    const state = { name };
    return Object.assign({}, canBark(state), canRun(state)); // 능력 조합
};

const dog = createDog("Ggomi");
dog.bark(); // "Ggomi barks!"
dog.run();  // "Ggomi runs!"
```
`canBark`, `canRun`은 서로 독립적이라, 필요한 객체에 필요한 능력만 골라 합칠 수 있다.

## 실행
```bash
node inheritance/composition.js
```
출력:
```
Ggomi barks!
Ggomi runs!
```

## 비교
- 클래스 상속 방식: `inheritance.md`

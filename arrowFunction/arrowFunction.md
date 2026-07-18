# arrowFunction.js — 화살표 함수의 this 바인딩

## 개요
화살표 함수로 객체 메서드를 정의했을 때 `this`가 예상과 다르게 동작하는 사례를 보여준다.

## 핵심 개념
- 화살표 함수는 **자신만의 `this`가 없다.**
- 대신 **정의된 위치의 상위 스코프 `this`를 그대로** 사용한다(렉시컬 this).
- 따라서 객체 메서드로 화살표 함수를 쓰면 `this`가 그 객체를 가리키지 않는다.

## 코드 설명
```js
const user = {
    name: "karina",
    sayHi: () => {
        console.log(this.name); // this는 user가 아님 → undefined
    }
}
user.sayHi(); // undefined
```
`sayHi`가 화살표 함수라 `this`는 `user`가 아니라 **바깥 스코프의 this**(모듈/전역)를 가리킨다. 그곳엔 `name`이 없어 `undefined`가 출력된다.

## 실행
```bash
node arrowFunction/arrowFunction.js
```
출력: `undefined`

## 비교
- 일반 함수 버전: `function.md` (this가 user에 바인딩되어 "karina" 출력)
- 화살표 함수가 오히려 유용한 경우: `arrowFunction2.md` (콜백 안에서 this 유지)

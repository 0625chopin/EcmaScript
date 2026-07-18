# function.js — 일반 함수의 this 바인딩

## 개요
일반 함수(`function`)로 정의한 메서드에서 `this`가 어떻게 결정되는지 보여준다.

## 핵심 개념
- 일반 함수는 **호출한 방식에 따라 `this`가 동적으로 결정**된다.
- 객체의 메서드로 호출하면 `this`는 **그 메서드를 호출한 객체**에 바인딩된다.

## 코드 설명
```js
const user = {
    name: "karina",
    sayHi: function() {
        console.log(this.name); // this === user → "karina"
    }
}
user.sayHi(); // "karina"
```
`user.sayHi()`로 호출했으므로 `this`는 `user`를 가리키고, `this.name`은 `"karina"`가 된다.

## 실행
```bash
node arrowFunction/function.js
```
출력: `karina`

## 비교
- 같은 상황을 화살표 함수로 작성하면 결과가 달라진다 → `arrowFunction.md` 참고.

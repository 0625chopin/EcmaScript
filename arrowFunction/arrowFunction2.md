# arrowFunction2.js — 콜백에서 화살표 함수로 this 유지

## 개요
콜백 함수 안에서 화살표 함수가 상위 스코프의 `this`를 유지해 주는 덕분에, 인스턴스에 안전하게 접근하는 예제.

## 핵심 개념
- `setTimeout` 등의 콜백을 **일반 함수**로 쓰면 `this`가 인스턴스를 잃어버린다.
- 콜백을 **화살표 함수**로 쓰면 자신만의 this가 없어, 상위 메서드(`sayHi`)의 `this`(=인스턴스)를 그대로 사용한다.

## 코드 설명
```js
class User {
    constructor(name) { this.name = name; }
    sayHi() {
        setTimeout(() => {
            console.log(`안녕하세요. ${this.name}입니다.`);
        }, 1000);
    }
}
new User("카리나").sayHi(); // 1초 뒤 "안녕하세요. 카리나입니다."
```
콜백이 화살표 함수라 `this`가 `sayHi`의 `this`(인스턴스)를 가리켜, 1초 뒤에도 `this.name`에 정상 접근한다. 일반 함수였다면 `this`가 인스턴스를 잃어 `undefined`가 됐을 것이다.

## 실행
```bash
node arrowFunction/arrowFunction2.js
```
출력(1초 뒤): `안녕하세요. 카리나입니다.`

## 비교
- 화살표 함수가 this를 못 잡아 문제되는 반대 사례: `arrowFunction.md`

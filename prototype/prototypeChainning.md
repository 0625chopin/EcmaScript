# prototypeChainning.js — 프로토타입 체이닝

## 개요
생성자 함수와 `prototype`을 이용해, 여러 인스턴스가 메서드를 공유하고 프로토타입 체인을 통해 찾아 쓰는 방식을 보여준다.

## 핵심 개념
- 생성자 함수는 `new`로 호출되면 새 인스턴스를 만들고 속성을 초기화한다.
- 메서드를 **`생성자.prototype`에 정의하면 모든 인스턴스가 공유**한다(인스턴스마다 복제하지 않아 메모리 절약).
- 인스턴스에 없는 속성/메서드는 **프로토타입 체인을 따라 상위에서 찾는다.**

## 코드 설명
```js
function User(name) {
    this.name = name; // 인스턴스 고유 속성
}

User.prototype.greet = function() { // 프로토타입에 메서드 정의 (모든 인스턴스 공유)
    console.log(`hello my name is ${this.name}`);
};

const karina = new User('karina');
karina.greet(); // karina에 greet가 없어 프로토타입 체인에서 찾아 실행
```
`karina` 자신에는 `greet`가 없지만, `User.prototype`에서 찾아 실행한다.

## 실행
```bash
node prototype/prototypeChainning.js
```
출력: `hello my name is karina`

## 관련
- 이 프로토타입 메커니즘 위에 문법 설탕을 입힌 것이 `class`다 → `../class/classSample.md`, `../inheritance/inheritance.md`

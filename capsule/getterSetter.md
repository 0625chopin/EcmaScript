# getterSetter.js — 캡슐화 (private 필드와 getter/setter)

## 개요
클래스의 private 필드(`#`)로 데이터를 외부 직접 접근으로부터 감추고, getter/setter 메서드를 통해서만 값을 다루는 캡슐화 예제.

## 핵심 개념
- `#필드명` 으로 선언한 **private 필드는 클래스 외부에서 직접 접근할 수 없다.**
- 값 조회는 **getter**, 값 변경은 **setter** 메서드로만 하도록 통로를 제한한다.
- setter에 조건을 넣어 **잘못된 변경을 막는 등 검증 로직**을 둘 수 있다.

## 코드 설명
```js
class User {
    #userNo; // private 필드

    constructor(userNo) { this.#userNo = userNo; }

    getUserNo() { return this.#userNo; }          // getter: 조회
    updateUserNo(userNo) {                        // setter: 변경
        if (this.#userNo != '') this.#userNo = userNo;
    }
}

const user = new User('000001');
console.log(user.getUserNo()); // "000001"
user.updateUserNo('000002');
console.log(user.getUserNo()); // "000002"
```
`User.#userNo`처럼 외부에서 직접 접근하면 SyntaxError가 발생한다.

## 실행
```bash
node capsule/getterSetter.js
```
출력:
```
000001
000002
```

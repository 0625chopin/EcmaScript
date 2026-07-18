# classSample.js — 클래스 기본 (생성자·인스턴스 메서드·정적 메서드)

## 개요
클래스의 세 가지 기본 요소인 생성자, 인스턴스 메서드, 정적(static) 메서드를 한 예제로 보여준다.

## 핵심 개념
- **생성자(`constructor`)**: 인스턴스를 만들 때 초기 속성을 설정한다.
- **인스턴스 메서드**: 각 인스턴스에서 호출한다(`user.getUserInfo()`).
- **정적 메서드(`static`)**: 인스턴스가 아니라 **클래스 자체에서 호출**한다(`User.compareAge(...)`). 특정 인스턴스에 속하지 않는 공통 기능에 쓴다.

## 코드 설명
```js
class User {
    constructor(userName, userAge) {
        this.userName = userName;
        this.userAge = userAge;
    }

    getUserInfo() {                        // 인스턴스 메서드
        return `${this.userName} ${this.userAge}`;
    }

    static compareAge(user, user2) {       // 정적 메서드
        return user.userAge > user2.userAge
            ? `${user.userName} is old`
            : `${user2.userName} is old`;
    }
}

const user1 = new User("원이", 23);
const user2 = new User("카리나", 25);
console.log(user1.getUserInfo());        // "원이 23"
console.log(User.compareAge(user1, user2)); // "카리나 is old"
```

## 실행
```bash
node class/classSample.js
```
출력:
```
user1 : 원이 23
user2 : 카리나 25
카리나 is old
```

# inheritance.js — 클래스 상속 (extends)

## 개요
`extends`로 부모 클래스의 기능을 물려받고, 자식 클래스에서 자신만의 기능을 추가하는 상속 예제.

## 핵심 개념
- 자식 클래스는 `extends 부모클래스`로 **부모의 메서드를 물려받는다.**
- 자식은 물려받은 기능에 더해 **자신만의 메서드를 추가**할 수 있다.
- "~는 ~의 한 종류다(is-a)" 관계를 표현할 때 적합하다.

## 코드 설명
```js
class Dog {
    type() { return "강아지~~ 종류!"; }
}

class Pomeranian extends Dog { // Dog를 상속
    bark() { return "wal wal kung kung"; }
}

const pomeranian = new Pomeranian();
console.log(pomeranian.type()); // 상속받은 메서드 → "강아지~~ 종류!"
console.log(pomeranian.bark()); // 자신의 메서드 → "wal wal kung kung"
```

## 실행
```bash
node inheritance/inheritance.js
```
출력:
```
강아지~~ 종류!
wal wal kung kung
```

## 비교
- 상속 대신 기능을 조합하는 방식: `composition.md`

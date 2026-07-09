// 클래스 상속(inheritance) 예제

// 부모 클래스(상위 클래스)
class Dog {
    type() {
        return "강아지~~ 종류!";
    }
}

// 자식 클래스(하위 클래스): extends로 Dog를 상속받는다
// Dog의 메서드(type)를 물려받고, 자신만의 메서드(bark)를 추가로 가진다
class Pomeranian extends Dog {
    bark() {
        return "wal wal kung kung";
    }
}



const pomeranian = new Pomeranian(); // 자식 클래스 인스턴스 생성

console.log(pomeranian.type()); // 부모 Dog에게서 상속받은 메서드 → "강아지~~ 종류!"
console.log(pomeranian.bark()); // 자신이 직접 정의한 메서드 → "wal wal kung kung"
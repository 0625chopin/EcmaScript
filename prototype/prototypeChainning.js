// 프로토타입 체이닝 예제
// 생성자 함수: new로 호출되면 새 인스턴스를 만들고 name을 초기화한다
function User(name) {
    this.name = name; // 인스턴스마다 갖는 고유 속성
}

// 프로토타입에 메서드 추가
// 인스턴스가 직접 갖지 않고 User.prototype에 정의하므로
// 모든 User 인스턴스가 이 메서드를 공유한다 (메모리 절약)
User.prototype.greet = function() {
    console.log(`hello my name is ${this.name}`);
}

const karina = new User('karina'); // User 인스턴스 생성

// karina 자신에는 greet가 없지만,
// 프로토타입 체인을 따라 User.prototype에서 greet를 찾아 실행한다
karina.greet(); // "hello my name is karina"
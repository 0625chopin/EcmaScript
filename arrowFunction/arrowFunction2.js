// 콜백 안에서 화살표 함수가 this를 유지하는 예제
class User {
    constructor(name) {
        this.name = name; // 사용자 이름
    }

    sayHi() {
        // setTimeout의 콜백을 화살표 함수로 작성
        // 화살표 함수는 자신만의 this가 없어 상위 스코프(sayHi)의 this를 그대로 사용한다
        // 덕분에 콜백 안에서도 this가 인스턴스(user)를 가리켜 name에 정상 접근 가능
        // (일반 함수였다면 this가 인스턴스를 잃어버려 undefined가 됐을 것)
        setTimeout(() => {
            console.log(`안녕하세요. ${this.name}입니다.`); // 1초 뒤 "안녕하세요. 카리나입니다." 출력
        }, 1000);
    }
}

const user = new User("카리나"); // User 인스턴스 생성
user.sayHi();
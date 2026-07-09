// User 클래스: 사용자 정보를 담고 관련 동작을 제공한다
class User {
    // 생성자: 인스턴스 생성 시 이름과 나이를 초기화한다
    constructor(userName, userAge) {
        this.userName = userName; // 사용자 이름
        this.userAge = userAge;   // 사용자 나이
    }

    // 인스턴스 메서드: "이름 나이" 형식의 문자열을 반환한다
    getUserInfo() {
        return `${this.userName} ${this.userAge}`;
    }

    // 정적 메서드: 두 사용자의 나이를 비교해 더 나이 많은 쪽을 안내한다
    // 인스턴스가 아닌 클래스(User)에서 직접 호출한다
    static compareAge(user, user2) {
        return user.userAge > user2.userAge ?
                `${user.userName} is old` : `${user2.userName} is old`
    }
}

// User 인스턴스 생성 (나이는 숫자로 전달)
const user1 = new User("원이", 23);
const user2 = new User("카리나", 25);

// 각 사용자 정보 출력
console.log('user1 : ' + user1.getUserInfo());
console.log('user2 : ' + user2.getUserInfo());
// 정적 메서드로 두 사용자의 나이 비교 결과 출력
console.log(User.compareAge(user1, user2));
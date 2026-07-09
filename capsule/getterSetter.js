// 캡슐화(private 필드)와 getter/setter 예제
class User {
    #userNo; // private 필드: 클래스 외부에서 직접 접근 불가 (#으로 선언)

    constructor(userNo) {
        this.#userNo = userNo; // 생성 시 private 필드 초기화
    }

    // getter: private 필드 값을 읽어오는 메서드 (외부에서 값 조회용)
    getUserNo() {
        return this.#userNo;
    }

    // setter: 전달받은 값으로 private 필드를 변경하는 메서드 (외부에서 값 수정용)
    updateUserNo(userNo) {
        if(this.#userNo != '') {           // 기존 값이 비어있지 않을 때만 변경 허용
            this.#userNo = userNo;         // 매개변수로 받은 새 값으로 교체
        }
    }
}


const user = new User('000001');    // User 인스턴스 생성 (초기값 "000001")
console.log(user.getUserNo());      // getter로 값 조회 → "000001"
user.updateUserNo('000002');        // setter로 값 변경: private 필드는 외부 직접 접근만 막을 뿐,
console.log(user.getUserNo());      // 변경된 값 조회 → "000002"
// console.log(User.#userNo);  // private 필드는 클래스 외부에서 직접 접근 불가 (SyntaxError)


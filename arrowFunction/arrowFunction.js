// 화살표 함수(arrow function)의 this 바인딩 예제
const user = {
    name: "karina",
    // 화살표 함수: 자신만의 this가 없어 상위 스코프의 this를 그대로 사용한다
    // 여기서는 호출한 객체(user)가 아니라 바깥 스코프의 this를 가리킨다
    sayHi: () => {
        console.log(this.name); // this는 user가 아니므로 name을 찾지 못해 undefined 출력
    }
}

user.sayHi() // undefined
// 일반 함수(function)의 this 바인딩 예제
const user = {
    name: "karina",
    // 일반 함수: 호출한 객체(user)가 this로 바인딩된다
    sayHi: function() {
        console.log(this.name); // this === user 이므로 "karina" 출력
    }
}

user.sayHi() // "karina"
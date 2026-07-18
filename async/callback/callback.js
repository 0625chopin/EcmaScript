// 콜백(callback) 패턴 예제
// 비동기 작업이 끝난 뒤 실행할 함수를 인자로 넘겨, 완료 시점에 호출하도록 한다

// callback: 데이터 수신이 끝나면 호출할 함수를 받는다
function fetchData(callback) {
    // setTimeout으로 비동기 작업(예: 서버 요청)을 흉내낸다
    // → 지금 바로 실행되지 않고, 1000ms(1초) 뒤에 콜백이 실행된다
    setTimeout(() => {
        // 작업이 끝나면 결과값을 인자로 넘겨 콜백을 호출한다
        callback("데이터 수신 완료");
    }, 1000) // 두 번째 인자 1000 = 1초 지연 시간(ms)
}

// fetchData를 호출하면서, 작업 완료 후 실행될 콜백 함수를 전달한다
fetchData(function(result) {
    console.log(result); // result에는 콜백으로 넘어온 "데이터 수신 완료"가 담김
})

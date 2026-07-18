// 프로미스(Promise) 패턴 예제
// 콜백 대신 Promise 객체를 반환해, 비동기 작업의 성공/실패를 .then/.catch로 처리한다

function fetchData() {
    // new Promise: 비동기 작업의 최종 결과를 담을 프로미스 객체를 생성해 반환한다
    // executor 함수는 성공 시 호출할 resolve, 실패 시 호출할 reject를 인자로 받는다
    return new Promise((resolve, reject) => {
        // setTimeout으로 비동기 작업(예: 서버 요청)을 흉내낸다 → 1초 뒤 실행
        setTimeout(() => {
            // 작업 성공: resolve에 결과값을 넘기면 프로미스가 '이행(fulfilled)' 상태가 됨
            // → .then의 콜백으로 이 값이 전달됨
            resolve("데이터 수신 완료");
            // 실패 상황이라면 reject("에러 메시지")를 호출 → .catch로 전달됨
        }, 1000);
    })
}

fetchData()
    // then: 프로미스가 성공(resolve)했을 때 실행 → result에 resolve로 넘긴 값이 담김
    .then((result) => console.log(result))
    // catch: 프로미스가 실패(reject)하거나 도중에 에러가 나면 실행
    .catch((error) => console.log(error));

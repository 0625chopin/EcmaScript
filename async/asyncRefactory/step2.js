// step2: 프로미스 체이닝(Promise chaining) 방식
// step1의 콜백 중첩(콜백 지옥)을 Promise로 리팩터링한 버전
// 각 함수는 콜백을 받는 대신 Promise를 반환하고, .then으로 평평하게 이어붙인다

// 첫 번째 비동기 작업: 결과 a를 담은 Promise를 반환한다
function fetchA() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const a = "A";
            console.log("fetchA 완료:", a);
            resolve(a); // 콜백 대신 resolve로 결과를 넘긴다 → .then으로 전달
        }, 1000);
    });
}

// 두 번째 비동기 작업: a를 받아 결과 aa를 담은 Promise를 반환한다
function fetchAA(a) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const aa = a + "A"; // 이전 결과(a)를 이어받아 가공
            console.log("fetchAA 완료:", aa);
            resolve(aa);
        }, 1000);
    });
}

// 세 번째 비동기 작업: aa를 받아 결과 aaa를 담은 Promise를 반환한다
function fetchAAA(aa) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const aaa = aa + "A"; // 이전 결과(aa)를 이어받아 가공
            console.log("fetchAAA 완료:", aaa);
            resolve(aaa);
        }, 1000);
    });
}

// 콜백 중첩 대신 .then 체이닝으로 순차 실행
// → 각 .then에서 이전 단계의 결과를 받아 다음 함수에 넘긴다
// → step1처럼 오른쪽으로 깊어지지 않고 아래로 평평하게 이어진다
fetchA()
    .then((a) => fetchAA(a))    // 1단계 결과 a → 2단계 실행
    .then((aa) => fetchAAA(aa)) // 2단계 결과 aa → 3단계 실행
    .then((aaa) => {            // 3단계 결과 aaa 수신
        console.log(aaa);       // 최종 결과 출력 → "AAA"
    })
    .catch((error) => {         // 체인 중 어디서든 에러가 나면 여기서 잡는다
        console.log("에러 발생 :", error);
    });

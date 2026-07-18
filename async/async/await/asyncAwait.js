// async/await 패턴 예제
// 프로미스를 반환하는 함수를 await로 기다려, 비동기 코드를 동기 코드처럼 읽히게 작성한다

// 프로미스를 반환하는 함수 (promise.js의 fetchData와 동일한 역할)
function fetchData() {
    return new Promise((resolve, reject) => {
        // setTimeout으로 비동기 작업(예: 서버 요청)을 흉내낸다 → 1초 뒤 실행
        setTimeout(() => {
            // 작업 성공: resolve에 결과값을 넘기면 프로미스가 이행(fulfilled) 상태가 됨
            resolve("데이터 수신 완료");
            // 실패 상황이라면 reject("에러 메시지")를 호출 → 아래 catch로 잡힘
        }, 1000);
    });
}

// async 함수: 내부에서 await를 쓸 수 있고, 항상 프로미스를 반환한다
async function getData() {
    try {
        // await: fetchData()가 반환한 프로미스가 이행될 때까지 기다렸다가
        //        resolve로 넘어온 값을 꺼내 result에 담는다 (1초 대기)
        const result = await fetchData();
        console.log(result); // "데이터 수신 완료"
    } catch(err) {
        // 프로미스가 reject되거나 도중에 에러가 나면 여기서 잡는다
        console.log("에러 발생 : " + err)
    }
}

getData(); // 비동기 작업 시작

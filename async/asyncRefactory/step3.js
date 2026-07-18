// step3: async/await 방식
// step2의 프로미스 체이닝을 async/await로 리팩터링한 버전
// 함수는 step2와 동일하게 Promise를 반환하고, 실행부만 await로 바꾼다
// → 비동기 코드가 동기 코드처럼 위에서 아래로 읽힌다

// 첫 번째 비동기 작업: 결과 a를 담은 Promise를 반환한다
function fetchA() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const a = "A";
            console.log("fetchA 완료:", a);
            resolve(a);
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

// async 함수 안에서 await로 각 단계를 순서대로 기다린다
// → .then 체이닝보다도 더 평평하게, 일반 변수 대입처럼 결과를 받아 쓴다
async function run() {
    try {
        const a = await fetchA();      // 1단계: 완료를 기다렸다가 결과 a 수신
        const aa = await fetchAA(a);   // 2단계: a를 넘겨 실행, 결과 aa 수신
        const aaa = await fetchAAA(aa);// 3단계: aa를 넘겨 실행, 결과 aaa 수신
        console.log(aaa);              // 최종 결과 출력 → "AAA"
    } catch (error) {
        // 어느 단계에서 reject/에러가 나든 여기서 한 번에 잡는다
        console.log("에러 발생 :", error);
    }
}

run(); // 비동기 작업 시작

// step1: 콜백(callback) 방식 — 비동기 작업을 콜백 중첩으로 이어붙인 형태 (콜백 지옥)

// 첫 번째 비동기 작업: 결과 a를 만들어 콜백으로 넘긴다
function fetchA(callback) {
    setTimeout(() => {
        const a = "A";
        console.log("fetchA 완료:", a);
        debugger;
        callback(a); // 작업 완료 후 결과를 콜백에 전달
    }, 1000);
}

// 두 번째 비동기 작업: a를 받아 결과 aa를 만들어 콜백으로 넘긴다
function fetchAA(a, callback) {
    setTimeout(() => {
        const aa = a + "A"; // 이전 결과(a)를 이어받아 가공
        console.log("fetchAA 완료:", aa);
        callback(aa);
    }, 1000);
}

// 세 번째 비동기 작업: aa를 받아 결과 aaa를 만들어 콜백으로 넘긴다
function fetchAAA(aa, callback) {
    setTimeout(() => {
        const aaa = aa + "A"; // 이전 결과(aa)를 이어받아 가공
        console.log("fetchAAA 완료:", aaa);
        callback(aaa);
    }, 1000);
}

// 앞 작업의 결과를 다음 작업의 입력으로 넘기며 순차 실행
// → 단계가 늘수록 콜백이 오른쪽으로 깊어진다 (콜백 지옥)
fetchA(a => {                        // 1단계: fetchA 완료 → 결과 a 수신
    fetchAA(a, (aa) => {             // 2단계: a를 넘겨 fetchAA 실행 → 결과 aa 수신
        fetchAAA(aa, (aaa) => {      // 3단계: aa를 넘겨 fetchAAA 실행 → 결과 aaa 수신
            console.log(aaa)         // 최종 결과 출력 → "AAA"
        });
    });
});



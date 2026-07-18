// ============================================================
// Promise.all 병렬 처리 예제
//  - 목표: "시작 순서"와 "완료 순서"가 다를 수 있음을 눈으로 확인한다.
//  - 핵심: 완료 로그는 뒤섞여도, Promise.all이 돌려주는 결과 배열은
//          항상 "입력한 순서"를 그대로 유지한다.
// ============================================================

// id를 받아, 랜덤한 시간(0~2초) 뒤에 완료되는 비동기 작업을 만든다.
// 반환값은 Promise → 나중에 완료될 결과를 담는 "약속" 객체.
function fetchTask(id) {
    // new Promise 안의 콜백(executor)은 "즉시" 실행된다.
    // 즉, fetchTask(id)를 호출하는 순간 setTimeout 타이머가 바로 걸린다 → 작업 시작.
    return new Promise((resolve) => {
        // 0 ~ 2000ms 사이의 랜덤 지연 → 작업마다 완료 시점이 제각각이 된다.
        const delay = Math.floor(Math.random() * 2000);

        // setTimeout: delay가 지난 뒤 콜백을 이벤트 루프에 등록.
        // delay가 짧은 작업일수록 먼저 완료되어 로그가 먼저 찍힌다.
        setTimeout(() => {
            // 이 로그가 찍히는 순서 = "완료되는 순간"의 순서 (시작 순서와 다를 수 있음).
            console.log(`작업 ${id} 완료 (지연 ${delay}ms)`);

            // resolve(값): 이 프로미스를 이행(fulfilled) 상태로 바꾸고 값을 전달.
            // id를 담아 "어느 작업의 결과인지" 구분할 수 있게 한다.
            resolve(`결과-${id}`);
        }, delay);
    });
}

// async 함수: 내부에서 await로 비동기 완료를 기다릴 수 있다.
async function run() {
    console.log("=== 5개 작업 병렬 시작 (1~5 순서로 시작) ===");

    // 배열에 fetchTask(...)를 담는 이 시점에 1~5번 작업이 "모두 동시에 시작"된다.
    //  - 순차 실행이 아니다: 1번이 끝나길 기다렸다가 2번을 시작하는 게 아님.
    //  - 5개의 타이머가 거의 같은 순간에 걸리고, 각자의 delay 뒤에 따로따로 끝난다.
    const tasks = [
        fetchTask(1),
        fetchTask(2),
        fetchTask(3),
        fetchTask(4),
        fetchTask(5),
    ];

    // Promise.all(배열):
    //  - 배열 안 "모든" 프로미스가 이행될 때까지 기다린다(가장 느린 작업 기준).
    //  - 전부 끝나면, 각 결과를 "입력한 순서 그대로" 배열로 모아서 돌려준다.
    //  - 하나라도 reject되면 즉시 거부되어 나머지 결과는 받지 못한다
    //    (실패를 허용하고 전체를 모으려면 Promise.allSettled 사용).
    const results = await Promise.all(tasks);

    // 중요 포인트:
    //   위쪽 "작업 N 완료" 로그 순서는 delay에 따라 매 실행마다 뒤섞이지만,
    //   아래 results 배열은 언제나 [결과-1, 결과-2, ..., 결과-5] 순서를 유지한다.
    console.log("=== 전체 완료 ===");
    console.log("결과 배열(입력 순서 유지):", results);
}

// 실행 시작점.
run();

// Promise.all 병렬 처리 — 완료 순서가 섞이는 것을 확인하는 예제
// 각 작업에 서로 다른 랜덤 지연 시간을 주어, 시작 순서와 완료 순서가 달라지게 한다

// id를 받아, 랜덤한 시간(0~2초) 뒤에 완료되는 비동기 작업
function fetchTask(id) {
    return new Promise((resolve) => {
        // 0 ~ 2000ms 사이의 랜덤 지연 → 작업마다 완료 시점이 제각각
        const delay = Math.floor(Math.random() * 2000);
        setTimeout(() => {
            // 완료되는 "순간" 순서대로 로그가 찍힌다 → 시작 순서와 다를 수 있음
            console.log(`작업 ${id} 완료 (지연 ${delay}ms)`);
            resolve(`결과-${id}`); // id를 담아 어느 작업의 결과인지 구분
        }, delay);
    });
}

async function run() {
    console.log("=== 5개 작업 병렬 시작 (1~5 순서로 시작) ===");

    // 1~5번 작업을 동시에 시작 (병렬)
    const tasks = [
        fetchTask(1),
        fetchTask(2),
        fetchTask(3),
        fetchTask(4),
        fetchTask(5),
    ];

    // Promise.all: 모든 작업이 끝날 때까지 기다렸다가 결과를 배열로 반환
    const results = await Promise.all(tasks);

    // 중요: 완료(로그) 순서는 랜덤이지만,
    //       results 배열은 항상 "입력한 순서(1~5)"를 그대로 유지한다
    console.log("=== 전체 완료 ===");
    console.log("결과 배열(입력 순서 유지):", results);
}

run();

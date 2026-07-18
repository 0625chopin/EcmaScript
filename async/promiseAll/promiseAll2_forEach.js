// ============================================================
// forEach 케이스 — 함정(A)과 해결책(B)을 함께 본다
//  - promiseAll1.js의 `await Promise.all(tasks)`를 forEach로 바꾸면?
//  - forEach 자체는 콜백의 완료를 "기다리지 않는다".
//    → 그대로 쓰면 실패(A), 프로미스를 모아 Promise.all과 결합하면 성공(B).
// ============================================================

// (promiseAll1.js와 동일) 0~2초 랜덤 지연 뒤 완료되는 비동기 작업
function fetchTask(id) {
    return new Promise((resolve) => {
        const delay = Math.floor(Math.random() * 2000);
        setTimeout(() => {
            console.log(`작업 ${id} 완료 (지연 ${delay}ms)`);
            resolve(`결과-${id}`);
        }, delay);
    });
}

// ── [A] 함정: tasks.forEach + async 콜백은 기다려주지 않는다 ──
async function runForEachPitfall() {
    console.log("=== [A] forEach 함정 (기다리지 않음) ===");

    const tasks = [fetchTask(1), fetchTask(2), fetchTask(3), fetchTask(4), fetchTask(5)];
    const results = [];

    // forEach는 async 콜백이 돌려주는 Promise를 무시한다.
    // → 콜백 5개가 "시작"만 된 채 forEach가 즉시 끝난다.
    tasks.forEach(async (task) => {
        results.push(await task);
    });

    // 그래서 이 시점의 results는 아직 비어 있다.
    console.log("[A] forEach 직후 results:", results); // → [] (빈 배열!)
}

// ── [B] 해결: tasks.forEach로 프로미스를 모아 Promise.all로 기다린다 ──
async function runForEachFixed() {
    console.log("=== [B] forEach로 수집 후 대기 (정상 동작) ===");

    const tasks = [fetchTask(1), fetchTask(2), fetchTask(3), fetchTask(4), fetchTask(5)];

    // 결과를 담을 배열. index 위치에 넣어 "입력 순서"를 유지한다.
    const results = [];
    const pending = [];

    // forEach로 각 작업을 순회하며,
    //  - task.then(...)으로 완료 시 results[i]에 결과를 저장하도록 예약하고
    //  - 그 프로미스를 pending에 모아 둔다.
    tasks.forEach((task, i) => {
        pending.push(
            task.then((result) => {
                results[i] = result; // i번째 자리에 저장 → 완료 순서와 무관하게 순서 유지
            })
        );
    });

    // forEach로 모아 둔 프로미스들이 모두 끝날 때까지 기다린다.
    // (forEach 단독으로는 대기를 못 하므로 Promise.all과 결합해야 한다.)
    await Promise.all(pending);

    // 완료 로그는 뒤섞여도 results는 입력 순서(1~5)를 유지한다.
    console.log("[B] 결과 배열(입력 순서 유지):", results);
}

async function run() {
    await runForEachPitfall();
    await runForEachFixed();
    console.log("=== 전체 완료 ===");
}

run();

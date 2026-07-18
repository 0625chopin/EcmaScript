// ============================================================
// for...of + await 케이스  (정상 동작, 순서대로 수집)
//  - promiseAll1.js의 `await Promise.all(tasks)`를 for...of로 바꾼 버전.
//  - forEach와 달리 for...of는 각 반복에서 await를 "제대로 기다린다".
//  - 두 가지 시나리오로 "병렬 vs 순차"의 차이를 보여준다.
// ============================================================

function fetchTask(id) {
    return new Promise((resolve) => {
        const delay = Math.floor(Math.random() * 2000);
        setTimeout(() => {
            console.log(`작업 ${id} 완료 (지연 ${delay}ms)`);
            resolve(`결과-${id}`);
        }, delay);
    });
}

// ── 시나리오 A: 이미 시작된(병렬) 작업들을 for...of로 "수집"만 한다 ──
//   tasks를 먼저 만들어 두면 5개가 동시에 실행된다(병렬).
//   for...of의 await는 완료를 순서대로 받아 배열에 담을 뿐,
//   실행 자체는 이미 병렬이라 전체 시간은 Promise.all과 비슷하다.
async function runParallelCollect() {
    console.log("=== [A] for...of 수집 (병렬 시작) ===");

    const tasks = [
        fetchTask(1),
        fetchTask(2),
        fetchTask(3),
        fetchTask(4),
        fetchTask(5),
    ];

    const results = [];
    for (const task of tasks) {
        // 각 프로미스를 순서대로 기다려 결과를 담는다.
        // 이미 병렬 실행 중이므로 "대기"가 전체를 느리게 만들지 않는다.
        results.push(await task);
    }

    // 결과 배열은 입력 순서(1~5)를 그대로 유지한다 (Promise.all과 동일).
    console.log("[A] 결과 배열(입력 순서 유지):", results);
}

// ── 시나리오 B: 반복문 안에서 작업을 "하나씩 시작"하면 순차 실행이 된다 ──
//   for...of 안에서 fetchTask를 호출+await하면,
//   앞 작업이 끝나야 다음 작업이 시작된다 → 순차(직렬) 실행.
//   전체 시간이 각 지연의 "합"이 되어 A보다 느리다.
async function runSequential() {
    console.log("=== [B] for...of 순차 실행 (하나씩 시작) ===");

    const results = [];
    for (let id = 1; id <= 5; id++) {
        // 여기서 await가 끝나야 다음 반복으로 넘어간다 → 직렬 실행.
        const result = await fetchTask(id);
        results.push(result);
    }

    console.log("[B] 결과 배열(입력 순서 유지):", results);
}

// A를 끝낸 뒤 B를 실행해 로그가 섞이지 않도록 순서대로 돌린다.
async function run() {
    await runParallelCollect();
    await runSequential();
    console.log("=== 전체 완료 ===");
}

run();

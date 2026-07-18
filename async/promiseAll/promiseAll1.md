# promiseAll1.js — Promise.all 병렬 처리

## 개요
여러 비동기 작업을 **동시에 시작**하고 `Promise.all`로 모두 끝날 때까지 기다린 뒤, 결과를 배열로 한 번에 받는 예제. 완료 순서는 뒤섞여도 결과 배열의 순서는 유지된다는 점을 확인한다.

## 핵심 개념
- `Promise.all([p1, p2, ...])` 은 배열의 **모든 프로미스가 이행될 때까지** 기다렸다가, 각 결과를 **입력한 순서 그대로** 배열로 반환한다.
- 작업들을 배열에 담는 순간 **이미 시작(병렬 실행)** 된다. `await`는 "시작"이 아니라 "완료 대기"만 담당한다.
- 각 작업의 지연 시간이 랜덤이라 **완료(로그) 순서는 실행마다 달라지지만**, `results` 배열은 항상 `1~5` 순서다.
- 하나라도 `reject`되면 `Promise.all`은 즉시 거부된다(먼저 실패한 이유를 그대로 전달). 모든 결과가 필요한 경우 `Promise.allSettled` 사용을 고려한다.

## 코드 설명
```js
function fetchTask(id) {
    return new Promise((resolve) => {
        const delay = Math.floor(Math.random() * 2000); // 0~2초 랜덤 지연
        setTimeout(() => {
            console.log(`작업 ${id} 완료 (지연 ${delay}ms)`);
            resolve(`결과-${id}`);
        }, delay);
    });
}

async function run() {
    const tasks = [fetchTask(1), fetchTask(2), fetchTask(3), fetchTask(4), fetchTask(5)]; // 동시 시작
    const results = await Promise.all(tasks); // 전부 완료될 때까지 대기
    console.log("결과 배열(입력 순서 유지):", results);
}

run();
```

## 실행
```bash
node async/promiseAll/promiseAll1.js
```
출력 예시(완료 순서는 매번 다름):
```
=== 5개 작업 병렬 시작 (1~5 순서로 시작) ===
작업 3 완료 (지연 214ms)
작업 1 완료 (지연 872ms)
작업 5 완료 (지연 1103ms)
작업 2 완료 (지연 1441ms)
작업 4 완료 (지연 1888ms)
=== 전체 완료 ===
결과 배열(입력 순서 유지): [ '결과-1', '결과-2', '결과-3', '결과-4', '결과-5' ]
```
> 완료 로그는 지연 시간 순으로 섞여 찍히지만, 마지막 결과 배열은 언제나 입력 순서(1~5)를 유지한다.

## 주의
- `Promise.all`은 **가장 오래 걸리는 작업 시간**만큼 기다린다(가장 느린 작업이 전체 완료 시점을 결정).
- 작업 중 하나라도 실패하면 나머지 성공 결과도 받지 못한다. 실패를 허용하고 전체 결과를 모으려면 `Promise.allSettled`가 적합하다.

## 비교
- 단일 프로미스: `../promise/promise.md`
- 순차 실행이 필요한 경우: `../asyncRefactory/step3.md` (async/await로 순서대로 대기)

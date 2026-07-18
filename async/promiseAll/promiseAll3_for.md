# promiseAll3_for.js — for...of 순회 (병렬 수집 / 순차 실행)

## 개요
`promiseAll1.js`의 `await Promise.all(tasks)` 부분을 `for...of` + `await`로 바꿔 본다. `forEach`와 달리 `for...of`는 각 반복에서 **await를 제대로 기다린다.** 작업을 언제 시작하느냐에 따라 **병렬([A])** 이 되기도, **순차([B])** 가 되기도 한다.

## 핵심 개념
- **`for...of`는 await를 존중한다.** 반복 안에서 `await`하면 그 프로미스가 끝날 때까지 다음 반복으로 넘어가지 않는다.
- **[A] 병렬 수집**: `tasks`를 **미리 만들어 두면** 5개가 동시에 실행된다. `for...of`의 await는 완료를 순서대로 "수집"만 하므로, 전체 시간은 `Promise.all`과 비슷하다(가장 느린 작업 기준).
- **[B] 순차 실행**: 반복문 **안에서** `fetchTask(id)`를 호출·await하면, 앞 작업이 끝나야 다음 작업이 시작된다 → 직렬. 전체 시간이 각 지연의 **합**이 되어 느리다.
- 두 경우 모두 결과 배열은 입력 순서(1~5)를 유지한다.

## 코드 설명
### [A] 병렬 수집 — 먼저 시작해 두고 순서대로 모으기
```js
const tasks = [fetchTask(1), fetchTask(2), fetchTask(3), fetchTask(4), fetchTask(5)]; // 동시 시작
const results = [];

for (const task of tasks) {
    results.push(await task); // 이미 병렬 실행 중 → 대기가 전체를 느리게 하지 않음
}
console.log("[A] 결과 배열(입력 순서 유지):", results);
```

### [B] 순차 실행 — 반복문 안에서 하나씩 시작
```js
const results = [];
for (let id = 1; id <= 5; id++) {
    const result = await fetchTask(id); // 앞 작업이 끝나야 다음이 시작 → 직렬
    results.push(result);
}
console.log("[B] 결과 배열(입력 순서 유지):", results);
```

## 실행
```bash
node async/promiseAll/promiseAll3_for.js
```
출력 예시:
```
=== [A] for...of 수집 (병렬 시작) ===
작업 4 완료 (지연 169ms)
작업 5 완료 (지연 272ms)
...
[A] 결과 배열(입력 순서 유지): [ '결과-1', ..., '결과-5' ]
=== [B] for...of 순차 실행 (하나씩 시작) ===
작업 1 완료 (지연 880ms)
작업 2 완료 (지연 566ms)
작업 3 완료 (지연 30ms)
...
[B] 결과 배열(입력 순서 유지): [ '결과-1', ..., '결과-5' ]
=== 전체 완료 ===
```
> [A]는 완료 로그가 지연 시간 순으로 뒤섞이지만, [B]는 항상 `1 → 2 → 3 → 4 → 5` 순서로 완료된다. 지연이 짧아도 앞 작업을 기다렸다가 시작하기 때문이며, 이것이 **순차 실행**의 증거다.

## 주의
- **병렬이 필요하면 [A]처럼 먼저 시작**해 두고 순회하거나, 아예 `Promise.all`을 쓴다(→ `promiseAll1.md`).
- **순차가 꼭 필요할 때만 [B]** 를 쓴다(예: 앞 결과가 다음 요청의 입력일 때). 불필요한 순차 실행은 전체를 느리게 만든다.
- `forEach`는 await를 기다리지 않아 이런 순차/대기 제어가 불가능하다(→ `promiseAll2_forEach.md`).

## 비교
- 기본형: [promiseAll1.md](promiseAll1.md) — `Promise.all` (병렬 + 순서 유지)
- 함정 사례: [promiseAll2_forEach.md](promiseAll2_forEach.md) — `forEach`는 기다리지 않는다

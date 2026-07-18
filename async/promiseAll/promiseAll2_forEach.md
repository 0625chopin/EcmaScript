# promiseAll2_forEach.js — forEach 순회 (함정과 해결책)

## 개요
`promiseAll1.js`의 `await Promise.all(tasks)` 부분을 `tasks.forEach`로 바꿔 본다. `forEach`는 콜백의 완료(Promise)를 **기다려 주지 않기** 때문에 그대로 쓰면 실패하고([A]), 프로미스를 모아 `Promise.all`과 결합해야 정상 동작한다([B]).

## 핵심 개념
- **`forEach`는 async 콜백을 기다리지 않는다.** 콜백이 반환하는 Promise를 무시하고 다음 요소로 넘어가므로, 반복이 끝난 시점에도 비동기 작업은 아직 진행 중이다.
- 그래서 `forEach` 직후에 결과 배열을 읽으면 **아직 비어 있다**(`[]`).
- 제대로 기다리려면 **각 프로미스를 배열에 모아** `await Promise.all(...)` 로 대기해야 한다. 즉, `forEach` 단독으로는 "완료 대기"를 표현할 수 없다.
- 결과를 `results[i] = ...` 처럼 **인덱스 위치에 저장**하면, 완료 순서와 무관하게 입력 순서가 유지된다.

## 코드 설명
### [A] 함정 — forEach는 기다리지 않는다
```js
const tasks = [fetchTask(1), fetchTask(2), fetchTask(3), fetchTask(4), fetchTask(5)];
const results = [];

tasks.forEach(async (task) => {
    results.push(await task); // await는 콜백 안에서만 대기, forEach는 이를 무시
});

console.log("[A] forEach 직후 results:", results); // → [] (빈 배열!)
```

### [B] 해결 — 프로미스를 모아 Promise.all로 대기
```js
const tasks = [fetchTask(1), fetchTask(2), fetchTask(3), fetchTask(4), fetchTask(5)];
const results = [];
const pending = [];

tasks.forEach((task, i) => {
    pending.push(
        task.then((result) => {
            results[i] = result; // i번째 자리에 저장 → 순서 유지
        })
    );
});

await Promise.all(pending); // forEach로 모은 프로미스들을 기다림
console.log("[B] 결과 배열(입력 순서 유지):", results);
```

## 실행
```bash
node async/promiseAll/promiseAll2_forEach.js
```
출력 예시:
```
=== [A] forEach 함정 (기다리지 않음) ===
[A] forEach 직후 results: []
=== [B] forEach로 수집 후 대기 (정상 동작) ===
작업 3 완료 (지연 135ms)
...
[B] 결과 배열(입력 순서 유지): [ '결과-1', '결과-2', '결과-3', '결과-4', '결과-5' ]
=== 전체 완료 ===
```
> [B] 구간에 "작업 N 완료" 로그가 더 많이 섞여 찍힐 수 있다. 이는 [A]에서 **기다리지 않고 방치한 작업들**이 뒤늦게 완료되며 남기는 로그로, 오히려 [A]의 함정을 그대로 보여준다.

## 주의
- `forEach` 안에서 `async/await`를 쓰면 "기다린다"고 착각하기 쉽지만, **바깥 반복은 전혀 기다리지 않는다.** 순회하며 비동기 완료를 기다려야 한다면 `for...of`(→ `promiseAll3_for.md`) 또는 `Promise.all`을 사용한다.
- 단순히 "전부 병렬로 실행하고 결과를 순서대로 받기"만 원한다면 `Promise.all`이 가장 간결하다(→ `promiseAll1.md`).

## 비교
- 기본형: [promiseAll1.md](promiseAll1.md) — `Promise.all`
- 순회 대안: [promiseAll3_for.md](promiseAll3_for.md) — `for...of`는 await를 제대로 기다린다

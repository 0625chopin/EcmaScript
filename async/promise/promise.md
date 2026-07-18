# promise.js — 프로미스 패턴

## 개요
콜백 대신 `Promise` 객체를 반환해, 비동기 작업의 성공/실패를 `.then` / `.catch`로 분리해 처리한다.

## 핵심 개념
- `new Promise((resolve, reject) => {...})` 로 비동기 결과를 담을 객체를 만든다.
- **성공 시 `resolve(값)`** → 프로미스가 이행(fulfilled) 상태가 되고 `.then`으로 값 전달.
- **실패 시 `reject(값)`** 또는 내부 에러 발생 → `.catch`로 전달.
- 체이닝(`.then().catch()`)으로 콜백 중첩을 완화한다.

## 코드 설명
```js
function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("데이터 수신 완료"); // 성공 → .then으로 전달
        }, 1000);
    });
}

fetchData()
    .then((result) => console.log(result)) // 성공 처리
    .catch((error) => console.log(error)); // 실패 처리
```

## 실행
```bash
node async/promise/promise.js
```
출력(1초 뒤): `데이터 수신 완료`

## 오류 동작
- `resolve` 대신 `reject("실패 메시지")` → `.then`은 건너뛰고 `.catch`가 실행되어 메시지 출력.
- 내부에서 `throw new Error(...)` → 자동으로 거부되어 `.catch`로 잡히며, 이때 error는 Error 객체.
- `.catch`가 없으면 `UnhandledPromiseRejection` 경고가 발생할 수 있다.

## 비교
- 이전 단계: 콜백(`../callback/callback.md`)
- 다음 단계: async/await(`../async/await/asyncAwait.md`) — 같은 프로미스를 더 읽기 쉽게 사용

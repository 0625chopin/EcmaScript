# asyncAwait.js — async/await 패턴

## 개요
프로미스를 `await`로 기다려, 비동기 코드를 동기 코드처럼 위에서 아래로 읽히게 작성한다.

## 핵심 개념
- `async` 함수 안에서만 `await`를 쓸 수 있고, `async` 함수는 항상 프로미스를 반환한다.
- `await`는 **프로미스가 이행될 때까지 기다렸다가 결과값을 꺼내** 준다.
- 에러 처리는 `.catch` 대신 **`try / catch`** 로 한다.

## 코드 설명
```js
function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => resolve("데이터 수신 완료"), 1000);
    });
}

async function getData() {
    try {
        const result = await fetchData(); // 프로미스가 이행될 때까지 대기 후 값 꺼냄
        console.log(result);              // "데이터 수신 완료"
    } catch (err) {
        console.log("에러 발생 : " + err); // reject/에러 시 실행
    }
}

getData();
```

## 실행
```bash
node async/async/await/asyncAwait.js
```
출력(1초 뒤): `데이터 수신 완료`

## 주의
- `await` 대상은 **프로미스를 반환하는 함수**여야 한다. 정의되지 않은 함수를 `await` 하면 `ReferenceError`가 발생하며, `try` 안에 있으면 `catch`가 잡아 `에러 발생 : ...`으로 출력된다.

## 비교
- 같은 동작의 콜백 버전: `../callback/callback.md`
- 같은 동작의 프로미스 버전: `../promise/promise.md`

# callback.js — 콜백 패턴

## 개요
비동기 처리의 가장 기본 방식. 작업이 끝난 뒤 실행할 함수(콜백)를 인자로 넘겨, 완료 시점에 호출하도록 한다.

## 핵심 개념
- 비동기 작업의 **완료 후 실행할 코드를 함수로 전달**한다.
- 작업이 끝나면 그 콜백을 호출하며 결과값을 인자로 넘긴다.

## 코드 설명
```js
function fetchData(callback) {
    setTimeout(() => {
        callback("데이터 수신 완료"); // 작업 완료 후 콜백 호출
    }, 1000);
}

fetchData(function(result) {
    console.log(result); // "데이터 수신 완료"
});
```
`setTimeout`으로 1초 지연되는 비동기 작업을 흉내내고, 끝나면 전달받은 `callback`에 결과를 넘겨 호출한다.

## 실행
```bash
node async/callback/callback.js
```
출력(1초 뒤): `데이터 수신 완료`

## 한계
- 콜백 안에 또 콜백이 중첩되면 코드가 깊어지고 읽기 어려워진다(콜백 지옥).
- 이를 개선한 방식이 프로미스(`../promise/promise.md`)와 async/await(`../async/await/asyncAwait.md`)다.

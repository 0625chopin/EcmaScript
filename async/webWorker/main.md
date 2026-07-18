# main.js / worker.js — Web Worker (별도 스레드)

## 개요
무거운 계산을 별도 스레드(Web Worker)에서 처리해 메인 스레드를 막지 않는 예제. 메인(`main.js`)과 워커(`worker.js`)가 메시지로 통신한다.

## 파일 구성
- `index.html` : 진입 페이지. `main.js`를 로드한다.
- `main.js` : 메인 스레드. 워커를 생성하고 데이터를 전달, 결과를 콘솔에 출력.
- `worker.js` : 워커 스레드. 전달받은 숫자까지의 총합을 계산해 메인으로 반환.

## 동작 흐름
1. `main.js`가 `new Worker("./worker.js")`로 워커를 생성한다.
2. `worker.postMessage(1_000_000_000)`으로 데이터를 워커에 전달한다.
3. `worker.js`의 `self.onmessage`가 실행되어 0~n의 총합을 계산한다.
4. `self.postMessage(sum)`으로 결과를 메인에 되돌려 보낸다.
5. `main.js`의 `worker.onmessage`가 결과를 받아 콘솔에 출력한다.

## 코드 요약
```js
// main.js
const worker = new Worker("./worker.js");
worker.onmessage = (e) => console.log("총합은:" + e.data);
worker.postMessage(1_000_000_000);
```
```js
// worker.js
self.onmessage = function(e) {
    const n = e.data;
    let sum = 0;
    for (let i = 0; i <= n; i++) sum += i;
    self.postMessage(sum);
};
```

## 실행
Web Worker는 `file://`에서 생성할 수 없으므로 **로컬 HTTP 서버**로 실행해야 한다.
```bash
cd async/webWorker
npx --yes http-server -p 8080 -c-1
```
브라우저에서 **http://localhost:8080/** 접속 → `F12` → **Console** 탭에서 결과 확인.
출력: `총합은:500000000500000000`

## 주의
- 반드시 `index.html`이 있는 폴더에서 서버를 실행한다(다른 폴더면 리다이렉트 오류).
- 워커 안에서는 `window`·`document`·`alert` 등 UI/DOM API를 쓸 수 없다. 워커의 전역 객체는 `self`이며, UI 작업은 메인 스레드만 담당한다.

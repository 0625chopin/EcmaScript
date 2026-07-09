// 메인 스레드 스크립트
// Web Worker를 이용해 무거운 계산을 별도 스레드에서 처리한다
// (메인 스레드는 멈추지 않아 UI가 반응성을 유지한다)

// worker.js를 실행하는 워커 생성 (별도 스레드에서 동작)
// ※ Worker는 file://에서 생성 불가 → http 서버로 실행해야 함
const worker = new Worker("./worker.js");

// 워커가 postMessage로 결과를 보내오면 실행되는 콜백
worker.onmessage = function (e) {
    console.log("총합은:" + e.data); // e.data에 워커가 보낸 계산 결과가 담김
}

// 워커에게 처리할 데이터(숫자)를 전달 → 워커의 onmessage가 실행됨
worker.postMessage(1_000_000_000);
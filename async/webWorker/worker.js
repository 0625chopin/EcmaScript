// 워커 스크립트 (별도 스레드에서 실행됨)
// self는 워커 자신의 전역 객체를 가리킨다

// 메인 스레드가 postMessage로 데이터를 보내면 실행되는 콜백
self.onmessage = function(e) {
    const n = e.data; // 메인에서 전달받은 숫자

    let sum = 0;

    // 무거운 반복 연산 (메인 스레드가 아닌 워커에서 처리하므로 UI가 멈추지 않음)
    for(let i = 0; i <= n; i++) {
        sum += i; // 0부터 n까지 순차적으로 더함 → 0~n의 총합
    }

    // 계산 결과(총합)를 메인 스레드로 되돌려 보냄 → main.js의 onmessage 실행
    self.postMessage(sum);
};
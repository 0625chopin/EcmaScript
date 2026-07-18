# step1.js — 콜백 방식 (콜백 지옥)

## 개요
비동기 리팩터링 3단계 중 **1단계**. 순차적인 비동기 작업을 콜백 중첩으로 이어붙인, 가장 기본적이지만 가독성이 떨어지는 형태(콜백 지옥).

## 핵심 개념
- 각 함수는 **콜백을 인자로 받아**, 작업이 끝나면 그 콜백을 호출하며 결과를 넘긴다.
- 앞 작업의 결과를 다음 작업의 입력으로 넘기려면 **콜백 안에 콜백을 중첩**해야 한다.
- 단계가 늘수록 코드가 **오른쪽으로 깊어진다(콜백 지옥).**

## 코드 설명
```js
function fetchA(callback) {
    setTimeout(() => {
        const a = "A";
        callback(a); // 완료 후 결과를 콜백에 전달
    }, 1000);
}
// fetchAA(a, callback), fetchAAA(aa, callback)도 같은 구조

fetchA(a => {                   // 1단계 결과 a
    fetchAA(a, (aa) => {        // 2단계 결과 aa
        fetchAAA(aa, (aaa) => { // 3단계 결과 aaa
            console.log(aaa);   // "AAA"
        });
    });
});
```

## 실행
```bash
node async/asyncRefactory/step1.js
```
출력(각 단계 1초 간격):
```
fetchA 완료: A
fetchAA 완료: AA
fetchAAA 완료: AAA
AAA
```

## 한계
- 중첩이 깊어져 읽기 어렵고, 에러 처리를 각 콜백마다 따로 해야 한다.
- 콜백 없이 호출(`fetchA()`)하면 `callback`이 `undefined`가 되어 `TypeError: callback is not a function`이 발생한다.

## 다음 단계
- 프로미스 체이닝으로 개선 → `step2.md`

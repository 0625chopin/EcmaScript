# step3.js — async/await

## 개요
비동기 리팩터링 3단계 중 **3단계(최종)**. step2의 프로미스 체이닝을 `async/await`로 바꿔, 비동기 코드를 동기 코드처럼 위에서 아래로 읽히게 만든 형태.

## 핵심 개념
- 함수(`fetchA`/`fetchAA`/`fetchAAA`)는 **step2와 동일하게 Promise를 반환**한다. 바뀌는 것은 실행부뿐이다.
- `async` 함수 안에서 **`await`로 각 단계의 완료를 기다렸다가** 결과를 일반 변수처럼 대입해 쓴다.
- 에러는 **`try / catch`** 로 통합 처리한다.

## 코드 설명
```js
// fetchA(), fetchAA(a), fetchAAA(aa)는 step2와 동일하게 Promise 반환

async function run() {
    try {
        const a = await fetchA();       // 1단계 완료 대기 → a
        const aa = await fetchAA(a);    // 2단계 완료 대기 → aa
        const aaa = await fetchAAA(aa); // 3단계 완료 대기 → aaa
        console.log(aaa);               // "AAA"
    } catch (error) {
        console.log("에러 발생 :", error); // 어느 단계 에러든 여기서 처리
    }
}
run();
```

## 실행
```bash
node async/asyncRefactory/step3.js
```
출력(step1·step2와 동일):
```
fetchA 완료: A
fetchAA 완료: AA
fetchAAA 완료: AAA
AAA
```

## step2 대비 개선점
- `.then` 체이닝조차 사라지고, 일반 변수 대입처럼 결과를 순차적으로 받아 쓴다.
- 조건문·반복문 등 일반 제어 흐름과 자연스럽게 섞어 쓸 수 있다.

## 리팩터링 3단계 요약
| 단계 | 방식 | 실행부 형태 | 에러 처리 |
| --- | --- | --- | --- |
| step1 | 콜백 | 오른쪽 중첩 (콜백 지옥) | 콜백마다 개별 |
| step2 | 프로미스 체이닝 | 아래로 평평한 `.then` | `.catch` 통합 |
| step3 | async/await | 동기 코드처럼 순차 대입 | `try/catch` 통합 |

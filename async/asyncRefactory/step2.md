# step2.js — 프로미스 체이닝

## 개요
비동기 리팩터링 3단계 중 **2단계**. step1의 콜백 중첩을 `Promise`로 바꿔, `.then` 체이닝으로 평평하게 이어붙인 형태.

## 핵심 개념
- 각 함수는 콜백을 받는 대신 **`Promise`를 반환**한다. 성공 시 `resolve(값)`으로 결과를 넘긴다.
- 콜백 중첩 대신 **`.then()`을 이어 붙여** 순차 실행한다. 이전 `.then`이 반환한 값이 다음 `.then`으로 전달된다.
- 코드가 오른쪽으로 깊어지지 않고 **아래로 평평하게** 이어진다.
- **`.catch` 하나로** 체인 전체의 에러를 통합 처리한다.

## 코드 설명
```js
function fetchA() {
    return new Promise((resolve) => {
        setTimeout(() => resolve("A"), 1000); // 콜백 대신 resolve
    });
}
// fetchAA(a), fetchAAA(aa)도 Promise를 반환

fetchA()
    .then((a) => fetchAA(a))     // 1단계 결과 a → 2단계 실행
    .then((aa) => fetchAAA(aa))  // 2단계 결과 aa → 3단계 실행
    .then((aaa) => console.log(aaa)) // 최종 결과 → "AAA"
    .catch((error) => console.log("에러 발생 :", error));
```

## 실행
```bash
node async/asyncRefactory/step2.js
```
출력(step1과 동일):
```
fetchA 완료: A
fetchAA 완료: AA
fetchAAA 완료: AAA
AAA
```

## step1 대비 개선점
- 깊은 중첩 제거 → 위에서 아래로 읽히는 평평한 구조.
- 각 콜백마다 하던 에러 처리를 `.catch` 하나로 통합.

## 다음 단계
- async/await로 더 간결하게 → `step3.md`

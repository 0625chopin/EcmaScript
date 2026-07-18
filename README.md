# EcmaScript 학습 예제

자바스크립트(ECMAScript)의 핵심 개념을 주제별로 정리한 학습용 예제 모음입니다.
각 로직의 **상세 설명은 해당 폴더 아래에 소스와 같은 이름의 `.md` 문서**로 정리되어 있습니다.

## 폴더 구조 및 로직 요약

```
ecmaScript/
├─ arrowFunction/          함수의 this 바인딩
│  ├─ function.js          일반 함수의 this (호출한 객체에 바인딩)
│  ├─ arrowFunction.js     화살표 함수의 this (상위 스코프 사용)
│  └─ arrowFunction2.js    콜백에서 화살표 함수로 this 유지
│
├─ async/                  비동기 처리
│  ├─ callback/callback.js         콜백 패턴
│  ├─ promise/promise.js           프로미스 패턴 (.then / .catch)
│  ├─ async/await/asyncAwait.js    async·await 패턴 (try / catch)
│  ├─ nonBlockingTask.js           작업 분할로 이벤트 루프 논블로킹
│  └─ webWorker/                   별도 스레드(Web Worker)로 무거운 연산 처리
│     ├─ main.js                   메인 스레드 (워커 생성·통신)
│     └─ worker.js                 워커 스레드 (총합 계산)
│
├─ capsule/                캡슐화
│  └─ getterSetter.js      private 필드(#)와 getter/setter
│
├─ class/                  클래스
│  └─ classSample.js       생성자·인스턴스 메서드·정적 메서드
│
├─ inheritance/            상속과 합성
│  ├─ inheritance.js       클래스 상속 (extends)
│  └─ composition.js       합성 (기능 조합)
│
└─ prototype/              프로토타입
   └─ prototypeChainning.js   프로토타입 체이닝
```

## 실행 방법

대부분의 예제는 Node.js로 실행합니다.

```bash
node <파일경로>
```

단, `async/webWorker/`는 브라우저 전용이며 로컬 HTTP 서버로 실행해야 합니다. 자세한 내용은 `async/webWorker/main.md`를 참고하세요.

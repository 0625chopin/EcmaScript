// 합성(composition) 예제
// 상속(extends) 대신, 기능 단위를 조합해 객체를 만드는 방식
// "~할 수 있다(can)"는 능력들을 각각 함수로 만들어 필요한 것만 골라 합친다

// "짖을 수 있는" 능력: state를 받아 bark 메서드를 담은 객체를 반환
const canBark = (state) => ({
    bark: () => {
        console.log(`${state.name} barks!`)
    }
});

// "달릴 수 있는" 능력: state를 받아 run 메서드를 담은 객체를 반환
const canRun = (state) => ({
    run: () => console.log(`${state.name} runs!`)
});

// 팩토리 함수: 상태(state)를 만들고 여러 능력을 조합해 dog 객체를 생성
const createDog = (name) => {
    const state = {name: name}; // 각 능력이 공유할 내부 상태
    // Object.assign으로 빈 객체에 bark, run 능력을 합쳐 하나의 객체로 만든다
    return Object.assign({}, canBark(state), canRun(state));
}

const dog = createDog("Ggomi"); // 짖고 달릴 수 있는 개 객체 생성
dog.bark(); // "Ggomi barks!"
dog.run()   // "Ggomi runs!"
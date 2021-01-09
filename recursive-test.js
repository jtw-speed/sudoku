// 세분화 해서 test 해봐야 함... 다 짜놓고 test 돌리면 debuging이 어려움.

//singleB
let sudokuMatrix = [[261, 257, 259, 0, 0, 0, 0, 0, 0]]; // sudokuMatrix = [[0100000101 0100000001 0100000011 0 0 0 0 0 0]];
let mask = 1023;
let result = 0;
let m = 0;
let section = 0;
for (i = 0; i < 9; i++) {
    m = result & sudokuMatrix[section][i];
    result = result ^ (sudokuMatrix[section][i] & mask);
    mask = mask & ~m;
}
for (i = 0; i < 9; i++) {
    p = sudokuMatrix[section][i] & result
    if (p !==0) {
        console.log(p, section, i);
    }
}

//singleN
let sudokuMatrix = [[261, 257, 259, 0, 0, 0, 0, 0, 0]];
let section = 0;
let k;
for (i = 0; i < 9; i++) {
    k = sudokuMatrix[section][i];
    if ((k & 1) !== 0) {    // 채워지지 않음.   ** (k & 1)에서 괄호 빼먹으면 안됨.
        if ( ((k >> 1) & ((k >> 1) - 1)) === 0) {                         // k = 0000010001 이런 형식   ** 역시 괄호 필수
            console.log(k - 1, section, i);
        }
    }
}

//bitToNum
m = [];
test = 1023; // 1111111111
for (k = 0; k < 10; k++) {
    if ((test & (1 << k)) !== 0) {  // ** 여기서도 괄호 필수. 비교연산에서 괄호로 확실히 구분해야 함.
        m.push(k);
    }
}

                                            // recursion for loop 문제
function recursion(n) {
    if(n<1) {
        for(i=0; i<8; i++) {}
        return;
    }
    for(i=0;i<2;i++){
        recursion(n-1);
        console.log(i);
    }
}
recursion(1)
// 여기서 i는 0, 1이 아닌 8이 출력. 즉 내부 recursion()을 거치며 i가 8이 되고, 이를 출력 후 for loop가 종료
// 함수 내부의 변수는 밖으로 나갈 수 없다고 알고 있는데 이 경우는 왜 이럴까?

// 실험 1. for loop i가 아닌 local variable도 변화할까?
function recursion(n) {
    let a = 1;
    if(n<1) {        
        //for(i=0; i<8; i++) {}
        a = 8;
        return;
    }
    for(i=0;i<2;i++){
        recursion(n-1);
        console.log(a);
    }
}
recursion(1)
// 1이 두 번 출력된다. 다만 주석처리한 for문을 지우면 한 번 출력된다.
// 이는 함수 내에 정의된 local variable은 탈출 못하지만 i는 8로 탈출한다는 뜻이다.


                                                        // 조사 결과
/* for문에 initialize된 i가 for문 밖으로 나온 case. 이를 계속 찾아보다가 알아낸 것이 있는데, 다른 코드들을 보니 일반적으로 for 문 내에서 i를 정의한다는 것.
즉 for(i; ...)가 아니라 for(let i; ...)이런 식으로. 만약 해당 keyword를 빼먹을 경우 i는 전역변수로 선언된다길래 실제로 확인해 보니 그랬다...
(참고 https://stackoverflow.com/questions/5717126/var-or-no-var-in-javascripts-for-in-loop)
고로 for문 안에서 let으로 초기화 한다. (let의 경우 for문 내에서만 사용되며 for문이 끝나면 종료된다.)

https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/var 읽어보셈
"1. 선언된 변수들은 변수가 선언된 실행 콘텍스트(execution context) 안에서 만들어집니다. 선언되지 않은 변수들은 항상 전역변수 입니다."
무조건 선언하는 것은 내가 생각하기에도 상식이었는데, for loop 내부에서도 선언해야한다는 사실을 놓쳤다. 또한 선언되지 않는 변수는 전역변수가 된다는 사실도 몰랐다.
이렇게 error를 발견하고 원인을 파악한 것은 의미있다고 생각한다.
이렇게 선언하지 않은 변수들의 경우 이렇게 예기치 않은 error가 발생하므로 strict mode를 사용하여 잡는다.
strict mode는 필수인 것 같다.

let vs var
let은 변수가 선언된 블록, 구문 또는 표현식 내에서만 유효한 변수를 선언한다. 이는 var 키워드가 블록 범위를 무시하고 전역 변수나 함수 지역 변수로 선언되는 것과 다른 점이다.
(참고 https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/let)


추가적으로 scope 개념과 identifiler? 개념도 중요하다고 한다. 아직 잘 이해는 안되는데, 될 때 까지 하는게 내 방식이니까. 해보자.*/




// 범위
function fun1(x) {
    x = 3;
    return;
}
function fun2() {
    let x = 1;
    fun1(x);
    console.log(x);
}
fun2()      // 당연히 안됨... scope문제. scope를 신경쓰거나 return으로 해결하거나 혹은 다른 방식으로.



// 조건문 내부 함수 호출 test
function hi() {
    console.log('hi');
    return 1;
}
if (hi()) {
    console.log('bye');
}
// 가능. 문제는 없을까?

// 아무 것도 return하지 않을 때 Boolean?
function bool() {
    return;
}

if (bool() === 0) {
    console.log('hi');
}   // 안됨. ==도 안됨.

if (!bool()) {
    console.log('hi');
}   // 이건 됨











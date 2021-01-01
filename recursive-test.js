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
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
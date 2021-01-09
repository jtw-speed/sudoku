/*
경우의 수를 따질 때 모든 section에 대한 검사/연산 없이 해당 section만 연산할 수 있겠다는 생각이 들어 시도해봄.
또한 후보군 집합을 bit로 다루어 메모리나 연산효율을 높힐 수 있겠다는 생각이 들어 같이 시도.
*/

let setProblem = document.querySelector('.setProblem');
let solveProblem = document.querySelector('.solveProblem');
let solutionDisplay = document.querySelector('.solution');


/*
뭐랄까 메모리를 크게 두고 이것저것 저장할 수록 연산 시간은 줄어드는 느낌이다.
매번 반복되는 연산 대신에 기존에 저장한 값을 그냥 불러오기만 하면 되니까...
많은 연산을 필요로 하는 데이터는 저장해두는 것도 나쁘지 않은 것 같다.
*/

/* section별 data는 필요없음.*/


let sudokuMatrix = [];
// sudokuMatrix를 1111111111([1,2,3,4,5,6,7,8,9] 그리고 채우기 전이다)로 설정. 1111111111=2^11-1=2047
for (let i = 0; i < 9; i++) {
    sudokuMatrix.push([]);
    for (let j = 0; j < 9; j++) {
        sudokuMatrix[i].push(1023);
    }
}

/*simple sample
sudokuMatrix = [
[99, 128, 355, 333, 297, 512, 39, 16, 293]
,[4, 769, 8, 2, 16, 417, 673, 289, 64]
,[627, 769, 883, 325, 417, 481, 679, 8, 933]
,[256, 525, 597, 537, 523, 11, 111, 128, 45]
,[25, 2, 145, 32, 64, 4, 9, 512, 265]
,[585, 32, 709, 777, 907, 395, 79, 323, 16]
,[555, 16, 807, 841, 811, 363, 745, 97, 681]
,[128, 521, 545, 585, 4, 16, 256, 97, 2]
,[555, 64, 803, 128, 811, 299, 569, 4, 553]
];
*/

/*hard sample*/
sudokuMatrix = [
[755, 8, 97, 741, 229, 613, 609, 256, 627]
,[625, 593, 97, 2, 361, 873, 4, 561, 128]
,[739, 4, 256, 737, 16, 609, 609, 547, 8]
,[583, 579, 16, 229, 231, 103, 256, 8, 613]
,[256, 67, 77, 237, 512, 111, 225, 181, 117]
,[589, 32, 128, 16, 333, 333, 2, 517, 581]
,[109, 321, 2, 877, 365, 128, 16, 549, 549]
,[245, 209, 512, 101, 103, 119, 8, 167, 256]
,[189, 401, 45, 813, 303, 831, 673, 64, 551]
];







/*
빈 칸 위치(i,j), 채울 숫자(bit 형식)를 받는다.
sudokuMatrix의 해당 위치를 입력 숫자로 변경한다.
빈 칸을 포함하는 section의 모든 빈 칸에 대해
해당 숫자를 지우기 연산 (a & ~(1 << n))
*/

function addNumber(n, i, j) {       // n은 0000100000 이런 형식
    let startK;
    let startL;
    // row
    for (let k = 0; k < 9; k++) {
        sudokuMatrix[i][k] = sudokuMatrix[i][k] & ~n;
    }
    // column
    for (let k = 0; k < 9; k++) {
        sudokuMatrix[k][j] = sudokuMatrix[k][j] & ~n;
    }
    // block
    startK = 3*Math.floor(i/3);
    startL = 3*Math.floor(j/3);
    for (let k = startK; k < startK + 3; k++) {
        for (let l = startL; l <startL + 3; l++) {
            sudokuMatrix[k][l] = sudokuMatrix[k][l] & ~n;            
        }
    }
    sudokuMatrix[i][j] = n; // 마지막에 처리해야 함. 안그러면 채운 뒤 빼버림. 빼고->채우는 순서
    console.log(i+', '+j+'에 '+n+'을 채움');
}
// test 완



// input number(problem number)가 존재하는 칸의 경우, 숫자를 bit 형식으로 변환하고, 포함 sectino에 대해 후보 제거 연산.
function getInput() {
    console.log('got input');
    let inputs = document.querySelectorAll('.number');
    let num;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            num = Number(inputs[i*9+j].value);
            if (num !== 0) {
                addNumber(1 << num, i, j);
            }
        }
    }
}
// test 완

/* 고민1. loop 안에서 변수를 정의하고 초기화하는 것이 메모리나 시간 효율을 떨어트리지 않을까?
-> loop 밖에서 정의하고 loop내에서 초기화 하는 것이 더 좋을 것 같긴 한데 실제로 차이가 있을까?
삭제자? 생성자? 때문에 차이는 있지만 효율의 차이는 신경 안써도 될 듯.
다만 variable의 scope가 달라지기에 이는 신경써야 함 */











/* recursive filling
한 section을 입력하면, 해당 section에서 single N, single B를 통해 채울 수 있는 요소를 찾고,
해당하는 요소가 포함된 section에 대해 같은 연산을 재귀적으로 실행.
종료 조건은 그냥 채울 수 있는 요소가 없을 경우.*/

/* functino recursiveFilling(section1)
single N 검사
요소 있으면
    포함 section 계산, 포함 section에 대해 재귀연산
single B 검사
요소 있으면
    포함 sectino 계산, 포함 section에 대해 재귀연산
종료.*/

/* single N
section의 모든 빈칸에 대해
채워지지 않았고(bit 마지막 자리가 1), 나머지 중 하나만 1일 때 추출
(k-1)&(k-2)을 하면 자리가 하나일 경우 0이 나온다.

해당 빈 칸의 숫자를 k
if k & 1 > 0
    if k&(k-1) === 0
        채울 수 있음!
*/

/* single B

-> 까다로움.
내가 생각한 방식은 연산자 *: 0*0=1*1=0, 0*1=1*0=1로 두고 누적계산하면(xor), 1이 하나만 있는 경우 1, 0만 있는 경우 0으로 return됨. 1이 두 번 나오면 0으로 되어 괜찮음
다만 1이 세 번 나오는 순간 1^1^1=1이 되어 문제가 생기므로 1이 두 번 나온 경우 그 다음 요소 전부에서 해당 자릿수를 0으로 만듦.
그렇게 하면 어차피 1^1=0이고 이후로 0^0=0이 되므로 0이 됨.

mask = 1111111111;
result = 0;
m = 0;
FOR 처음 빈 칸 to 마지막 빈 칸 DO
    mp = result & 빈 칸; (새롭게 1이 두 번 나온 자릿 수 저장)
    result = result ^ (현재 칸 & mask); (1이 하나만 있는 경우만 1로)
    mask = mask & ~mp; (새롭게 1이 두 번 나온 자릿수 mask 0 처리)
IF result !== 0 DO                                                          result 끝 자리는 0이 된다. 빈 칸(마지막 자리 수가 1) 두 개 이상에 대해 연산했으므로. 하나일 경우 single N에서 걸러짐.
    (위치 및 single B로 나온 숫자 찾기)
    FOR 처음 빈 칸 to 마지막 빈 칸 DO
        IF 해당 빈 칸 bit & result !==0 DO   (A에 속한 원소가 있는 칸 찾기)
            위치, (해당 빈 칸 & A) 값 채우기   (해당 칸 & A는 single B로 나온 원소, 끝 자리는 result와 &에 의해 0으로 처리 됨.)
            
*/



function recursiveFilling(section) {
    
    console.log('section'+section+' start!');
    let k;
    let a;
    let mask;
    let result;
    let m;
    let p;
    let col;
    let startI;
    let startJ;
    let x;

    // 먼저 section 종류 구분
    if (section < 9) {    // row
        //single N
        for (let i = 0; i < 9; i++) {
            k = sudokuMatrix[section][i];
            if ( (k & 1) !== 0) {    // 채워지지 않음.
                if ( ( (k >> 1) & ((k >> 1) - 1) ) === 0) {                         // k = 0000010001 이런 형식
                    addNumber(k - 1, section, i);
                    recursiveFilling(section);      // row(itself)
                    recursiveFilling(i + 9);        // column
                    recursiveFilling(3*Math.floor(section/3)+Math.floor(i/3)+18);        // block  
                }
            }
        }
        // single B
        mask = 1023;
        result = 0;
        m = 0;
        for (let i = 0; i < 9; i++) {
            m = result & sudokuMatrix[section][i];
            result = result ^ (sudokuMatrix[section][i] & mask);
            mask = mask & ~m;
        }
        if (result !== 0) {
            for (let i = 0; i < 9; i++) {
                x = sudokuMatrix[section][i];
                if ( (x & 1) !== 0) {
                    p = x & result;
                    if (p !==0) {
                        addNumber(p, section, i);
                        recursiveFilling(section);      // row(itself)
                        recursiveFilling(i + 9);        // column
                        recursiveFilling(3*Math.floor(section/3)+Math.floor(i/3)+18);        // block  
                    }
                }
            }
        }
        console.log('sectoin '+section+' done');
    }
    else if (section < 18) {    // column
        // single N...  sudokuMatrix[i][section%9]
        col = section%9;
        for (let i = 0; i < 9; i ++) {
            k = sudokuMatrix[i][col];
            if ( (k & 1) !== 0) {
                if ( ( (k >> 1) & ((k >> 1) - 1) ) === 0) {                         // k = 0000010001 이런 형식
                    addNumber(k - 1, i, col);
                    recursiveFilling(i);      // row
                    recursiveFilling(col + 9);        // column(itself)
                    recursiveFilling(3*Math.floor(i/3)+Math.floor(col/3)+18);        // block  
                }
            }
        }
        // singl B
        mask = 1023;
        result = 0;
        m = 0;
        for (let i = 0; i < 9; i++) {
            m = result & sudokuMatrix[i][col];
            result = result ^ (sudokuMatrix[i][col] & mask);
            mask = mask & ~m;
        }
        if (result !== 0) {
            for (let i = 0; i < 9; i++) {
                x = sudokuMatrix[i][col];
                if ( (x & 1) !== 0) {
                    p = x & result;
                    if (p !==0) {
                        addNumber(p, i, col);
                        recursiveFilling(i);      // row(itself)
                        recursiveFilling(col + 9);        // column
                        recursiveFilling(3*Math.floor(i/3)+Math.floor(col/3)+18);        // block  
                    }
                }
            }
        }
        console.log('sectoin '+section+' done');
    }
    else {      // block
        startI = 3*Math.floor((section-18)/3);
        startJ = 3*((section-18)%3);
        // single N
        for (let i = startI; i < startI+3; i++) {
            for (let j = startJ; j < startJ+3; j++) {
                k = sudokuMatrix[i][j];
                if ( (k & 1) !== 0) {
                    if ( ( (k >> 1) & ((k >> 1) - 1) ) === 0) {                         // k = 0000010001 이런 형식
                        addNumber(k - 1, i, j);
                        recursiveFilling(i);      // row
                        recursiveFilling(j + 9);        // column(itself)
                        recursiveFilling(3*Math.floor(i/3)+Math.floor(j/3)+18);        // block  
                    }
                }
            }
        }
        // single B
        mask = 1023;
        result = 0;
        m = 0;
        for (let i = startI; i < startI+3; i++) {
            for (let j = startJ; j < startJ+3; j++) {
                m = result & sudokuMatrix[i][j];
                result = result ^ (sudokuMatrix[i][j] & mask);
                mask = mask & ~m;
            }
        }
        if (result !== 0) {
            for (let i = startI; i < startI+3; i++) {
                for (let j = startJ; j < startJ+3; j++) {
                    x = sudokuMatrix[i][j];
                    if ( (x & 1) !== 0) {
                        p = x & result;
                        if (p !==0) {
                            addNumber(p, i, j);
                            recursiveFilling(i);      // row(itself)
                            recursiveFilling(j + 9);        // column
                            recursiveFilling(3*Math.floor(i/3)+Math.floor(j/3)+18);        // block  
                        }
                    }
                }
            }
        }
        console.log('sectoin '+section+' done');
    }
    return;
}


/* function solvingSimple
그냥 모든 section에 대해 recursiveFilling을 한 번만 실행하면 됨.
recursiveFilling을 실행하는 순간 '변동이 있는' seciton은 모두 처리가 되기 때문에.
수학적으로(?) 설명하자면, section을 재조사 하는 경우, 변동이 있다면 처리가 되었으므로 조사할 필요가 없고, 변동이 없다면 이전 조사에서 처리가 끝났으므로 조사할 필요가 없다.
*/

function solvingSimple() {
    for (let i = 0; i < 27; i++) {
        recursiveFilling(i);
    }
}












/* bit to number in Matrix*/
function bitToNum() {
    let m;
    let a;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            m = [];
            a = sudokuMatrix[i][j];
            for (let k = 0; k < 10; k++) {
                if ( (a & (1 << k)) !== 0) {
                    m.push(k);
                }
            }
            if (m.length === 1) {
                m = m[0];
            }
            sudokuMatrix[i][j] = m;
        }
    }
}
// test 완






function displaySolution() {
    bitToNum();
    let sol;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            sol = document.createElement('div');
            sol.textContent = sudokuMatrix[i][j];
            solutionDisplay.appendChild(sol);
        }
    }
}
// test 완


setProblem.addEventListener('click', getInput); // 이게 계속 안됐는데 html에서 form을 지우니 해결. 모르는 것은 사용 ㄴ.
solveProblem.addEventListener('click', solvingSimple);
solveProblem.addEventListener('click', displaySolution);
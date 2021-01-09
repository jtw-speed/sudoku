/*
경우의 수를 따질 때 모든 section에 대한 검사/연산 없이 해당 section만 연산할 수 있겠다는 생각이 들어 시도해봄.
또한 후보군 집합을 bit로 다루어 메모리나 연산효율을 높힐 수 있겠다는 생각이 들어 같이 시도.
*/

/* https://www.chosun.com/site/data/html_dir/2010/08/24/2010082400075.html
sudoku sample! 참고*/

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
[99, 128, 355, 333, 297, 512, 39, 16, 293]                              문제 없이 작동.
,[4, 769, 8, 2, 16, 417, 673, 289, 64]
,[627, 769, 883, 325, 417, 481, 679, 8, 933]
,[256, 525, 597, 537, 523, 11, 111, 128, 45]
,[25, 2, 145, 32, 64, 4, 9, 512, 265]
,[585, 32, 709, 777, 907, 395, 79, 323, 16]
,[555, 16, 807, 841, 811, 363, 745, 97, 681]
,[128, 521, 545, 585, 4, 16, 256, 97, 2]
,[555, 64, 803, 128, 811, 299, 569, 4, 553]
];

let count = 81 - 27;
*/

/*hard sample*/
sudokuMatrix = [
[583, 533, 32, 8, 853, 469, 851, 723, 403]
,[256, 537, 579, 721, 625, 209, 595, 4, 155]
,[589, 128, 581, 849, 2, 341, 32, 593, 281]
,[16, 773, 965, 835, 833, 32, 8, 643, 135]
,[549, 2, 773, 785, 128, 281, 533, 561, 64]
,[737, 545, 8, 4, 593, 83, 531, 256, 179]
,[143, 64, 391, 32, 285, 415, 279, 19, 512]
,[679, 805, 16, 451, 325, 455, 327, 8, 295]
,[47, 301, 263, 339, 349, 512, 128, 115, 311]
];

let count = 81 - 23;





/*
빈 칸 위치(i,j), 채울 숫자(bit 형식)를 받는다.
sudokuMatrix의 해당 위치를 입력 숫자로 변경한다.
빈 칸을 포함하는 section의 모든 빈 칸에 대해
해당 숫자를 지우기 연산 (a & ~(1 << n))
*/

function addNumber([n, i, j]) {       // n은 0000100000 이런 형식
    let startK;
    let startL;
    let num;
    let storage = [,[],[],[],[],[],[],[],[],[]];       // 형식 [empty,x,x,x,x,x,x,x,x,x], index: 숫자, x: 위치. x 형식 [[i0,j0],[i1,j1], ...]*/

    for (let i = 0; i < 10; i++) {      // find number. storage에 index형식으로 넣어야 함.
        if ( (n & (1 << i)) !== 0) {
            num = i;
            break;
        }
    }
    // row
    for (let k = 0; k < 9; k++) {
        if (sudokuMatrix[i][k] & n !==  0) {     // 뺄 수 있다면 빼고, storage에 저장.
            sudokuMatrix[i][k] = sudokuMatrix[i][k] & ~n;
            console.log('num'+num);
            storage[num].push([i,k]);
        }
    }
    // column
    for (let k = 0; k < 9; k++) {
        if (sudokuMatrix[k][j] & n !==  0) {
            sudokuMatrix[k][j] = sudokuMatrix[k][j] & ~n;
            storage[num].push([k,j]);
        }
    }
    // block
    startK = 3*Math.floor(i/3);
    startL = 3*Math.floor(j/3);
    for (let k = startK; k < startK + 3; k++) {
        for (let l = startL; l <startL + 3; l++) {
            if (sudokuMatrix[k][l] & n !==  0) {
                sudokuMatrix[k][l] = sudokuMatrix[k][l] & ~n;
                storage[num].push([k,l]);
            }
        }
    }
    sudokuMatrix[i][j] = n; // 마지막에 처리해야 함. 안그러면 채운 뒤 빼버림. 빼고->채우는 순서
    console.log(i+', '+j+'에 '+n+'을 채웠음');
    count--;
    return storage;
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
                addNumber([1 << num, i, j]);
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
    let returnCond;

    // 먼저 section 종류 구분
    if (section < 9) {    // row
        //single N
        for (let i = 0; i < 9; i++) {
            k = sudokuMatrix[section][i];
            if ( (k & 1) !== 0) {    // 채워지지 않음.
                if (k === 1) {          // 모순 case!!
                    console.log('모순입니다');
                    return 12;      // 임의로 지정함.
                }
                if ( ( (k >> 1) & ((k >> 1) - 1) ) === 0) {                         // k = 0000010001 이런 형식
                    console.log(section+', '+i+'에 '+(k-1)+'을 채울예정');
                    addNumber([k - 1, section, i]);
                    if (count === 0) {
                        return 1;       // 종료조건. 임의로 지정함
                    }
                    returnCond = recursiveFilling(section);      // row(itself)
                    if (returnCond === 1) {             // 자식이 끝났을 때 부모까지 모두 끝내야 하며, 끝나는 원인(완성인지, 모순인지)도 계속 올려줘야 함.
                        return 1;
                    }
                    if (returnCond === 12) {
                        return 12;
                    }
                    returnCond = recursiveFilling(i + 9);        // column
                    if (returnCond === 1) {
                        return 1;
                    }
                    if (returnCond === 12) {
                        return 12;
                    }
                    returnCond = recursiveFilling(3*Math.floor(section/3)+Math.floor(i/3)+18);        // block
                    if (returnCond === 1) {
                        return 1;
                    }
                    if (returnCond === 12) {
                        return 12;
                    }
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
                        console.log(section+', '+i+'에 '+p+'을 채울예정');
                        addNumber([p, section, i]);
                        if (count === 0) {
                            return 1;       // 종료조건. 임의로 지정함
                        }
                        returnCond = recursiveFilling(section);      // row(itself)
                        if (returnCond === 1) {
                            return 1;
                        }
                        if (returnCond === 12) {
                            return 12;
                        }
                        returnCond = recursiveFilling(i + 9);        // column
                        if (returnCond === 1) {
                            return 1;
                        }
                        if (returnCond === 12) {
                            return 12;
                        }
                        returnCond = recursiveFilling(3*Math.floor(section/3)+Math.floor(i/3)+18);        // block  
                        if (returnCond === 1) {
                            return 1;
                        }
                        if (returnCond === 12) {
                            return 12;
                        }
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
                if (k === 1) {
                    console.log('모순입니다');
                    return 12;
                }
                if ( ( (k >> 1) & ((k >> 1) - 1) ) === 0) {                         // k = 0000010001 이런 형식
                    console.log(i+', '+col+'에 '+(k-1)+'을 채울예정'+' singleN');
                    addNumber([k - 1, i, col]);
                    if (count === 0) {
                        return 1;       // 종료조건. 임의로 지정함
                    }
                    returnCond = recursiveFilling(i);      // row
                    if (returnCond === 1) {
                        return 1;
                    }
                    if (returnCond === 12) {
                        return 12;
                    }
                    returnCond = recursiveFilling(col + 9);        // column(itself)
                    if (returnCond === 1) {
                        return 1;
                    }
                    if (returnCond === 12) {
                        return 12;
                    }
                    returnCond = recursiveFilling(3*Math.floor(i/3)+Math.floor(col/3)+18);        // block  
                    if (returnCond === 1) {
                        return 1;
                    }
                    if (returnCond === 12) {
                        return 12;
                    }
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
        // 디버깅
        console.log('result = '+result);
        if (result == 185) {
            console.log(sudokuMatrix);
        }
        // 디버깅
        if (result !== 0) {
            for (let i = 0; i < 9; i++) {
                x = sudokuMatrix[i][col];
                console.log('x' + x);
                if ( (x & 1) !== 0) {
                    p = x & result;
                    if (p !==0) {
                        console.log(i+', '+col+'에 '+p+'을 채울예정' +' singleB');
                        addNumber([p, i, col]);
                        if (count === 0) {
                            return 1;       // 종료조건. 임의로 지정함
                        }
                        returnCond = recursiveFilling(i);      // row(itself)
                        if (returnCond === 1) {
                            return 1;
                        }
                        if (returnCond === 12) {
                            return 12;
                        }
                        returnCond = recursiveFilling(col + 9);        // column
                        if (returnCond === 1) {
                            return 1;
                        }
                        if (returnCond === 12) {
                            return 12;
                        }
                        returnCond = recursiveFilling(3*Math.floor(i/3)+Math.floor(col/3)+18);        // block  
                        if (returnCond === 1) {
                            return 1;
                        }
                        if (returnCond === 12) {
                            return 12;
                        }
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
                    if (k === 1) {
                        console.log('모순입니다');
                        return 12;
                    }
                    if ( ( (k >> 1) & ((k >> 1) - 1) ) === 0) {                         // k = 0000010001 이런 형식
                        console.log(i+', '+j+'에 '+(k-1)+'을 채울예정');
                        addNumber([k - 1, i, j]);
                        if (count === 0) {
                            return 1;       // 종료조건. 임의로 지정함
                        }
                        returnCond = recursiveFilling(i);      // row
                        if (returnCond === 1) {
                            return 1;
                        }
                        if (returnCond === 12) {
                            return 12;
                        }
                        returnCond = recursiveFilling(j + 9);        // column(itself)
                        if (returnCond === 1) {
                            return 1;
                        }
                        if (returnCond === 12) {
                            return 12;
                        }
                        returnCond = recursiveFilling(3*Math.floor(i/3)+Math.floor(j/3)+18);        // block  
                        if (returnCond === 1) {
                            return 1;
                        }
                        if (returnCond === 12) {
                            return 12;
                        }
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
                            console.log(i+', '+j+'에 '+p+'을 채울예정');
                            addNumber([p, i, j]);
                            if (count === 0) {
                                return 1;       // 종료조건. 임의로 지정함
                            }
                            returnCond = recursiveFilling(i);      // row(itself)
                            if (returnCond === 1) {
                                return 1;
                            }
                            if (returnCond === 12) {
                                return 12;
                            }
                            returnCond = recursiveFilling(j + 9);        // column
                            if (returnCond === 1) {
                                return 1;
                            }
                            if (returnCond === 12) {
                                return 12;
                            }
                            returnCond = recursiveFilling(3*Math.floor(i/3)+Math.floor(j/3)+18);        // block  
                            if (returnCond === 1) {
                                return 1;
                            }
                            if (returnCond === 12) {
                                return 12;
                            }
                        }
                    }
                }
            }
        }
        console.log('sectoin '+section+' done');
    }
    return;     // 완성되지도, 모순이 있지도 않음. 제대로 채워짐.
}


/* function solvingSimple
그냥 모든 section에 대해 recursiveFilling을 한 번만 실행하면 됨.
recursiveFilling을 실행하는 순간 '변동이 있는' seciton은 모두 처리가 되기 때문에.
수학적으로(?) 설명하자면, section을 재조사 하는 경우, 변동이 있다면 처리가 되었으므로 조사할 필요가 없고, 변동이 없다면 이전 조사에서 처리가 끝났으므로 조사할 필요가 없다.
*/

function solvingSimple() {
    let returnCond;
    for (let i = 0; i < 27; i++) {
        returnCond = recursiveFilling(i);
        if (returnCond === 1) {
            return 1;
        }
        if (returnCond === 12) {
            return 12;
        }
    }
}








/*
solvingSimple()
find min blank
get candidates
for candidates
    solv(can1)
    */

/*
func solv(can1)
addNumber(can1) & store
recursiveFilling() & check & store
if 모순
    addNumber & recursiveFilling() 복구
    return 모순
if 종료
    return 종료
find min blank
get candidates
for candidates
    solv(can1)
    if 종료
        return 종료                 -> 자식부터 부모까지 차례로 모두 종료됨.
addNumber & recursiveFilling() 복구     -> 모든 후보가 불가능이므로 모순
return 모순
*/

function restore(curStorage) {
    let n;
    let x;
    let y;
    for (let i = 1; i < 10; i++) {      // 1부터 9까지
        n = 1 << i;
        for (let j = 0; j < curStorage[i].length; j++) {
            x = curStorage[i][j][0];
            y = curStorage[i][j][1];
            sudokuMatrix[x][y] = sudokuMatrix[x][y] | n;
        }
    }
}

function findMinBlank() {
    let minNum = 9;
    let minLocation;
    let mincandidates = [];
    let k;
    let num;
    let candidates;

    for( let i = 0; i < 9; i++) {
        for ( let j = 0; j < 9; j++) {
            k = sudokuMatrix[i][j];
            if ( (k & 1) !== 0) {    // 채워지지 않음.
                num = 0;
                candidates = [];
                for (let h = 1; h < 10; h++) {      // 후보군 개수 count
                    if ( (k & (1 << h)) !== 0) {
                        num++;
                        candidates.push(1 << h);
                    }
                }
                if (num < minNum) {
                    minNum = num;
                    minLocation = [i,j];
                    mincandidates = candidates;
                }
            }
        }
    }
    return [mincandidates, minLocation[0], minLocation[1]];            // [[2,4,128],i,j] 형식
}




// let storageSet = [];       // 형식 [x,x,x,x,x,x,x,x,x], index: 숫자, x: 위치. x 형식 [[i0,j0],[i1,j1], ...]*/        노필요

function solving(can1) {            // can1은 [n,i,j] 형식
    let sections;
    let returnCond;
    let candidates;
    let storage;

    sections = locToSec(can1[1],can1[2]);
    storage = addNumber(can1);        // addNumber & store in storage    
    // recursiveFilling & store in storage
    returnCond = recursiveFilling(sections[0]);
    if (returnCond === 1) {     // 완료
        console.log('완성!');
        return 1;
    }
    if (returnCond === 12) {    // 모순
        // 복구
        restore(storage);        
        return 12;
    }
    returnCond = recursiveFilling(sections[1]);
    if (returnCond === 1) {     // 완료
        console.log('완성!');
        return 1;
    }
    if (returnCond === 12) {    // 모순
        restore(storage);        
        return 12;
    }
    returnCond = recursiveFilling(sections[2]);
    if (returnCond === 1) {     // 완료
        console.log('완성!');
        return 1;
    }
    if (returnCond === 12) {    // 모순
        restore(storage);
        return 12;
    }
    // 통과했다면 완료도, 모순도 아직은 아닌 상태. 계속 진행.
    // find min blank;
    candidates = findMinBlank();

    for (let i = 0; i < candidates[0].length; i++) {// [[2,4,128],i,j] 형식
        returnCond = solving([candidates[0][i], candidates[1], candidates[2]]);
        if (returnCond === 1) {
            return 1;
        }        
    }    

    // 모든 후보가 불가능 -> 모순
    restore(storage);
    return 12;
}

// 모순 조건: 안 채웠는데 채울 게 없을 때 ex) 0000000001

function locToSec(i,j) {
    return [i, j + 9, 3 * Math.floor(i/3) + Math.floor(j/3)+18]
}





function theEnd() {
    let returnCond;
    let candidates;

    returnCond = solvingSimple();
    console.log(returnCond);
    if (returnCond === 1) {
        console.log('완성!');
        return 1;
    }
    if (returnCond === 12) {
        console.log('문제오류');
        return 12;
    }

    console.log('solvingSimple로 안풀림. 경우의 수 on');
    candidates = findMinBlank();

    for (let i = 0; i < candidates[0].length; i++) {// [[2,4,128],i,j] 형식
        returnCond = solving([candidates[0][i], candidates[1], candidates[2]]);
        if (returnCond === 1) {
            return 1;
        }        
    }    

    console.log('문제 오류');    
}

/*
solvingSimple()
find min blank
get candidates
for candidates
    solv(can1)
    */











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
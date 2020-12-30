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
for (i = 0; i < 9; i++) {
    sudokuMatrix.push([]);
    for (j = 0; j < 9; j++) {
        sudokuMatrix[i].push(2047);
    }
}








/*
빈 칸 위치(i,j), 채울 숫자(bit 형식)를 받는다.
빈 칸을 포함하는 section을 계산한다.
해당 section의 빈 칸에 대해 채우기 연산을 한다.
*/





// input number(problem number)가 존재하는 칸의 경우, 숫자를 bit 형식으로 변환하고, 포함 sectino에 대해 후보 제거 연산.
function getInput() {
    console.log('got input');
    inputs = document.querySelectorAll('.number');
    let num;
    for (i = 0; i < 9; i++) {
        sudokuMatrix.push([]);
        for (j = 0; j < 9; j++) {
            num = Number(inputs[i*9+j].value);
            
            sudokuMatrix[i][j] = Number(inputs[i*9+j].value);     // input value의 index에 대응하는 matrix location으로 숫자 입력. 빈칸은 0가 됨.
        }
    }
}

/* 고민1. loop 안에서 변수를 정의하고 초기화하는 것이 메모리나 시간 효율을 떨어트리지 않을까?
-> loop 밖에서 정의하고 loop내에서 초기화 하는 것이 더 좋을 것 같긴 한데 실제로 차이가 있을까?
삭제자? 생성자? 때문에 차이는 있지만 효율의 차이는 신경 안써도 될 듯.
다만 variable의 scope가 달라지기에 이는 신경써야 함 */











/* recursive filling
한 section을 입력하면, 해당 section에서 single N, single B를 통해 채울 수 있는 요소를 찾고,
해당하는 요소가 포함된 section에 대해 같은 연산을 재귀적으로 실행.
종료 조건은 그냥 채울 수 있는 요소가 없을 경우.*/

/*
functino recursiveFilling(section1)
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
k&(k-1)을 하면 자리가 하나일 경우 0이 나온다.

해당 빈 칸의 숫자를 k
if k & 1 > 0
    if k&(k-1) > 0
        채울 수 있음!
*/



function recursiveFilling(section) {
    let k;
    // 먼저 section 종류 구분
    if (section < 9) {    // row
        //single N
        for (i = 0; i < 9; i++) {
            k = sudokuMatrix[section][i];
            if (k & 1 > 0) {    // 채워지지 않음.
                if (k&(k-1) > 0) {
                    recursiveFilling(section);      // row(itself)
                    recursiveFilling(i + 9);        // column
                    recursiveFilling();             
                }
            }
        }
    }
    else if (section < 18) {    // column
        for (i = 0; i < 9; i ++) {
            // single N...  sudokuMatrix[i][section%27]
        }
    }
    else {      // block

    }

}

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

그래서 되는 고민2. 스도쿠 행렬 대신 section별 data를 따로둘까?
두자 data는 커지겠지만 연산 효율은 높아질 수 있다.
특히 section별 처리도 쉬워지고 나중에 section간의 우선순위도 둘 수 있다고 생각.
*/

/*  필요없음. 
let sudokuMatrix = [];
// sudokuMatrix를 1111111111([1,2,3,4,5,6,7,8,9] 그리고 채우기 전이다)로 설정. 1111111111=2^11-1=2047
for (i = 0; i < 9; i++) {
    sudokuMatrix.push([]);
    for (j = 0; j < 9; j++) {
        sudokuMatrix[i].push(2047);
    }
}
*/


/* section data 형식을 어떻게 할 것인가?
역시 연산 속도에 얼마만큼의 중점을 두느냐에 따라 다름.
후보군, 위치 [sec0 sec1 ... sec 26]
후보군 sec n = [11011, 11001 ...] (빈칸 수)
위치 sec n = [[1,2], [2,3] ...] (빈칸 수)
후보군, 위치 같은 index





/*
빈 칸 위치(i,j), 채울 숫자(bit 형식)를 받는다.
빈 칸을 포함하는 section을 계산한다.
해당 section의 빈 칸에 대해 채우기 연산을 한다.
*/


function remove


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
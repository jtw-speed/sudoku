// flow chart 기반으로 다시.

// get html tag information.
let setProblem = document.querySelector('.setProblem');
let solveProblem = document.querySelector('.solveProblem');
let solutionDisplay = document.querySelector('.solution');

let inputs = [];    // numbers in initial problem.
let firstDecided = [];  // cell decided from initial problem.



// initialize candidatesMatrix
let candidatesMatrix = [];
for (i = 0; i < 9; i ++) {
    candidatesMatrix[i] = [];
    for (j = 0; j < 9; j ++) {
        candidatesMatrix[i][j] = [1,2,3,4,5,6,7,8,9];
    }
}

// input data(problem data)를 가져옴. 해당 정보를 candidatesMatrix에 저장. 초기 확정자 set에 저장
function getInput() {
    console.log('1');
    inputs = document.querySelectorAll('.number');
    for (i = 0; i < 9; i++) {
        for (j = 0; j < 9; j++) {
            if (Number(inputs[i*9+j].value) !== 0) {
                candidatesMatrix[i][j] = [Number(inputs[i*9+j].value)]; //그냥 완성된 칸도 array로 둠. 그래야 code가 일관된 느낌. case처리도 간편.
                firstDecided.push([Number(inputs[i*9+j].value),i,j]);
            }
        }
    }
}

// 초기 확정자 set에 대한 지우기 & check
function firstRemoveCheck(iniDecided) {
    for ()
}


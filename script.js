// algorithm first, code later...
// flow chart 기반으로


// get html tag information.
let setProblem = document.querySelector('.setProblem');
let solveProblem = document.querySelector('.solveProblem');
let solutionDisplay = document.querySelector('.solution');

// section의 구분은 data array의 index로.
// [0]-[8]: row, [9]-[17]: colomn, [18]-[26]: box.
// box의 경우 좌상단에서부터 우측으로.

// data array
let blankNumbers = [];
let candidates = [];
let blankLocations = [];
let blankCounter;    // 전체 matrix의 빈칸 수. 0이 되면 종료.

// sudoku matrix
let sudokuMatrix = [];



// input data(problem data)를 가져옴. 해당 정보를 matrix에 저장.
function getInput() {
    console.log('got input');
    inputs = document.querySelectorAll('.number');
    for (i = 0; i < 9; i++) {
        sudokuMatrix[i] = [];
        for (j = 0; j < 9; j++) {
            sudokuMatrix[i][j] = Number(inputs[i*9+j].value);     // input value의 index에 대응하는 matrix location으로 숫자 입력. 빈칸은 0가 됨.
        }
    }
}


// 1. section별 빈칸 수, 후보군, 빈칸 위치 저장.
function initilizeData() {
    // temporary memory
    let sectionBlankNumber;
    let sectionCandidates;
    let sectionLocations;
    let spliceIndex;
    // row sections
    for (i = 0; i < 9; i++) {
        // initilize before each section process
        sectionBlankNumber = 0;
        sectionCandidates = [1,2,3,4,5,6,7,8,9];
        sectionLocations = [];
        // i th row section
        for (j = 0; j < 9; j++) {
            if (sudokuMatrix[i][j] === 0) { // 빈칸일 경우
                sectionLocations.push([i,j]);
                sectionBlankNumber++;
            }
            else {  // 차있을 경우
                spliceIndex = sectionCandidates.indexOf(sudokuMatrix[i][j]);
                sectionCandidates.splice(spliceIndex, 1);
            }
        }
        // 임시 메모리 데이터를 본 메모리에 저장
        blankNumbers.push(sectionBlankNumber);
        candidates.push(sectionCandidates);
        blankLocations.push(sectionLocations);
    }
    // column sections
    for (j = 0; j < 9; j++) {
        sectionBlankNumber = 0;
        sectionCandidates = [1,2,3,4,5,6,7,8,9];
        sectionLocations = [];
        // i th row section
        for (i = 0; i < 9; i++) {
            if (sudokuMatrix[i][j] === 0) { // 빈칸일 경우
                sectionLocations.push([i,j]);
                sectionBlankNumber++;
            }
            else {  // 차있을 경우
                spliceIndex = sectionCandidates.indexOf(sudokuMatrix[i][j]);
                sectionCandidates.splice(spliceIndex, 1);
            }
        }
        // 임시 메모리 데이터를 본 메모리에 저장
        blankNumbers.push(sectionBlankNumber);
        candidates.push(sectionCandidates);
        blankLocations.push(sectionLocations);
    }
    // block sections
    let startI;
    let startJ;
    for (blockIndex = 0; blockIndex < 8; blockIndex++) {
        // block index th block
        sectionBlankNumber = 0;
        sectionCandidates = [1,2,3,4,5,6,7,8,9];
        sectionLocations = [];
        startI = Math.floor(blockIndex/3)*3; // block i좌표 시작 index
        startJ = (blockIndex%3)*3;   // block j좌표 시작 index
        for (i = startI; i < startI + 3; i++) {
            for (j = startJ; j < startJ + 3; j++) {
                if (sudokuMatrix[i][j] === 0) { // 빈칸일 경우
                    sectionLocations.push([i,j]);
                    sectionBlankNumber++;
                }
                else {  // 차있을 경우
                    spliceIndex = sectionCandidates.indexOf(sudokuMatrix[i][j]);
                    sectionCandidates.splice(spliceIndex, 1);
                }
            }
        }
        blankNumbers.push(sectionBlankNumber);
        candidates.push(sectionCandidates);
        blankLocations.push(sectionLocations);
    }
}














setProblem.addEventListener('click', getInput); // 이게 계속 안됐는데 html에서 form을 지우니 해결. 모르는 것은 사용 ㄴ.
solveProblem.addEventListener('click', initilizeData);

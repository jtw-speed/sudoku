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
let blankCounter = 0;    // 전체 matrix의 채워진 수. 0이 되면 종료.

// sudoku matrix
let sudokuMatrix = [];

// sample data
let sample =[[0, 0, 4, 1, 0, 3, 0, 0, 7], [3, 0, 0, 0, 0, 2, 9, 0, 0], [0, 5, 0, 6, 0, 0, 0, 0, 0], [6, 3, 0, 0, 2, 5, 0, 0, 9], [1, 0, 2, 7, 4, 9, 5, 0, 6], [5, 0, 0, 3, 1, 0, 0, 7, 2], [0, 0, 0, 0, 0, 1, 0, 5, 0], [0, 0, 6, 5, 0, 0, 0, 0, 1], [2, 0, 0, 9, 0, 7, 3, 0, 0]];



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
                blankCounter++;                     // 한 section에만 있으면 됨. 아니면 중복 처리되어 3배로 빠짐.
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

/*
let currentSection;                 필요 없을듯.. return으로 index값만 받아와 처리 가능.
let currentCandidates;
let currentLocations;
*/

function getLeastBlankData() {
    let a = [];                              // 하....... 비효율.
    for (i = 1; i < 10; i++) {                  // 1~9이므로 i < 10
        for (j = 0; j < 26; j++) {
            if (blankNumbers[j] === i) {
                a.push(j);
            }
        }
    }
    return a;
}

function locationToSection([i, j]) {     // location array가 속한 section을 찾아주는 function
    return [i, 9+j, 18+3*Math.floor(i/3)+Math.floor(j/3)];
}

function matchLocation(sectionLocations, location) {      // section의 location data 중 일치하는 index 반환
    for (i = 0; i < sectionLocations.length; i++) {
        if (sectionLocations[i][0] === location[0] && sectionLocations[i][1] === location[1]) {
            return i;
        }
    }
}

function fillUpdate(n, [i, j]) {
    /* 채우는 숫자 n, 해당 좌표 (i, j)를 입력. 포함 section의 blankNumbers, candidates, blankLocations를 update하고, counter--
    */
   let sections;    // [포함 row section, 포함 column section, 포함 block section]
   let newBlankNumber;
   let spliceIndex;
   
   sudokuMatrix[i][j] = n;
   blankCounter--;

   sections = locationToSection([i,j]);
   for (k = 0; k < sections.length; k++) {
       // 빈칸 수 update
       blankNumbers[k] = blankNumbers[k] - 1;
       // 후보군 update
       spliceIndex = candidates[k].indexOf(n);
       candidates[k].splice(spliceIndex, 1);
       // 위치 update
       spliceIndex = matchLocation(blankLocations[k], [i, j]);
       blankLocations[k].splice(spliceIndex, 1);
   }

}


function solving() {
    console.log('start');
    initilizeData();
    let sectionIndex;
    let sectionBlankNumber;
    let sectionCandidates;
    let sectionLocations;

    let currentCandidate;
    let currentLocation;
    
    let fillingCheck;   // 기준 section의 기준 후보에서 각 빈칸 중 채울 수 있는 칸의 개수. 1이면 바로 채움. 그냥 fillinglocation 요소의 합보다 간편.
    let fillingInfo;    // 기준 section의 기준 후보에서 각 빈칸에 채울 수 있으면 1, 없으면 0 저장. 차후 채울 때 이를 기준으로 채움.

    let containerSectionIndex;   // 빈 칸 포함하는 section index.
    let compareArray;

    let x;
    let index;

    while(blankCounter > 0) {
        console.log('while');
        sectionIndex = getLeastBlankData()[0];      // 최저 빈칸 section index(기준 section)
        // 현재 기준 section에 대해
        sectionBlankNumber = blankNumbers[sectionIndex];
        sectionCandidates = candidates[sectionIndex];
        sectionLocations = blankLocations[sectionIndex];

        if (sectionBlankNumber == 1) {   // section에 빈 칸이 하나일 때
            // 채우기, data update, 빈칸 counter --
            fillUpdate(sectionCandidates[0], sectionLocations[0])
        }
        else {  // section에 빈 칸이 하나 이상일 때. 0인 경우는 getLeastBlankData에서 취급하지 않기에 걸러짐.
            for (i = 0; i < sectionBlankNumber; i++) {   // 각각의 후보에 대해
                currentCandidate = sectionCandidates[i];
                fillingInfo = [];
                fillingCheck = 0;
                for (j = 0; j < sectionBlankNumber; j++){    // 각각의 빈칸에 대해
                    currentLocation = sectionLocations[j];
                    containerSectionIndex = locationToSection(currentLocation);
                    // 빈 칸 포함 section 3개 중 기준 section 제외
                    containerSectionIndex.splice(containerSectionIndex.indexOf(sectionIndex));
                    // 빈칸 포함하는 section의 후보군을 합침. 기존 후보가 이 array에 2개 있으면 들어갈 수 있고, 하나라도 없으면 못 들어감.
                    compareArray = candidates[containerSectionIndex[0]].concat(candidates[containerSectionIndex[1]]);
                    for (i = 0; i < compareArray.length; i++) {
                        x = 0;
                        if (currentCandidate === compareArray[i]) {
                            x++;
                        }
                    }
                    if (x === 2) {      // 해당 빈칸에 해당 후보를 채울 수 있다.
                        fillingInfo.push(1);
                        fillingCheck++;
                    }
                    else {
                        fillingInfo.push(0);
                    }
                }
                // 들어갈 수 있는 빈 칸이 하나라면 채운다
                if (fillingCheck === 1) {
                    // 채우고 업데이트
                    index = fillingInfo.indexOf(1);
                    fillUpdate(currentCandidate, sectionLocations[index]);
                    break;
                }
                else {  // 기준 section에서 채워지지 않을 때... 이게 문제.

                }

            }

        }
    }
}








setProblem.addEventListener('click', getInput); // 이게 계속 안됐는데 html에서 form을 지우니 해결. 모르는 것은 사용 ㄴ.
// solveProblem.addEventListener('click', solving);

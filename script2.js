// flow chart 기반으로 다시.

// get html tag information.
let setProblem = document.querySelector('.setProblem');
let solveProblem = document.querySelector('.solveProblem');
let solutionDisplay = document.querySelector('.solution');

let inputs = [];    // numbers in initial problem.
let firstDecided = [];  // cell decided from initial problem.
let decided = [];   // 각 stage 마다 처리해야 할 확장자
let newDecided = [];   // 연산마다 추가되는 확장자

let contrad = 0;    // 1이 되면 모순



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


function cellRemover() {

}


// 3. 각 확장자에 대한 지우기 & check. 비교 대상 cell set을 형성할까 했는데(그것도 꽤 ㄱㅊ) 그냥 바로 case 구분으로 하기로 함.
function decidedRemover(singleDecided) {    // 입력 형식 [n,i,j]
    let n = singleDecided[0];
    let i = singleDecided[1];
    let j = singleDecided[2];

    // column
    for (k=0; k<9; k++) {
        // 자기 자신을 지워선 안됨.
        if (k !== j){
            cellRemover(n, i, k);
        }
    }
    // row
    for (k=0; k<9; k++) {
        if (k !== i) {
            cellRemover(n, k, j);
        }
    }
    // diag 1
    if (i === j) {
        for (k=0; k<9; k++) {
            if (k !== i) {
                cellRemover(n, k, k);
            }
        }
    }
    // diag 2
    if (i+j === 8) {
        for (k=0; k<9; k++) {
            if (k != i) {
                cellRemover(n, k, 8-k);
            }
        }
    }
    // square
    if (i<3) {
        if (j<3) {
            for (k=0; k<3; k++) {
                for (l=0; l<3; l++) {
                    if (k != i || l != j) {
                        cellRemover(n, k, l);         
                    }
                }
            }        
        } else if(j<6) {
            for (k=0; k<3; k++) {
                for (l=3; l<6; l++) {
                    if (k != i || l != j) {
                        cellRemover(n, k, l);         
                    }
                }
            }
        } else {
            for (k=0; k<3; k++) {
                for (l=6; l<9; l++) {
                    if (k != i || l != j) {
                        cellRemover(n, k, l);         
                    }
                }
            }
        }
    } else if(i<6) {
        if (j<3) {
            for (k=3; k<6; k++) {
                for (l=0; l<3; l++) {
                    if (k != i || l != j) {
                        cellRemover(n, k, l);  
                    }
                }
            }      
        } else if(j<6) {
            for (k=3; k<6; k++) {
                for (l=3; l<6; l++) {
                    if (k != i || l != j) {
                        cellRemover(n, k, l);  
                    }
                }
            }     
        } else {
            for (k=3; k<6; k++) {
                for (l=6; l<9; l++) {
                    if (k != i || l != j) {
                        cellRemover(n, k, l);  
                    }
                }
            }     
        }
    } else {
        if (j<3) {
            for (k=6; k<9; k++) {
                for (l=0; l<3; l++) {
                    if (k != i || l != j) {
                        cellRemover(n, k, l);  
                    }
                }
            }     
        } else if(j<6) {
            for (k=6; k<9; k++) {
                for (l=3; l<6; l++) {
                    if (k != i || l != j) {
                        cellRemover(n, k, l);  
                    }
                }
            }     
        } else {
            for (k=6; k<9; k++) {
                for (l=6; l<9; l++) {
                    if (k != i || l != j) {
                        cellRemover(n, k, l);  
                    }
                }
            }     
        }
    }
}

// 2. 하나의 확정자 set에 대한 지우기 & check. 이 확정자 set에 포함된 각각의 확정자에 대해 지우고 check.
function singleSetRemover (decidedSet) {
    for (i = 1; i < decidedSet.length; i++) {
        decidedRemover(decidedSet[i]);
        if (contrad) {
            return;
        }
    }
}


// 1. 초기 확정자 set에 대한 지우기 & check. 하나의 확정 set이 입력되면 이후로 생성되는 모든 확정 set에 대해 지우고 check.
function setRemoverFirst(decidedSet) {
    decided = decidedSet;
    while (decided.length > 0) {
        singleSetRemover(decided);
        if (contrad) {
            return;
        } else {
            decided = newDecided;
            newDecided = [];    // 추가 확장자 정보를 저장할 때, push할 예정이므로 비워둠.
        }
    }
    decided = [];
    newDecided = [];    // 초기화
}


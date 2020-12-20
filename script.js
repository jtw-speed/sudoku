let setProblem = document.querySelector('.setProblem'); // 이게 계속 실행이 안됐는데 html <script>에 defer을 넣으니 해결. 아마 html 로딩 전 js가 실행되어 error가 난듯.
let solveProblem = document.querySelector('.solveProblem');

let inputs = [];    // numbers in problem.
let newdecided = [];
let newdecided2 = [];

let count = 0;


// initialize candidatesMatrix
let candidatesMatrix = [];
for (i = 0; i < 9; i ++) {
    candidatesMatrix[i] = [];
    for (j = 0; j < 9; j ++) {
        candidatesMatrix[i][j] = [1,2,3,4,5,6,7,8,9];
    }
}

// input data(problem data)를 가져와 존재하는 경우 candidatesMatrix에 저장.
function getInput() {
    console.log('1');
    inputs = document.querySelectorAll('.number');
    for (i = 0; i < 9; i++) {
        for (j = 0; j < 9; j++) {
            if (Number(inputs[i*9+j].value) !== 0) {
                candidatesMatrix[i][j] = Number(inputs[i*9+j].value);
                newdecided.push([Number(inputs[i*9+j].value),i,j]);
            }
        }
    }
}

// 각 칸에서 겹치는 숫자 제거. n이 숫자, a는 candidate matrix의 array.
function pickOut(n, i, j) {
    let check = candidatesMatrix[i][j].indexOf(n);
    if (candidatesMatrix[i][j].length === 1) {
        if (n === candidatesMatrix[i][j][0]) {
            // 뽑았는데 array가 비었다면 모순. 일단 임시로 return함.
            return 0;
        }
    }
    else if (check !== -1) { // n이 a에 존재한다면
        candidatesMatrix[i][j] = candidatesMatrix[i][j].splice(check,1);
            // 종료조건?      
    }
}




// 사각형, 수직선, 수평선, 대각선 모든 칸에 대해 겹치는 숫자 제거. i,j에서 숫자가 하나고 그 숫자가 n일 때
function remover(n,i,j) {
    // row
    for (k=0; k<9; k++) {
        // 자기 자신을 지워선 안됨.
        if (k !== j){
            pickOut(n, i, k);
        }
    }
    // column
    for (k=0; k<9; k++) {
        if (k !== i) {
            pickOut(n, k, j);
        }
    }
    // diag 1
    if (i === j) {
        for (k=0; k<9; k++) {
            if (k !== i) {
                pickOut(n, k, k);
            }
        }
    }
    // diag 2
    if (i+j === 8) {
        for (k=0; k<9; k++) {
            if (k != i) {
                pickOut(n, k, 8-k);
            }
        }
    }
    // square
    if (i<3) {
        if (j<3) {
            for (k=0; k<3; k++) {
                for (l=0; l<3; l++) {
                    if (k != i || l != j) {
                        pickOut(n, k, l);         
                    }
                }
            }        
        } else if(j<6) {
            for (k=0; k<3; k++) {
                for (l=3; l<6; l++) {
                    if (k != i || l != j) {
                        pickOut(n, k, l);         
                    }
                }
            }
        } else {
            for (k=0; k<3; k++) {
                for (l=6; l<9; l++) {
                    if (k != i || l != j) {
                        pickOut(n, k, l);         
                    }
                }
            }
        }
    } else if(i<6) {
        if (j<3) {
            for (k=3; k<6; k++) {
                for (l=0; l<3; l++) {
                    if (k != i || l != j) {
                        pickOut(n, k, l);  
                    }
                }
            }      
        } else if(j<6) {
            for (k=3; k<6; k++) {
                for (l=3; l<6; l++) {
                    if (k != i || l != j) {
                        pickOut(n, k, l);  
                    }
                }
            }     
        } else {
            for (k=3; k<6; k++) {
                for (l=6; l<9; l++) {
                    if (k != i || l != j) {
                        pickOut(n, k, l);  
                    }
                }
            }     
        }
    } else {
        if (j<3) {
            for (k=6; k<9; k++) {
                for (l=0; l<3; l++) {
                    if (k != i || l != j) {
                        pickOut(n, k, l);  
                    }
                }
            }     
        } else if(j<6) {
            for (k=6; k<9; k++) {
                for (l=3; l<6; l++) {
                    if (k != i || l != j) {
                        pickOut(n, k, l);  
                    }
                }
            }     
        } else {
            for (k=6; k<9; k++) {
                for (l=6; l<9; l++) {
                    if (k != i || l != j) {
                        pickOut(n, k, l);  
                    }
                }
            }     
        }
    }
}


function solving() {
    for (i=0; i<newdecided.length; i++) {
        remover(newdecided[i][0], newdecided[i][1], newdecided[i][1]);
    }
    newdecided = newdecided2;
}



setProblem.addEventListener('click', getInput); // 이게 계속 안됐는데 html에서 form을 지우니 해결. 모르는 것은 사용 ㄴ.
solveProblem.addEventListener('click', solving);






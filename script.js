let setProblem = document.querySelector('.setProblem'); // 이게 계속 실행이 안됐는데 html <script>에 defer을 넣으니 해결. 아마 html 로딩 전 js가 실행되어 error가 난듯.
let solveProblem = document.querySelector('.solveProblem');
let solutionDisplay = document.querySelector('.solution');

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
                candidatesMatrix[i][j] = [Number(inputs[i*9+j].value)]; //그냥 완성된 칸도 array로 둠. 그래야 code가 일관된 느낌. case처리도 간편.
                newdecided.push([Number(inputs[i*9+j].value),i,j]);
            }
        }
    }
}

// 각 칸에서 겹치는 숫자 제거. n이 숫자, a는 candidate matrix의 array.
// 여기서 node가 마무리됨. end case, 모순 case로. 경우의 수는 밖에서 처리.
function pickOut(n, i, j) {
    if (candidatesMatrix[i][j].includes(n)) {
        let index;
        if (candidatesMatrix[i][j].length === 1) {
            // 모순. 일단 return으로 둠.
        }
        else if (candidatesMatrix[i][j].length === 2) {
            // 지워 완성시키고, count +1
        }
        else {
            // 그냥 지우기. 경우의 수를 여기서 따서 저장한 후 비교해야 함.
            index = candidatesMatrix[i][j].indexOf(n);
            candidatesMatrix[i][j].splice(index, 1);
        }
    }
}

function firstPickOut(n, i, j) {
    if (candidatesMatrix[i][j].includes(n)) {
        if (candidatesMatrix[i][j].length === 1) {
            // 모순. 일단 return으로 둠.
        }
        else if (candidatesMatrix[i][j].length === 2) {
            // 지워 완성시키고, count +1
            index = candidatesMatrix[i][j].indexOf(n);
            candidatesMatrix[i][j].splice(index, 1);
            newdecided2.push([candidatesMatrix[i][j][0],i,j]);
        }
        else {
            // 그냥 지우기. 경우의 수를 여기서 따서 저장한 후 비교해야 함.
            let index = candidatesMatrix[i][j].indexOf(n);
            candidatesMatrix[i][j].splice(index, 1);
        }
    }
}





// 한 칸이 채워졌을 때(입력 받았을 때) 나머지 후보 지우는 function
// 사각형, 수직선, 수평선, 대각선 모든 칸에 대해
// (i,j)에서 n일 때
function removeCheck(n,i,j) {
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


function firstRemove(n,i,j) {
    // row
    for (k=0; k<9; k++) {
        // 자기 자신을 지워선 안됨.
        if (k !== j){
            firstPickOut(n, i, k);
        }
    }
    // column
    for (k=0; k<9; k++) {
        if (k !== i) {
            firstPickOut(n, k, j);
        }
    }
    // diag 1
    if (i === j) {
        for (k=0; k<9; k++) {
            if (k !== i) {
                firstPickOut(n, k, k);
            }
        }
    }
    // diag 2
    if (i+j === 8) {
        for (k=0; k<9; k++) {
            if (k != i) {
                firstPickOut(n, k, 8-k);
            }
        }
    }
    // square
    if (i<3) {
        if (j<3) {
            for (k=0; k<3; k++) {
                for (l=0; l<3; l++) {
                    if (k != i || l != j) {
                        firstPickOut(n, k, l);         
                    }
                }
            }        
        } else if(j<6) {
            for (k=0; k<3; k++) {
                for (l=3; l<6; l++) {
                    if (k != i || l != j) {
                        firstPickOut(n, k, l);         
                    }
                }
            }
        } else {
            for (k=0; k<3; k++) {
                for (l=6; l<9; l++) {
                    if (k != i || l != j) {
                        firstPickOut(n, k, l);         
                    }
                }
            }
        }
    } else if(i<6) {
        if (j<3) {
            for (k=3; k<6; k++) {
                for (l=0; l<3; l++) {
                    if (k != i || l != j) {
                        firstPickOut(n, k, l);  
                    }
                }
            }      
        } else if(j<6) {
            for (k=3; k<6; k++) {
                for (l=3; l<6; l++) {
                    if (k != i || l != j) {
                        firstPickOut(n, k, l);  
                    }
                }
            }     
        } else {
            for (k=3; k<6; k++) {
                for (l=6; l<9; l++) {
                    if (k != i || l != j) {
                        firstPickOut(n, k, l);  
                    }
                }
            }     
        }
    } else {
        if (j<3) {
            for (k=6; k<9; k++) {
                for (l=0; l<3; l++) {
                    if (k != i || l != j) {
                        firstPickOut(n, k, l);  
                    }
                }
            }     
        } else if(j<6) {
            for (k=6; k<9; k++) {
                for (l=3; l<6; l++) {
                    if (k != i || l != j) {
                        firstPickOut(n, k, l);  
                    }
                }
            }     
        } else {
            for (k=6; k<9; k++) {
                for (l=6; l<9; l++) {
                    if (k != i || l != j) {
                        firstPickOut(n, k, l);  
                    }
                }
            }     
        }
    }

}


function solving() {
    // 처음 입력값에 대해 제거 연산(비재귀적) 실행
    let number;
    let x;
    let y;
    /* for (i=0; i<newdecided.length; i++) {
        number = newdecided[i][0];
        x = newdecided[i][1];
        y = newdecided[i][2];
        firstRemove(number, x, y);
    } */
    while (newdecided.length > 0) {
        newdecided2 = []; //이렇게 해줘야 loop이 돌 때 마다 초기화 되고, for문 내에서 push될 때 새로운 것만 추가됨. (안했더니 무한 loop발생함)
        console.log(newdecided.length);
        for (i=0; i<newdecided.length; i++) {
            number = newdecided[i][0];
            x = newdecided[i][1];
            y = newdecided[i][2];
            firstRemove(number, x, y);
       }
        newdecided = newdecided2;
    }


    /* PERFECT! ㅋㅋ*/

    // 그 다음 나온 경우의 수에 따라

}


function displaySolution() {
    console.log('dis');
    let sol;
    for (i = 0; i < 9; i++) {
        for (j = 0; j < 9; j++) {
            sol = document.createElement('div');
            sol.textContent = candidatesMatrix[i][j][0];
            solutionDisplay.appendChild(sol);
        }
    }
}




setProblem.addEventListener('click', getInput); // 이게 계속 안됐는데 html에서 form을 지우니 해결. 모르는 것은 사용 ㄴ.
solveProblem.addEventListener('click', solving);
solveProblem.addEventListener('click', displaySolution);






// console에서 pickOut, removeCheck 작동 잘된는거 확인할 때..............
// firstRemove 레전드... 한번에 됐다. 진짜 이것만 돼도 



// 내 생각. solving에서 처음 입력값에 대한 제거 연산을 위해 비재귀적인 pickout function을 더 만들어 써야할 듯. 경우의 수가 아니라 확실히 없애는 작업이기 때문.
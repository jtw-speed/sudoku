let setProblem = document.querySelector('.setProblem'); // 이게 계속 실행이 안됐는데 html <script>에 defer을 넣으니 해결. 아마 html 로딩 전 js가 실행되어 error가 난듯.
let solveProblem = document.querySelector('.solveProblem');

let inputs = [];    // numbers in problem.
let decidedCmp = [];    // decided number. decidedCmp[n] = (Math.floor(n/9),n%9)


// initialize candidatesMatrix. (candidate matrix)
let candidatesMatrix = [];
for (i = 0; i < 9; i ++) {
    candidatesMatrix[i] = [];
    for (j = 0; j < 9; j ++) {
        candidatesMatrix[i][j] = [1,2,3,4,5,6,7,8,9];
    }
}

// input data(problem data)를 가져와 decided component array에 숫자로 저장.
// candidatesMatrix에도 저장.
function getInput() {
    console.log('1');
    inputs = document.querySelectorAll('.number');
    for (i = 0; i < 9; i++) {
        decidedCmp[i] = [];
        for (j = 0; j < 9; j++) {
            decidedCmp[i][j] = Number(inputs[i*9+j].value);
        }
    }
    for (i = 0; i < 9; i++) {
        for (j = 0; j < 9; j++) {
            if (decidedCmp[i][j] !== 0) {
                candidatesMatrix[i][j] = decidedCmp[i][j];
            }
        }
    }
}

function inspector() {

}



setProblem.addEventListener('click', getInput); // 이게 계속 안됐는데 html에서 form을 지우니 해결. 모르는 것은 사용 ㄴ.
//solveProblem.addEventListener('click', solving);






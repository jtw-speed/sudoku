let setProblem = document.querySelector('.setProblem'); // 이게 계속 실행이 안됐는데 html <script>에 defer을 넣으니 해결. 아마 html 로딩 전 js가 실행되어 error가 난듯.
let solveProblem = document.querySelector('.solveProblem');

let inputs = [];
let decidedCmp = [];

// initialise sudokuMatrix. (candidate matrix)
let sudokuMatrix = [];
for (i = 0; i < 9; i ++) {
    sudokuMatrix[i] = [];
    for (j = 0; j < 9; j ++) {
        sudokuMatrix[i][j] = [1,2,3,4,5,6,7,8,9];
    }
}

function getInput() {
    inputs = document.getElementsByTagName('input');
    for (i = 0; i < inputs.length; i++) {
        decidedCmp.push(Number(inputs[i].value));
    }
}








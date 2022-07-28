const displayBoard = document.querySelector('.displayBoard');
const displayLog = document.querySelector('.displayLog');
const sNum = document.querySelectorAll('.sNum');
const clearBtn = document.querySelector('.resetClear');

let calcStore = '';
let calcLog = '';

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, n1, n2) {
    switch (operator) {
        case '+':
            return add(n1, n2);
            break;
        case '-':
            return subtract(n1, n2);
            break;
        case '*':
            return multiply(n1, n2);
            break;
        case '/':
            return divide(n1, n2);
            break;
        // default:
    }
}

function clearScreen() {
    displayBoard.textContent = '0';
    displayLog.textContent = '0';
    calcStore = '';
    calcLog = '';
}

function addToScreen(e) {
    calcStore += e.target.textContent;
    displayBoard.textContent = calcStore;
    console.log(calcStore);
}

// const finder = operate('-', 12, 4);
// console.log(finder);


const sNumb = Array.from(sNum).forEach(btn => {
    btn.addEventListener('click', addToScreen);
});

clearBtn.addEventListener('click', clearScreen);
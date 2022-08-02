const displayBoard = document.querySelector('.displayBoard');
const displayLog = document.querySelector('.displayLog');
const sNum = document.querySelectorAll('.sNum');
const optBtn = document.querySelectorAll('.operaBtn');
const clearBtn = document.querySelector('.resetClear');
const deleteBtn = document.querySelector('.resetDelete');
const equalBtn = document.querySelector('.equal');


let calcStore = '';
let calcLog = '';
let operatorVal = null;
let firstOperand = '';
let isOperatorActive = false;
let secondOperand = '';


const add = (a, b) => (a * 1 + b * 1);
const subtract = (a, b) => (a - b);
const multiply = (a, b) => (a * b);
const divide = (a, b) => (a / b);

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
    firstOperand = '';
    secondOperand = '';
    isOperatorActive = false;
    operatorVal = null;
}

function addToScreen(e) {
    const eVal = this.textContent;
    if (isOperatorActive) {
        secondOperand += eVal;
        calcStore = +secondOperand
    } else {
        firstOperand += eVal;
        calcStore = +firstOperand;
    }
    displayBoard.textContent = calcStore;
}

function calculate() {
    const answerVal = operate(operatorVal, firstOperand, secondOperand);
    if (answerVal === undefined) {
        displayBoard.textContent = displayBoard.textContent / 1
    } else {
        displayBoard.textContent = answerVal;
    }
    if (displayBoard.textContent == 0) {
        firstOperand = ''
    } else {
        firstOperand = displayBoard.textContent;
    }
    secondOperand = '';
    isOperatorActive = false;
}

function addOperator(e) {
    isOperatorActive = true;
    operatorVal = e.target.textContent;
    firstOperand = displayBoard.textContent;
}

function deleteLast() {
    const dLast = displayBoard.textContent;
    if (dLast.length < 2) {
        clearScreen();
        calcStore = '0';
    } else {
        if (isOperatorActive) {
            secondOperand = secondOperand.slice(0, -1)
        } else {
            firstOperand = firstOperand.slice(0, -1);
        }
        calcStore = dLast.slice(0, -1);
    }
    displayBoard.textContent = calcStore;
}


equalBtn.addEventListener('click', calculate);
clearBtn.addEventListener('click', clearScreen);
deleteBtn.addEventListener('click', deleteLast);
sNum.forEach(btn => {
    btn.addEventListener('click', addToScreen);
});
optBtn.forEach(btn => {
    btn.addEventListener('click', addOperator)
});
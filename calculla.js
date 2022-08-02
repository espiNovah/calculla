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
let answerVal = null;
let firstOperand = '';
let isOperatorActive = false;
let secondOperand = '';
let lastOperatorVal = null;


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
    lastOperatorVal = null;
    answerVal = null;
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
    answerVal = operate(operatorVal, firstOperand, secondOperand);
    if (answerVal === undefined || secondOperand === '') {
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
    if (firstOperand !== '' && secondOperand !== '') {
        answerVal = operate(lastOperatorVal, firstOperand, secondOperand);
        displayBoard.textContent = answerVal;
        firstOperand = answerVal;
        secondOperand = ''
    } else {
        firstOperand = displayBoard.textContent;
    }
    operatorVal = e.target.textContent;
    lastOperatorVal = operatorVal;
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
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
let temp = null;


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
    temp = null
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
    if (displayBoard.textContent.length >= 9) {
        if (isOperatorActive) {
            temp = firstOperand.toString().slice(0, 9);
            calcStore = +eVal;
            firstOperand = displayBoard.textContent.slice(0, 9);
            if (secondOperand.length >= 9) {
                firstOperand = temp;
                calcStore = displayBoard.textContent.slice(0, 9);
                displayBoard.textContent = calcStore;
                isOperatorActive = false;
            }
            displayBoard.textContent = calcStore.toString().slice(0, 9);
            secondOperand = displayBoard.textContent;
        } else {
            calcStore = displayBoard.textContent.slice(0, 9);
        }
    } else {
        displayBoard.textContent = calcStore.toString().slice(0, 9);
    }
}

function calculate() {
    if (firstOperand.length >= 9) { firstOperand = temp };
    answerVal = roundNumber(operate(operatorVal, firstOperand, secondOperand));
    if (answerVal.toString().length >= 9) {
        answerVal = answerVal.toExponential(2);
    }
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
        if (firstOperand.length >= 9) { firstOperand = temp };
        answerVal = roundNumber(operate(lastOperatorVal, firstOperand, secondOperand));
        displayBoard.textContent = answerVal;
        firstOperand = answerVal;
        secondOperand = '';
    } else {
        firstOperand = displayBoard.textContent;
    }
    operatorVal = e.target.textContent;
    lastOperatorVal = operatorVal;
}

function deleteLast() {
    const dLast = displayBoard.textContent;
    if (dLast.length <= 1) {
        if (isOperatorActive) {
            secondOperand = '';
            calcStore = '0';
        } else {
            clearScreen();
            calcStore = '0';
        }
    } else {
        if (isOperatorActive) {
            secondOperand = secondOperand.slice(0, -1);
        } else {
            firstOperand = firstOperand.slice(0, -1);
        }
        calcStore = dLast.slice(0, -1);
    }
    displayBoard.textContent = calcStore;
}

function roundNumber(num) {
    return Math.round((num + Number.EPSILON) * 100) / 100;
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
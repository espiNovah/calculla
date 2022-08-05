const pointBtn = document.querySelector('.dNum');
const equalBtn = document.querySelector('.equal');
const numberBtn = document.querySelectorAll('.sNum');
const clearBtn = document.querySelector('.resetClear');
const deleteBtn = document.querySelector('.resetDelete');
const operatorBtn = document.querySelectorAll('.operaBtn');
const secondaryScreen = document.querySelector('.displayLog');
const primaryScreen = document.querySelector('.displayBoard');


let displayLog = '';
let displayValue = '';
let firstOperand = '';
let secondOperand = '';
let mathOperator = null;
let operationAnswer = null;
let lastMathOperator = null;
let operatorSelected = false;
let firstOperand_temp = null;
const ERROR_MESSAGE = '🤡'


const add = (a, b) => (+a + +b);
const divide = (a, b) => (a / b);
const subtract = (a, b) => (a - b);
const multiply = (a, b) => (a * b);

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
    }
}

function clearScreen() {
    displayValue = '';
    displayLog = '';
    firstOperand = '';
    secondOperand = '';
    mathOperator = null;
    operationAnswer = null;
    lastMathOperator = null;
    firstOperand_temp = null
    operatorSelected = false;
    primaryScreen.textContent = '0';
    secondaryScreen.textContent = '0';
}

function addToScreen(e) {
    const btnValue = this.textContent;
    if (primaryScreen.textContent === ERROR_MESSAGE) {
        clearScreen();
        primaryScreen.textContent = '0';
        return;
    }
    if (operatorSelected) {
        secondOperand += btnValue;
        displayValue = secondOperand
    } else {
        firstOperand += btnValue;
        displayValue = firstOperand;
    }
    if (primaryScreen.textContent.length >= 9) {
        if (operatorSelected) {
            firstOperand_temp = firstOperand.toString().slice(0, 9);
            displayValue = +btnValue;
            firstOperand = primaryScreen.textContent.slice(0, 9);
            if (secondOperand.length >= 9) {
                firstOperand = firstOperand_temp;
                displayValue = primaryScreen.textContent.slice(0, 9);
                primaryScreen.textContent = displayValue;
                operatorSelected = false;
            }
            primaryScreen.textContent = displayValue.toString().slice(0, 9);
            secondOperand = primaryScreen.textContent;
        } else {
            displayValue = primaryScreen.textContent.slice(0, 9);
        }
    } else {
        primaryScreen.textContent = displayValue.toString().slice(0, 9);
    }
}

function calculate() {
    if (mathOperator === '/' && primaryScreen.textContent === '0') {
        primaryScreen.textContent = ERROR_MESSAGE;
        firstOperand = '';
        return;
    }
    if (primaryScreen.textContent === ERROR_MESSAGE) {
        clearScreen();
        return
    }
    if (firstOperand.length >= 9) { firstOperand = firstOperand_temp };
    operationAnswer = roundNumber(operate(mathOperator, firstOperand, secondOperand));
    if (operationAnswer.toString().length >= 9) {
        operationAnswer = operationAnswer.toExponential(2);
    }
    if (operationAnswer === undefined || secondOperand === '') {
        primaryScreen.textContent = primaryScreen.textContent / 1
    } else {
        primaryScreen.textContent = operationAnswer;
    }
    if (primaryScreen.textContent == 0) {
        firstOperand = '';
    } else {
        firstOperand = primaryScreen.textContent;
    }
    secondOperand = '';
    operatorSelected = false;

}

function selectOperator(e) {
    operatorSelected = true;
    const ERROR_MESSAGE = 'OMG!'
    if (mathOperator === '/' && primaryScreen.textContent === '0') {
        primaryScreen.textContent = ERROR_MESSAGE;
        firstOperand = '';
        return;
    }
    if (primaryScreen.textContent === ERROR_MESSAGE) {
        clearScreen();
        return;
    }
    if (firstOperand !== '' && secondOperand !== '') {
        if (firstOperand.length >= 9) { firstOperand = firstOperand_temp };
        operationAnswer = roundNumber(operate(lastMathOperator, firstOperand, secondOperand));
        primaryScreen.textContent = operationAnswer;
        firstOperand = operationAnswer;
        secondOperand = '';
    } else {
        firstOperand = primaryScreen.textContent;
    }
    mathOperator = e.target.textContent;
    lastMathOperator = mathOperator;
}

function sliceLast() {
    if (primaryScreen.textContent === ERROR_MESSAGE) {
        clearScreen();
        return;
    };
    if (primaryScreen.textContent.length <= 1) {
        if (operatorSelected) {
            secondOperand = '';
            displayValue = '0';
        } else {
            clearScreen();
            displayValue = '0';
        }
    } else {
        if (operatorSelected) {
            secondOperand = secondOperand.slice(0, -1);
        } else {
            firstOperand = firstOperand.slice(0, -1);
        }
        displayValue = primaryScreen.textContent.slice(0, -1);
    }
    primaryScreen.textContent = displayValue;
}

function addPoint(e) {
    if (operatorSelected) {
        appendZero(secondOperand);
        secondOperand += this.textContent;
        primaryScreen.textContent = secondOperand;
        displayValue = primaryScreen.textContent;
    } else {
        appendZero(primaryScreen.textContent);
        firstOperand += this.textContent;
        primaryScreen.textContent = firstOperand;
        displayValue = primaryScreen.textContent;
    }
}

function appendZero(operand) {
    if (operand == '0') {
        displayValue = 0 + '';
        primaryScreen.textContent = displayValue;
        (operatorSelected) ? secondOperand = displayValue : firstOperand = displayValue;
    }
}

function roundNumber(num) {
    return Math.round((num + Number.EPSILON) * 100) / 100;
}


numberBtn.forEach(btn => {
    btn.addEventListener('click', addToScreen);
});
operatorBtn.forEach(btn => {
    btn.addEventListener('click', selectOperator)
});
equalBtn.addEventListener('click', calculate);
clearBtn.addEventListener('click', clearScreen);
deleteBtn.addEventListener('click', sliceLast);
pointBtn.addEventListener('click', addPoint);
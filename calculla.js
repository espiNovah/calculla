const displayBoard = document.querySelector('.displayBoard');
const displayLog = document.querySelector('.displayLog');
const sNum = document.querySelectorAll('.sNum');
const optBtn = document.querySelectorAll('.operaBtn');
const clearBtn = document.querySelector('.resetClear');
const equalBtn = document.querySelector('.equal');


let calcStore = '';
let calcLog = '';
let operatorVal = null;
let firstOperand = '';
// let isSecondOperand = false;
let secondOperand = '';

function add(a, b) {
    return a * 1 + b * 1;
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
    operatorVal = null;
    firstOperand = '';
    secondOperand = '';
}

function addToScreen(e) {
    const eVal = this.textContent;
    if (operatorVal === '+' || operatorVal === '-' || operatorVal === '*' || operatorVal === '/') {
        calcStore = displayBoard.textContent;
        displayBoard.textContent = '';
        displayBoard.textContent += eVal;
        secondOperand += displayBoard.textContent;

        // isSecondOperand = true;      
        // if(isSecondOperand == true) {
        //     calcStore = eVal;
        // }
        // console.log(`${secondOperand} second operand recoded`);

    } else {
        calcStore += eVal;
    }
    displayBoard.textContent = calcStore;
    console.log(`${eVal} was recoded`);
}

function calculate() {
    const answerVal = operate(operatorVal, firstOperand, secondOperand);
    displayBoard.textContent = answerVal;
}

function addOperator(e) {
    operatorVal = e.target.textContent;
    const dVal = document.querySelector('.displayBoard');
    firstOperand = dVal.textContent;
    console.log(`${operatorVal} and ${firstOperand} was stored`);
}


equalBtn.addEventListener('click', calculate);
clearBtn.addEventListener('click', clearScreen);
sNum.forEach(btn => {
    btn.addEventListener('click', addToScreen);
});
optBtn.forEach(btn => {
    btn.addEventListener('click', addOperator)
});
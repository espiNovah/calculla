const displayBoard = document.querySelector('.displayBoard');
const sNum = document.querySelectorAll('.sNum');

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

function addToDisplay(e) {
    console.log(`${e.target.textContent} Added to Display`);
}

const finder = operate('-', 12, 4);


const sNumb = Array.from(sNum).forEach(btn => {
    btn.addEventListener('click', addToDisplay);
});

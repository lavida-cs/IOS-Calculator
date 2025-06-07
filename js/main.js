// DOM Elements
const inputs = document.getElementById('inputs');
const outputEl = document.getElementById('output');

// Constants
const functions = ['clear', 'negate', 'modulus', 'evaluate'];
const operators = ['division', 'multiplication', 'addition', 'subtraction'];

const operatorSymbols = {
    'division': '/',
    'multiplication': '×',
    'subtraction': '-',
    'addition': '+'
}

// State Variables
let expression = '';
let operator = null;
let firstNumber = null;
let secondNumber = null;


function clickedBtn(e) {
    const btn = e.target.dataset.action;
    if (!btn) return;
    
    if (functions.includes(btn)) {
        performAction(btn)
    } else if (operators.includes(btn)) {
        operator = operatorSymbols[btn]
        assignFirstNumber()
    } else {
        if (btn === 'decimal') {
            handleDecimal()
        } else if (btn === '0' && expression === '0') {
            expression = '0'
        } else {
            expression += btn
            if (operator) {
                secondNumber = expression
            }
        }
    }
    updateOutput()
}

function performAction(action) {
    switch (action) {
        case 'clear':
            clearOutput();
            break;
            
        case 'negate':
            negateExpression();
            break;
            
        case 'modulus':
            calculatePercentage();
            break;
            
        case 'evaluate':
            if (firstNumber && secondNumber) {
                evaluateExpression()
            }
            break;
    }
}

function assignFirstNumber() {
    if (firstNumber && secondNumber) {
        evaluateExpression()
    }
    if (!firstNumber) {
        firstNumber = expression;
    }
    expression = ''
    updateOutput()
    
}

function evaluateExpression() {
    const fNumber = parseFloat(firstNumber);
    const sNumber = parseFloat(secondNumber);
    
    if (operator === '/' && sNumber === 0) {
        clearOutput()
        return
    }
    let solution = 0
    switch (operator) {
        case '/':
            solution = fNumber / sNumber
            break;
            
        case '×':
            solution = fNumber * sNumber;
            break;
            
        case '-':
            solution = fNumber - sNumber;
            break;
            
        case '+':
            solution = fNumber + sNumber;
            break
            
    }
    
    if (Math.abs(solution) >= 1e10 || Math.abs(solution) < 1e-6) {
        solution = solution.toExponential(3);
    }
    expression = solution.toString()
    updateOutput()
    firstNumber = null;
    secondNumber = null;
}

function calculatePercentage() {
    if (!expression || expression === '-') return;
    expression = String(parseFloat(expression / 100))
    updateOutput()
}

function negateExpression() {
    expression = expression.startsWith('-') ? expression.slice(1) : '-' + expression;
    
    updateOutput()
}

function clearOutput() {
    expression = ''
    firstNumber = null;
    secondNumber = null;
    operator = null;
    updateOutput()
}

function handleDecimal() {
    if (expression === '') {
        expression += '0.'
        updateOutput()
    } else if (expression.includes('.')) {
        return;
    } else {
        expression += '.'
    }
    
}



inputs.addEventListener('click', clickedBtn)

function updateOutput() {
    outputEl.textContent = expression || '0'
}
updateOutput()
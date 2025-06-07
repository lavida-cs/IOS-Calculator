// DOM Elements
const inputs = document.getElementById('inputs');
const outputEl = document.getElementById('output');

// Constants
const functions = ['clear', 'negate', 'modulus', 'evaluate'];
const operators = ['division', 'multiplication', 'addition', 'subtraction'];

// State Variables
let expression = '';
let operator = null;
let firstNumber = null;
let secondNumber = null;

/**
 * Handles click events on calculator buttons.
 * Determines whether a function, operator, or number was clicked and acts accordingly.
 * @param {MouseEvent} e - The click event object.
 */
function clickedBtn(e) {
    const btn = e.target.dataset.action;
    if (!btn) return;
    
    if (functions.includes(btn)) {
        performAction(btn);
        return;
    }
    
    if (operators.includes(btn)) {
        addOperator(btn);
        return;
    }
    
    if (btn === '0' && expression === '0') return;
    
    if (btn === 'decimal') {
        if (expression === '') {
            expression = '0.'
            updateOutput()
        }
        else if (!expression.includes('.')) {
            expression += '.';
            updateOutput();
        }
        return;
    }
    
    expression += btn;
    updateOutput();
    
    if (operator) {
        secondNumber = expression;
    }
}

/**
 * Adds an operator to the expression.
 * If two numbers already exist, evaluates before continuing.
 * @param {string} sign - The operator keyword (e.g., 'addition').
 */
function addOperator(sign) {
    if (firstNumber && secondNumber) {
        evaluateExpression();
    }
    
    if (!firstNumber) {
        firstNumber = expression;
    }
    
    operator = {
        division: '/',
        multiplication: '×',
        subtraction: '-',
        addition: '+'
    } [sign];
    
    expression = '';
    updateOutput();
}

/**
 * Performs a special calculator function.
 * @param {string} action - The function to perform (e.g., 'clear', 'evaluate').
 */
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
            if (firstNumber && secondNumber){
                evaluateExpression();
            };
            break;
    }
}

/**
 * Clears all calculator inputs and resets the state.
 */
function clearOutput() {
    expression = '';
    firstNumber = null;
    secondNumber = null;
    updateOutput();
}

/**
 * Negates the current number in the expression.
 */
function negateExpression() {
    expression = expression.includes('-') ? expression.slice(1) : '-' + expression;
    updateOutput();
}

/**
 * Converts the current expression to a percentage.
 */
function calculatePercentage() {
    if (expression === '' || expression === '-') return;
    expression = String(parseFloat(expression) / 100);
    updateOutput();
}

/**
 * Evaluates the full mathematical expression using stored values.
 */
function evaluateExpression() {
    const num1 = parseFloat(firstNumber);
    const num2 = parseFloat(secondNumber);
    
    if (operator === '/' && num2 === 0){
        expression = ''
        firstNumber = null;
        secondNumber = null;
        return
    };
    
    switch (operator) {
        case '/':
            expression = num1 / num2;
            break;
        case '×':
            expression = num1 * num2;
            break;
        case '-':
            expression = num1 - num2;
            break;
        case '+':
            expression = num1 + num2;
            break;
    }
    
    // Format result if it's very large or small
    if (Math.abs(expression) >= 1e10 || Math.abs(expression) < 1e-6) {
        expression = String(Number(expression).toExponential(6));
    } else {
        // Round long decimals without chopping them off
        expression = Number(expression.toFixed(3)).toString();
    }
    
    updateOutput();
    firstNumber = null;
    secondNumber = null;
}

/**
 * Updates the output display with the current expression.
 */
function updateOutput() {
    outputEl.textContent = expression.toLocaleString() || '0';
}

// Initialize
updateOutput();
inputs.addEventListener('click', clickedBtn);
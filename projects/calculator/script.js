/*Retrieving html elements.*/
const display = document.querySelector('.display');
const error = document.querySelector('.error');
const inputs = document.querySelector('.inputs');

/*Variables for numbers and operators.*/
let num1 = '';
let num2 = '';
let operator = '';
let answer = '';
let decimal = true;
let displayText = '';

/*To place results on the display and show an error if too long for the display.*/
function displayAnswer(){
    display.textContent = displayText;

    if(displayText.length > 12){
        error.textContent = `My sreen's not that big!`
    }
}

/*Let's do the math!*/
function add(a, b) {
    answer = a + b;
}

function subtract(a, b) {
    answer = a - b;
}

function multiply(a, b) {
    answer = a * b;
}

function divide(a, b) {
    if(b === 0){
        displayAnswer()
        error.textContent = 'YOU KNOW THAT WONT WORK.';
        return
    } else {
        answer = a / b; 
    }
}

function toThePowerOf(a, b) {
    answer = a**b;
}

/*Calculating the answer.*/
function calculate(equals) {
    if(num2 === '.'|| num2 === '' || num1 === '.') return;
    
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    
    switch(operator){
        case '+':
            add(num1, num2);
            break;
        case '-':
            subtract(num1, num2);
            break;
        case '*':
            multiply(num1, num2);
            break;
        case '/':
            divide(num1, num2);
            break;
        case '^':
            toThePowerOf(num1, num2);
            break;
    }
    //Round answer.
    answer = (Math.round(answer * 10)) / 10;

    if(Number.isInteger(answer)){
        decimal = true;
    } else {
        decimal = false;
    }

    if(equals === true && num2 !== '0'){
        num1 = `${answer}`;
        answer = '';
        num2 = '';
        operator = '';
        displayText = num1;
    }
    
    displayAnswer();
}

/*Functions for when inputs are clicked or pressed*/
function click(target) {
    switch(target){
        case '1':
            numInput(target)
            break;
        case '2':
            numInput(target)
            break;
        case '3':
            numInput(target)
            break;
        case '4':
            numInput(target)
            break;
        case '5':
            numInput(target)
            break;
        case '6':
            numInput(target)
            break;            
        case '7':
            numInput(target)
            break;
        case '8':
            numInput(target)
            break;
        case '9':
            numInput(target)
            break;
        case '0':
            numInput(target)
            break;
        case '.':
            decimalPoint(target)
            break;
        case '+':
            operatorInput(target)
            break;
        case '-':
            operatorInput(target)
            break;            
        case '*':
            operatorInput(target)
            break;
        case '/':
            operatorInput(target)
            break;
        case 'x^y':
            operatorInput('^')
            break;
        case '=':
            calculate();
            break;
        case 'ac':
            clear();
            break;
        case 'c':
            backspace();
            break;
        case 'Backspace':
            backspace();
            break;      
        case '+/-':
            negative();
            break;
    }
}

//If the input is a number.
function numInput(inputString){
    error.textContent = '';
    if(answer !== ''){
        return;
    } else {
        if(operator === ''){
            num1 = num1 + inputString;
        } else {
            num2 = num2 + inputString;
        }
        displayText = display.textContent + inputString;
        displayAnswer();
    }
}

//If the input is a decimal point.
function decimalPoint(inputString){
    error.textContent = '';
    if(decimal && operator === '') {
        num1 = num1 + inputString;
        decimal = false;
        displayText = display.textContent + inputString;
        displayAnswer();
    } else if(decimal && operator !== '') {
        num2 = num2 + inputString;
        decimal = false;
        displayText = display.textContent + inputString;
        displayAnswer();
    }
}

//If the input is an operator.
function operatorInput(inputString){
    error.textContent = '';
    if (operator !== '' && num2 === '' || num1 === '') {
        return;
    } else if(operator !== '' && num2 !== '') {
        calculate(false);
        displayText = answer + inputString;
        displayAnswer();
        num1 = answer;
        answer = '';
        num2 = '';
        decimal = true;
        operator = inputString;
    } else {
        decimal = true;
        operator = inputString;
        displayText = display.textContent + inputString;
        displayAnswer();
    }
}

//Clearing the display and resetting values.
function clear() {
    display.textContent = '';
    error.textContent = '';

    num1 = '';
    num2 = '';
    operator = '';
    answer = '';
    decimal = true;
}

//Deleting a character.
function backspace() {
    let split;
    if(operator === '') {
        split = num1.split('');
        split.splice(split.length -1, 1);
        num1 = split.join('');
        displayText = num1;
        displayAnswer();
    } else if(operator !== '' && num2 === ''){
        operator = '';
        displayText = num1;
    } else if (operator !== '' && num2 !== ''){
        split = num2.split('');
        split.splice(split.length -1, 1);
        num2 = split.join('');
        ddisplayText = num1 + operator + num2;
        displayAnswer();
    }
    error.textContent = '';
}

//Change a number to be a negative.
function negative(){
    error.textContent = '';
    let float;
    if(num2 === ''){
       float = parseFloat(num1);
       if(float < 0) {
            num1 = Math.abs(float);
            toString(num1);
            displayText = num1 + operator + num2;
            displayAnswer();
       } else {
            num1 = -Math.abs(float);
            toString(num1);
            displayText = num1 + operator + num2;
            displayAnswer();
       }
    } else {
        float = parseFloat(num2);
       if(float < 0) {
            num2 = Math.abs(float);
            toString(num1);
            displayText = num1 + operator + num2;
            displayAnswer();
       } else {
            num2 = -Math.abs(float);
            toString(num2);
            displayText = num1 + operator + num2;
            displayAnswer();
       }
    }
}

/*Event listener for inputs.*/
inputs.addEventListener('click', (e) => {
    if(e.target === inputs) return;
    click(e.target.textContent);
});
document.addEventListener('keydown', (e) => click(e.key));
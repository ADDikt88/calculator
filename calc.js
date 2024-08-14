/** Variables */
let firstNumber, secondNumber, operator;
let display = "";
let operatorBtnPressed = false;
let digitBtnPressed = false;
let currentNumber = 0;
let canOperate = false;
let canEqual = false;
let canDigit = true;

/** Calcuator Functions */
function add (a,b) {
    return a + b;
}

function subtract (a,b) {
    return a - b;
}

function multiply (a,b) {
    return a*b;
}

function divide (a,b) {
    return a/b;
}

function operate (a, operator, b) {
    switch (operator) {
        case "+":
            return add (a,b);
        case "-":
            return subtract (a,b);
        case "*":
            return multiply (a,b);
        case ".":
            return divide(a,b);
    }
}

function updateDisplay(value){
    display = value;
    console.log(display);
    displayContainer.textContent = display;
}

function debug(){
    console.log("Can Equal: " + canEqual);
    console.log("Can Operate: " + canOperate); 
    console.log("Can Digit: " + canDigit); 
    console.log("1st Number: " + firstNumber);
    console.log("2nd Number: " + secondNumber); 
    console.log("Current Number: " + currentNumber); 
}

/** Set HTML elements */
const digitContainer = document.querySelector("#digit-container");
const buttonDigit = [];
const displayContainer = document.querySelector("#display");

const addBtn = document.querySelector("#add");
const subtractBtn = document.querySelector("#subtract");
const multiplyBtn = document.querySelector("#multiply");
const divideBtn = document.querySelector("#divide");

const clearBtn = document.querySelector("#clear");
const equalBtn = document.querySelector("#equal");



/** Draw digit buttons */
function drawDigitButtons(){
    for (let i = 0; i < 10; i++){
        buttonDigit[i] = document.createElement("button");
        buttonDigit[i].setAttribute("class", "button-digit");
        buttonDigit[i].setAttribute("id", i);
        buttonDigit[i].textContent = i;
        digitContainer.appendChild(buttonDigit[i]);
    }
}

drawDigitButtons();


const buttonDigitAll = document.querySelectorAll(".button-digit");

/** Activate button listeners */
for (let i = 0; i < 10; i++){
    buttonDigitAll[i].addEventListener('click', () => {
        if (canEqual | canDigit) {
            canEqual = true;
            canDigit = true;
            canOperate = true;
            currentNumber = currentNumber*10 + i;
            if (firstNumber == null)
                firstNumber = currentNumber;

            if (secondNumber == null && operator != null)
                secondNumber = currentNumber;
            
            updateDisplay(currentNumber);
            debug();

        }        
    });
}

/** Only allow 2 numbers at a time */

addBtn.addEventListener('click', () => {
    if (canOperate){
        canEqual = false;
        canDigit = true;
        canOperate = false;

        operator = "+";

        if (secondNumber == null) {
            firstNumber = currentNumber;    
        }
        else {
            secondNumber = currentNumber;
            answer = operate (firstNumber, operator, secondNumber);
            updateDisplay(answer);
            firstNumber = answer;
        }
        
        currentNumber = 0;
        secondNumber = null;
        
        debug();

        console.log(operator);
    }

});




equalBtn.addEventListener('click', () => {
   if (canEqual && secondNumber != null){
        secondNumber = currentNumber;
        console.log(operator);
        answer = operate (firstNumber, operator, secondNumber);
        updateDisplay(answer);
        currentNumber = answer;
        firstNumber = null;
        secondNumber = null;

        canOperate = true;
        canEqual = false;
        canDigit = false;

        debug();
    }
});



clearBtn.addEventListener('click', () => {
    firstNumber = null;
    secondNumber = null;
    operator = null;
    display = "";
    operatorBtnPressed = false;
    digitBtnPressed = false;
    currentNumber = 0;
    canOperate = false;
    canEqual = false;
    canDigit = true;

    updateDisplay("");
    debug();
});






/** Variables */
let firstNumber;
let secondNumber;
let operator;
let display = "";
let operatorBtnPressed = false;
let digitBtnPressed = false;
let currentNumber = 0;
let canOperate = false;
let canEqual = false;
let canDigit = true;
let negFlag = 1;
let decimalCounter = 0;
let decimalToggle = false;
let lastPressedZero = false;
let lastPressedEqual = false;
let pressedZeroCounter = 0;

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
        case "/":
            return divide(a,b);
    }
}

function checkOverflow (value) {
    if (value > 9999999999)
        return "Overflow Error";
    else if (value < -9999999999)
        return "Overflow Error";

    return false;
}
function getBaseLog(x, y) {
    return Math.log(y) / Math.log(x);
  }

function truncateString (value) {
    if (value.toString().length > 12){
        console.log("long string: " + value.toString().length);
    }
    return value;
}

function updateDisplay(value){
    let rounded = Math.round(value * 1000000000) / 1000000000
    debug();

    if (Number.isInteger(rounded) && decimalToggle && !lastPressedZero && !lastPressedEqual){
        display = rounded + ".";
        
    }
    else if (Number.isInteger(rounded) && decimalToggle && lastPressedZero){
        display = rounded + "."; 
        for (let k = 0; k < pressedZeroCounter; k++)
            display = display.concat("0");
        
        lastPressedZero = false;
        
    }
    else if (!Number.isInteger(rounded) && decimalToggle && lastPressedZero){
        display = rounded + "";
        for (let k = 0; k < pressedZeroCounter; k++)
            display = display.concat("0");
        lastPressedZero = false;
                
    }
    else {
        display = rounded;
    }
    
    displayContainer.textContent = display;

    
}

function resetButtonsBackgroundColor(){
    addBtn.style.backgroundColor = "";
    subtractBtn.style.backgroundColor = "";
    multiplyBtn.style.backgroundColor = "";
    divideBtn.style.backgroundColor = "";
}

function debug(){
    console.log("Can Equal: " + canEqual);
    console.log("Can Operate: " + canOperate); 
    console.log("Can Digit: " + canDigit); 
    console.log("1st Number: " + firstNumber);
    console.log("2nd Number: " + secondNumber); 
    console.log("Current Number: " + currentNumber); 
    console.log("Neg Flag: " + negFlag); 
    console.log("Dec Toggle: " + decimalToggle); 

}

/** Set HTML elements */
//const digitContainer = document.querySelector("#digit-container");
const buttonDigit = [];
const displayContainer = document.querySelector("#display");

const addBtn = document.querySelector("#add");
const subtractBtn = document.querySelector("#subtract");
const multiplyBtn = document.querySelector("#multiply");
const divideBtn = document.querySelector("#divide");

const clearBtn = document.querySelector("#clear");
const equalBtn = document.querySelector("#equal");
const decimalBtn = document.querySelector("#decimal");



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

//drawDigitButtons();


const buttonDigits = document.querySelectorAll(".digit");
let buttonDigitAll = [];

/** Map buttons accordingly */
buttonDigitAll[7] = buttonDigits[0];
buttonDigitAll[8] = buttonDigits[1];
buttonDigitAll[9] = buttonDigits[2];
buttonDigitAll[4] = buttonDigits[3];
buttonDigitAll[5] = buttonDigits[4];
buttonDigitAll[6] = buttonDigits[5];
buttonDigitAll[1] = buttonDigits[6];
buttonDigitAll[2] = buttonDigits[7];
buttonDigitAll[3] = buttonDigits[8];
buttonDigitAll[0] = buttonDigits[9];


/** Activate button listeners */
for (let i = 0; i < 10; i++){
    buttonDigitAll[i].addEventListener('click', () => {
        if (operator == '/' && i == 0 && secondNumber == null && !decimalToggle)
        {
            alert("Cannot divide by 0");
        }
        
        else if (canEqual | canDigit) {
            canEqual = true;
            canDigit = true;
            canOperate = true;
            
            resetButtonsBackgroundColor();
            console.log(operator);
            
            if (decimalToggle) {
                console.log("a" + currentNumber);
                decimalCounter--;  
                if (currentNumber >= 0)
                    currentNumber = currentNumber + i*(Math.pow(10, decimalCounter)); 
                else
                    currentNumber = currentNumber - i*(Math.pow(10, decimalCounter)); 

                console.log(currentNumber);
                if (firstNumber == null)
                    firstNumber = currentNumber;
    
                if (secondNumber == null) {     
                    if (operator)
                        secondNumber = currentNumber*negFlag;
                }                
                    
                
            }
            else {
                if (currentNumber >= 0)
                    currentNumber = currentNumber*10 + i;
                else
                    currentNumber = currentNumber*10 - i;

                if (firstNumber == null)
                    firstNumber = currentNumber;
    
                if (secondNumber == null && operator) {
                    currentNumber = i;
                    secondNumber = currentNumber*negFlag;
                }     
            }


            if (negFlag == -1){
                currentNumber = currentNumber * -1;
                negFlag = 1;
            }
                           
            if (i == 0)
            {
                lastPressedZero = true;
                pressedZeroCounter++;
            }
            else{
                lastPressedZero = false;
                pressedZeroCounter = 0;
            }
                
            debug();
            updateDisplay(currentNumber);
            

        }
               
    });
}

/** Only allow 2 numbers at a time */

addBtn.addEventListener('click', () => {
    if (!canOperate && (operator == "*" || operator == "/") && negFlag == -1){
        negFlag = 1;
        debug();
    }
    if (canOperate){
  
        canEqual = false;
        canDigit = true;
        canOperate = false;
        decimalToggle = false;
        decimalCounter = 0;

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

        addBtn.style.backgroundColor = "darkGray"
        
        debug();

        console.log(operator);
    }

});

subtractBtn.addEventListener('click', () => {
    if (!canOperate && (operator == "*" || operator == "/" && negFlag == 1)){
        negFlag = -1;
        debug();
    }
    
    if (canOperate){
        canEqual = false;
        canDigit = true;
        canOperate = false;
        decimalToggle = false;
        decimalCounter = 0;

        operator = "-";

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
        
        subtractBtn.style.backgroundColor = "darkGray"

        debug();

        console.log(operator);
    }

});

multiplyBtn.addEventListener('click', () => {
    if (canOperate){
        canEqual = false;
        canDigit = true;
        canOperate = false;
        decimalToggle = false;
        decimalCounter = 0;

        operator = "*";

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

        multiplyBtn.style.backgroundColor = "darkGray"
        
        debug();

        console.log(operator);
    }

});

divideBtn.addEventListener('click', () => {
    if (canOperate){
        canEqual = false;
        canDigit = true;
        canOperate = false;
        decimalToggle = false;
        decimalCounter = 0;

        operator = "/";

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

        divideBtn.style.backgroundColor = "darkGray"
        
        debug();

        console.log(operator);
    }

});


decimalBtn.addEventListener('click', () => {
    if (!decimalToggle) {
        decimalToggle = true;
        pressedZeroCounter = 0;
        updateDisplay(currentNumber);
    }
});

equalBtn.addEventListener('click', () => {
   if (canEqual && secondNumber != null){
        secondNumber = currentNumber;
        console.log(operator);
        answer = operate (firstNumber, operator, secondNumber);
        lastPressedEqual = true;
        updateDisplay(answer);
        lastPressedEqual = false;
        currentNumber = answer;
        firstNumber = null;
        secondNumber = null;

        canOperate = true;
        canEqual = false;
        canDigit = false;
        decimalToggle = false;
        decimalCounter = 0;

        
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
    negFlag = 1;
    decimalCounter = 0;
    decimalToggle = false;
    lastPressedZero = false;
    pressedZeroCounter = 0;
    resetButtonsBackgroundColor();
    updateDisplay("");
    debug();
});






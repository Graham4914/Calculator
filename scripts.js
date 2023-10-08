let currentValue = "0";
let previousValue = null;
let operator = null;
let operationHistory = "";
let newOperation = false;

const display = document.getElementById('display');
const historyDisplay = document.getElementById('history');

const updateHistoryDisplay =() => {
    historyDisplay.textContent = operationHistory;
}
const updateDisplay = () => {
    display.textContent = currentValue;
};

const handleButtonClick = (value) => {
    if(!isNaN(parseInt(value)) || value === ".") {
        if (newOperation) {
            currentValue = value;
            newOperation = false;
        }
            
    
        else if (currentValue === "0" && value !== ".") {
        currentValue = value;
        operationHistory = value;
        } 

      else if(value === "." &&!currentValue.includes(".")) {
        currentValue += value;
        operationHistory += value;
        }
        else {
            currentValue += value;
            operationHistory += value;
        }
    }

    else {
        handleOperator(value);
    }
    updateDisplay();
    updateHistoryDisplay();
};


// operator logic
const handleOperator = (value) => {
    if (value === "AC") {
        currentValue = "0";
        previousValue = null;
        operator = null;
        operationHistory = "";

    } else if (value === "C") {
        currentValue = "0";
    } 
    //chain operators
    
    else if (value === "=" || (previousValue && operator)) {
        if (previousValue && operator) {
            currentValue = String(operate(previousValue, currentValue, operator));
            operationHistory = `${previousValue} ${operator} ${currentValue} = ${currentValue}`;
            previousValue = null;
            operator = null;
    } 
        newOperation = true;

    } else  {
        if (previousValue && operator && currentValue !== "0") {
            operationHistory = `${previousValue} ${operator} ${currentValue}`;
            previousValue = String(operate(previousValue, currentValue, operator));
            operationHistory += ` ${value} `;
            currentValue = "0";
            operator = value;

        } else  {
            previousValue = currentValue;
            operationHistory += ` ${value} `;
            operator = value;
            currentValue = "0";
        }
    }
    updateHistoryDisplay();
};

//Arithmetic 

const operate = (num1, num2, operator) => {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    switch (operator) {
        case "+" :return num1 + num2;
        case "-" :return num1 - num2;  
        case "X" :return num1 * num2;  
        case "/" :return num2 !== 0 ? num1 / num2 : alert("You can't devide by zero Einstein!") ;             
        default: return num2
    }
};

//event listners
document.querySelectorAll('.buttons button').forEach(button => {
    button.addEventListener('click', () => handleButtonClick(button.textContent));
});
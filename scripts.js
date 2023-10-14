let currentValue = "0";
let previousValue = null;
let operator = null;
let operationHistory = "";
let newOperation = false;

const display = document.getElementById('display');
const historyDisplay = document.getElementById('history');

const updateHistoryDisplay = () => {
    historyDisplay.textContent = operationHistory;
};
const updateDisplay = () => {
    display.textContent = currentValue;
};

const handleButtonClick = (value) => {
    if (!isNaN(parseInt(value)) || value === ".") {
        if (newOperation) {
            currentValue = value;
            operationHistory = `${currentValue}`;
            newOperation = false;
        } else {
            currentValue = currentValue === "0" && value !== "." ? value : currentValue + value;
            operationHistory += value;
        }
    } else {
        handleOperator(value);
    }
    updateDisplay();
    updateHistoryDisplay();
};

const handleOperator = (value) => {
    if (value === "AC") {
        currentValue = "0";
        previousValue = null;
        operator = null;
        operationHistory = "";
    } else if (value === "C") {
        currentValue = "0";
    } else if (value === "=") {
        if (previousValue !== null && operator !== null) {
            currentValue = String(operate(previousValue, currentValue, operator));
            operationHistory += ` = ${currentValue} `;
            previousValue = null;
            operator = null;
        }
        newOperation = true;
    } else {
        if (previousValue === null) {
            previousValue = currentValue;
            currentValue = "0";
            operator = value;
            operationHistory += ` ${operator} `;
        } else {
           if (!newOperation) {
            operationHistory += ` ${currentValue}`;
           } 
            currentValue = operate(previousValue, currentValue, operator);
            previousValue = currentValue;
            currentValue = "0";
            operator = value;
            newOperation = false;
            if(currentValue !== "0") {
                operationHistory = `${currentValue} ${operator}`;
            } else {
                operationHistory = `${operator} `;
            }
            
            
        }
    }
    updateDisplay();
    updateHistoryDisplay();
};

const operate = (num1, num2, operator) => {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    switch (operator) {
        case "+": return num1 + num2;
        case "-": return num1 - num2;
        case "X": return num1 * num2;
        case "/": return num2 !== 0 ? num1 / num2 : alert("Cannot divide by zero!");
        default: return num2;
    }
};

document.querySelectorAll('.buttons button').forEach(button => {
    button.addEventListener('click', () => handleButtonClick(button.textContent));
});

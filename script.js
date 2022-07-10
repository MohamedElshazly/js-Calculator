//Operations 

// 1.Addition 
const add = (a, b) => {
    return a + b;
}; 

// 2.subtraction 
const sub = (a, b) => {
    return a - b;
}; 

// 3.Multiplication 
const mult = (a, b) => {
    return a * b; 
} ; 

// 4.division 
const div = (a, b) => {
    return a / b;
}; 

//Operate: a function that takes one operator of the main four and two numbers
const operate = (stack) => {
    let a = stack[0];
    let b = stack[2];
    let operator = stack[1];
    let result;

    switch(operator) {
        case '+':
            result = add(a, b);
            return decimalCount(String(result)) > 2 ? result = result.toFixed(2) : result = result;
        case '-':
            result = sub(a, b);
            return decimalCount(String(result)) > 2 ? result = result.toFixed(2) : result = result;
        case '*':
            result = mult(a, b);
            return decimalCount(String(result)) > 2 ? result = result.toFixed(2) : result = result;
        case '/':
            result = div(a, b);
            return decimalCount(String(result)) > 2 ? result = result.toFixed(2) : result = result;
        default:
            return "Unknown Operator!";
    };
}

// helper function
const decimalCount = (numStr) => {
    if (numStr.includes('.')) {
        return numStr.split('.')[1].length;
     };
}

//state management
let currentNumber = '';
let firstNumber;
let secondNumber; 
const setFirstNumber = (num) => {
    firstNumber = parseFloat(num);
};
const setSecondNumber = (num) => {
    secondNumber = parseFloat(num);
};

let computationStack = [];


//click events
const keys = document.querySelectorAll('.key')
const displayScreen = document.querySelector('.screen');
displayScreen.innerText = 0;
keys.forEach(key => {
    key.addEventListener('click', (e) => {
        
        if(e.target.classList[0] === 'op') { //handles operations clicks!
            let operation = e.target.innerText;
            console.log(operation)
            switch(operation) {
                // idea here is that current number is 2nd one and we push it to computation-
                // stack, get the result and set it to current number in case user wants to
                //make another computation. 
                case '=': 
                    setSecondNumber(parseFloat(currentNumber).toFixed(2)); //rounds numbers to two decimal places
                    if (computationStack[1] === '/' && secondNumber == 0) {
                        displayScreen.innerText = "Why are you like this?";
                        computationStack = [];
                        currentNumber = '';
                    }
                    else {
                        computationStack.push(secondNumber);
                        let result = operate(computationStack);
                        console.log(result);
                        displayScreen.innerText = result;
                        currentNumber = result;
                        // computationStack = [];
                    }
                    break;
                
                //AC simply clears our state
                case 'Ac':
                    computationStack = [];
                    currentNumber = '';
                    displayScreen.innerText = 0;
                    break;
                
                //another simple case of toggling '-' sign before numbers
                case '+/-':
                    if(currentNumber[0] != '-') {
                        currentNumber = '-' + currentNumber;
                    }else {
                        currentNumber = currentNumber.slice(1);
                    }
        
                    displayScreen.innerText = currentNumber;
                    break;
                
                //this is the default behavior when user wants to perform any operation.
                //we simply set the first number to be the current number, then push it and the 
                //operation to the stack
                default:
                    setFirstNumber(parseFloat(currentNumber).toFixed(2));
                    if(computationStack.length > 1) {
                        computationStack = [];
                        computationStack.push(firstNumber);
                        computationStack.push(e.target.innerText);
                    }
                    else {
                        computationStack.push(firstNumber);
                        computationStack.push(e.target.innerText);
                    }
                    currentNumber = '';
            }
        }
        //This is the alternative behavior when user just types numbers
        else {
                
                currentNumber += e.target.innerText;
                displayScreen.innerText = currentNumber;
        }

        
    })
})

//BUGS TO FIX
//1. if user presses same operator twice, or replaces his operator, replace with already existing
// fixed when user presses equal twice, and how to handle unknown operator 
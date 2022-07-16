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
    console.log(a,b ,operator);

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

const digitInput = (e) => {
    if(result){ //if user does a new operation after '='
        currentNumber = '';
        currentNumber += e.target.innerText;
        displayScreen.innerText = currentNumber + '\u00a0';
        result = 0;
    }
    else if(e.target.innerText == '.'){
        if(currentNumber.includes('.')){}
        else{
            currentNumber += e.target.innerText;
            displayScreen.innerText = currentNumber + '\u00a0';
        }
    }
    else {
        currentNumber += e.target.innerText;
        displayScreen.innerText = currentNumber + '\u00a0';
    } 
}
const setNumberToBePushedToStack = (num) => {
    numberToBePushedToStack = parseFloat(num);
    currentNumber = '';
};

const changeOperation = (e) => {
    computationStack[computationStack.length - 1] = e.target.innerText;
    let toDisplay = displayScreen.innerText.slice(0, -3);
    displayScreen.innerText = toDisplay +'\u00a0'+ e.target.innerText + '\u00a0';
};

const intermediateOperation = (e) => {
    computationStack.push(numberToBePushedToStack);
    let intermediateResult = operate(computationStack);
    displayScreen.innerText = intermediateResult +'\u00a0'+ e.target.innerText + '\u00a0';
    computationStack = [];
    computationStack.push(intermediateResult);
    computationStack.push(e.target.innerText);
}

//state management
let currentNumber = '';
let numberToBePushedToStack = 0;
let secondNumber; 
let computationStack = [];
let result = 0;





//click events
const keys = document.querySelectorAll('.key')
const displayScreen = document.querySelector('.screen');
displayScreen.innerText = 0 + '\u00a0';

keys.forEach(key => {
    key.addEventListener('click', (e) => {
        
        if(e.target.classList[0] === 'op') { //handles operations clicks!
            let operation = e.target.innerText;
            console.log(operation);

            switch(operation) {
                // idea here is that current number is 2nd one and we push it to computation-
                // stack, get the result and set it to current number in case user wants to
                //make another computation. 
                case '=':
                    if(computationStack.length < 2 ){ // try to press = before any number
                        break;
                    }
                    if(currentNumber == ''){
                        currentNumber = computationStack[0];
                    } 
                    setNumberToBePushedToStack(parseFloat(currentNumber).toFixed(2)); //rounds numbers to two decimal places
                    // handles division by 0
                    if (computationStack[1] === '/' && numberToBePushedToStack == 0) {
                        displayScreen.innerText = "Why are you like this?" + '\u00a0';
                        computationStack = [];
                    }
                    else {
                        computationStack.push(numberToBePushedToStack);
                        result = operate(computationStack);
                        displayScreen.innerText = result + '\u00a0';
                        currentNumber = result;
                        computationStack = [];
                    }
                    break;
                
                //AC simply clears our state
                case 'Ac':
                    // turnOpacityOn(computationStack[computationStack.length - 1])
                    computationStack = [];
                    currentNumber = '';
                    result = 0;
                    displayScreen.innerText = 0 + '\u00a0';
                    break;
                
                //another simple case of toggling '-' sign before numbers
                case '+/-':
                    if(currentNumber[0] != '-') {
                        currentNumber = '-' + currentNumber;
                    }else {
                        currentNumber = currentNumber.slice(1);
                    }
        
                    displayScreen.innerText = currentNumber + '\u00a0';
                    break;
                
                case 'del':
                    if(currentNumber && !result){
                        currentNumber = String(currentNumber).slice(0, -1);
                        displayScreen.innerText = currentNumber + '\u00a0';
                        if(currentNumber === ''){
                            displayScreen.innerText = 0 + '\u00a0';
                        }
                        console.log(currentNumber)
                    }  
                    break;

                //this is the default behavior when user wants to perform any operation.
                //we simply set the first number to be the current number, then push it and the 
                //operation to the stack
                default:                    
                    if(typeof computationStack[computationStack.length - 1] == "string" && currentNumber == '') {
                        //code to change the operation mid equation
                        changeOperation(e);
                    }
                    else if(currentNumber == ''){ //can't press an operation without a number first
                        break;
                    }
                    else {
                        setNumberToBePushedToStack(parseFloat(currentNumber).toFixed(2));                    
                        if(result) { //if user preses '=' then naturally result is populated
                                      //we check that and proceed
                            computationStack.push(numberToBePushedToStack);
                            computationStack.push(e.target.innerText);
                            result = 0;
                            displayScreen.innerText += e.target.innerText + '\u00a0';
                        }
                        else if(computationStack.length % 2 == 0 && computationStack.length != 0) {
                            //do intermediate operations instead of just pressing = 
                            //ex: 12 * 5 + 6 + 7 * 2 
                            intermediateOperation(e);
                        }
                        else {
                            computationStack.push(numberToBePushedToStack);
                            computationStack.push(e.target.innerText);
                            displayScreen.innerText += e.target.innerText + '\u00a0';
                        }
                    }
                    
                    
            }
        }
        //This is the alternative behavior when user just types numbers
        else {
               digitInput(e);     
        }

        
    })
})


//BUGS TO FIX
//1. if user presses same operator twice, or replaces his operator, replace with already existing
// fixed when user presses equal twice, and how to handle unknown operator 
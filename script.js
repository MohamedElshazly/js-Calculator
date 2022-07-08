//Operations 

// 1.Addition 
const add = (a, b) => {
    return a + b;
}; 

// 2.subtraction 
const sub = (a, b) => {
    return a -b;
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

    switch(operator) {
        case '+':
            return add(a, b);
        case '-':
            return sub(a, b);
        case '*':
            return mult(a, b);
        case '/':
            return div(a, b);
        default:
            return "Unknown Operator!";
    };
}
//state
let currentNumber = '';
let firstNumber;
let secondNumber; 
const setFirstNumber = (num) => {
    firstNumber = num;
};
const setSecondNumber = (num) => {
    secondNumber = num;
};

let computationStack = [];


//click events
const keys = document.querySelectorAll('.key')
const displayScreen = document.querySelector('.screen');
displayScreen.innerText = 0;
keys.forEach(key => {
    key.addEventListener('click', (e) => {
        
        if(e.target.classList[0] === 'op') {
            let operation = e.target.innerText;
            console.log(operation)
            switch(operation) {
                case '=':
                    setSecondNumber(parseInt(currentNumber));
                    computationStack.push(parseInt(currentNumber));
                    currentNumber = '';
                    let result = operate(computationStack);
                    displayScreen.innerText = result;
                    break;
                case 'Ac':
                    computationStack = [];
                    currentNumber = '';
                    displayScreen.innerText = 0;
                    break;
                case '+/-':
                    if(currentNumber[0] != '-') {
                        currentNumber = '-' + currentNumber;
                    }else {
                        currentNumber = currentNumber.slice(1);
                    }
        
                    displayScreen.innerText = currentNumber;
                    break;
                default:
                    setFirstNumber(parseInt(currentNumber));
                    computationStack.push(parseInt(currentNumber));
                    computationStack.push(e.target.innerText);
                    currentNumber = '';
            }
        }
        else {
            currentNumber += e.target.innerText;
            displayScreen.innerText = currentNumber;
        }

        
    })
})

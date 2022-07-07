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
const operate = (operator, a, b) => {
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
let currentNumber; 
const setCurrentNumber = (num) => {
    currentNumber = num;
};

//click events
const nums = document.querySelectorAll('.num');
const displayScreen = document.querySelector('.screen');
nums.forEach(num => {
    num.addEventListener('click', (e) => {
        setCurrentNumber(parseInt(e.target.innerText));
        displayScreen.innerText = e.target.innerText;
        // console.log(currentNumber, typeof currentNumber);
    })
})

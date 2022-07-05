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
// let op = prompt("Enter op: ");
// let a = parseInt(prompt("a: "));
// let b = parseInt(prompt("b : "));
// const val = operate(op, a, b);
// console.log(val);
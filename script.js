const add = (a, b) => a + b;
const substract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const operate = (op, num1, num2) => {
    switch (op) {
	case '+':
	    add(num1, num2);
	    break;
	case '-':
	    substract(num1, num2);
	    break;
	case '*':
	    multiply(num1, num2);
	    break;
	case '/':
	    divide(num1, num2);
	    break;
    }
}

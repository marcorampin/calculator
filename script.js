//Creates the basic operations
const add = (a, b) => a + b;
const substract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

//Manage the operator to get the right operation
const operate = (num1, op, num2) => {
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

//Calculator button object creator that automatically assign id, class and position
class CalcButton {
    constructor(container, elementName, elementType, className, columnPos, rowPos) {
	this.container = container;
	this.elementName = elementName;
	this.elementType = elementType;
	this.className = className;
	this.columnPos = columnPos;
	this.rowPos = rowPos;
    }

    createElement() {
	const element = document.createElement(this.elementType);
	element.id = this.elementName;
	element.className = this.className;
	element.style.cssText = `grid-column: ${this.columnPos}; grid-row: ${this.rowPos}`;
	if(this.elementType === 'button') {
	    element.textContent = this.elementName;
	}
	this.container.appendChild(element);
	return element;
    }
}

//Calculator
const container = document.querySelector('#calculator');
container.addEventListener('click', (e) => console.log(e.target.className));
//Add buttons
const addDisplay = () => new CalcButton(container, 'display', 'div', 'display', '1/-1', 1).createElement();
const addClear = () => new CalcButton(container, 'C', 'button', 'canc', 4, 2).createElement();
const addAllClear = () => new CalcButton(container, 'AC', 'button', 'canc', 5, 2).createElement();
const addComma = () => new CalcButton(container, '.', 'button', 'comma', 3, 5).createElement();
const addOperations = () => createSeveralButtons(['*', '/', '+', '-'], 4, 3, 2, 2, 'op');
const addResult = () => new CalcButton(container, '=', 'button', 'result', '4/-1', 5).createElement();
const addNumbers = () => createSeveralButtons([7, 8, 9, 4, 5, 6, 1, 2, 3, 0], 1, 2, 3, 3, 'number');
const createSeveralButtons = (arr, initCol, initRow, numCols, numRows, className) => {
    return arr.map((item, index) => {
	let col = initCol + (index % numCols);
	//Exception made for the number 0 that takes two places
	if (item === 0) {
	    col = `${initCol}/${initCol + 2}`;
	}
	const row = initRow + Math.floor(index / numRows);
	return new CalcButton(container, item, 'button', className, col, row).createElement();
    });
}

//Buttons
const display = addDisplay();
const clear = addClear();
const allClear = addAllClear(); 
const comma = addComma();
const operations = addOperations();
const result = addResult();
const numbers = addNumbers();

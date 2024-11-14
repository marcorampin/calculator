//Creates the basic operations
const add = (a, b) => a + b;
const substract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

//Manage the operator to get the right operation
const operate = (num1, op, num2) => {
    [num1, num2] = [parseFloat(num1), parseFloat(num2)];
    switch (op) {
	case '+':
	    return add(num1, num2);
	    break;
	case '-':
	    return substract(num1, num2);
	    break;
	case '*':
	    return multiply(num1, num2);
	    break;
	case '/':
	    return divide(num1, num2);
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
container.addEventListener('click', e => updateDisplay(e.target));
//Add buttons
const addDisplay = () => new CalcButton(container, 'display', 'div', 'display', '1/-1', 1).createElement();
const addClearBtn = () => new CalcButton(container, 'C', 'button', 'canc', 4, 2).createElement();
const addAllClearBtn = () => new CalcButton(container, 'AC', 'button', 'canc', 5, 2).createElement();
const addCommaBtn = () => new CalcButton(container, '.', 'button', 'comma', 3, 5).createElement();
const addOperationsBtn = () => createSeveralButtons(['*', '/', '+', '-'], 4, 3, 2, 2, 'op');
const addResultBtn = () => new CalcButton(container, '=', 'button', 'result', '4/-1', 5).createElement();
const addNumbersBtn = () => createSeveralButtons([7, 8, 9, 4, 5, 6, 1, 2, 3, 0], 1, 2, 3, 3, 'number');
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
const clear = addClearBtn();
const allClear = addAllClearBtn(); 
const comma = addCommaBtn();
const operations = addOperationsBtn();
const result = addResultBtn();
const numbers = addNumbersBtn();

const updateDisplay = (element) => {
    switch (element.className) {
	case 'number':
	    setNum(element.id);
	    break;
	case 'comma':
	    setNum(addComma(display.textContent));
	    break;
	case 'canc':
	    clearDisplay(element, display.textContent);
	    break;
	case 'op':
	    if (opObj.op) {
		getResult();
	    }
	    opObj.op = element.id;
	    break;
	case 'result':
	    getResult();
	    break;
    }
};

const opObj = {
    num1: '',
    op: '',
    num2: '',
    res: '0'
};

const currTerm = () => {
    return opObj.op ? 'num2' : 'num1';
}

const setNum = (value) => {
    if(opObj[currTerm()].length < 10) {
	opObj[currTerm()] += value;
	display.textContent = opObj[currTerm()];
    }
}

const getResult = () => {
    if (!opObj.num1) {
	opObj.num1 = opObj.res;
	opObj.res = '0';
    }
    if (opObj.num2) {
	opObj.res = operate(opObj.num1, opObj.op, opObj.num2);
	display.textContent = opObj.res.toExponential(3);
	[opObj.num1, opObj.op, opObj.num2] = ['', '', ''];
    }
}

const addComma = (currNum) => {
    if (!currNum) {
	return '0.';
    }
    else if(!currNum.includes('.')) {
	return '.';	
    }
    else {
	return '';
    }
}
const clearDisplay = (element, displayText) => {
    switch (element.id) {
	case 'C':
	    opObj[currTerm()] = opObj[currTerm()].slice(0, -1);
	    display.textContent = opObj[currTerm()];
	    break;
	case 'AC':
	    display.textContent = '';
	    [opObj.num1, opObj.op, opObj.num2, opObj.res] = ['', '', '', '0'];
	    break;
    }
}

// ** ----- VARIABLES ----- ** //

// ** BUTTONS ** //

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-allClear]');

// ** OUTPUTS ** //

const previousOperandTextElement = document.querySelector('[data-previousOperand]');
const currentOperandTextElement = document.querySelector('[data-currentOperand]');

// ** ----- CALCULATOR CLASS/OBJECT ----- ** //
class Calculator {

    // ** CONSTRUCTOR ** //

    constructor(previousOperandTextElement, currentOperandTextElement) {

        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        
        this.clear(); // ** clearing the outputs when the calculator is initialized

    }

    // ** MEHOTDS ** //

    clear() {

        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;

    }

    delete() {

        this.currentOperand = this.currentOperand.toString().slice(0, -1);

    }
    
    appendNumber(number) {
    
        if(number === '.' && this.currentOperand.includes('.')) return // ** restricting to only one .
        this.currentOperand = this.currentOperand.toString() + number.toString();
    
    }
    
    
    chooseOperation(operation) {
        
        if(this.currentOperand === '') return

        // ** if there are already two numbers (current and previous) when another operation is executed, it will compute the two previous numbers
        if(this.previousOperand !== '') {
            this.compute();
        }

        this.operation = operation;
        this.previousOperand = this.currentOperand; // ** trowing the current operand to previous operand
        this.currentOperand = ''; // ** clearing the current operand
        
    }
    
    compute() {
        
        let computation;
        const previous = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        
        if(isNaN(previous) || isNaN(current)) return

        switch(this.operation) { // ** solving the operation based on what operator was choosed

            case '+':
                computation = previous + current
                break
            case '-':
                computation = previous - current
                break
            case '*':
                computation = previous * current
                break
            case '÷':
                computation = previous / current
                break
            default:
                return

        }

        this.currentOperand = computation;

        // ** reseting
        this.operation = undefined;
        this.previousOperand = '';

    }
    
    getDisplayedNumber(number) {

        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay

        if(isNaN(integerDigits)) { // ** verifying integer digits
            
            integerDisplay = '';
            
        } else {

            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });

        }

        if(decimalDigits != null) { // ** verifying decimal digits

            return `${integerDisplay}.${decimalDigits}`

        } else {

            return integerDisplay

        }


    }

    updateDisplay() {
    
        this.currentOperandTextElement.innerText = this.getDisplayedNumber(this.currentOperand);

        if(this.operation != null) {

            this.previousOperandTextElement.innerText = 
                `${this.getDisplayedNumber(this.previousOperand)} ${this.operation}`;

        } else {

            this.previousOperandTextElement.innerText = '';

        }

    
    }
    

}

// ** ----- CALCULATOR ----- ** //

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

// ** NUMBERS EVENTS ** //

numberButtons.forEach(button => {
    
    button.addEventListener('click', () => {

        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();

    })

})

// ** OPERATION EVENTS ** //

operationButtons.forEach(operator => {
    
    operator.addEventListener('click', () => {

        calculator.chooseOperation(operator.innerText);
        calculator.updateDisplay();
    
    })

})

// ** SPECIAL EVENTS ** //

equalsButton.addEventListener('click', () => {

    calculator.compute();
    calculator.updateDisplay();

})

deleteButton.addEventListener('click', () => {
    
    calculator.delete();
    calculator.updateDisplay();

})

allClearButton.addEventListener('click', () => {
    
    calculator.clear();
    calculator.updateDisplay();

})
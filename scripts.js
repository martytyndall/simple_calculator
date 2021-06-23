// reusable class to update the previous and current operands whenever the user performs an action
class Calculator{

    // creates new previous and current operand objects and sets them to the values of the passed in parameters
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    // clear the current and previous operand fields and sets the operation to undefined
    clear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }
    // takes the current operand, converts to a string and slices off
    // the last character, then updates current operand with the new string
    delete(){        
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }


    appendNumber(number){
        // checks if input is a decimal and if operand contains a decimal already
        // then returns to next statement without appending the decimal
        if(number === '.' && this.currentOperand.includes('.')) return

        // takes the current operand and converts to a string, appends the also
        // converted current number input and updates the current operand with new value
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }


    //  once called from the event listener on the operation buttons, the inner text (+/-/*/÷)
    // is passed in to this function. 
    chooseOperation(operation){
        
        // check if current operand is empty, if yes return to next statement
        if(this.currentOperand === '') return
        
        // checks if previous operand is not empty, if not empty then calls the compute function
        if(this.previousOperand !== ''){
            this.compute()
        }

        // takes the passed in value from the button inner text and stores it in operation object
        this.operation = operation

        // moves the current operand string to the previous operand field
        this.previousOperand = this.currentOperand

        // clears the current operand field
        this.currentOperand = ''
    }


    compute(){
        let computation

        // takes previous operand string, converts to a number and stores in a constant
        const prev = parseFloat(this.previousOperand)

        // takes current operand string, converts to a number and stores in a constant
        const current = parseFloat(this.currentOperand)

        // checks that a number value exists in the prev and current constants
        if(isNaN(prev) || isNaN(current)) return

        // switch statement to select which operation to perform based upon which
        // operation button was selected
        switch(this.operation){
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }

        // updates the current operand to the value of the computation variable
        this.currentOperand = computation

        // returns the value of the operation to a undefined state
        this.operation = undefined

        // clears the output field for the previous operand
        this.previousOperand = ''
    }


    getDisplayNumber(number){
        // takes the number, converts to a string and stores in strinNumber constant
        const stringNumber = number.toString()

        // takes the stringNumber and splits it at the decimal,
        // characters left side of decimal are converted to floats and stored in integerDigits constant
        const integerDigits = parseFloat(stringNumber.split('.')[0])

        // takes stringNumber and splits at the decimal. Characters right side of the decimal are stored
        // in decimalDigits constant
        const decimalDigits = stringNumber.split('.')[1]

        // variable to hold the output
        let integerDisplay

        // check if interDigits is not a number, if not then integerDisplay is empty
        if(isNaN(integerDigits)){
            integerDisplay = ''
        } else {
            //  else integerDisplay to hold the integerDigits in english local format.
            integerDisplay = integerDigits.toLocaleString('en', {
                // ensures only 1 decimal place allowed
                maximumFractionDigits: 0 })
        }

        // check if decimalDigits is not equal to null, if not then return a concatenated
        // consisting of integerDisplay and decimalDigits
        if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
        
    }

    updateDisplay(){
        // updates the inner text of the current operand HTML element
        // with the value of the current operand
        this.currentOperandTextElement.innerText =
            this.getDisplayNumber(this.currentOperand)

        if(this.operation != null){
            this.previousOperandTextElement.innerText =
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
        
    }
}

// constants to grab and store the data attributes of the HTML divs
// that make up the calculator body
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')


// creates a new calculator object, passing in the values for previous and current operands
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)


// loops through all of the number buttons with the 'forEach' function, adds a click
// event listener, and when clicked takes the inner text of that button and passes
// it into the appendNumber function of the calculator class. It then updates the display.
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})


// loops through all of the operation buttons with the 'forEach' function, adds a click
// event listener, and when clicked takes the inner text of that button and passes
// it into the chooseOperation function of the calculator class. It then updates the display.
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

// adds an event listener to the equals button, upon click calls the compute and update
// display calculator class functions
equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

// adds an event listener to the AC (all clear) button, when clicked calls the clear
// function from the calculator class
allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})


// adds an event listener to the delete button, when clicked calls the delete
// function from the calculator class
deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})
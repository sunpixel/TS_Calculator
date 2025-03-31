// Define button IDs
const numberButtonIds = ["btn_0", "btn_1", "btn_2", "btn_3", "btn_4", "btn_5", "btn_6", "btn_7", "btn_8", "btn_9"];
const functionButtonIds = [
    "btn_sin", "btn_cosin", "btn_tan", "btn_cotan", "btn_power", "btn_root",
    "btn_clear", "btn_multiply", "btn_divide", "btn_plus", "btn_minus", "btn_dot", "btn_equals"
];

const dataScreen = document.getElementById("DataScreen")
let currentNumber: string = ''
let currentEquation: string[] = []      // Delcare as empty
let historyEquations: string[][] = []   // Declare them as empty

let cleared = false

// Define math logic

const mathOperations: { [key: string]: (x: string, y: string) => number } = {
    add: (x, y) => Number(x) + Number(y),
    subtract: (x, y) => Number(x) - Number(y),
    multiply: (x, y) => Number(x) * Number(y),
    division: (x, y) => Number(x) * Number(y),
    power: (x, y) => Math.pow(Number(x), Number(y)),
    sqrt: (x) => Math.sqrt(Number(x))   // Needs checking for negative numbers (Not YET needed (Negatives not implemented))
  };


// Define button logic as a map
const numberButtonLogic: { [key: string]: () => void } = {
    "0": () => addToDataScreen('0'),
    "1": () => addToDataScreen('1'),
    "2": () => addToDataScreen('2'),
    "3": () => addToDataScreen('3'),
    "4": () => addToDataScreen('4'),
    "5": () => addToDataScreen('5'),
    "6": () => addToDataScreen('6'),
    "7": () => addToDataScreen('7'),
    "8": () => addToDataScreen('8'),
    "9": () => addToDataScreen('9'),
};

const functionButtonLogic: { [key: string]: () => void } = {

    // Hard and annoying (postponed)

    "sin": () => console.log("Calculating sine"),
    "cosin": () => console.log("Calculating cosine"),
    "tan": () => console.log("Calculating tangent"),
    "cotan": () => console.log("Calculating cotangent"),
    "power": () => console.log("Calculating power"),        // Needed
    "root": () => console.log("Calculating square root"),   // Needed

    // Main and easy

    "clear": () =>  clearScreen(),   // Call to clear
    "multiply": () => addToDataScreen('x'),
    "divide": () => addToDataScreen('/'),
    "plus": () => addToDataScreen('+'),
    "minus": () => addToDataScreen('-'),
    "dot": () => addToDataScreen('.'),
    "equals": () => console.log("Calculating result"),  // Call to display result
};

// Initialize buttons and add event listeners
function initializeButtons(buttonIds: string[], handler: (id: string) => void) {
    buttonIds.forEach(id => {
        const button = document.getElementById(id) as HTMLButtonElement | null;
        button?.addEventListener('click', () => handler(id));
    });
}

// Event handler for number buttons
function handleNumberButtonClick(id: string) {
    const number = id.replace("btn_", "");
    console.log(`Number button ${number} pressed`);
    numberButtonLogic[number]?.();
}

// Event handler for function buttons
function handleFunctionButtonClick(id: string) {
    const functionName = id.replace("btn_", "");
    console.log(`Function button ${functionName} pressed`);
    functionButtonLogic[functionName]?.();
}

// Initialize number buttons
initializeButtons(numberButtonIds, handleNumberButtonClick);

// Initialize function buttons
initializeButtons(functionButtonIds, handleFunctionButtonClick);


// Supplementary functions

function addToDataScreen(data: string) {
    
    if (dataScreen)
    {
        if (currentNumber.length > 0 && cleared == false || dataScreen?.textContent?.length != 1)
        {
            console.log('Enterd main')
            try {
                let num = Number(data)  // try to convert to number from string

                if(Number.isNaN(num)) throw new Error("Not A Number")
                
                if (data == '0')
                {
                    // If dot exists in currentNumber then add 0, otherwise skip 
                    if(currentNumber.indexOf('.') != -1 || currentNumber.indexOf('0') != 0)
                    {
                        currentNumber += data
                        dataScreen.textContent += data
                    }
                    //if(currentNumber.indexOf('0') != 0)
                }
                else
                {
                    currentNumber += data
                    dataScreen.textContent += data
                }
            }

            // On any operator used add

            catch (e) {
                if(data == '.'){
                    if(currentNumber.indexOf('.') == -1 && currentNumber.length > 0) {
                        currentNumber += '.'
                        dataScreen.textContent += data
                    }
                    else{
                        currentNumber += '0.'
                        dataScreen.textContent += '0.'
                    }
                }
                else{
                    data = " " + data + " "
                    dataScreen.textContent += data
                    currentEquation.push(currentNumber)
                    currentEquation.push(data)
                    currentNumber = ''
                    // Test Data
                    if (currentEquation.length > 3) process_data()
                    console.log(currentEquation)
                }
            }
        }


        
        // For the frist symbol of currentNumber which cannot be 0, unless its dot that is pressed


        else{
            console.log('Enter sub')
            try {
                let num = Number(data)  // try to convert to number from string
                if(Number.isNaN(num)) throw new Error("Not A Number")
                console.log(data)
                console.log('Try good')
                if(data != '0'){
                    currentNumber = data
                    dataScreen.textContent = data
                }
            }
            // On any operator used
            // Cannot be used before number
            catch (e) {
                if(data == '.'){
                    currentNumber = '0.'
                    dataScreen.textContent = "0."
                }
            }
        }
        cleared = false
        console.log(currentNumber)
    }
    console.log(currentEquation.length)
}

// Done on amount of symols increase

function process_data() {
    console.log("XXXXXXXXXXX Entered PORCCESS DATA XXXXXXXXXX")
    let to_do = currentEquation[1].trim()									// Takes the operation that needs to be performed
    let to_move = currentEquation [3].trim()								// Takes operation that is to be moved
    let numbers = [currentEquation[0], currentEquation[2]]				// Numbers to be calculated
    // Needs calculation of first equation before making other changes
    historyEquations.push(currentEquation)
    console.log(historyEquations)
	let result = calculate(numbers, to_do)
	to_move = " " + to_move + " "	// Makes it easier to read
	currentEquation = [result, to_move]

	if (dataScreen){
		dataScreen.textContent = result + " " + to_move + " "
	}
}

function calculate(nums: string[], operand: string): string {
	// converts string to number
	let num1 = parseFloat(nums[0])
	let num2 = parseFloat(nums[1])
	let result: number = 0
	operand = operand.trim()														// Left here just in case
	// Switch statements for choosing where to go
	switch (operand) {
		case '+':
			result = num1 + num2
			return String(result)
		case '-':
			result = num1 - num2
			return String(result)
		case '/':
			result = num1 / num2
			return String(result)
		case '*':
			result = num1 * num2
			return String(result)

		// Complex operations
		
		case '**':
			result = Math.pow(num1, num2)
			return String(result)
		default:
			console.log('Default case')
	}
	return String(result)
}

function clearScreen() {
	console.log("CLEAR entered")
    if(dataScreen && currentEquation.length < 3) {
        dataScreen.textContent = '0'
        currentEquation = []    // Clears array of all the elements
        cleared = true
    }
}

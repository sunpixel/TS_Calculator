import * as MathFun from "./math.js";
// Define button IDs
const numberButtonIds = ["btn_0", "btn_1", "btn_2", "btn_3", "btn_4", "btn_5", "btn_6", "btn_7", "btn_8", "btn_9"];
const functionButtonIds = [
    "btn_sin", "btn_cosin", "btn_tan", "btn_cotan", "btn_power", "btn_root",
    "btn_clear", "btn_multiply", "btn_divide", "btn_plus", "btn_minus", "btn_dot", "btn_equals"
];
const dataScreen = document.getElementById("DataScreen"); // Ensure not null
let currentNumber = '';
let currentEquation = []; // Represent an equation that will happen
let historyEquations = []; // A history of all availiable equations
let cleared = false;
// Define math logic ###DEPRICATED###
// Define button logic as a map
const numberButtonLogic = {
    "0": () => addToDataScreen('0', dataScreen),
    "1": () => addToDataScreen('1', dataScreen),
    "2": () => addToDataScreen('2', dataScreen),
    "3": () => addToDataScreen('3', dataScreen),
    "4": () => addToDataScreen('4', dataScreen),
    "5": () => addToDataScreen('5', dataScreen),
    "6": () => addToDataScreen('6', dataScreen),
    "7": () => addToDataScreen('7', dataScreen),
    "8": () => addToDataScreen('8', dataScreen),
    "9": () => addToDataScreen('9', dataScreen),
};
const functionButtonLogic = {
    // Hard and annoying | Seperate function is to be created to work with them
    "sin": () => complex_proccess(1),
    "cosin": () => complex_proccess(2),
    "tan": () => complex_proccess(3),
    "cotan": () => complex_proccess(4),
    "root": () => complex_proccess(5),
    // Main and easy
    "power": () => addToDataScreen('**', dataScreen),
    "clear": () => clearScreen(), // Call to clear
    "multiply": () => addToDataScreen('x', dataScreen),
    "divide": () => addToDataScreen('/', dataScreen),
    "plus": () => addToDataScreen('+', dataScreen),
    "minus": () => addToDataScreen('-', dataScreen),
    "dot": () => addToDataScreen('.', dataScreen),
    "equals": () => console.log("Calculating result"), // Call to display result
};
// Initialize buttons and add event listeners
function initializeButtons(buttonIds, handler) {
    buttonIds.forEach(id => {
        const button = document.getElementById(id);
        button === null || button === void 0 ? void 0 : button.addEventListener('click', () => handler(id));
    });
}
// Event handler for number buttons
function handleNumberButtonClick(id) {
    var _a;
    const number = id.replace("btn_", "");
    console.log(`Number button ${number} pressed`);
    (_a = numberButtonLogic[number]) === null || _a === void 0 ? void 0 : _a.call(numberButtonLogic);
}
// Event handler for function buttons
function handleFunctionButtonClick(id) {
    var _a;
    const functionName = id.replace("btn_", "");
    console.log(`Function button ${functionName} pressed`);
    (_a = functionButtonLogic[functionName]) === null || _a === void 0 ? void 0 : _a.call(functionButtonLogic);
}
// Supplementary functions
function addToDataScreen(data, dataScreen) {
    var _a;
    if (dataScreen) {
        if (currentNumber.length > 0 && cleared == false || ((_a = dataScreen === null || dataScreen === void 0 ? void 0 : dataScreen.textContent) === null || _a === void 0 ? void 0 : _a.length) != 1) {
            console.log('Enterd main');
            try {
                let num = Number(data); // try to convert to number from string
                if (Number.isNaN(num))
                    throw new Error("Not A Number");
                if (data == '0') {
                    // If dot exists in currentNumber then add 0, otherwise skip 
                    if (currentNumber.indexOf('.') != -1 || currentNumber.indexOf('0') != 0) {
                        currentNumber += data;
                        dataScreen.textContent += data;
                    }
                    //if(currentNumber.indexOf('0') != 0)
                }
                else {
                    currentNumber += data;
                    dataScreen.textContent += data;
                }
            }
            // On any operator used add
            catch (e) {
                if (data == '.') {
                    if (currentNumber.indexOf('.') == -1 && currentNumber.length > 0) {
                        currentNumber += '.';
                        dataScreen.textContent += data;
                    }
                    else {
                        currentNumber += '0.';
                        dataScreen.textContent += '0.';
                    }
                }
                else {
                    data = " " + data + " ";
                    dataScreen.textContent += data;
                    currentEquation.push(currentNumber);
                    currentEquation.push(data);
                    currentNumber = '';
                    // Called when a second operand is being added to equation
                    // ########################################################
                    if (currentEquation.length > 3)
                        process_data();
                    console.log(currentEquation);
                    // ########################################################
                }
            }
        }
        // For the frist symbol of currentNumber which cannot be 0, unless its dot that is pressed
        else {
            console.log('Enter sub');
            try {
                let num = Number(data); // try to convert to number from string
                if (Number.isNaN(num))
                    throw new Error("Not A Number");
                console.log(data);
                console.log('Try good');
                if (data != '0') {
                    currentNumber = data;
                    dataScreen.textContent = data;
                }
            }
            // On any operator used
            // Cannot be used before number
            catch (e) {
                if (data == '.') {
                    currentNumber = '0.';
                    dataScreen.textContent = "0.";
                }
            }
        }
        cleared = false;
        console.log(currentNumber);
    }
    console.log(currentEquation.length);
}
// Comes forward when any of the complex functions are used
// Will use last number to calculate result and replace it
function complex_proccess(func_number) {
    let result = '';
    let name = '';
    switch (func_number) {
        case 1:
            result = MathFun.sin(currentNumber); // Use MathFun.sin
            name = 'sin';
            break;
        case 2:
            result = MathFun.cosin(currentNumber); // Use MathFun.cosin
            name = 'cosin';
            break;
        case 3:
            result = MathFun.tan(currentNumber); // Use MathFun.tan
            name = 'tan';
            break;
        case 4:
            result = MathFun.cotan(currentNumber); // Use MathFun.cotan
            name = 'cotan';
            break;
        case 5:
            result = MathFun.sqrt(currentNumber); // Use MathFun.sqrt
            name = 'sqrt';
            break;
    }
    // Current Position is 3
    if (currentEquation.length > 1) {
        currentEquation[2] = result;
    }
    // Current Position is 1
    else {
        currentEquation[0] = result;
        if (dataScreen)
            dataScreen.textContent = result;
        historyEquations.push([currentNumber, name, 'None']);
    }
}
// Done on amount of symols increase
function process_data() {
    console.log("XXXXXXXXXXX Entered PORCCESS DATA XXXXXXXXXX");
    let to_do = currentEquation[1].trim(); // Takes the operation that needs to be performed
    let to_move = currentEquation[3].trim(); // Takes operation that is to be moved
    let numbers = [currentEquation[0], currentEquation[2]]; // Numbers to be calculated
    // Needs calculation of first equation before making other changes
    currentEquation.pop();
    historyEquations.push(currentEquation);
    console.log(historyEquations);
    let result = MathFun.calculate(numbers, to_do); // Calculate result
    to_move = " " + to_move + " "; // Makes it easier to read
    currentEquation = [result, to_move];
    if (dataScreen) {
        dataScreen.textContent = result + " " + to_move + " ";
    }
}
function clearScreen() {
    console.log("CLEAR entered");
    if (dataScreen && currentEquation.length < 3) {
        dataScreen.textContent = '0';
        currentEquation = []; // Clears array of all the elements
        cleared = true;
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const dataScreen = document.getElementById("DataScreen");
    if (!dataScreen) {
        console.error("DataScreen element not found!");
        return;
    }
    // Initialize number buttons
    initializeButtons(numberButtonIds, handleNumberButtonClick);
    // Initialize function buttons
    initializeButtons(functionButtonIds, handleFunctionButtonClick);
    console.log("Calculator initialized successfully!");
});

"use strict";
// Define button IDs
const numberButtonIds = ["btn_0", "btn_1", "btn_2", "btn_3", "btn_4", "btn_5", "btn_6", "btn_7", "btn_8", "btn_9"];
const functionButtonIds = [
    "btn_sin", "btn_cosin", "btn_tan", "btn_cotan", "btn_power", "btn_root",
    "btn_clear", "btn_multiply", "btn_divide", "btn_plus", "btn_minus", "btn_dot", "btn_equals"
];
const dataScreen = document.getElementById("DataScreen");
let currentNumber = '';
let currentEquation = []; // Delcare as empty
let historyEquations = []; // Declare them as empty
let cleared = false;
// Define button logic as a map
const numberButtonLogic = {
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
const functionButtonLogic = {
    // Hard and annoying (postponed)
    "sin": () => console.log("Calculating sine"),
    "cosin": () => console.log("Calculating cosine"),
    "tan": () => console.log("Calculating tangent"),
    "cotan": () => console.log("Calculating cotangent"),
    "power": () => console.log("Calculating power"), // Needed
    "root": () => console.log("Calculating square root"), // Needed
    // Main and easy
    "clear": () => clearScreen(), // Call to clear
    "multiply": () => addToDataScreen('x'),
    "divide": () => addToDataScreen('/'),
    "plus": () => addToDataScreen('+'),
    "minus": () => addToDataScreen('-'),
    "dot": () => addToDataScreen('.'),
    "equals": () => console.log("Calculating result"), // Call to display result
};
// Initialize buttons and add event listeners
function initializeButtons(buttonIds, handler) {
    buttonIds.forEach(id => {
        const button = document.getElementById(id);
        button?.addEventListener('click', () => handler(id));
    });
}
// Event handler for number buttons
function handleNumberButtonClick(id) {
    const number = id.replace("btn_", "");
    console.log(`Number button ${number} pressed`);
    numberButtonLogic[number]?.();
}
// Event handler for function buttons
function handleFunctionButtonClick(id) {
    const functionName = id.replace("btn_", "");
    console.log(`Function button ${functionName} pressed`);
    functionButtonLogic[functionName]?.();
}
// Initialize number buttons
initializeButtons(numberButtonIds, handleNumberButtonClick);
// Initialize function buttons
initializeButtons(functionButtonIds, handleFunctionButtonClick);
// Supplementary functions
function addToDataScreen(data) {
    if (dataScreen) {
        if (currentNumber.length > 0 && cleared == false || dataScreen?.textContent?.length != 1) {
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
                    console.log('Caught e ELSE');
                    data = " " + data + " ";
                    dataScreen.textContent += data;
                    currentEquation.push(currentNumber);
                    currentEquation.push(data);
                    currentNumber = '';
                    // Test Data
                    if (currentEquation.length > 3)
                        process_data();
                    console.log(currentEquation);
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
                /*
                data = " " + data + " "
                currentEquation.push(currentNumber)
                currentNumber = '0'
                */
            }
        }
        cleared = false;
        console.log(currentNumber);
    }
    console.log(currentEquation.length);
}
function process_data() {
    console.log("XXXXXXXXXXX Entered CLEAR XXXXXXXXXX");
    let to_do = currentEquation[1]; // Takes the operation that needs to be performed
    let to_move = currentEquation[3]; // Takes operation that is to be moved
    let numbers = [currentEquation[0], currentEquation[2]];
    currentEquation.pop();
    historyEquations.push(currentEquation);
    console.log(historyEquations);
}
function clearScreen() {
    if (dataScreen && currentEquation.length < 3) {
        dataScreen.textContent = '0';
        currentEquation = []; // Clears array of all the elements
        cleared = true;
    }
}

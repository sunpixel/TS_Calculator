"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculate = calculate;
function calculate(nums, operand) {
    // converts string to number
    let num1 = parseFloat(nums[0]);
    let num2 = parseFloat(nums[1]);
    let result = 0;
    operand = operand.trim(); // Left here just in case
    // Switch statements for choosing where to go
    switch (operand) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '/':
            result = num1 / num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '**':
            result = Math.pow(num1, num2);
            break;
        // Complex operations Depricated
        /*
                case '√':
                    result = Math.sqrt(num1)
                    break;
                case 'sin':
                    result = Math.sin(num1)
                    break;
                case 'cosin':
                    result = Math.cos(num1)
                    break;
        */
        default:
            console.log('Default case');
    }
    return String(Math.round((result + Number.EPSILON) * 100) / 100);
}

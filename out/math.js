function toRadians(degrees) {
    return ((degrees % 360) + 360) % 360 * (Math.PI / 180);
}
function formatResult(value) {
    return String(Math.round((value + Number.EPSILON) * 100) / 100);
}
export function calculate(nums, operand) {
    try {
        const num1 = parseFloat(nums[0]);
        const num2 = nums.length > 1 ? parseFloat(nums[1]) : NaN;
        operand = operand.trim();
        switch (operand) {
            // Basic
            case '+': return formatResult(num1 + num2);
            case '-': return formatResult(num1 - num2);
            case '/':
                if (num2 === 0)
                    return '0';
                return formatResult(num1 / num2);
            case '*': return formatResult(num1 * num2);
            case '**': return formatResult(Math.pow(num1, num2));
            // Advanced
            case 'sin': return sin(nums[0]);
            case 'cos': return cosin(nums[0]);
            case 'tan': return tan(nums[0]);
            case 'cotan': return cotan(nums[0]);
            default: return '0';
        }
    }
    catch (_a) {
        return '0';
    }
}
export function sqrt(number) {
    let num1 = parseFloat(number);
    if (num1 < 0)
        return '0';
    return formatResult(Math.sqrt(num1));
}
function trigFunction(degrees, type) {
    try {
        const normalized = ((degrees % 360) + 360) % 360;
        let result;
        switch (type) {
            case 'sin':
                result = Math.sin(toRadians(normalized));
                break;
            case 'cos':
                result = Math.cos(toRadians(normalized));
                break;
            case 'tan':
                if ((normalized - 90) % 180 === 0)
                    return '0';
                result = Math.tan(toRadians(normalized));
                if (Math.abs(result) > 1e15)
                    return '0';
                break;
            case 'cotan':
                if (normalized % 180 === 0)
                    return '0';
                const tanVal = Math.tan(toRadians(normalized));
                if (tanVal === 0)
                    return '0';
                result = 1 / tanVal;
                break;
            default:
                return '0';
        }
        return formatResult(result);
    }
    catch (_a) {
        return '0';
    }
}
export function sin(degrees) {
    return trigFunction(parseFloat(degrees), 'sin');
}
export function cosin(degrees) {
    return trigFunction(parseFloat(degrees), 'cos');
}
export function tan(degrees) {
    return trigFunction(parseFloat(degrees), 'tan');
}
export function cotan(degrees) {
    return trigFunction(parseFloat(degrees), 'cotan');
}
// Must have
if (typeof window !== 'undefined') {
    window.MathFun = {
        calculate,
        sin,
        cosin,
        tan,
        cotan,
        sqrt
    };
}
// Define math logic ###DEPRICATED###
/*
export let mathOperations: { [key: string]: (x: string, y: string) => number } = {
    add: (x, y) => Number(x) + Number(y),
    subtract: (x, y) => Number(x) - Number(y),
    multiply: (x, y) => Number(x) * Number(y),
    division: (x, y) => Number(x) * Number(y),
    power: (x, y) => Math.pow(Number(x), Number(y)),
    sqrt: (x) => Math.sqrt(Number(x))   // Needs checking for negative numbers (Not YET needed (Negatives not implemented))
  };
*/

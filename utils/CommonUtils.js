const { expect } = require("@playwright/test");

class CommonUtils
{
    constructor(sessionVariable)
    {
        this.sessionVariable = sessionVariable;
    }

    subtractTwoNumbers(firstNumber, secondNumbe)
    {
        const num1 =  parseFloat(firstNumber.replace('$', ''));
        const num2 =  parseFloat(secondNumbe.replace('$', ''));
        const result = num1 - num2;
        const dollarResult = "$" + result.toFixed(2);
        return dollarResult;
    }

    addTwoNumbers(firstNumber, secondNumbe)
    {
        const num1 = parseFloat(firstNumber.replace('$', ''));
        const num2 = parseFloat(secondNumbe.replace('$', ''));
        const result = num1 + num2;
        const dollarResult = "$" + result.toFixed(2);
        return dollarResult;
    }

    removeDollarFromNumber(number)
    {
        const num1 = parseFloat(number.replace('$', ''));
        return num1;
    }
    
}
module.exports = {CommonUtils};





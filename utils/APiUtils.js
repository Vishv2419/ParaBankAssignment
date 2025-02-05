const { expect } = require("@playwright/test");

class APiUtils
{
    constructor(apiContext,sessionVariable)
    {
        this.apiContext = apiContext; 
        this.sessionVariable = sessionVariable;
    }

    
    async getTransactionDetails(accountNumber,orderAmount)
    {
        const transactionResponse = await this.apiContext.get(`https://parabank.parasoft.com/parabank/services_proxy/bank/accounts/${accountNumber}/transactions/amount/${orderAmount}?timeout=30000`,
        {   
            headers:{
                'Cookie' : `JSESSIONID=${this.sessionVariable.JSESSIONID}`
            },

    })
   const transactionResponseJsonArray = await transactionResponse.json();
   for (let i = 0; i < transactionResponseJsonArray.length; i++) {
        if(transactionResponseJsonArray[i].description.includes('Bill Payment to')) {
            expect(transactionResponseJsonArray[i].accountId).toBe(Number(accountNumber));
            expect(transactionResponseJsonArray[i].type).toBe('Debit');
            expect(transactionResponseJsonArray[i].amount).toBe(orderAmount);
            break;
        }
    }
  }
}
module.exports = {APiUtils};





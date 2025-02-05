const { expect } = require("@playwright/test");

class AccountOverviewPage{

    constructor(page,sharedData) {
        this.page = page;
        this.sharedData = sharedData;
        this.accountsOverviewTable = page.locator("#accountTable tbody");
        this.accountsOverviewTitle = page.locator(".title")
       
    }

    async validateAccountOverviewPageIsOpen(){
        await expect(this.accountsOverviewTitle.first()).toHaveText("Accounts Overview")
    }

    async getAccountDetailsOfAlreadyCreatedAccount(){
        await this.accountsOverviewTable.locator("tr a").first().waitFor({state : 'attached'});
        const oldAccountNumber =  await this.accountsOverviewTable.locator("tr a").first().textContent();
        const oldAccountAmount =  await this.accountsOverviewTable.locator("tr td:nth-child(2)").first().textContent();
        this.sharedData.oldAccountAmount = oldAccountAmount;
        this.sharedData.oldAccountNumber = oldAccountNumber;
    }


    async validateAmountForNewlyCreatedAccount(account,amount){
        await this.accountsOverviewTable.locator("tr a").first().waitFor({state : 'attached'});
        const optionsCount = await this.accountsOverviewTable.locator("tr a").count();
        for(let i =0;i< optionsCount; ++i)
        {
          const accountNumber =  await this.accountsOverviewTable.locator("tr a").nth(i).textContent();
            if(accountNumber.trim() === account)
            {
               await expect(this.accountsOverviewTable.locator("tr td:nth-child(2)").nth(i)).toHaveText(amount);
               break;
            }
        }

    }

}
module.exports = {AccountOverviewPage}

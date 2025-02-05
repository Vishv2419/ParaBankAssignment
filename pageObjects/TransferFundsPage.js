const { expect } = require("@playwright/test");

class TransferFundsPage{

    constructor(page,sharedData) {
        this.page = page;
        this.sharedData = sharedData;
        this.transferFundsTitle = page.locator(".title");
        this.amount = page.locator("#amount");
        this.fromAccount = page.locator("#fromAccountId");
        this.toAccount = page.locator("#toAccountId");
        this.transferButton = page.locator("input[value='Transfer']");
        this.transferCompleted = page.locator("#showResult .title");
        this.transferMessage = page.locator("#showResult p");
       
    }

    async validateTransferAccountsPageIsOpen(){
        await expect(this.transferFundsTitle.first()).toHaveText("Transfer Funds")
    }

    async transferAmountFromOneAccountToAnotherAccount(amount,fromAccountNumber, toAccountNumber){
        await this.fromAccount.waitFor({state : 'attached'});
        await this.amount.fill(String(amount));
        await this.fromAccount.selectOption({value : fromAccountNumber});
        await this.toAccount.selectOption({value : toAccountNumber});
        await this.transferButton.click();   
    }

    async validateTransferAmountMessage(amount,fromAccountNumber,toAccountNumber)
    {
        const expectedValue = `${amount} has been transferred from account #${fromAccountNumber} to account #${toAccountNumber}.`
        await this.transferCompleted.first().waitFor({state: 'visible'});
        await expect(this.transferCompleted).toBeVisible();
        await expect(this.transferCompleted).toHaveText("Transfer Complete!");
        await expect(this.transferMessage.first()).toContainText(expectedValue);
    }

}
module.exports = {TransferFundsPage}

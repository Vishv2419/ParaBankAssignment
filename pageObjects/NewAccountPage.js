const { expect } = require("@playwright/test");

class NewAccountPage{

    constructor(page,sharedData) {
        this.page = page;
        this.sharedData = sharedData;
        this.openNewAccountTitle = page.getByText("Open New Account");
        this.accountType = page.locator("#type");
        this.openNewAccountButton = page.locator("input[value='Open New Account']");
        this.openAccountText = page.locator("#openAccountResult");
        this.accountNumber = page.locator("#newAccountId");
        this.accountSelectList = page.locator("#fromAccountId option");
    }

    
    async validateOpenNewAccountPageIsOpen(){
        await expect(this.openNewAccountTitle).toHaveText("Open New Account")
    }

    async selectAccountTypeFromTheDropDown(accountName){
        this.accountType.selectOption(accountName);
    }

    async clickOpenNewAccountButton(){
        await this.accountSelectList.waitFor({state: 'attached'});
        await this.openNewAccountButton.click();
    }

    async validateNewOpenAccountTextMessage(){
        await this.openAccountText.waitFor({state: 'visible'});
        await expect(this.openAccountText).toBeVisible();
        await expect(this.openAccountText.locator("p").first()).toHaveText("Congratulations, your account is now open.")
    }

    async getNewelyCreatedAccountDetails(){
        const accountNumber = await this.accountNumber.textContent();
        this.sharedData.accountNumber = accountNumber;
        console.log("Account Number :" + accountNumber );
    }
}
module.exports = {NewAccountPage}

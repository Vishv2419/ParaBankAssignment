const { expect } = require("@playwright/test");

class HomePage{

    constructor(page,sharedData) {
        this.page = page;
        this.sharedData = sharedData;
        this.register = page.getByText("Register");
        this.welcomeText = page.locator(".title")
        this.openNewAccount = page.getByText("Open New Account");
        this.accountsOverviewLink = page.getByText("Accounts Overview");
        this.transferFundsLink = page.getByText("Transfer Funds");
        this.billPayLink = page.getByText("Bill Pay");
        this.home  = page.locator("#headerPanel .home a");
        this.about  = page.locator("#headerPanel .aboutus a");
        this.contact  = page.locator("#headerPanel .contact a");
        this.atmServices = page.getByText("ATM Services");
    }

    async navigateToTheApplication()
    {
        await this.page.goto("/");
    }

    async clickOnRegistrationLink() 
    {   
        await this.register.waitFor();
        await this.register.click();
    }

    async validateHomePageAfterLogin(){
        await expect(this.welcomeText).toHaveText("Welcome " + this.sharedData.username)
    }

    async clickOnOpenNewAccountLink(){
        this.openNewAccount.click();
    }

       
    async clickOnAccountsOverviewLink(){
        await this.accountsOverviewLink.click();
    }

    async clickOnTransferFundsLink(){
        await this.transferFundsLink.click();
    }

    async clickOnBillPayLink(){
        await this.billPayLink.click();
    }

    async clickOnHomeButtonLink(){
        await this.home.waitFor({state : 'visible'});
        await this.home.click();
    }

    async clickOnAboutButtonLink(){
        await this.about.click();
    }

    async clickOnContactButtonLink(){
        await this.contact.click();
    }

    async validateHomePageHeader(){
        await this.atmServices.waitFor();
        await expect(this.atmServices).toHaveText("ATM Services");
    }


}
module.exports = {HomePage}

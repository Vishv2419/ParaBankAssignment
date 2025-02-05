const { expect } = require("@playwright/test");

class BillPayPage{

    constructor(page,sharedData) {
        this.page = page;
        this.sharedData = sharedData;
        this.transferFundsTitle = page.locator(".title");
        this.payeeName = page.locator("[name='payee.name']");
        this.address = page.locator("[name='payee.address.street']");
        this.city = page.locator("[name='payee.address.city']");
        this.state = page.locator("[name='payee.address.state']");
        this.zipcode = page.locator("[name='payee.address.zipCode']");
        this.phoneNumber = page.locator("[name='payee.phoneNumber']");
        this.accountNumber = page.locator("[name='payee.accountNumber']");
        this.verifyAccountNumber = page.locator("[name='verifyAccount']");
        this.amount = page.locator("[name='amount']");
        this.fromAccount = page.locator("[name='fromAccountId']");
        this.sendPayment = page.locator("input[value='Send Payment']");
        this.billToPayCompleted = page.locator("#billpayResult .title");
        this.billToPayMessage = page.locator("#billpayResult p");
       
    }

    async validateBillPaymentServicePageIsOpen(){
        await expect(this.transferFundsTitle.first()).toHaveText("Bill Payment Service")
    }

    async enterBillToPayDetails(amount,fromAccountNumber) {
        await this.payeeName.waitFor();
        this.sharedData.payname = "Sample Test"
        await this.payeeName.fill("Sample Test");
        await this.address.fill("Sample Address");
        await this.city.fill("Sample City");
        await this.state.fill("Sample State");
        await this.zipcode.fill("Sample ZipCode");
        await this.phoneNumber.fill("123456789");
        await this.accountNumber.fill("1234");
        await this.verifyAccountNumber.fill("1234");
        await this.amount.fill(String(amount));
        await this.fromAccount.selectOption({value : fromAccountNumber});
        await this.sendPayment.click();
    }

    async validateBillToPayeMessage(amount,fromAccountNumber)
    {
        const expectedValue = `Bill Payment to ${this.sharedData.payname} in the amount of ${amount} from account ${fromAccountNumber} was successful.`
        await this.billToPayCompleted.first().waitFor({state: 'visible'});
        await expect(this.billToPayCompleted).toBeVisible();
        await expect(this.billToPayCompleted).toHaveText("Bill Payment Complete");
        await expect(this.billToPayMessage.first()).toContainText(expectedValue);
    }
 
}
module.exports = {BillPayPage}

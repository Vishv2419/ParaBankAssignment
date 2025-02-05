class UserRegistration{

    constructor(page,sharedData) {
        this.page = page;
        this.sharedData = sharedData;
        this.firstName = page.locator("input[id='customer.firstName']");
        this.lastName = page.locator("input[id='customer.lastName']");
        this.address = page.locator("input[id='customer.address.street']");
        this.city = page.locator("input[id='customer.address.city']");
        this.state = page.locator("input[id='customer.address.state']");
        this.zipCode = page.locator("input[id='customer.address.zipCode']");
        this.phoneNumber = page.locator("input[id='customer.phoneNumber']");
        this.ssn = page.locator("input[id='customer.ssn']");
        this.username = page.locator("input[id='customer.username']");
        this.password = page.locator("input[id='customer.password']");
        this.repeatedPassword = page.locator("input[id='repeatedPassword']");
        this.registeredButton = page.locator("input[value='Register']");

    }

    async registerNewUserOnParaBank(){
        await this.page.waitForLoadState('load', { timeout: 10000 });
        await this.firstName.fill("Sample Test")
        await this.lastName.fill("Sample Test");
        await this.address.fill("Sample Address");
        await this.city.fill("Sample City");
        await this.state.fill("Sample State");
        await this.zipCode.fill("Sample ZipCode");
        await this.phoneNumber.fill("123456788");
        await this.ssn.fill("1234");
        const username = "sampleUser" + Math.floor(Math.random() * 1000);
        await this.username.fill(username);
        this.sharedData.username = username;
        await this.password.fill("sampleUser");
        await this.repeatedPassword.fill("sampleUser");
        this.registeredButton.click();
    }

}
module.exports = {UserRegistration}
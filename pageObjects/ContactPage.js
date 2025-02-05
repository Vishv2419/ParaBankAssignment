const { expect } = require("@playwright/test");

class ContactPage{

    constructor(page,sharedData) {
       this.page = page;
       this.sharedData = sharedData;
       this.contactHeader = page.locator("#bodyPanel .title");
    }

    async validateContactHeaderMessage(){
        await this.contactHeader.waitFor();
        await expect(this.contactHeader).toHaveText("Customer Care");
    }

}
module.exports = {ContactPage}
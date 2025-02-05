const { expect } = require("@playwright/test");

class AboutPage{

    constructor(page,sharedData) {
       this.page = page;
       this.sharedData = sharedData;
       this.aboutHeader = page.getByText("ParaSoft Demo Website");
    }

    async validateAboutHeaderMessage(){
        await this.aboutHeader.waitFor();
        await expect(this.aboutHeader).toHaveText("ParaSoft Demo Website");

    }

}
module.exports = {AboutPage}
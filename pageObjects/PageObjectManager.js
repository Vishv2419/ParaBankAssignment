const {AboutPage} = require ('./AboutPage')
const {HomePage} = require ('./HomePage')
const {UserRegistration} = require ('./UserRegistration');
const { NewAccountPage } = require('./NewAccountPage');
const { AccountOverviewPage } = require('./AccountOverviewPage');
const { TransferFundsPage } = require('./TransferFundsPage');
const { BillPayPage } = require('./BillPayPage');
const { ContactPage } = require('./ContactPage');

class PageObjectManager {

    constructor(page,sharedData) {
        this.page = page;
        this.sharedData = sharedData;
        this.homePage = new HomePage(this.page,this.sharedData);
        this.userRegistration = new UserRegistration(this.page,this.sharedData);
        this.newAccountPage = new NewAccountPage(this.page,this.sharedData);
        this.accountOverviewPage = new AccountOverviewPage(this.page,this.sharedData);
        this.transferFundsPage = new TransferFundsPage(this.page,this.sharedData);
        this.billPayPage = new BillPayPage(this.page,this.sharedData);
        this.aboutPage = new AboutPage(this.page,this.sharedData);
        this.contactPage = new ContactPage(this.page,this.sharedData);
    }

}
module.exports = {PageObjectManager}
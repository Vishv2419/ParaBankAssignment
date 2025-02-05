const { test, expect } = require('../fixtures/sharedDataFixture');
const {pageObjectManager, PageObjectManager} = require('../pageObjects/PageObjectManager');
const { APiUtils } = require('../utils/APiUtils');
const { request } = require('@playwright/test');
const { CommonUtils } = require('../utils/CommonUtils');

test.describe.serial('Dependent Tests', () => {
    test('ParaBank @UI Test Scenario', async ({page,sharedData})=>
    {
        //Get Objects of All the Page
        const pageObjectManager = new PageObjectManager(page,sharedData);
        const homePage = pageObjectManager.homePage;
        const userRegistrationPage = pageObjectManager.userRegistration;
        const newAccountPage = pageObjectManager.newAccountPage;
        const accountOverviewPage = pageObjectManager.accountOverviewPage;
        const transferFundsPage = pageObjectManager.transferFundsPage;
        const billToPage = pageObjectManager.billPayPage;
        const commonUtils = new CommonUtils(sharedData);
        const aboutPage = pageObjectManager.aboutPage;
        const contactPage = pageObjectManager.contactPage;
    
        //Navigate to the ParaBank Application
        await homePage.navigateToTheApplication();
        
        //Register New User
        await homePage.clickOnRegistrationLink();
        await userRegistrationPage.registerNewUserOnParaBank();
        await homePage.validateHomePageAfterLogin();

        //Validate HomePage Global Links
        await homePage.clickOnHomeButtonLink();
        await homePage.validateHomePageHeader();
        await homePage.clickOnAboutButtonLink();
        await aboutPage.validateAboutHeaderMessage();
        await homePage.clickOnContactButtonLink();
        await contactPage.validateContactHeaderMessage();
       
        //Get Account and Amount details for Old Account
        await homePage.clickOnAccountsOverviewLink();
        await accountOverviewPage.getAccountDetailsOfAlreadyCreatedAccount();
        
        //Open New Account for the New User
        await homePage.clickOnOpenNewAccountLink();
        await newAccountPage.validateOpenNewAccountPageIsOpen();
        await newAccountPage.selectAccountTypeFromTheDropDown("SAVINGS");
        await newAccountPage.clickOpenNewAccountButton();
        await newAccountPage.validateNewOpenAccountTextMessage();
        await newAccountPage.getNewelyCreatedAccountDetails();

        //Store Amount In Session Variable
        sharedData.NewAccountAmount = '$100.00';
        sharedData.amountUsedInTestCase = '$10.00';
        
        //Validate Amount for Newly Account Created
        await homePage.clickOnAccountsOverviewLink();
        await accountOverviewPage.validateAccountOverviewPageIsOpen();
        await accountOverviewPage.validateAmountForNewlyCreatedAccount(sharedData.accountNumber,sharedData.NewAccountAmount);
        sharedData.oldAccountAmount = commonUtils.subtractTwoNumbers(sharedData.oldAccountAmount,sharedData.NewAccountAmount);
        await accountOverviewPage.validateAmountForNewlyCreatedAccount(sharedData.oldAccountNumber,sharedData.oldAccountAmount);
        
        //Transfer Amount from New Account To Old Account
        await homePage.clickOnTransferFundsLink();
        await transferFundsPage.validateTransferAccountsPageIsOpen();
        await transferFundsPage.transferAmountFromOneAccountToAnotherAccount(commonUtils.removeDollarFromNumber(sharedData.amountUsedInTestCase),sharedData.accountNumber,sharedData.oldAccountNumber);
        await transferFundsPage.validateTransferAmountMessage(sharedData.amountUsedInTestCase,sharedData.accountNumber,sharedData.oldAccountNumber);
        
        //Validate Amount for Newly And Old Account
        await homePage.clickOnAccountsOverviewLink();
        await accountOverviewPage.validateAccountOverviewPageIsOpen();
        sharedData.NewAccountAmount = commonUtils.subtractTwoNumbers(sharedData.NewAccountAmount,sharedData.amountUsedInTestCase);
        await accountOverviewPage.validateAmountForNewlyCreatedAccount(sharedData.accountNumber,sharedData.NewAccountAmount);
        sharedData.oldAccountAmount = commonUtils.addTwoNumbers(sharedData.oldAccountAmount,sharedData.amountUsedInTestCase);
        await accountOverviewPage.validateAmountForNewlyCreatedAccount(sharedData.oldAccountNumber,sharedData.oldAccountAmount);

        //Pay Bill from New Account
        await homePage.clickOnBillPayLink();
        await billToPage.validateBillPaymentServicePageIsOpen();
        await billToPage.enterBillToPayDetails(commonUtils.removeDollarFromNumber(sharedData.amountUsedInTestCase),sharedData.accountNumber);
        await billToPage.validateBillToPayeMessage(sharedData.amountUsedInTestCase,sharedData.accountNumber);
        
        //Validate Amount for Newly Account
        await homePage.clickOnAccountsOverviewLink();
        await accountOverviewPage.validateAccountOverviewPageIsOpen();
        await accountOverviewPage.validateAmountForNewlyCreatedAccount(sharedData.accountNumber,'$80.00');    

        //Fetch Cookies for API Automation
        const cookies = await page.context().cookies();
        const JSESSIONID = cookies.find(cookie => cookie.name === 'JSESSIONID');
        sharedData.JSESSIONID = JSESSIONID.value;
   
    });

    test('ParaBank @API Test Scenario', async ({sharedData})=>
    {   
        //Define all the Objects
        const commonUtils = new CommonUtils(sharedData);
        const context = await request.newContext();
        const apiUtils = new APiUtils(context,sharedData);
    
        //Call Transaction API To Validate Bill To Pay Transaction
        await apiUtils.getTransactionDetails(sharedData.accountNumber,Number(commonUtils.removeDollarFromNumber(sharedData.amountUsedInTestCase)));
    });
});
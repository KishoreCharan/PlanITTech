const ContactPage = require('../support/pageObects/contactPage');
const ShopPage = require('../support/pageObects/shopPage');
const CartPage = require('../support/pageObects/cartPage');

describe('PlanIT Technical Assessment Testcases', () => {

beforeEach(() => {
  ContactPage.visit("https://jupiter.cloud.planittesting.com/");
  ContactPage.verifyTitle("Jupiter Toys");
});

  it('Test Case 1: Verify Error Messages for Mandatory Fields', () => {
    ContactPage.clickMenuButton("Contact");
    ContactPage.clickSubmitButton();
    ContactPage.verifyErrorMessage('Forename','Forename is required');
    ContactPage.verifyErrorMessage('Email','Email is required');
    ContactPage.verifyErrorMessage('Message','Message is required');    
    ContactPage.enterText("Forename","John");
    ContactPage.enterText("Email","test@test.com");
    ContactPage.enterText("Message","test message");  
    ContactPage.verifyNoErrorMessage('Forename','Forename is required');
    ContactPage.verifyNoErrorMessage('Email','Email is required');
    ContactPage.verifyNoErrorMessage('Message','Message is required');  
  });

  it('Test Case 2: Verify Successful Contact Form Submission', { waitForAnimations: false }, () => {
    ContactPage.clickMenuButton("Contact");
      Cypress._.times(5, () => {
      ContactPage.enterText("Forename","John");
      ContactPage.enterText("Email","test@test.com");
      ContactPage.enterText("Message","test message");  
      ContactPage.clickSubmitButton();
      ContactPage.verifySuccessMessage("Thanks John");
    })
  })

  it('Test Case 3: Verify Cart Item Prices, Subtotals, and Total Amount', () => {
    ContactPage.clickMenuButton("Shop");    
    ShopPage.addItemsToCart('Stuffed Frog', 'Fluffy Bunny', 'Valentine Bear'); 
    ContactPage.clickMenuButton("Cart");  
    CartPage.verifyCartValues();

  })
})

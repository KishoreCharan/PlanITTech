// Importing page object classes for Contact, Shop, and Cart pages.
const ContactPage = require('../support/pageObects/contactPage');
const ShopPage = require('../support/pageObects/shopPage');
const CartPage = require('../support/pageObects/cartPage');
// Describe block for the test suite: "Jupiter Toys - Contact Form Validation & Shopping Cart Verification".
describe('Jupiter Toys - Contact Form Validation & Shopping Cart Verification', () => {
// Runs before each test case - Navigates to the homepage and verifies the title.
beforeEach(() => {
  ContactPage.visit();
  ContactPage.verifyTitle("Jupiter Toys");
});

 // Test Case 1: Verifies error messages for mandatory fields in the Contact form.
  it('Test Case 1: Verify Error Messages for Mandatory Fields', () => {
    // Navigate to the "Contact" page.
    ContactPage.clickMenuButton("Contact");
    // Click the Submit button without filling the form.
    ContactPage.clickSubmitButton();
    // Verify error messages for required fields.
    ContactPage.verifyErrorMessage('Forename','Forename is required');
    ContactPage.verifyErrorMessage('Email','Email is required');
    ContactPage.verifyErrorMessage('Message','Message is required');  
    // Enter valid details in the fields.  
    ContactPage.enterText("Forename","John");
    ContactPage.enterText("Email","test@test.com");
    ContactPage.enterText("Message","test message"); 
    // Verify error messages for required fields.
    ContactPage.verifyNoErrorMessage('Forename','Forename is required');
    ContactPage.verifyNoErrorMessage('Email','Email is required');
    ContactPage.verifyNoErrorMessage('Message','Message is required');  
  });

  // Test Case 2: Verifies successful form submission and success message.
  it('Test Case 2: Verify Successful Contact Form Submission', { waitForAnimations: false }, () => {
     // Navigate to the "Contact" page.
      ContactPage.clickMenuButton("Contact");
      // Submitting the contact form 5 times using Cypress _.times()
      Cypress._.times(5, () => {
      ContactPage.enterText("Forename","John");
      ContactPage.enterText("Email","test@test.com");
      ContactPage.enterText("Message","test message"); 
      // Click Submit button and verify success message. 
      ContactPage.clickSubmitButton();
      ContactPage.verifySuccessMessage("Thanks John");
    })
  })
 // Test Case 3: Verifies cart item prices, subtotals, and total amount.
  it('Test Case 3: Verify Cart Item Prices, Subtotals, and Total Amount', () => {
    // Navigate to the "Shop" page.
    ContactPage.clickMenuButton("Shop");  
    // Navigate to the "Cart" page and add items to cart.  
    ShopPage.addItemsToCart('Stuffed Frog', 'Fluffy Bunny', 'Valentine Bear'); 
    // Navigate to the "Cart" page.
    ContactPage.clickMenuButton("Cart");
    // Verify cart values such as price, subtotal, and total after updating  quantity field.  
    CartPage.verifyCartValues();
  })
})

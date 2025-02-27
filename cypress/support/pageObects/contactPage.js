// ContactPage class handles interactions with the contact page of the application.
class ContactPage {

          locators = {
                     // Menu button locator - dynamically generates a selector for a given menu item.
                    menuButton: (menuItem) => `#nav-${menuItem.toLowerCase()} > a`,
                    // Submit button locator
                    submitButton: `div a.btn-contact`,
                    // Error message text area locator - dynamically generates a selector based on field name.
                    errorMessageTextArea: (fieldname) => `div[ng-class="{'error' : form.${fieldname.toLowerCase()}.$dirty && form.${fieldname.toLowerCase()}.$invalid}"]`,
                    // Success message text area locator
                    successMessageTextArea: `.alert-success strong`,
                     // Back button locator on success page
                    backButton: `a[ng-click$='goBack()']`,
                    // Input field locator - dynamically generates a selector for a given field name.
                    inputField: (fieldname) => `#${fieldname}`,

          };
         // Navigates to the home page (base URL is set in Cypress config).
          visit() 
          {
                    cy.visit("/");
          }
         // Verifies the title of the page matches the expected title.
          verifyTitle(title)
          {
                    cy.title().should('equal', title);

          }
          // Clicks on a menu button based on the provided menu item name.
          clickMenuButton(menuItem)
          {
                    cy.get(this.locators.menuButton(menuItem.toLowerCase())).click({ force: true });
          }
          // Clicks the submit button on the contact form.
          clickSubmitButton()
          {
                    cy.get(this.locators.submitButton).click();
          }
          // Verifies that an error message is displayed for a specific input field.
          verifyErrorMessage(fieldname, ErrorMessage)
          {
                    cy.get(this.locators.errorMessageTextArea(fieldname.toLowerCase())).should("contain", ErrorMessage)
          }
          // Verifies that an error message is not displayed for a specific input field.
          verifyNoErrorMessage(fieldname, ErrorMessage)
          {
                    cy.get(this.locators.errorMessageTextArea(fieldname.toLowerCase())).should("not.contain", ErrorMessage)
          }
          // Enters text into a specific input field, clearing any existing text first.
          enterText(fieldname, text) {
                    cy.get(this.locators.inputField(fieldname.toLowerCase())).clear().type(text);
          }
          // Verifies that a success message is displayed and then clicks the back button.
          verifySuccessMessage(text) {
                    cy.get(this.locators.successMessageTextArea, { timeout: 30000 }).should('be.visible').and('contain', text);
                    cy.get(this.locators.backButton).click();
          }

}
// Exports an instance of ContactPage for use in test files.
module.exports = new ContactPage();

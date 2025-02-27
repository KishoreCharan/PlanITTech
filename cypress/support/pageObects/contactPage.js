class ContactPage {

          locators = {              
                    menuButton:(menuItem)=>`#nav-${menuItem.toLowerCase()} > a`,
                    submitButton: `div a.btn-contact`,
                    errorMessageTextArea: (fieldname) =>`div[ng-class="{'error' : form.${fieldname.toLowerCase()}.$dirty && form.${fieldname.toLowerCase()}.$invalid}"]`,
                    successMessageTextArea:`.alert-success strong`,
                    backButton: `a[ng-click$='goBack()']`,
                    inputField:(fieldname)=>`#${fieldname}`,                    
                    
          };

          visit(url) {
                    cy.visit(url)
          }
          verifyTitle(title) {
                    cy.title().should('equal', title);

          }
          clickMenuButton(menuItem) {
          cy.get(this.locators.menuButton(menuItem.toLowerCase())).click({ force: true });
          }
          clickSubmitButton()
          {
           cy.get(this.locators.submitButton).click();
          }
          verifyErrorMessage(fieldname,ErrorMessage)
          {
                    cy.get(this.locators.errorMessageTextArea(fieldname.toLowerCase())).should("contain", ErrorMessage)     
          }
          verifyNoErrorMessage(fieldname,ErrorMessage)
          {
                    cy.get(this.locators.errorMessageTextArea(fieldname.toLowerCase())).should("not.contain", ErrorMessage)     
          }
          enterText(fieldname, text) {
                    cy.get(this.locators.inputField(fieldname.toLowerCase())).clear().type(text);
          }
          verifySuccessMessage(text)
          {
                    cy.get(this.locators.successMessageTextArea, { timeout: 30000 }).should('be.visible').and('contain', text);                    
                    cy.get(this.locators.backButton).click();  
          }
        
}
module.exports = new ContactPage();

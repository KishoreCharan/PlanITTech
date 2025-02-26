describe('PlanITTechnical Asset ment Testsg', () => {
  it('Test Case 1: Verify error messages', () => {
    cy.visit('https://jupiter.cloud.planittesting.com/')
    cy.contains('Contact');
    cy.get("ul li a").contains("Contact").click();
    cy.get("div a.btn-contact").click();
    


    
  })
})
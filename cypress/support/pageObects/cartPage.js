
// CartPage class handles interactions with the shopping cart page.
class CartPage {
          // Locators object stores CSS selectors for different elements in the cart.
          locators = {
                    // Locator for the quantity input field where users can change item quantity.
                    quantityField: `td input.input-mini`,
                    // Locator for the price text area displaying the price of each item.
                    priceTextArea: `td:nth-child(2)`,
                     // Locator for the subtotal text area displaying subtotal of each item.
                    subTotalTextArea: `td:nth-child(4)`,
                    // Locator for the total text area displaying the final total price.
                    totalTextArea: `strong:contains("Total:")`,
          };
          // This function verifies item prices, subtotals, and the total cart value after updating quantities.
          verifyCartValues() {
                    // Load test data from the fixture file (cartItems.json).
                    cy.fixture('cartItems').then((items) => {
                              cy.wrap(items).as('items');
                              // Calculate the expected total price of all items in the cart.
                              const expectedTotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
                              // Loop through each item in the fixture and validate its details.
                              items.forEach(item => {
                                        const expectedSubTotal = item.price * item.quantity;
                                        // Find the row corresponding to the item in the table.
                                        cy.get('table')
                                                  .contains('tr', item.name)  // Locate the row with the item name
                                                  .within(() => {
                                                            // Update quantity field with the expected quantity.
                                                            cy.get(this.locators.quantityField).clear().type(item.quantity)
                                                            // Verify the price of the item.
                                                            cy.get(this.locators.priceTextArea).invoke('text').then((textValue) => {
                                                                      const actualPrice = parseFloat(textValue.replace('$', '').trim());
                                                                      expect(actualPrice).to.equal(item.price);
                                                            });
                                                            // Verify the subtotal of the item.
                                                            cy.get(this.locators.subTotalTextArea).invoke('text').then((textValue) => {
                                                                      const actualSubTotal = parseFloat(textValue.replace('$', '').trim());
                                                                      expect(actualSubTotal).to.equal(expectedSubTotal);

                                                            });
                                                  });
                              });
                              // Verify the total price of all items in the cart.
                              cy.get(this.locators.totalTextArea).invoke('text').then(text => {
                                        const actualTotal = parseFloat(text.replace('Total:', '').replace('$', '').trim());
                                        expect(actualTotal).to.equal(expectedTotal);

                              })
                    });
          }
}
// Exports an instance of CartPage for use in test files.
module.exports = new CartPage();

class CartPage {

          locators = {


          };



          verifyCartValues() {
                    cy.fixture('cartItems').then((items) => {
                              cy.wrap(items).as('items');
                              const expectedTotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
                              items.forEach(item => {
                                        const expectedSubTotal = item.price * item.quantity;
                                        cy.get('table')
                                                  .contains('tr', item.name)  // Locate the row with the item name
                                                  .within(() => {
                                                            // Assert price
                                                            cy.get('td input.input-mini').clear().type(item.quantity)
                                                            cy.get('td:nth-child(2)').invoke('text').then((textValue) => {
                                                                      const actualPrice = parseFloat(textValue.replace('$', '').trim());
                                                                      expect(actualPrice).to.equal(item.price);
                                                            });
                                                            cy.get('td:nth-child(4)').invoke('text').then((textValue) => {
                                                                      const actualSubTotal = parseFloat(textValue.replace('$', '').trim());
                                                                      expect(actualSubTotal).to.equal(expectedSubTotal);

                                                            });
                                                  });
                              });

                              cy.get('strong:contains("Total:")').invoke('text').then(text => {
                                        const actualTotal = parseFloat(text.replace('Total:', '').replace('$', '').trim());
                                        expect(actualTotal).to.equal(expectedTotal);

                              })
                    });
          }
}
module.exports = new CartPage();

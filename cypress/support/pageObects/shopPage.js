// ShopPage class handles interactions with the shop page of the application.
class ShopPage {
          //locators
          locators = {
                     // Locator for the list of items displayed in the shop.
                    itemsList: `ul li.ng-scope`,
                    // Locator for the "Buy" button associated with each item.
                    buyButton: `.btn.btn-success`,
                    // Locator for the item name area where the product name is displayed.
                    itemNameArea: `h4`,
          };

          // This function adds specific items to the cart based on their names.
          // It loops through the list of items, finds the matching ones, and clicks the "Buy" button.
          addItemsToCart(item1, item2, item3) {
                    
                    const expectedItems = [item1, item2, item3]
                    cy.get(this.locators.itemsList).each(($item) => {
                              // Get the text of the item and trim any extra spaces.
                              const itemText = $item.find(this.locators.itemNameArea).text().trim()
                                // If the item is in the expected list, click the "Buy" button.
                              if (expectedItems.includes(itemText)) {

                                        cy.wrap($item).find(this.locators.buyButton).click();
                              }
                    })

          }
}
// Exports an instance of ShopPage for use in test files.
module.exports = new ShopPage();

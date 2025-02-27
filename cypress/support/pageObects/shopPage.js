class ShopPage {

          locators = {
                    itemsList: `ul li.ng-scope`,
                    buyButton: `.btn.btn-success`,
                    itemNameArea:`h4`,
          };


        
          addItemsToCart(item1, item2, item3) {
                    const expectedItems = [item1, item2, item3]
                    cy.get(this.locators.itemsList).each(($item) => {
                              const itemText = $item.find(this.locators.itemNameArea).text().trim()
                              if (expectedItems.includes(itemText)) {

                                        cy.wrap($item).find(this.locators.buyButton).click();
                              }
                    })

          }
}
module.exports = new ShopPage();

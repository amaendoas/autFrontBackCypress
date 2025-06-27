const ELEMENTS = {
    inventoryItem: '.inventory_item',
    itemName: '.inventory_item_name',
    addToCartButton: 'button[data-test^="add-to-cart-"]',
    cartBadge: '.shopping_cart_badge'
};

class ProductsPage {
    adicionarItemAoCarrinho(nomeDoProduto) {
        cy.contains(ELEMENTS.itemName, nomeDoProduto) // Encontra o nome do produto
          .parents(ELEMENTS.inventoryItem) // Sobe para o container do item
          .find(ELEMENTS.addToCartButton) // Encontra o botão "Add to cart" dentro dele
          .click();
    }

    verificarBadgeDoCarrinho(quantidade) {
        cy.get(ELEMENTS.cartBadge)
          .should('be.visible')
          .and('have.text', quantidade);
    }
}

export default new ProductsPage();
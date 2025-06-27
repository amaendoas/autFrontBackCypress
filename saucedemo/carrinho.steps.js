import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import productsPage from '../../support/pages/ProductsPage';

Given("que eu estou logado no SauceDemo", () => {
  // Usamos o comando customizado para um login padrão
  cy.login('standard_user', 'secret_sauce');
});

When("eu adiciono o item {string} ao carrinho", (nomeDoProduto) => {
  // Usamos o método do nosso Page Object
  productsPage.adicionarItemAoCarrinho(nomeDoProduto);
});

Then("o ícone do carrinho deve exibir {string} item", (quantidade) => {
  // Usamos outro método do Page Object para a verificação da UI
  productsPage.verificarBadgeDoCarrinho(quantidade);
});

// ESTE É O STEP QUE "ESPIONA" O ESTADO DA APLICAÇÃO
And("o armazenamento local deve conter o item adicionado", () => {
  // Acessamos a 'window' do navegador para ler o localStorage
  cy.window().then((win) => {
    // Pegamos o item 'cart-contents' que o SauceDemo usa
    const cartContents = win.localStorage.getItem('cart-contents');
    
    // Verificamos se não está nulo
    expect(cartContents).to.not.be.null;

    // Convertemos a string JSON para um objeto e verificamos o conteúdo
    const cartAsJson = JSON.parse(cartContents);
    // O SauceDemo salva um array de IDs. O ID da "Sauce Labs Backpack" é 4.
    expect(cartAsJson).to.deep.equal([4]);
  });
});

import { Before, After } from "cypress-cucumber-preprocessor/steps";

/**
 * HOOK BEFORE: Executado ANTES de CADA cenário.
 * Neste caso, usamos para visitar a página principal da aplicação.
 * Isso garante que todos os testes comecem do mesmo ponto de partida.
 */
Before(() => {
  cy.log('--- [HOOK BEFORE] Visitando a página principal ---');
  cy.visit('https://www.saucedemo.com/');
});

/**
 * HOOK AFTER: Executado APÓS CADA cenário.
 * Ideal para limpeza de estado, garantindo que um teste não interfira no próximo.
 * No caso do SauceDemo, limpar o localStorage é o mesmo que esvaziar o carrinho.
 */
After((scenario) => {
  cy.log(`--- [HOOK AFTER] Limpando o estado após o cenário: "${scenario.name}" ---`);
  cy.window().then((win) => {
    win.localStorage.clear();
  });
  cy.log('LocalStorage limpo. O carrinho está vazio para o próximo teste.');
});
// Comando para fazer login de forma rápida e reutilizável
Cypress.Commands.add('login', (username, password) => {
  cy.visit('/');
  cy.get('#user-name').type(username);
  cy.get('#password').type(password);
  cy.get('#login-button').click();
  cy.url().should('include', '/inventory.html'); // Garante que o login teve sucesso
});
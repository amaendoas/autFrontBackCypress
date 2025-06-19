  /**
   * Este hook é executado ANTES de CADA teste ('it' block) dentro desta suíte.
   */
  beforeEach(() => {
    cy.log('--- Início da Coleta de Estado (beforeEach) ---');

    // cy.window() nos dá acesso ao objeto 'window' do navegador da aplicação.
    // Usamos .then() para garantir que os comandos Cypress anteriores terminaram.
    cy.window().then((win) => {
      // Coleta do Local Storage
      const localStorageData = win.localStorage.getItem('creditos');

      cy.log('**LocalStorage:**'); // Título para a seção
      if (localStorageData) {
        cy.log('key: creditos');
        // Imprime o valor bruto, que já deve ser uma string JSON
        cy.log(`Value: ${localStorageData}`); 
      } else {
        cy.log('A chave "creditos" não foi encontrada no LocalStorage.');
      }
      
      // Coleta do Session Storage
      const sessionStorageData = win.sessionStorage.getItem('creditos');

      cy.log('**SessionStorage:**'); // Título para a seção
      if (sessionStorageData) {
        cy.log('key: creditos');
        cy.log(`Value: ${sessionStorageData}`);
      } else {
        cy.log('A chave "creditos" não foi encontrada no SessionStorage.');
      }
    });
    
    cy.log('--- Fim da Coleta de Estado (beforeEach) ---');
  });
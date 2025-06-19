// cypress/e2e/waits_assincrono.cy.js

// PASSO 1

describe('Lidando com Assincronicidade e Waits', () => {
    beforeEach(() => {
        // Não vamos visitar uma página padrão aqui, pois cada teste irá para uma diferente.
    });

    it('Deve demonstrar o wait automático do Cypress (Elemento escondido)', () => {
        cy.visit('https://the-internet.herokuapp.com/dynamic_loading/1');

        // Nesta página, há um elemento escondido que aparece após clicar em 'Start'.
        // O texto "Hello World!" está dentro de um div#finish
        cy.get('#finish h4').should('not.be.visible'); // Verifica que não está visível inicialmente

        cy.get('#start button').click();

        // Cypress automaticamente espera o elemento #finish h4 ficar visível
        // e ter o texto ANTES de falhar a asserção.
        // O defaultCommandTimeout é geralmente 4 segundos.
        cy.get('#finish h4', { timeout: 7000 }) // Podemos aumentar o timeout para um comando específico
          .should('be.visible')
          .and('contain.text', 'Hello World!');

        cy.log('Wait automático para elemento ficar visível funcionou!');
    });

    it('Deve demonstrar o wait automático do Cypress (Elemento renderizado depois)', () => {
        cy.visit('https://the-internet.herokuapp.com/dynamic_loading/2');

        // Nesta página, o elemento é renderizado no DOM após clicar em 'Start'.
        cy.get('#finish h4').should('not.exist'); // Verifica que não existe inicialmente

        cy.get('#start button').click();

        // Cypress espera o elemento #finish h4 ser adicionado ao DOM e ter o texto.
        cy.get('#finish h4', { timeout: 7000 })
          .should('exist') // Primeiro verifica se existe
          .should('be.visible') // Depois se está visível
          .and('contain.text', 'Hello World!');

        cy.log('Wait automático para elemento ser renderizado funcionou!');
    });

    //PASSO 2

    // "E se quisermos apenas... esperar um tempinho? cy.wait(TEMPO_EM_MILISSEGUNDOS) faz isso."

    it('Deve usar cy.wait() para uma duração fixa (COM MUITA CAUTELA!)', () => {
        cy.visit('https://the-internet.herokuapp.com/dynamic_loading/1');
        cy.get('#start button').click();

        // NÃO FAÇA ISSO COM FREQUÊNCIA!
        // Isto é apenas para demonstrar a sintaxe.
        // Se você sabe que algo *sempre* leva X segundos e não há outra forma de sincronizar,
        // pode ser uma última alternativa. Mas geralmente indica um "code smell".
        cy.log('Iniciando espera fixa de 2 segundos...');
        cy.wait(2000); // Espera 2000 milissegundos = 2 segundos
        cy.log('Espera fixa concluída.');

        // Tentar verificar o resultado.
        // O ideal seria que o wait automático do Cypress fosse suficiente aqui.
        cy.get('#finish h4', { timeout: 7000 })
          .should('be.visible')
          .and('contain.text', 'Hello World!');

        // Por que é ruim?
        // 1. Lento: Seu teste sempre esperará 2s, mesmo se o elemento aparecer em 0.5s.
        // 2. Instável: Se a condição demorar 2.1s, seu teste falhará.
        // Priorize sempre os waits automáticos ou waits por requisições de rede.
    });
});
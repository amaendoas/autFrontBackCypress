// cypress/e2e/seletores_regras_negocio.cy.js

describe('Testando Regras de Negócio da Página de Teste', () => {
    beforeEach(() => {
        cy.visit('./index.html');
    });

    /**
     * Desafio 1 Original: "Pegar 'Item 2' e depois 'Item Especial'"
     * Regra de Negócio: A lista de informações deve apresentar os itens na ordem correta,
     * com o 'Item Especial' seguindo o 'Item 2'.
     */
    it('Deve exibir "Item Especial" corretamente após "Item 2" na lista de informações', () => {
        cy.contains('li', 'Item 2')
          .next()
          .should('contain.text', 'Item Especial')
          .and('have.class', 'item-especial');
        cy.log('RN Verificada: Ordem e destaque do Item Especial na lista.');
    });

    /**
     * Desafio 2 Original: "Encontrar parágrafo específico dentro de uma seção"
     * Regra de Negócio: A seção de informações adicionais deve conter uma mensagem de
     * destaque específica sobre o Automação.
     */
    it('Deve exibir a mensagem de destaque "Automação é incrível." na seção de informações', () => {
        cy.get('#secao-info')
          .find('p.texto-destaque')
          .should('have.text', 'Automação é incrível.');
        cy.log('RN Verificada: Mensagem de destaque sobre Automação presente.');
    });

    /**
     * Desafio 3 Original: "Pegar input por data-cy e encontrar seu label"
     * Regra de Negócio: O campo de entrada para "Treinador" deve ser claramente
     * identificado com seu respectivo rótulo.
     */
    it('Deve rotular corretamente o campo de "Treinador" na seção de login', () => {
        cy.get('[data-cy="input-username"]')
          .parent()
          .find('label[for="username"]')
          .should('contain.text', 'Treinador:');
        cy.log('RN Verificada: Rótulo do campo de Treinador correto.');
    });

    /**
     * Desafio 4 Original: "Filtrar botões por texto e verificar classe adicional"
     * Regra de Negócio: O botão principal para submeter o login deve ser "Entrar"
     * e possuir o estilo visual primário.
     */
    it('Deve apresentar o botão "Entrar" como ação principal de login e com estilo primário', () => {
        cy.get('.btn')
          .contains('Entrar')
          .should('have.class', 'btn-primary');
        cy.log('RN Verificada: Botão de login principal correto e estilizado.');
    });

    /**
     * Nova Regra de Negócio: O título principal da página deve ser "Minha Página de Teste".
     * (Este é um exemplo simples, mas fundamental)
     */
    it('Deve exibir o título principal correto da página', () => {
        cy.get('h1').should('contain.text', 'Minha Página de Teste');
        cy.log('RN Verificada: Título principal da página.');
    });

    /**
     * Nova Regra de Negócio: Deve haver dois botões de ação disponíveis na seção de login.
     */
    it('Deve disponibilizar duas opções de ação (botões) na seção de login', () => {
        cy.get('#secao-login').find('button.btn').should('have.length', 2);
        cy.log('RN Verificada: Quantidade de botões de ação no login.');
    });
});
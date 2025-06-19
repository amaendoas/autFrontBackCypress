// cypress/e2e/seletores.cy.js
//PASSO 1
describe('Dominando Seletores', () => {
    beforeEach(() => {
        // Para visitar um arquivo local, precisamos do caminho relativo
        // da raiz do projeto.
        // IMPORTANTE: No Windows, pode ser necessário ajustar as barras ou usar file:///
        cy.visit('./index.html');
    });

    it('Deve selecionar elementos usando ID', () => {
        // No HTML, temos <div class="container" id="secao-login">
        // O seletor CSS para ID é '#' seguido do valor do ID.
        cy.get('#secao-login').should('exist'); // 'should('exist')' verifica se o elemento foi encontrado

        // E o campo de Treinador: <input type="text" id="username" ...>
        cy.get('#username').should('exist');
        cy.log('Elemento com ID "username" encontrado!'); // cy.log é útil para debug
    });

    it('Deve selecionar elementos usando Classe', () => {
        // Temos vários elementos com a classe "container":
        // <div class="container" id="secao-login">
        // <div class="container" id="secao-info">
        // O seletor CSS para classe é '.' seguido do nome da classe.
        cy.get('.container').should('have.length', 2); // Verifica que encontramos 2 elementos

        // E o botão de login tem duas classes: "btn" e "btn-primary"
        // <button class="btn btn-primary" data-cy="botao-login">Entrar</button>
        cy.get('.btn-primary').should('exist');
        cy.get('.btn.btn-primary').should('exist'); // Combinando classes (elemento que TEM AMBAS as classes)
        cy.log('Botão primário encontrado pela classe!');
    });

    it('Deve selecionar elementos usando Atributo', () => {
        // O campo username tem: name="username"
        // <input type="text" id="username" name="username" ...>
        // O seletor CSS para atributo é [nome-do-atributo="valor-do-atributo"]
        cy.get('[name="username"]').should('exist');

        // E se quisermos pegar todos os inputs de texto?
        // <input type="text" ...>
        cy.get('input[type="text"]').should('exist');
        cy.log('Input com name="username" encontrado pelo atributo!');
    });

    it('Deve selecionar elementos combinando Tag e Classe/ID', () => {
        // Queremos o h1: <h1>Minha Página de Teste</h1>
        cy.get('h1').should('contain.text', 'Ginásio de Captura de Elementos');

        // Queremos um botão com a classe "btn-secondary"
        // <button class="btn btn-secondary" ...>Limpar Campos</button>
        cy.get('button.btn-secondary').should('exist');
        cy.log('H1 e botão secundário encontrados!');
    });


    //PASSO 2

    //"O Cypress vai preencher o campo com um seletor que ele acha bom. 
    // Ele geralmente tenta ser bem específico."

    it('Deve usar o Selector Playground para encontrar um elemento', () => {
        // Exemplo: O seletor copiado do Playground para "Automação é incrível."
        // Poderia ser algo como: '#secao-info > .texto-destaque'
        cy.get('#secao-info > .texto-destaque').should('contain.text', 'Automação é incrível.');
        // Mostre que o selector playground também pode te dar o data-cy se ele existir.
    });


    // PASSO 3
    //  cy.contains()."
    
    it('Deve selecionar elementos usando cy.contains()', () => {
        // Quero o botão que diz "Entrar"
        cy.contains('Entrar').should('exist');

        // Quero o parágrafo que contém "Bem-vindo"
        cy.contains('Bem-vindo').should('exist');

        // Podemos ser mais específicos, combinando com um seletor
        // Quero um 'h2' que contenha "Login"
        cy.get('h2').contains('Login').should('exist');

        // E se tivermos textos parecidos? cy.contains() pega o primeiro que encontrar.
        // Na nossa página, "Item 1", "Item 2", "Item Especial"
        cy.contains('Item').click(); // Vai clicar no "Item 1"
        cy.log('cy.contains() é muito útil para elementos com texto único!');
    });

    //PASSO 4
    // Navegando na Árvore DOM - .find(), .parent(), .children(), .siblings())
    // "Encontrar algo dentro de um elemento que já "temos", ou ao redor dele.

    it('Deve navegar na árvore DOM com .find(), .parent(), .children(), .siblings()', () => {
        // Primeiro, vamos pegar a seção de login
        cy.get('#secao-login').then(($secaoLogin) => {
            // $secaoLogin é o elemento jQuery que o cy.get() nos dá
            // Dentro desta seção, queremos encontrar o input de senha pelo seu ID
            // Usamos .find() para procurar DENTRO de $secaoLogin
            cy.wrap($secaoLogin).find('#password').should('exist');

            // A partir do input de senha, queremos o seu <label>
            // O label é um irmão anterior (previous sibling) ou está associado pelo 'for'
            // Vamos pegar o label do username e depois seu input
            cy.contains('label', 'Treinador:').parent().find('input#username').should('exist');
        });

        // Vamos pegar a lista <ul> dentro de #secao-info
        cy.get('#secao-info').find('ul').then(($lista) => {
            // Quantos filhos <li> tem essa lista?
            cy.wrap($lista).children('li').should('have.length', 3);

            // Pegar o 'Item Especial' e depois seu irmão anterior
            cy.wrap($lista).find('.item-especial').prev().should('contain.text', 'Item 2');

            // Pegar o 'Item 1' e depois todos os seus irmãos seguintes
            cy.wrap($lista).contains('li', 'Item 1').nextAll().should('have.length', 2);
        });

        // Pegar o botão 'Entrar' e depois seu elemento pai (o div #secao-login)
        cy.get('[data-cy="botao-login"]').parent().should('have.id', 'secao-login');

        // Pegar o botão 'Entrar' e depois seus irmãos (o botão 'Limpar Campos')
        cy.get('[data-cy="botao-login"]').siblings('.btn-secondary').should('contain.text', 'Limpar Campos');

        cy.log('Navegação no DOM é poderosa para contextos específicos!');
    });

    //PASSO 5
    //"Agora, o DEV pode e deve ajudar, com "o segredo dos profissionais para testes que não quebram fácil"!
    // o mais comum para Cypress é data-cy."

    it('Deve usar atributos data-cy para seletores resilientes', () => {
        cy.get('[data-cy="input-username"]').should('exist');
        cy.get('[data-cy="input-password"]').type('senhaSuperSecreta'); // Já vamos interagir um pouquinho!
        cy.get('[data-cy="botao-login"]').should('be.visible'); // .be.visible verifica se está visível na tela

        // Se o designer mudar a classe do botão de 'btn-primary' para 'button-super-cool',
        // o seletor cy.get('.btn-primary') quebraria.
        // Mas cy.get('[data-cy="botao-login"]') CONTINUARIA FUNCIONANDO!
        cy.log('Atributos data-cy são seus melhores amigos para testes estáveis!');
    });

    //DESAFIOS:
    // 1
    it('Desafio 1: Pegar "Item 2" e depois "Item Especial"', () => {
        cy.contains('li', 'Item 2') // Encontra o <li> que contém 'Item 2'
          .next() // Move para o próximo irmão <li>
          .should('contain.text', 'Item Especial') // Verifica se é o "Item Especial"
          .and('have.class', 'item-especial'); // E verifica se tem a classe correta
        cy.log('Desafio 1 Concluído!');
    });

    //2
    it('Desafio 2: Encontrar parágrafo específico dentro de uma seção', () => {
        cy.get('#secao-info') // Pega a div pela ID
          .find('p.texto-destaque') // Encontra o parágrafo com a classe dentro da div
          .should('have.text', 'Automação é incrível.'); // Verifica o texto
        cy.log('Desafio 2 Concluído!');
    });

    //3
    it('Desafio 3: Pegar input por data-cy e encontrar seu label', () => {
        cy.get('[data-cy="input-username"]') // Pega o input pelo data-cy
          .parent() // Navega para o elemento pai (que deve conter o label e o input)
          .find('label[for="username"]') // Encontra o label associado ao 'username'
          .should('contain.text', 'Treinador:');
        cy.log('Desafio 3 Concluído!');
    });

    //4
    it('Desafio 4: Filtrar botões por texto e verificar classe adicional', () => {
        cy.get('.btn') // Pega todos os elementos com a classe 'btn'
          .contains('Entrar') // Filtra para encontrar o que contém o texto 'Entrar'
          .should('have.class', 'btn-primary'); // Verifica se este botão também tem a classe 'btn-primary'
        cy.log('Desafio 4 Concluído!');
    });


});
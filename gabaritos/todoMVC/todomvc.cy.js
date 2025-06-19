//"No todomvc.cy.js, vamos começar visitando a página e tentando adicionar nossa primeira tarefa."

// cypress/e2e/todomvc.cy.js

//passo 1
describe('Testes para a aplicação TodoMVC', () => {
    // Hook para visitar a página antes de cada teste
    beforeEach(() => {
        cy.visit('https://todomvc.com/examples/react/dist/');
    });

    it('Deve ser capaz de adicionar uma nova tarefa', () => {
        // 1. Encontrar o campo de input para novas tarefas.
        //    No TodoMVC (React), o seletor comum é '.new-todo' ou por placeholder.
        //    Vamos usar o data-testid que a aplicação React pode fornecer, ou um seletor de classe/placeholder.
        //    Inspecionando, vemos que ele tem a classe 'new-todo'.
        const novaTarefa = 'Aprender Cypress Interações';
        cy.get('.new-todo')
          .should('be.visible') // Boa prática: verificar se está visível antes de interagir
          .type(`${novaTarefa}{enter}`); // Digita a tarefa e pressiona Enter

        // 2. Verificar se a tarefa foi adicionada à lista.
        //    As tarefas aparecem em uma lista <ul> com a classe 'todo-list'.
        //    Dentro dela, cada <li> representa uma tarefa.
        cy.get('.todo-list li')
          .should('have.length', 1) // Devemos ter 1 tarefa na lista
          .and('contain.text', novaTarefa); // E o texto da tarefa deve estar lá

        cy.log(`Tarefa "${novaTarefa}" adicionada com sucesso!`);
    });

    it('Deve ser capaz de adicionar múltiplas tarefas', () => {
        const tarefa1 = 'Estudar seletores';
        const tarefa2 = 'Praticar interações';
        const tarefa3 = 'Escrever asserções';

        cy.get('.new-todo').type(`${tarefa1}{enter}`);
        cy.get('.new-todo').type(`${tarefa2}{enter}`);
        cy.get('.new-todo').type(`${tarefa3}{enter}`);

        cy.get('.todo-list li').should('have.length', 3);
        cy.get('.todo-list li').eq(0).should('contain.text', tarefa1); // .eq(index) pega um elemento específico na lista
        cy.get('.todo-list li').eq(1).should('contain.text', tarefa2);
        cy.get('.todo-list li').eq(2).should('contain.text', tarefa3);

        cy.log('Múltiplas tarefas adicionadas e verificadas!');
    });

    //Uma funcionalidade chave do TodoMVC é marcar tarefas como concluídas. Vamos testar isso. O elemento para marcar é um checkbox."

    //PASSO 2

    // ... continuação de todomvc.cy.js

    it('Deve ser capaz de marcar uma tarefa como concluída', () => {
        const tarefaParaMarcar = 'Fazer café';
        cy.get('.new-todo').type(`${tarefaParaMarcar}{enter}`);

        // A tarefa deve existir e não estar completada inicialmente
        cy.get('.todo-list li')
          .first() // Pega o primeiro <li> (nossa tarefa)
          .should('contain.text', tarefaParaMarcar)
          .and('not.have.class', 'completed'); // A classe 'completed' é adicionada quando marcada

        // Encontrar o checkbox de "toggle" dentro do <li> e clicar nele
        // Ele geralmente tem a classe 'toggle'
        cy.get('.todo-list li').first().find('.toggle').check(); // .check() é para checkboxes e radio buttons

        // Agora, a tarefa deve ter a classe 'completed'
        cy.get('.todo-list li')
          .first()
          .should('have.class', 'completed');

        cy.log(`Tarefa "${tarefaParaMarcar}" marcada como concluída!`);
    });

    it('Deve ser capaz de desmarcar uma tarefa concluída', () => {
        const tarefa = 'Passear com o doguinho';
        cy.get('.new-todo').type(`${tarefa}{enter}`);

        // Marca como concluída
        cy.get('.todo-list li').first().find('.toggle').check();
        cy.get('.todo-list li').first().should('have.class', 'completed');

        // Desmarca
        cy.get('.todo-list li').first().find('.toggle').uncheck(); // .uncheck() para desmarcar
        cy.get('.todo-list li').first().should('not.have.class', 'completed');

        cy.log(`Tarefa "${tarefa}" desmarcada!`);
    });

    // "O TodoMVC permite editar tarefas com um duplo clique." Façam

    // ... continuação de todomvc.cy.js

    it('Deve ser capaz de editar uma tarefa existente', () => {
        const tarefaOriginal = 'Comprar pão';
        const tarefaEditada = 'Comprar pão integral';

        cy.get('.new-todo').type(`${tarefaOriginal}{enter}`);

        // Para editar, geralmente é um duplo clique no label da tarefa
        cy.get('.todo-list li')
          .first()
          .find('label') // Encontra o label dentro do <li>
          .dblclick(); // Simula o duplo clique

        // Após o dblclick, um input de edição aparece.
        // Ele geralmente está dentro do <li> e tem a classe 'edit'
        // É importante que o seletor do campo de edição seja preciso.
        // O input de edição pode substituir o label ou aparecer ao lado.
        // No TodoMVC, o <li> ganha a classe 'editing', e um input.edit aparece.
        cy.get('.todo-list li.editing .edit')
          .should('be.visible')
          .clear() // Limpa o texto original
          .type(`${tarefaEditada}{enter}`); // Digita o novo texto e Enter

        // Verificar se a tarefa foi atualizada
        cy.get('.todo-list li')
          .first()
          .should('contain.text', tarefaEditada)
          .and('not.contain.text', tarefaOriginal);

        cy.log(`Tarefa editada de "${tarefaOriginal}" para "${tarefaEditada}"!`);
    });

    //PASSO 4

    //"Finalmente, vamos excluir uma tarefa. No TodoMVC, um botão 'destroy' (geralmente um 'X') aparece quando passamos o mouse sobre a tarefa."

    // ... continuação de todomvc.cy.js

    it('Deve ser capaz de excluir uma tarefa', () => {
        const tarefaParaExcluir = 'Pagar contas';
        cy.get('.new-todo').type(`${tarefaParaExcluir}{enter}`);

        // A tarefa deve existir
        cy.get('.todo-list li').should('have.length', 1);

        // O botão de excluir (classe 'destroy') só aparece no hover.
        // O Cypress pode interagir com elementos mesmo que não estejam visíveis
        // por hover, mas para forçar o hover (se necessário para o botão aparecer no DOM):
        // cy.get('.todo-list li').first().trigger('mouseover');
        // No entanto, o Cypress é inteligente. Se o botão 'destroy' está no DOM
        // (mesmo que oculto por CSS e apareça no hover), ele pode tentar interagir.
        // Uma forma mais robusta é forçar o clique se ele não estiver visível
        // ou garantir que a lógica da aplicação o torne clicável.
        // No TodoMVC, ele está no DOM, então podemos tentar encontrá-lo diretamente.
        cy.get('.todo-list li')
          .first()
          .find('.destroy') // Encontra o botão de excluir
          .click({ force: true }); // {force: true} pode ser usado se o elemento estiver coberto ou algo assim.
                                  // No TodoMVC, o botão é visível no hover, mas o Cypress pode clicar nele.

        // Verificar se a lista de tarefas está vazia
        cy.get('.todo-list li').should('not.exist'); // ou .should('have.length', 0)

        cy.log(`Tarefa "${tarefaParaExcluir}" excluída!`);
    });

    //DESAFIOS
    // cypress/e2e/todomvc.cy.js

describe('Testes para a aplicação TodoMVC - Desafios', () => {
    beforeEach(() => {
        cy.visit('https://todomvc.com/examples/react/dist/');
    });

    it('RN: O contador de itens restantes deve ser atualizado corretamente', () => {
        // Adiciona Tarefa 1
        cy.get('.new-todo').type('Comprar pão{enter}');
        cy.get('.todo-count').should('contain.text', '1 item left');

        // Adiciona Tarefa 2
        cy.get('.new-todo').type('Revisar código{enter}');
        cy.get('.todo-count').should('contain.text', '2 items left');

        // Marca a primeira tarefa como concluída
        cy.get('.todo-list li')
          .first() // Pega a primeira tarefa ("Comprar pão")
          .find('.toggle')
          .check();
        cy.get('.todo-count').should('contain.text', '1 item left');

        // Marca a segunda tarefa como concluída
        cy.get('.todo-list li')
          .eq(1) // Pega a segunda tarefa ("Revisar código")
          .find('.toggle')
          .check();
        cy.get('.todo-count').should('contain.text', '0 items left');
        cy.log('Desafio 1: Contador de itens validado com sucesso!');
    });

    // ---

    it('RN: O filtro "Active" deve exibir apenas as tarefas ativas', () => {
        // Adiciona tarefas
        cy.get('.new-todo').type('Comprar leite{enter}');
        cy.get('.new-todo').type('Lavar o carro{enter}');
        cy.get('.new-todo').type('Ler um livro{enter}');

        // Marca "Lavar o carro" como concluída
        cy.get('.todo-list li')
          .contains('Lavar o carro') // Encontra o item pelo texto
          .parent() // Pega o <li> pai
          .find('.toggle')
          .check();

        // Clica no filtro "Active"
        cy.get('.filters').contains('Active').click();

        // Verifica as tarefas visíveis
        cy.get('.todo-list li:visible').should('have.length', 2);
        cy.get('.todo-list li:visible').should('contain.text', 'Comprar leite');
        cy.get('.todo-list li:visible').should('contain.text', 'Ler um livro');
        cy.get('.todo-list li').contains('Lavar o carro').should('not.be.visible');
        // Ou, mais especificamente, verificar se o li concluído tem o estilo que o oculta
        // cy.get('.todo-list li').contains('Lavar o carro').parents('li').should('have.css', 'display', 'none');
        // No TodoMVC, os itens não visíveis por filtro não são removidos do DOM, apenas ocultados.

        cy.log('Desafio 2: Filtro "Active" validado com sucesso!');
    });

    // ---

    it('RN: O filtro "Completed" deve exibir apenas as tarefas concluídas', () => {
        // Adiciona tarefas
        cy.get('.new-todo').type('Tarefa A{enter}');
        cy.get('.new-todo').type('Tarefa B{enter}');
        cy.get('.new-todo').type('Tarefa C{enter}');


        // Marca "Tarefa A" e "Tarefa C" como concluídas
        cy.get('.todo-list li')
          .contains('Tarefa A')
          .parent()
          .find('.toggle')
          .check();
        cy.get('.todo-list li')
          .contains('Tarefa C')
          .parent()
          .find('.toggle')
          .check();

        // Clica no filtro "Completed"
        cy.get('.filters').contains('Completed').click();

        // Verifica as tarefas visíveis
        cy.get('.todo-list li:visible').should('have.length', 2);
        cy.get('.todo-list li:visible').should('contain.text', 'Tarefa A');
        cy.get('.todo-list li:visible').should('contain.text', 'Tarefa C');
        cy.get('.todo-list li').contains('Tarefa B').should('not.be.visible');

        cy.log('Desafio 3: Filtro "Completed" validado com sucesso!');
    });

    // ---

    it('RN: O botão "Clear completed" deve remover tarefas concluídas e gerenciar sua visibilidade', () => {
        // Adiciona tarefas
        cy.get('.new-todo').type('Limpar a casa{enter}');    // Ativa
        cy.get('.new-todo').type('Estudar Cypress{enter}'); // Será concluída
        cy.get('.new-todo').type('Fazer compras{enter}');  // Será concluída

        // Verifica que o botão "Clear completed" não está visível inicialmente (ou não existe)
        // No TodoMVC, ele não existe no DOM se não há tarefas completadas.
        cy.get('.clear-completed').should('not.exist');

        // Marca 2 tarefas como concluídas
        cy.get('.todo-list li')
          .contains('Estudar Cypress')
          .parent()
          .find('.toggle')
          .check();
        cy.get('.todo-list li')
          .contains('Fazer compras')
          .parent()
          .find('.toggle')
          .check();

        // Verifica se o botão "Clear completed" está visível agora
        cy.get('.clear-completed').should('be.visible');

        // Clica no botão "Clear completed"
        cy.get('.clear-completed').click();

        // Verifica a lista de tarefas
        cy.get('.todo-list li').should('have.length', 1);
        cy.get('.todo-list li').first().should('contain.text', 'Limpar a casa');

        // Verifica se o botão "Clear completed" não está mais visível/não existe
        cy.get('.clear-completed').should('not.exist');

        cy.log('Desafio 4: Botão "Clear completed" validado com sucesso!');
    });
});

/*
Observações Importantes para os Alunos:

Seletores: Os seletores usados (.new-todo, .todo-list li, .toggle, .filters, .clear-completed, .todo-count) são baseados na estrutura comum do TodoMVC. Se a versão específica que eles estão usando tiver seletores ligeiramente diferentes (por exemplo, data-testids), eles precisarão ajustar. Incentivar o uso da ferramenta de inspeção do navegador é crucial.
Visibilidade vs. Existência: No TodoMVC, quando os filtros são aplicados, os <li> que não correspondem ao filtro não são removidos do DOM, mas sim ocultados (geralmente com CSS display: none; ou tendo uma classe hidden). Por isso, usamos :visible (ex: cy.get('.todo-list li:visible')) para contar ou interagir apenas com os que o usuário vê, ou verificamos diretamente se um item específico should('not.be.visible').
Assertividade do Contador: Para o contador, a asserção should('contain.text', '1 item left') é boa. Se quisessem ser mais precisos e pegar apenas o número, poderiam usar .then() para processar o texto.
{force: true}: Não foi necessário aqui, mas é bom lembrar que existe para casos onde elementos estão cobertos ou a interatividade é complexa.
Essas soluções devem fornecer um bom guia para os alunos entenderem como aplicar os conceitos de interação e asserção para validar regras de negócio em uma aplicação real.
*/


});

// cypress/e2e/todomvc_estruturado.cy.js
// (Podemos criar um novo arquivo para manter o anterior como referência)

describe('Gerenciamento da Lista de Tarefas no TodoMVC', () => {
    // Tudo relacionado ao TodoMVC virá aqui dentro

    // Nosso beforeEach que visita a página antes de cada teste
    // continua sendo muito útil aqui!
    beforeEach(() => {
        cy.visit('https://todomvc.com/examples/react/dist/'); // Usando baseUrl se configurada: cy.visit('/');
        // Para garantir um estado limpo para cada teste de regra de negócio:
        // Limpar o localStorage pode ser uma boa ideia para o TodoMVC
        cy.window().then((win) => {
            win.localStorage.clear();
        });
        cy.reload(); // Recarrega para aplicar a limpeza do localStorage
    });

    // Aqui virão nossos contextos e 'it' blocks...
});


//HOOKS
// ... dentro de describe('Gerenciamento da Lista de Tarefas no TodoMVC', () => { ... });

    context('RN-Feature: Criação de Novas Tarefas', () => {
        // Testes (regras de negócio) específicos para a criação de tarefas
        it('RN001: Deve permitir adicionar uma nova tarefa com texto válido', () => {
            const novaTarefa = 'Comprar leite';
            cy.get('.new-todo').type(`${novaTarefa}{enter}`);
            cy.get('.todo-list li')
              .should('have.length', 1)
              .and('contain.text', novaTarefa);
        });

        it('RN002: Não deve adicionar uma tarefa se o campo estiver vazio e Enter for pressionado', () => {
            cy.get('.new-todo').type('{enter}'); // Apenas Enter
            cy.get('.todo-list li').should('not.exist'); // Ou .should('have.length', 0)
        });

        it('RN003: Deve limpar o campo de input após adicionar uma tarefa com sucesso', () => {
            cy.get('.new-todo').type('Limpar a casa{enter}');
            cy.get('.new-todo').should('have.value', ''); // O campo deve estar vazio
        });
    }); // Fim do context 'Criação de Novas Tarefas'

    context('RN-Feature: Marcação de Tarefas (Concluída/Ativa)', () => {
        // Para este contexto, precisamos de uma tarefa existente ANTES de cada teste.
        // Podemos usar um beforeEach DENTRO deste context!
        const tarefaParaMarcar = 'Estudar Cypress Hooks';
        beforeEach(() => {
            // Adiciona uma tarefa base para os testes deste contexto
            cy.get('.new-todo').type(`${tarefaParaMarcar}{enter}`);
        });

        it('RN004: Deve permitir marcar uma tarefa ativa como concluída', () => {
            cy.get('.todo-list li')
              .contains(tarefaParaMarcar)
              .parent() // Pega o <li>
              .find('.toggle')
              .check();

            cy.get('.todo-list li')
              .contains(tarefaParaMarcar)
              .parents('li') // .parents('li') é mais robusto para pegar o elemento <li>
              .should('have.class', 'completed');
        });

        it('RN005: Deve atualizar o contador de itens ativos ao marcar uma tarefa', () => {
            cy.get('.todo-count').should('contain.text', '1 item left'); // Antes de marcar

            cy.get('.todo-list li').contains(tarefaParaMarcar).parent().find('.toggle').check();

            cy.get('.todo-count').should('contain.text', '0 items left'); // Depois de marcar
        });

        it('RN006: Deve permitir desmarcar uma tarefa concluída, tornando-a ativa novamente', () => {
            // Marca
            cy.get('.todo-list li').contains(tarefaParaMarcar).parent().find('.toggle').check();
            cy.get('.todo-list li').contains(tarefaParaMarcar).parents('li').should('have.class', 'completed');

            // Desmarca
            cy.get('.todo-list li').contains(tarefaParaMarcar).parent().find('.toggle').uncheck();
            cy.get('.todo-list li').contains(tarefaParaMarcar).parents('li').should('not.have.class', 'completed');
            cy.get('.todo-count').should('contain.text', '1 item left');
        });
    }); // Fim do context 'Marcação de Tarefas'

    // Exemplo conceitual de 'before' e 'after'
    context('RN-Feature: Funcionalidades que exigem login único', () => {
        before(() => {
            // Este código rodaria APENAS UMA VEZ antes de todos os 'it' abaixo
            cy.log('Executando LOGIN ÚNICO para esta suíte...');
            // cy.loginViaApi('usuario', 'senha'); // Supondo uma custom command
        });

        it('RN007: Deve acessar a página de perfil do usuário', () => {
            // cy.visit('/perfil');
            // ... asserções ...
        });

        it('RN008: Deve conseguir alterar as configurações de preferência', () => {
            // cy.visit('/configuracoes');
            // ... interações e asserções ...
        });

        after(() => {
            // Este código rodaria APENAS UMA VEZ depois de todos os 'it' acima
            cy.log('Executando LOGOUT ÚNICO ou limpeza final da suíte...');
            // cy.logoutViaApi();
        });
    });
describe('Gerenciamento da Lista de Tarefas no TodoMVC', () => {
    // Hook 'before' poderia ser usado para um setup global, se necessário

    beforeEach(() => {
        cy.visit('/'); // Visita a página antes de cada regra ser testada
        // Poderia limpar o localStorage para garantir lista vazia:
        // cy.window().then(win => win.localStorage.clear());
    });

    context('Criação de Novas Tarefas', () => {
        it('RN001: Deve permitir adicionar uma tarefa com texto válido', () => { /* ... */ });
        it('RN002: Não deve adicionar tarefa se o texto estiver vazio e Enter for pressionado', () => { /* ... */ });
        it('RN003: Deve limpar o campo de nova tarefa após adição bem-sucedida', () => { /* ... */ });
    });

    context('Visualização e Contagem de Tarefas', () => {
        it('RN004: Deve exibir o número correto de itens ativos no rodapé', () => { /* ... */ });
        // ... outras regras de visualização
    });

    context('Marcação de Tarefas (Completas/Ativas)', () => {
        // beforeEach específico para este contexto, se necessário
        // ex: garantir que uma tarefa exista para ser marcada
        beforeEach(() => {
            cy.get('.new-todo').type('Tarefa para marcar{enter}');
        });

        it('RN005: Deve permitir marcar uma tarefa ativa como concluída', () => { /* ... */ });
        it('RN006: Deve refletir a mudança de estado no contador de itens ativos', () => { /* ... */ });
    });

    // afterEach ou after poderiam ser usados para cleanup, se necessário
});
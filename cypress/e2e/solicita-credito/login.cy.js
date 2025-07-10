/// <reference types="cypress" />

describe('Login', () => {
    context('Login válido', () => {
        beforeEach(() => {
            cy.visit('/')
        })

        it('Validação dos campos obrigatórios', () => {
            cy.get('#nome').type('Amanda Dias')
            cy.get('#email').type('amanda@gmail.com')
            cy.get('#renda').type('20000')
            cy.get('#cpf').type('123.456.789-01')
            cy.get('#credito').type('5000')
            cy.get('[type="submit"]').click()

            cy.get('#result').should('exist').should('be.visible')

        })
        // Add your test cases here
    })
})
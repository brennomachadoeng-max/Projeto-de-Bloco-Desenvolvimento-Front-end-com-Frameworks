/// <reference types="cypress" />

describe('Fluxo de Agendamento de Consulta', () => {
  
  beforeEach(() => {
    cy.intercept('GET', '**/api/**').as('getMedicos');    
    cy.visit('http://localhost:5173/Agenda'); 
  });

  it('Deve permitir agendar uma nova consulta com sucesso', () => {
    cy.contains('button', '+ Nova Consulta').click();
    cy.url().should('include', '/SelecionarMedico');
    cy.wait('@getMedicos');
    cy.get('button').contains('Selecionar').first().click();
    cy.url().should('include', '/AgendarConsulta');
    const dataTeste = '2026-05-20';
    cy.get('input[type="date"]').type(dataTeste);
    cy.get('#horario').select('10:30');
    cy.get('#tipo').select('Presencial');
    cy.get('#obs').type('Teste automatizado Cypress: Sintomas de enxaqueca.');
    cy.contains('button', 'Confirmar Agendamento').click();
    cy.url().should('include', '/Agenda');
    cy.contains(/2026-05-20|20\/05\/2026/).should('be.visible');
    cy.contains('Confirmada').should('be.visible');
  });

  it('Deve mostrar erro ao tentar confirmar sem preencher campos obrigatórios', () => {
    cy.visit('http://localhost:5173/SelecionarMedico');
    cy.wait('@getMedicos');
    cy.get('button').contains('Selecionar').first().click();
    cy.contains('button', 'Confirmar Agendamento').click();
    cy.on('window:alert', (textoDoAlert) => {
      expect(textoDoAlert).to.contains('Preencha todos os campos obrigatórios');
    });
  });
});
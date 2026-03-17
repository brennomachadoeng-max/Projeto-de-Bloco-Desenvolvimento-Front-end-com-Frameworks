/// <reference types="cypress" />

describe('Fluxo de Agendamento de Consulta', () => {
  
  beforeEach(() => {
    // Intercepta a API de médicos para evitar erros de CORS ou lentidão
    // O asterisco ajuda a pegar qualquer variação da URL do randomuser
    cy.intercept('GET', '**/api/**').as('getMedicos');
    
    // Visita a página inicial
    cy.visit('http://localhost:5173/Agenda'); 
  });

  it('Deve permitir agendar uma nova consulta com sucesso', () => {
    // 1. Inicia o fluxo
    cy.contains('button', '+ Nova Consulta').click();

    // 2. Garante que estamos na tela de seleção e espera os médicos carregarem
    cy.url().should('include', '/SelecionarMedico');
    cy.wait('@getMedicos');

    // 3. Seleciona o primeiro médico disponível
    cy.get('button').contains('Selecionar').first().click();

    // 4. Preenche o formulário na tela de Agendamento
    cy.url().should('include', '/AgendarConsulta');

    // Preenche a data
    const dataTeste = '2026-05-20';
    cy.get('input[type="date"]').type(dataTeste);

    // Seleciona as opções nos selects pelo ID (mais seguro)
    cy.get('#horario').select('10:30');
    cy.get('#tipo').select('Presencial');
    cy.get('#obs').type('Teste automatizado Cypress: Sintomas de enxaqueca.');

    // 5. Confirma o agendamento
    cy.contains('button', 'Confirmar Agendamento').click();

    // 6. Verificações na Agenda
    cy.url().should('include', '/Agenda');
    
    // Verifica a data (usando Regex para aceitar 2026-05-20 ou 20/05/2026)
    cy.contains(/2026-05-20|20\/05\/2026/).should('be.visible');
    
    // Verifica se o status está correto
    cy.contains('Confirmada').should('be.visible');
  });

  it('Deve mostrar erro ao tentar confirmar sem preencher campos obrigatórios', () => {
    // Atalho: vai direto para a seleção de médicos
    cy.visit('http://localhost:5173/SelecionarMedico');
    cy.wait('@getMedicos');
    cy.get('button').contains('Selecionar').first().click();

    // Tenta confirmar sem preencher nada
    cy.contains('button', 'Confirmar Agendamento').click();

    // Valida o alerta do navegador
    cy.on('window:alert', (textoDoAlert) => {
      expect(textoDoAlert).to.contains('Preencha todos os campos obrigatórios');
    });
  });
});
/// <reference types="cypress" />
describe('Home screenshot', () => {
  it('should take a screenshot of the home page', () => {
    cy.visit('http://localhost:4200/');
    cy.matchImageSnapshot('Home');
  });
});


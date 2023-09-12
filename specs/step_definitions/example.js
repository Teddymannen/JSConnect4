import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('that I am on the first page', () => {
  // Goto the start page
  cy.visit('/');
});

Then('I can see the text {string}', (greeting) => {
  cy.get('body').contains(greeting);
});
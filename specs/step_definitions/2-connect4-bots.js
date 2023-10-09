import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

When('I click on the radio button {string} bots with name {string}', (className, inputName) => {
  cy.get(`input[class="${className}"][name="${inputName}"]`).click();
});

Then('there should exist {string} cells with class {string}', (pieceCount, playerColor) => {
  cy.get(`.${playerColor}`).should('have.length', pieceCount);
});

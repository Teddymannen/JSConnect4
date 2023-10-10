import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
// random number between 100 - 10000 without decimals
const randomChannel = Math.random().toString(10).substring(2, 6);

Given('we can see both screens', () => {
  cy.visit('/iframe-test.html');
});

Given('player {string} is on the game page', (i) => {
  cy.getIframeBody(i).contains('Connect Four');
});

Given('player {string} clicks on the {string} button', (i, buttonText) => {
  cy.getIframeBody(i).find('button[type="submit"]').contains(buttonText).click();
});

When('player {string} fill in {string} with {string}', (i, placeholder, inputName) => {
  cy.getIframeBody(i).find(`input[placeholder="${placeholder}"]`).type(inputName);
});

When('player {string} fill in {string} with a random channel', (i, placeholder) => {
  cy.getIframeBody(i).find(`input[placeholder="${placeholder}"]`).type(randomChannel);
});

Then('player {string} should see the info text {string}', (i, infoText) => {
  // cy.wait(1000);
  cy.getIframeBody(i).find('div[class="info"] p').should('contain', infoText);
});

When('player {string} click on column {string}', (i, col) => {
  cy.getIframeBody(i).find('table tr td').eq(col).click();
});

Then('player {string} should see a {string} player piece on position {string}', (i, color, pos) => {
  let posArray = pos.split(',').map(Number);
  cy.getIframeBody(i).find('table tr').eq(posArray[1]).within(() => {
    cy.get('td').eq(posArray[0]).should('have.class', color);
  });
});

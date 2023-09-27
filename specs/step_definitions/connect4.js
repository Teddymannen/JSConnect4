import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('I am on the game page', () => {
  cy.visit('/');
});

Then('I should see {string}', (gameName) => {
  cy.get('body h1[class="mainHeader"]').contains(gameName);
});

When('I fill in {string} with {string}', (player, name) => {
  cy.get('input[placeholder="' + player + '"]').type(name);
});

When('I click the Play button', () => {
  cy.get('button[type="submit"]').click();
});

Then('I should see the info text {string}', (infoText) => {
  cy.get('div[class="info"] p').contains(infoText);
});

When('I click on column {string}', (col) => {
  cy.get('table tr td').eq(col).click();
});

Then('I should see a {string} piece in the bottom of column {string}', (color, col) => {
  cy.get('table tr').eq(5).within(() => {
    cy.get('td').eq(col).should('have.class', color);
  });
});

When('I click column {string} six times', (col) => {
  // loop 6 times
  for (let i = 0; i < 6; i++) {
    cy.get('table tr td').eq(col).click();
  }
});

When('I click column {string} one more time', (col) => {
  cy.get('table tr td').eq(col).click();
});

Then('I should still see the info text {string}', (infoText) => {
  cy.get('div[class="info"] p').contains(infoText);
});

When('I click the {string} button', (buttonName) => {
  cy.get('button').contains(buttonName).click();
});

When('I click on the {string} radio button with {string}', (radioClass, radioName) => {
  // get radio button by class and radio name and click it
  cy.get(`input[class="${radioClass}"][name="${radioName}"]`).click();
});

Then('I should see the label text {string} and {string} for {string} and {string}', (labelText, placeholderText, labelID, inputLabel) => {
  // get label by id and check if it contains the label text
  cy.get(`#${labelID}`).contains(labelText).within(() => {
    // get input by class and check if it has the placeholder text
    cy.get(`input[class="${inputLabel}"]`).should('have.attr', 'placeholder', placeholderText);
  });
});
Cypress.Commands.add('getIframeBody', (i) => {
  // get the iframe > document > body
  // and retry until the body element is not empty
  cy.log('getIframeBody')

  return cy
    .get(`iframe[data-frame="test${i}"]`, { log: false })
    .its('0.contentDocument.body', { log: false }).should('not.be.empty')
    // wraps "body" DOM element to allow
    // chaining more Cypress commands, like ".find(...)"
    // https://on.cypress.io/wrap
    .then((body) => cy.wrap(body, { log: false }))
})
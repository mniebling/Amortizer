describe('canary', () => {
  it('should load the site and have the correct title', () => {
    cy.visit('http://localhost:4000')
    cy.title().should('contain', 'Visual Mortgage Calculator')
  })
})

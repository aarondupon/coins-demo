describe('Coins app', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('List → detail flow', () => {
    it('shows coins list and navigates to detail on tap', () => {
      // Wait for list to load
      cy.get('[data-testid="coins-title"]').should('be.visible');
      cy.get('[data-testid="coins-count"]').should('be.visible');

      // First coin row should appear (IDs come from API, use a partial match)
      cy.get('[data-testid^="coin-row-"]').first().should('be.visible');

      // Click first coin
      cy.get('[data-testid^="coin-row-"]').first().click();

      // Detail screen: price should be visible (format $X,XXX.XX or similar)
      cy.get('[data-testid="coin-detail-price"]').should('be.visible');
      cy.get('[data-testid="coin-detail-price"]').invoke('text').should('match', /\$[\d,]+\.?\d*/);
    });
  });

  describe('Error handling', () => {
    it('shows retry when API fails and list is empty', () => {
      // Clear persisted cache so we get a fresh fetch
      cy.clearLocalStorage();
      cy.intercept('GET', '**/coins*', { statusCode: 500 }).as('coinsFail');

      cy.visit('/');
      cy.wait('@coinsFail');

      // Empty state: error message and retry button
      cy.get('[data-testid="list-empty-error"]').should('be.visible');
      cy.get('[data-testid="list-retry-button"]').should('be.visible');
    });

    it('retry fetches again after API failure', () => {
      cy.clearLocalStorage();
      let callCount = 0;
      cy.intercept('GET', '**/coins*', (req) => {
        callCount += 1;
        if (callCount === 1) {
          req.reply({ statusCode: 500 });
        } else {
          req.continue();
        }
      }).as('coins');

      cy.visit('/');
      cy.wait('@coins');

      // After retry, list should load
      cy.get('[data-testid^="coin-row-"]').should('exist');
    });
  });
});

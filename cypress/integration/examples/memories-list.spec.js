describe('Memories list test', function () {
    beforeEach(function () {
      cy.login();
    });


    it('delayed response brings state out of sync', () => {

        cy.server();
        cy.route({
          method: 'GET',
          url: '/memories',
          status: 200,
          response: 'fixture:memories.json',
         });
         cy.route({
           delay: 2000,
           method: 'GET',
           url: '/memories/?filter=ka',
           status: 200,
           response: 'fixture:kajakken.json',
         }).as('getKAmemories');

        cy.visit('/memories');
        cy.get('[data-cy=filterInput]').type('ka');
        cy.wait(300);
        cy.get('[data-cy=memoryCard]').should('have.length', 1);
      });
    });
    
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
          //response: 'fixture:memories.json',
         });
         cy.route({
           delay: 10000,
           method: 'GET',
           url: '/memories/?filter=bier',
           status: 200,
           //response: 'fixture:kajakken.json',
         }).as('getBIERmemories');

        cy.visit('/memories');
        cy.get('[data-cy=filterInput]').type('bier');
        cy.wait(10000);
        cy.get('[data-cy=memoryCard]').should('have.length', 1);
      });
    });
    
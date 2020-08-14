describe('Friends list test', function () {
    beforeEach(function () {
      cy.login();
    });


    it('Check amount of friends', () => {

        cy.server();
        cy.route({
          method: 'GET',
          url: '/friends',
          status: 200,
          //response: 'fixture:friends.json',
         });

        cy.visit('/friends');
        cy.wait(300);
        cy.get('[data-cy=friends]').should('have.length', 3);
      });
    });
    
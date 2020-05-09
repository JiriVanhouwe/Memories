describe('Memories list test', function () {
    beforeEach(function () {
      cy.login();
    });


    it('delayed response brings state out of sync', () => {
        cy.server();
        cy.route({
          method: 'GET',
          url: '/api/memories',
          status: 200,
          response: 'fixture:memories.json',
        });
        cy.route({
          delay: 2000,
          method: 'GET',
          url: '/api/memories/?filter=ka',
          status: 200,
          response: 'fixture:kajakken.json',
        }).as('getKAmemories');
        cy.route({
          method: 'GET',
          url: '/api/memories/?filter=liv',
          status: 200,
          response: 'fixture:tegelsTellen.json',
        }).as('getLIVmemories');
    
        cy.visit('/');
        cy.get('[data-cy=filterInput]').type('ka');
        cy.wait(300);
        cy.get('[data-cy=filterInput]').type('{backspace}{backspace}liv');
        cy.wait(['@getKAmemories', '@getLIVmemories']);
        cy.get('[data-cy=memoryCard]').should('have.length', 1);
      });
    
    //   it('delete while showing', () => {
    //     cy.server();
    
    //     // add a recipe using a direct request
    //     cy.request({
    //       method: 'POST',
    //       url: '/api/recipes',
    //       body: {
    //         name: 'Spoofvlees',
    //         chef: 'Pieter',
    //         ingredients: [
    //           {
    //             name: 'mosterd',
    //             amount: 1,
    //             unit: 'gram',
    //           },
    //         ],
    //       },
    //       auth: {
    //         bearer: localStorage.getItem('currentUser'),
    //       },
    //     }).then((recipeJson) => {
    //       // check we have two before we start
    //       cy.visit('/');
    //       cy.get('[data-cy=filterInput]').type('sp');
    //       cy.wait(300);
    //       cy.get('[data-cy=recipeCard]').should('have.length', 2);
    //       // click the second delete button
    //       cy.get('[data-cy=recipeList').find('button').eq(1).click();
    //       // the newly added one should be deleted (and our view automatically updated)
    //       cy.get('[data-cy=recipeCard]').should('have.length', 1);
    //     });
    //   });
    });
    
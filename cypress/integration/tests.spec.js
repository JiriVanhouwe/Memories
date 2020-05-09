
//Hiervoor moet je inloggen

// context('Element - attribute testen', () => {
//     beforeEach('Visit app', () => {
//         cy.visit('/memories');
//     })
//     it('Test filter', () => {
//         cy.get('[data-cy=filterInput]').type('kajak');
//         cy.get('[data-cy=memoryCard]').should('have.length', 1);
//     })

//     it('Test filter', () => {
//         cy.get('[data-cy=filterInput]').type('madr');
//         cy.get('[data-cy=memoryCard]').should('have.length', 1);
//     })
// })

// context('Backend testen', () => {
//     it('Mock memories get', () => {
//         cy.server();
//         cy.route({
//             methode: 'GET',
//             url: '/api/memories',
//             status: 200,
//             response : ''
//         });
//         cy.visit('/api/memories'),
//         cy.get('[data-cy=memoryCard]').should('have.length', 1);
//     })
// })

context("Landingpage", () => {
    it("Get the navbar", () => {
      cy.visit("/");
      cy.get("nav");
    });
  });


  context("Login test", () => {
    it("Can fill the login", () => {
      cy.visit("/login");
      cy.get("form");
  
      cy.get('[data-cy=userField]').type("jiri.vanhouwe@gmail.com")
      .should("have.value", "jiri.vanhouwe@gmail.com");

      cy.get('[data-cy=passwordField]').type("Memories1@")
      .should("have.value", "Memories1@");

      cy.server();
      cy.route({
          url: "/api/login",
          method: "POST",
          response: {code: 200}
      })

      cy.get("form").submit();
    });
  });

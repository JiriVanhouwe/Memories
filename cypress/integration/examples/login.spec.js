//npx cypress open
context("Landingpage", () => {
    it("Get the navbar", () => {
      cy.visit("/");
      cy.get("nav");
    });
  });


  context("Login test", () => {
    it("Login works", () => {
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

describe("Change langauge feature", () => {
  beforeEach(() => {
    cy.intercept(/https.*top.*lang=en.*/, { fixture: "en_head.json" }).as(
      "en_head"
    );
    cy.intercept(/https.*top.*lang=hi.*/, { fixture: "hi_head.json" }).as(
      "hi_head"
    );
    cy.intercept(/https.*top.*lang=mr.*/, { fixture: "mr_head.json" }).as(
      "mr_head"
    );
  });
  it("should be able to change language(/ -> /hi -> /mr -> /) and also react-router concept should be used", () => {
    cy.visit("http://localhost:3000");
    cy.wait("@en_head");
    cy.visit("http://localhost:3000/hi");
    cy.wait("@hi_head");
    cy.visit("http://localhost:3000/mr");
    cy.wait("@mr_head");
    cy.visit("http://localhost:3000");
    cy.wait("@en_head");
  });
  it("should able to retain likes and visibility (en -> increase likes -> hide card -> change lang (hi) -> increase likes -> change lan(en) => one news headline should be hidden -> unhide -> change lan(hi) => likes should be retained", () => {
    for (let i = 0; i < 5; i++) cy.get("#en0l").click({ force: true });
    cy.get("#en0d").click({ force: true });
    cy.get("#hi").click({ force: true });
    cy.wait("@hi_head");
    for (let i = 0; i < 2; i++) cy.get("#hi0l").click({ force: true });
    cy.get("#en").click({ force: true });
    cy.wait("@en_head");
    cy.get("#en0d").click({ force: true });
    cy.get("#en0l").should("exist");
    cy.contains(/5/i);
    cy.get("#hi").click({ force: true });
    cy.wait("@hi_head");
    cy.contains(/2/i);
  });
  it('"localStorage" should be used to store likes and hidden-status', () => {
    cy.visit("http://localhost:3000");
    cy.wait("@en_head");
    for (let i = 0; i < 5; i++) cy.get("#en0l").click({ force: true });
    cy.get("#en0d").click({ force: true });
    cy.reload();
    cy.get("#en0d").click({ force: true });
    cy.contains(/5/i);
  });
});

describe("Search Mode testing", () => {
  beforeEach(() => {
    cy.intercept(/https.*top.*en.*/, { fixture: "en_head.json" }).as("en_head");
    cy.intercept(/https.*search.*en.*/, { fixture: "en_search.json" }).as(
      "en_search"
    );
  });

  it("Should be able to search in default language (Increase likes -> next page -> search)", () => {
    cy.visit("http://localhost:3000");
    cy.get("#en0l").click({ force: true });
    cy.get("#en0l").click({ force: true });
    cy.get("#en0l").click({ force: true });
    cy.get("#Next").click({ force: true });
    cy.wait("@en_head");
    cy.get("#searchBox").type("Bigg Boss");
    cy.get("#search").click({ froce: true });
    cy.wait("@en_search");
    cy.contains(/Bigg Boss 14: Pavitra Punia to meet Eijaz Khan's family?/i);
  });
  it("Hide and Like buttons should not be present in search Mode", () => {
    cy.get("#en0l").should("be.hidden");
    cy.get("#en0d").should("be.hidden");
  });
  it("Should be able to navigate to the next page in search mode", () => {
    cy.get("#Next").click({ force: true });
    cy.wait("@en_search");
    cy.contains(
      /Fans Blaming Aly for Jasmin Bhasin's Eviction is Their Anger Coming Out, Says Ilham Goni/i
    );
    cy.should(
      "not.contain",
      /Bigg Boss 14: Pavitra Punia to meet Eijaz Khan's family?/i
    );
  });
  it("On exit from search mode clear input field of search box and take back to homepage of selected language", () => {
    cy.get("#exitSearchMode").click({ force: true });
    cy.wait("@en_head");
    cy.get("#searchBox").should("not.contain", /Bigg Boss/i);
    cy.contains(/3/i);
    cy.contains(
      /Covid-19: PM Modi likely to get vaccinated in 2nd phase of inoculation drive/i
    );
    cy.should(
      "not.contain",
      /Manchester United the comeback kings after Fulham win/i
    );
  });
});

describe("Changing language while seearching", () => {
  beforeEach(() => {
    cy.intercept(/https.*top.*en.*/, { fixture: "en_head.json" }).as("en_head");
    cy.intercept(/https.*search.*lang=en.*/, { fixture: "en_search.json" }).as(
      "en_search"
    );
    cy.intercept(/https.*search.*lang=hi.*/, { fixture: "hi_search.json" }).as(
      "hi_search"
    );
    cy.intercept(/https.*search.*lang=mr.*/, { fixture: "mr_search.json" }).as(
      "mr_search"
    );
  });

  it("Should be able to change language while searching and take back to homepage (search(1)->next->lang change)", () => {
    cy.visit("http://localhost:3000");
    cy.wait("@en_head");
    cy.get("#searchBox").type("Bigg Boss");
    cy.get("#search").click({ force: true });
    cy.wait("@en_search");
    cy.get("#Next").click({ force: true });
    cy.wait("@en_search");
    cy.get("#hi").click({ force: true });
    cy.wait("@hi_search");
    cy.get("#Prev").should("be.disabled");
    cy.contains(
      /Bigg Boss 14: देवोलीना ने खोया आपा, निक्की तंबोली को कान के नीचे 2 थप्पड़ लगाने की दी धमकी/i
    );
    cy.get("#mr").click({ force: true });
    cy.wait("@mr_search");
    cy.contains(
      /Bigg Boss 14: Host Salman Khan Cleans Rakhi Sawant’s Bed After Nikki Tamboli Refuses/i
    );
  });
});

/// <reference types="Cypress" />
describe("Testing Enviroment", () => {
  it("Testing system works as expected", () => {
    expect(true).to.equal(true);
  });
});
//   expect(true).toBe(true);https://gnews.io/api/v4/top-headlines?&lang=en&max=3&token=1321740c80c3874a09a04e802b81c02a

describe("rendering App", () => {
  beforeEach(() => {
    cy.intercept(/https.*top.*en.*/, { fixture: "en_head.json" }).as("en_head");
  });
  it("Visiting localhost:3000 without getting Api response", () => {
    cy.visit("http://localhost:3000/");
    cy.wait("@en_head");
  });

  it("Should have three different languages (English, Hindi, Marathi)", () => {
    cy.contains(/English/i);
    cy.contains(/Hindi/i);
    cy.contains(/Marathi/i);
  });

  it("Default language should be English", () => {
    cy.contains(
      /Covid-19: PM Modi likely to get vaccinated in 2nd phase of inoculation drive/i
    );
  });
  it('"Prev" button should be disbaled on homepage', () => {
    cy.get("#Prev").should("be.disabled");
  });
  it('Must have Input field for Search-box and "Search" button on hompage', () => {
    cy.get("#searchBox");
    cy.get("#search");
  });
  it("Each headlines should contains title, img, date, time, likes(number of likes), Like-button and hide-button", () => {
    cy.contains(
      /Covid-19: PM Modi likely to get vaccinated in 2nd phase of inoculation drive/i
    );
    cy.contains("1/21/2021");
    cy.contains(/AM/i);
    cy.contains(/0/i);
    cy.get("#en0l").should("not.be.disabled");
    cy.get("#en0d").should("not.be.disabled");
  });

  it("Like-should increase likes to which it is associated", () => {
    cy.get("#en0l").click({ force: true });
    cy.get("#en0l").click({ force: true });
    cy.contains(/2/i);
    cy.get("#en0l").click({ force: true });
    cy.contains(/3/i);
  });

  it("Hide-button should be able to toggle(increased likes->hide->undo) visibility specific headline to which it is associated", () => {
    cy.get("#en0d").click({ force: true });
    // cy.should("not.contain", /3/i);
    cy.contains(/0/i);
    cy.get("#en0d").click({ force: true });
    cy.contains(/3/i);
  });

  it("Only three top-headlines should be on homepage", () => {
    cy.contains(
      /Covid-19: PM Modi likely to get vaccinated in 2nd phase of inoculation drive/i
    );
    cy.contains(
      /These 3 Stocks Just Hit All-Time Highs -- And They Still Look Unstoppable/i
    );
    cy.contains(
      /House panel OKs bill allowing PH president to suspend PhilHealth contribution hike/i
    );
    cy.should(
      "not.contain",
      /Manchester United the comeback kings after Fulham win/i
    );
  });

  it('should be able to navigate to next page by clicking "Next" button -1', () => {
    cy.get("#Next").click({ force: true });
    cy.wait("@en_head");
    cy.contains(/Manchester United the comeback kings after Fulham win/i);
    cy.contains(
      /Morrison criticises decision to drop 'Australia Day' from 26 January cricket games - video/i
    );
    cy.contains(/Don't panic, you'll get vaccine, assures WHO/i);
    cy.should(
      "not.contain",
      /Here's another update on PS5 stock levels in Australia/i
    );
  });

  it('Should be able to navigate to next page by clicking "Next" button -2 and disabled "Next" button if on the last page', () => {
    cy.get("#Next").click({ force: true });
    cy.wait("@en_head");
    cy.contains(/Here's another update on PS5 stock levels in Australia/i);
    cy.contains(/PM launches 3G, 4G services in S Waziristan/i);
    cy.contains(
      /Joe Biden inauguration: Lady Gaga, Jennifer Lopez perform; Tom Hanks hosts star-studded special/i
    );
    cy.should(
      "not.contain",
      /Govt allows wheat, sugar import to check prices/i
    );
    cy.get("#Next").should("be.disabled");
  });
  it("Increase like -> hide card -> prev page -> next page -> undo hide action => likes shoud be retained", () => {
    for (let i = 0; i < 3; i++) {
      cy.get("#en8l").click({ force: true });
    }
    cy.get("#en8d").click({ force: true });
    cy.get("#Prev").click({ force: true });
    cy.wait("@en_head");
    cy.get("#Next").click({ force: true });
    cy.wait("@en_head");
    cy.get("#en8d").click({ force: true });
    cy.contains(/3/i);
  });
});

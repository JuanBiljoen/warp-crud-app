describe('Contact App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('Displays a list of contacts', () => {
    cy.get('.contact-table tbody tr').should('have.length.gte', 2);

    cy.get('.contact-table tbody tr').first().within(() => {
      cy.get('td').eq(0).should('have.text', 'John');
      cy.get('td').eq(1).should('have.text', 'Doe');
      cy.get('td').eq(2).should('have.text', '555-1234');
    });
  });

  it('Allows adding a new contact', () => {
    cy.contains('Add Contact').click();

    cy.get('input[name="firstName"]').type('Jane');
    cy.get('input[name="lastName"]').type('Doe');
    cy.get('input[name="contactNumber"]').type('555-5678');

    cy.get('form').submit();

    cy.get('.contact-table tbody tr').last().within(() => {
      cy.get('td').eq(0).should('have.text', 'Jane');
      cy.get('td').eq(1).should('have.text', 'Doe');
      cy.get('td').eq(2).should('have.text', '555-5678');
    });
  });

  it('Allows editing a contact', () => {
    cy.get('.contact-table tbody tr').first().contains('Edit').click();

    cy.get('input[name="firstName"]').clear().type('Johnny');
    cy.get('input[name="contactNumber"]').clear().type('555-4321');

    cy.get('form').submit();

    cy.get('.contact-table tbody tr').first().within(() => {
      cy.get('td').eq(0).should('have.text', 'Johnny');
      cy.get('td').eq(1).should('have.text', 'Doe');
      cy.get('td').eq(2).should('have.text', '555-4321');
    });
  });

  it('Allows deleting a contact', () => {
    cy.get('.contact-table tbody tr').first().contains('Delete').click();

    cy.get('.contact-table tbody tr').should('have.length', 1);
  });
});

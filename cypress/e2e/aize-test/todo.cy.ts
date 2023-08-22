/// <reference types="cypress" />

// Welcome to Cypress!
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('1. example to-do app', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/todo');
  });

  it('1.1 displays two todo items by default', () => {
    cy.get('.todo-list li').should('have.length', 2);

    cy.get('.todo-list li').first().should('have.text', 'Pay electric bill');
    cy.get('.todo-list li').last().should('have.text', 'Walk the dog');
  });

  it('1.2 can add new todo items', () => {
    const newItem = 'Feed the cat';

    // enter a new item in the input field but don't submit it yet
    cy.get('[data-test=new-todo]').type(newItem);
    // verify the input text matches what we typed
    cy.get('[data-test=new-todo]').should('have.value', newItem);
     // now, submit the new item 
    cy.get('[data-test=new-todo]').type('{enter}');
    // confirm the new item has been added to the list
    cy.get('.todo-list li').should('have.length', 3).last().should('have.text', newItem);
  });

  it('1.3 can check off an item as completed', () => {
    cy.contains('Pay electric bill').parent().find('input[type=checkbox]').check();

    cy.contains('Pay electric bill').parents('li').should('have.class', 'completed');
  });

  context('1.4 with a checked task', () => {
    beforeEach(() => {
      cy.contains('Pay electric bill').parent().find('input[type=checkbox]').check();
    });

      
    it('1.4.1 can edit a checked task', () => {
      cy.contains('Pay electric bill')
       .dblclick();                     // Double-click to start editing

      cy.get('input.edit')               // Assuming the input has a class "edit" when it's in editing mode
      .clear()                         // Clear the current content
      .type('Pay water bill{enter}');  // Type the new content and submit with Enter

    cy.contains('Pay water bill').should('be.visible');

    });

    it('1.4.2 can filter for uncompleted tasks', () => {
      // We'll click on the "active" button in order to
      // display only incomplete items
      cy.contains('Active').click().should('have.class', 'selected');

      // After filtering, we can assert that there is only the one
      // incomplete item in the list.
      cy.get('.todo-list li').should('have.length', 1).first().should('have.text', 'Walk the dog');

      // For good measure, let's also assert that the task we checked off
      // does not exist on the page.
      cy.contains('Pay electric bill').should('not.exist');
    });

    it('1.4.3 can filter for completed tasks', () => {
      // We can perform similar steps as the test above to ensure
      // that only completed tasks are shown
      cy.contains('Completed').click();

      cy.get('.todo-list li').should('have.length', 1).first().should('have.text', 'Pay electric bill');

      cy.contains('Walk the dog').should('not.exist');
    });
    
    

    it('1.4.4 can delete all completed tasks', () => {
      // First, let's click the "Clear completed" button
      // `contains` is actually serving two purposes here.
      // First, it's ensuring that the button exists within the dom.
      // This button only appears when at least one task is checked
      // so this command is implicitly verifying that it does exist.
      // Second, it selects the button so we can click it.
      const button = cy.contains('Clear completed');
      button.click();
  
      // Finally, make sure that the clear button no longer exists.
      button.should('not.be.visible');

      // Then we can make sure that there is only one element
      // in the list and our element does not exist
      cy.get('.todo-list li')
      .should('have.length', 1)
      .should('not.have.text', 'Pay electric bill');

      
     
     
    });
    



  });



  context('1.5 with no todo items', () => {
    beforeEach(() => {
      // Check all existing items in the list
      cy.get('.todo-list li').each(($el) => {
        // Check the checkbox of the current item
        cy.wrap($el).find('input[type=checkbox]').check();
        
        // Now, click the "Clear completed" button to clear this specific item
        cy.contains('Clear completed').click();
      });
      
     
      
    });

    it('1.5.1 todo list is empty and items todo count is not visible', () => {
      cy.get('.todo-list li').should('not.exist');
      
      cy.get('.todo-count').should('not.visible');
    });

    it('1.5.2 adds 1 items and the todo count label updates to the right value', () => {
      const newItem = 'Feed the cat';

      // Add the item
      cy.get('[data-test=new-todo]').type(`${newItem}{enter}`);

      // Check the list has 1 item
      cy.get('.todo-list li').should('have.length', 1);

      // Check the todo count label is updated
      cy.contains('.todo-count', '1 item left').should('be.visible');
  });

    it('1.5.3 adds 3 new items and verifies each new item is added to the end of the list', () => {
      const items = ['Feed the cat', 'Walk the dog', 'Buy groceries'];
      items.forEach(item => {
        cy.get('[data-test=new-todo]').type(`${item}{enter}`);
      });
      cy.get('.todo-list li').should('have.length', 3);
      items.forEach((item, index) => {
        cy.get('.todo-list li').eq(index).should('have.text', item);
      });
    });
});

  


});

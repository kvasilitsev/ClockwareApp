describe('the main page check', () => {
    beforeEach(() => {
      cy.visit('/')
    });
    it('about', () => {    
      cy.contains('About')       
    });
    it('login', () => {    
      cy.contains('Login').click()
      cy.url().should('include', '/login')
    })
    it('brand', () => {    
      cy.contains('Clockwise Clockware')    
    })
    it('contact', () => {    
      cy.contains('Contact us')    
    })
    it('order form', () => {    
      cy.contains('Complete order form')         
    })
    it('contact', () => {    
        cy.contains('Contact us')    
      })
  })
describe('the order form check', () => { 
  beforeEach(() => {
    cy.visit('/')
  });

  it('form', () => {    
    cy.contains('Complete order form')           
  })

  it("check label and placeholders", () => {    
    cy.get('.mb-3').contains('Name').next('[placeholder="Name"]')
    cy.get('.mb-3').contains('Email').next('[placeholder="Email"]')
    cy.get('.mb-3').contains('Clock size').next().contains('Select clock size')
    cy.get('.mb-3').contains('City').next().contains('Select city')
    cy.get('.mb-3').contains('Date and time')
  })
  
  it("should display user setting form errors", () => {
    cy.get('#name').type("ab").blur()
    cy.get(`#name`).next(`.errmsg`)
      .should("be.visible")
      .and("contain", `Invalid name`)
    cy.get('#name').type("ab1").blur()
    cy.get(`#name`).next(`.errmsg`)
      .should("be.visible")
      .and("contain", `Invalid name`)
    cy.get('#name').type("abc").clear().blur()
    cy.get(`#name`).next(`.errmsg`)
      .should("be.visible")
      .and("contain", `Required`)
      
    cy.get('#email').type("sss@ddd").blur()
    cy.get('#email').next(`.errmsg`)
      .should("be.visible")
      .and("contain", `Invalid email`)
    cy.get('#email').type("ab1").blur()
    cy.get('#email').next(`.errmsg`)
      .should("be.visible")
      .and("contain", `Invalid email`)
    cy.get('#email').type("abc").clear().blur()
    cy.get('#email').next(`.errmsg`)
      .should("be.visible")
      .and("contain", `Required`)    
  })

  it("check submit button disable", () => {
    
    //functions which are filling form inputs

    const name = () => cy.get('#name').type('name');
    const email = () => cy.get('#email').type('email@email.com');
    const clock = () => cy.get('#clock').click().get('#react-select-2-listbox').contains('small').click();
    const city = () => cy.get('#city').click().get('#react-select-3-listbox').contains('Dnipro').click();
    const datetime = () => cy.get('.datePicker').click().get('.react-datepicker__week').contains('29').click()
      .get('.react-datepicker__time-list-item').contains('09:00').click();

    //an array of functions which are filling form inputs
    const arrayOfInputs = [name, email, clock, city, datetime]; 

    //function calls all combinations of filled inputs - 1 to check if submit button is disabled
    function combinationOfInputs(array){ 

      for(let i = 0; i < array.length; i++){
        cy.visit('/');  
        let minusOne = array.filter((element, index) => {      
          return (i !== index) ? element : null; 
        })
        minusOne.forEach(element => element());
        cy.get("button").should("be.disabled");  
      }     
    }    

    combinationOfInputs(arrayOfInputs);   
  })

  it("check submit button works", () => {    
    cy.get('#name').type('name');
    cy.get('#email').type('email@email.com');
    cy.get('#clock').click().get('#react-select-2-listbox').contains('small').click();
    cy.get('#city').click().get('#react-select-3-listbox').contains('Dnipro').click();
    cy.get('.datePicker').click().get('.react-datepicker__week').contains('29').click()
      .get('.react-datepicker__time-list-item').contains('09:00').click();
    
    cy.get("button").click();
    cy.url().should('include', '/masterSelect')
  })

})
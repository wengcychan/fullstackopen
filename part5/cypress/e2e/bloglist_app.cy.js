describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
      cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()

      cy.get('#title').type('New blog')
      cy.get('#author').type('New author')
      cy.get('#url').type('https://newblog.com/')
      cy.get('#create-button').click()

      cy.contains('New blog New author')
    })

    describe('When created new blog', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'New blog', author: 'New author', url: 'https://newblog.com/' })
      })

      it.only('user can like a blog', function() {
        cy.contains('view').click()
        cy.contains('like').click()

        cy.get('.blogDetails').contains('likes').contains(1)
      })
    })
  })
})
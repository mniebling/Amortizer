describe('form', () => {

  const formCard = '.card.for-inputs'


  it('should have the form card displayed', () => {
    browser.url('http://localhost:4000')
    expect(browser.isVisible(formCard)).to.equal(true)
  })

  // it('should only show the 1st set of fields', () => {

    // expect 1st column to be visible
    // expect help message to be visible
    // expect 2nd column to be not visible
  // })

  // it('should show the 2nd set of fields after entering data', () => {

    // type in principal
    // type in apr
    // type in payment

    // expect 2nd column to be visible
  // })

  // it('should default the 2nd fields correctly', () => {

    // expect 2nd column principal = 1st col principal
    // expect 2nd column apr = 1st col apr
    // expect 2nd column payment = 1st col payment
  // })
})

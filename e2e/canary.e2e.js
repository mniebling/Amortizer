describe('canary', () => {

  it('should load the site and have the correct title', () => {

    browser.url('http://localhost:4000')

    expect(browser.getTitle())
      .to.equal('Visual Mortgage Calculator')
  })
})

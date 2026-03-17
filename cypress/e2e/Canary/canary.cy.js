///<reference types="cypress" />

describe('Canary Test', () => {
  it('Deve retornar True para True', () => {
    const result = true;
    const expected = result == true;
    expect(result).to.equal(expected);
  })
})
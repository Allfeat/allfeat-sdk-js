import { ISWC } from '../../src/midds/musicalWork';

describe("Inputs / Unit Tests: ISWC", () => {
  let iswc: ISWC;

  beforeEach(() => {
    iswc = new ISWC();
  })

  it("should valid correct data", () => {
    expect(iswc.Value).toBe(null)
    expect(iswc.isValid).toBe(true)

    // Correct ISWC
    iswc.Value = {
      group1: 123,
      group2: 456,
      group3: 678,
      checkDigit: 9
    }
    expect(iswc.isValid).toBe(true)
  })
})

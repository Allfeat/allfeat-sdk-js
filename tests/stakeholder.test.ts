import { IMiddsString, Stakeholder } from '../src';
import { Nickname } from '../src/midds/stakeholder';

describe("Unit Tests: Stakeholder", () => {
  let stakeholder: Stakeholder;

  beforeEach(() => {
    stakeholder = new Stakeholder();
  })

  it("should valid correct IPI Name Numbers", () => {
    stakeholder.IPI = 123;
    expect(stakeholder.IPI.isValid).toBe(false);
    stakeholder.IPI = 1234567891;
    expect(stakeholder.IPI.isValid).toBe(true);
  })

  it("should valid correct Nickname", () => {
    expect(stakeholder.Nickname.Value).toBe(null);
    expect(stakeholder.Nickname.isValid).toBe(true);
    stakeholder.Nickname = "Alice";
    expect(stakeholder.Nickname.isValid).toBe(true);
    stakeholder.Nickname = "";
    expect(stakeholder.Nickname.Value).toBe(null);
    stakeholder.Nickname = "  ";
    expect(stakeholder.Nickname.Value).toBe(null);
  })

  it("should valid correct data", () => {
    // At least one input should be filled
    expect(stakeholder.isValid).toBe(false)
    stakeholder.Nickname = "Alice";
    expect(stakeholder.isValid).toBe(true)
    stakeholder.IPI = 123;
    expect(stakeholder.isValid).toBe(false)
  })
})
import { MusicalWork } from '../src/midds/musicalWork';
import { MiddsMusicalWorkMusicalWork } from '../src/interfaces/allfeat/index';
import { toHex } from 'dedot/utils';

describe("Unit Tests: Musical Work", () => {
  let musicalWork: MusicalWork;

  beforeEach(() => {
    musicalWork = new MusicalWork();
  })

  it("should parse into Substrate type with success", () => {
    musicalWork.ISWC = {
      group1: 123,
      group2: 456,
      group3: 789,
      checkDigit: 1
    }
    musicalWork.Title = "Alice First Work"
    musicalWork.Duration = 60 // 60 seconds
    musicalWork.MusicalWorkType = "Instrumental"
    musicalWork.Shares.Value.push({
      stakeholderId: "0xd4a579e4d0546b3b33ad408b6972b9e91658f9ff0548f11af6bdd44a4637a6f4",
      shareInfo: {
        role: "C",
        performanceShare: 100,
        mechanicalShare: 100
      }
    })

    const validSubstrateType: MiddsMusicalWorkMusicalWork = {
      iswc: {
        group1: 123,
        group2: 456,
        group3: 789,
        checkDigit: 1
      },
      title: toHex("Alice First Work"),
      duration: 60,
      type: "Instrumental",
      shares: [
        {
          stakeholderId: "0xd4a579e4d0546b3b33ad408b6972b9e91658f9ff0548f11af6bdd44a4637a6f4",
          shareInfo: {
            role: "C",
            performanceShare: 100,
            mechanicalShare: 100
          }
        }
      ]
    }

    expect(musicalWork.parseIntoSubstrateType()).toEqual(validSubstrateType)
  })
})

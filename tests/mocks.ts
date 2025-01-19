import { MusicalWork } from '../src';

export async function createAliceMusicalWork(): Promise<MusicalWork> {
  let aliceMusicalWork: MusicalWork = new MusicalWork();

  aliceMusicalWork.ISWC = {
    group1: 123,
    group2: 456,
    group3: 789,
    checkDigit: 1,
  };
  aliceMusicalWork.Title = 'Alice First Work';
  aliceMusicalWork.Duration = 60; // 60 seconds
  aliceMusicalWork.MusicalWorkType = 'Instrumental';
  aliceMusicalWork.Shares.Value.push({
    stakeholderId: "0xd4a579e4d0546b3b33ad408b6972b9e91658f9ff0548f11af6bdd44a4637a6f4",
    shareInfo: {
      role: 'C',
      performanceShare: 100,
      mechanicalShare: 100,
    },
  });

  return aliceMusicalWork;
}

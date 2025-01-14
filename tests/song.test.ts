import { Song } from '../src/midds/song';
import { Keyring } from '@polkadot/keyring';
import { MiddsSongSong } from '../src/interfaces/allfeat';
import { toHex } from 'dedot/utils';
import { cryptoWaitReady } from '@polkadot/util-crypto';

describe("Unit Tests: Song", () => {
  let musicalWork: Song;

  beforeEach(() => {
    musicalWork = new Song();
  })

  it("should parse into Substrate type with success", async () => {
    await cryptoWaitReady()
    const keyring = new Keyring({ type: 'sr25519' });
    musicalWork.ISWC = {
      group1: 123,
      group2: 456,
      group3: 789,
      checkDigit: 1
    }
    musicalWork.Title = "Alice First Work"
    musicalWork.Duration = 60 // 60 seconds
    musicalWork.SongType = "Instrumental"
    musicalWork.Shares.Value.push({
      stakeholderId: keyring.createFromUri("//Alice").address,
      shareInfo: {
        role: "C",
        performanceShare: 100,
        mechanicalShare: 100
      }
    })

    const validSubstrateType: MiddsSongSong = {
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
          stakeholderId: toHex(keyring.createFromUri("//Alice").address),
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
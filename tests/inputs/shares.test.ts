import { IShare, Shares } from '../../src/midds/song';
import { Keyring } from '@polkadot/keyring';
import { cryptoWaitReady } from '@polkadot/util-crypto';

describe('Inputs / Unit Tests: Shares', () => {
  let shares: Shares;

  beforeEach(() => {
    shares = new Shares();
  })

  it("should valid correct data", async () => {
    await cryptoWaitReady();
    // Empty on init
    expect(shares.Value).toBe([]);
    // Valid when empty
    expect(shares.isValid).toBeTruthy();

    const keyring = new Keyring({ type: 'sr25519' });

    const share_alice: IShare = {
      stakeholderId: keyring.createFromUri("//Alice").address, // Alice pubkey
      shareInfo: {
        role: "A",
        performanceShare: 50,
        mechanicalShare: 98,
      }
    }
    const share_bob: IShare = {
      stakeholderId: keyring.createFromUri("//Bob").address, // Bob pubkey
      shareInfo: {
        role: "E",
        performanceShare: 50,
        mechanicalShare: 2,
      }
    }

    shares.Value.push(share_alice);
    shares.Value.push(share_bob);

    expect(shares.isValid).toBe(true);
  })
})
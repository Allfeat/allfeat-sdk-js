import { AllfeatClient, AllfeatProvider } from "../../src";
import { Keyring } from "@polkadot/keyring";
import { cryptoWaitReady } from "@polkadot/util-crypto";
import { MusicalWork } from '../../src';
import { createAliceMusicalWork } from '../mocks';

describe("E2E: MIDDS Musical Work", () => {
  let musicalWork: MusicalWork
  let client: AllfeatClient

  beforeAll(async () => {
    client = await AllfeatClient.new(new AllfeatProvider('devnet'))
  })

  beforeEach(() => {
    musicalWork = new MusicalWork()
  })

  afterAll(async () => {
    await client.disconnect()
  })

  it("should register the correct data on-chain", async () => {
    await cryptoWaitReady();
    const keyring = new Keyring({ type: 'sr25519' });
    const aliceKeyringPair = keyring.addFromUri('//Alice');

    musicalWork = await createAliceMusicalWork();

    const result = await musicalWork.register(client, aliceKeyringPair);
    expect(result.middsHash).toEqual('0x3799df9c563e1fd95affa06b494a971ea5a22a64978aa7d5a4e98351612da761')
    expect(result.collateralCost).toEqual(700000000000n)
    expect(result.provider).toEqual(aliceKeyringPair.address)

    // TODO compare results with on-chain storage
  }, 30000)
})

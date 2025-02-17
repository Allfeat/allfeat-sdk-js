import { Stakeholder } from '../../src';
import { AllfeatClient, AllfeatProvider } from "../../src";
import { Keyring } from "@polkadot/keyring";
import { cryptoWaitReady } from "@polkadot/util-crypto";

describe("E2E: MIDDS Stakeholder", () => {
  let stakeholder: Stakeholder
  let client: AllfeatClient

  beforeAll(async () => {
    client = await AllfeatClient.new(new AllfeatProvider('devnet'))
  })

  beforeEach(() => {
    stakeholder = new Stakeholder()
  })

  afterAll(async () => {
    await client.disconnect()
  })

  it("should register the correct data on-chain", async () => {
    stakeholder.IPI = 1234567890;
    stakeholder.Nickname = "Alice";

    await cryptoWaitReady();
    const keyring = new Keyring({ type: 'sr25519' });
    const aliceKeyringPair = keyring.addFromUri('//Alice');

    const result = await stakeholder.register(client, aliceKeyringPair);
    expect(result.middsHash).toEqual('0xd4a579e4d0546b3b33ad408b6972b9e91658f9ff0548f11af6bdd44a4637a6f4')
    expect(result.collateralCost).toEqual(180000000000n)
    expect(result.provider).toEqual(aliceKeyringPair.address)
  }, 30000)
})

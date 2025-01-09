import {AllfeatApi, AllfeatClient, AllfeatProvider} from "../../src";
import {cryptoWaitReady} from "@polkadot/util-crypto";
import {Keyring} from "@polkadot/keyring";
import {PolkadotApi, SubstrateApi} from "@dedot/chaintypes";
import {DedotClient} from "dedot";

describe("E2E: AllfeatClient", () => {
    let provider: AllfeatProvider;
    let client: AllfeatClient;

    beforeAll(async () => {
        provider = new AllfeatProvider('devnet')
        client = await AllfeatClient.new(provider)
    });

    afterAll(async () => {
        await client.disconnect()
    });

    it("should connect to the blockchain node", async () => {
        const isConnected = client.status === "connected";
        expect(isConnected).toBe(true);
    });

    it("should fetch chain information", async () => {
        const chainInfo = await provider.send("system_chain", []);
        expect(chainInfo).toBeDefined();
        console.log("Chain info:", chainInfo);
    });

    it("should submit a simple transaction", async () => {
        await cryptoWaitReady();
        const keyring = new Keyring({ type: 'sr25519' });
        const aliceKeyringPair = keyring.addFromUri('//Alice');

        const unsub = await client.tx.system.remark("test").signAndSend(aliceKeyringPair, async ({status}) => {
            if (status.type === 'BestChainBlockIncluded') { // or status.type === 'Finalized'
                await unsub();
            }
        })
    })

    it("should handle errors gracefully", async () => {
        await expect(provider.send("non_existent_method", []))
            .rejects
            .toThrow("-32601: Method not found");
    });
});

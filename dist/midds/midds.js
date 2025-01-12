"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Midds = void 0;
class Midds {
    constructor(palletName, data) {
        this._palletName = palletName;
        this.data = data;
    }
    get isValid() {
        return this.data.every((input) => input.isValid);
    }
    createRegisterExtrinsic(client) {
        const extrinsicFn = client.tx[this._palletName]?.register;
        if (!extrinsicFn) {
            throw new Error(`Register function not found for MIDDS module: ${this._palletName}`);
        }
        return extrinsicFn(this.parseIntoSubstrateType());
    }
    register(client, account, callback) {
        return new Promise(async (resolve, reject) => {
            try {
                const unsub = await this.createRegisterExtrinsic(client).signAndSend(account, (result) => {
                    if (callback) {
                        callback(result);
                    }
                    console.log("Registration of the MIDDS current status: ", result.status.type);
                    if (result.status.type === 'BestChainBlockIncluded' || result.status.type === 'Finalized') {
                        unsub();
                        console.log("Registration successfully included in the chain, fetching result data...");
                        const eventToFind = client.events[this._palletName].MiddsRegistered;
                        if (!eventToFind) {
                            throw new Error(`MiddsRegistered Event not found for MIDDS module: ${this._palletName}`);
                        }
                        const event = result.events.find((event) => eventToFind.is(event));
                        if (!event || typeof event.event.palletEvent === 'string') {
                            reject(new Error("Expected event not found, Register call probably failed on-chain."));
                            return;
                        }
                        console.log("Found MIDDS Registration event: ", event);
                        const registerResult = {
                            txHash: result.txHash,
                            blockHash: result.status.value.blockHash,
                            blockNumber: result.status.value.blockNumber,
                            middsHash: event.event.palletEvent.data.hashId,
                            provider: event.event.palletEvent.data.provider.address(),
                            collateralCost: event.event.palletEvent.data.dataColateral
                        };
                        console.log("Returning new MIDDS Registration result: ", registerResult);
                        resolve(registerResult);
                    }
                    if (result.status.type === 'Drop' || result.status.type === 'Invalid' || result.status.type === 'NoLongerInBestChain') {
                        console.log("Transaction of MIDDS Registration failed to be included in the chain: ", result.status.type);
                        unsub();
                        reject(new Error(`Extrinsic failed with status: ${result.status.type}`));
                    }
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
}
exports.Midds = Midds;
//# sourceMappingURL=midds.js.map
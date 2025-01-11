import {AllfeatClient} from "../client";
import {Callback, ISubmittableExtrinsic, ISubmittableResult} from "dedot/types";
import {KeyringPair} from "@polkadot/keyring/types";
import { MiddsSubstrateType } from '../types';

export abstract class Midds<SubstrateType> implements IMidds<SubstrateType> {
    private readonly _palletName: string;

    protected constructor(palletName: string) {
        this._palletName = palletName;
    }

    abstract get isValid(): boolean;
    abstract parseIntoSubstrateType(): SubstrateType;

    createRegisterExtrinsic(client: AllfeatClient): ISubmittableExtrinsic {
        const extrinsicFn = client.tx[this._palletName]?.register;
        if (!extrinsicFn) {
            throw new Error(`Register function not found for MIDDS module: ${this._palletName}`);
        }
        return extrinsicFn(this.parseIntoSubstrateType());
    }

    register(client: AllfeatClient, account: KeyringPair | string, callback?: Callback<ISubmittableResult>): Promise<IRegisterResult> {
        return new Promise(async (resolve, reject) => {
            try {
                const unsub = await this.createRegisterExtrinsic(client).signAndSend(account, (result) => {
                    if (callback) {
                        callback(result);
                    }

                    console.log("Registration of the MIDDS current status: ", result.status.type)

                    if (result.status.type === 'BestChainBlockIncluded' || result.status.type === 'Finalized') {
                        unsub()
                        console.log("Registration successfully included in the chain, fetching result data...")

                        const eventToFind = client.events[this._palletName].MiddsRegistered
                        if (!eventToFind) {
                            throw new Error(`MiddsRegistered Event not found for MIDDS module: ${this._palletName}`)
                        }

                        const event =
                            result.events.find(
                                (event) => eventToFind.is(event)
                            );

                        if (!event || typeof event.event.palletEvent === 'string') {
                            reject(new Error("Expected event not found, Register call probably failed on-chain."));
                            return;
                        }

                        console.log("Found MIDDS Registration event: ", event)

                        const registerResult: IRegisterResult = {
                            txHash: result.txHash,
                            blockHash: result.status.value.blockHash,
                            blockNumber: result.status.value.blockNumber,
                            middsHash: event.event.palletEvent.data.hashId,
                            provider: event.event.palletEvent.data.provider.address(),
                            collateralCost: event.event.palletEvent.data.dataColateral
                        }

                        console.log("Returning new MIDDS Registration result: ", registerResult)
                        resolve(registerResult);
                    }

                    if (result.status.type === 'Drop' || result.status.type === 'Invalid' || result.status.type === 'NoLongerInBestChain') {
                        console.log("Transaction of MIDDS Registration failed to be included in the chain: ", result.status.type)
                        unsub();
                        reject(new Error(`Extrinsic failed with status: ${result.status.type}`));
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }
}

export interface IMidds<SubstrateType extends MiddsSubstrateType> {
    /**
     * Ensure that the Midds have at least one required field not empty.
     */
    get isValid(): boolean

    /**
     * Parse this actual Midds instance into the Substrate API ready Midds type.
     */
    parseIntoSubstrateType(): SubstrateType

    /**
     * Create an extrinsic to submit to the network from the current Midds data
     * @param client The client to create the extrinsic from.
     */
    createRegisterExtrinsic(client: AllfeatClient): ISubmittableExtrinsic

    register(client: AllfeatClient, account: KeyringPair | string): Promise<IRegisterResult>

    register(client: AllfeatClient, account: KeyringPair | string, callback: Callback<ISubmittableResult>): Promise<IRegisterResult>
}

export interface IRegisterResult {
    readonly txHash: string;
    readonly blockHash: string;
    readonly blockNumber: number;
    readonly middsHash: string;
    readonly provider: string;
    readonly collateralCost: bigint;
}
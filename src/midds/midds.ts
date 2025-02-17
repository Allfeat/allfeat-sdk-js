import {AllfeatClient} from "../client";
import {Callback, ISubmittableExtrinsic, ISubmittableResult} from "dedot/types";
import {KeyringPair} from "@polkadot/keyring/types";
import { MiddsSubstrateType } from '../types';
import { IMiddsInput } from './input';
import { IKeyringPair, Signer } from '@polkadot/types/types';

export abstract class Midds<T extends Record<string, IMiddsInput<any, any>>> implements IMidds<T> {
    private readonly _palletName: string;
    public inputs: T

    protected constructor(palletName: string, inputs: T) {
        this._palletName = palletName;
        this.inputs = inputs
    }

    getInput<K extends keyof T>(key: K): T[K] {
        return this.inputs[key];
    }

    abstract parseIntoSubstrateType(): MiddsSubstrateType;

    get isValid(): boolean {
        const inputs = Object.values(this.inputs);

        // At least one input should be filled and they all meet own valid condition.
        return inputs.every((input) => input.isValid) && inputs.some((input) => input.Value !== null);
    }

    createRegisterExtrinsic(client: AllfeatClient): ISubmittableExtrinsic {
        const extrinsicFn = client.tx[this._palletName]?.register;
        if (!extrinsicFn) {
            throw new Error(`Register function not found for MIDDS module: ${this._palletName}`);
        }
        return extrinsicFn(this.parseIntoSubstrateType());
    }

    register(client: AllfeatClient, account: IKeyringPair | string, signer?: Signer, callback?: Callback<ISubmittableResult>): Promise<IRegisterResult> {
        return new Promise(async (resolve, reject) => {
            try {
                const options = signer ? { signer } : {};
                const unsub = await this.createRegisterExtrinsic(client).signAndSend(account, options, (result) => {
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

export interface IMidds<T> {
    inputs: T

    getInput<K extends keyof T>(key: K): T[K]

    /**
     * Ensure that the Midds have at least one required field not empty.
     */
    get isValid(): boolean

    /**
     * Parse this actual Midds instance into the Substrate API ready Midds type.
     */
    parseIntoSubstrateType(): MiddsSubstrateType

    /**
     * Create an extrinsic to submit to the network from the current Midds data
     * @param client The client to create the extrinsic from.
     */
    createRegisterExtrinsic(client: AllfeatClient): ISubmittableExtrinsic

    register(client: AllfeatClient, account: KeyringPair | string): Promise<IRegisterResult>

    register(client: AllfeatClient, account: KeyringPair | string, signer: Signer, callback: Callback<ISubmittableResult>): Promise<IRegisterResult>
}

export interface IRegisterResult {
    readonly txHash: string;
    readonly blockHash: string;
    readonly blockNumber: number;
    readonly middsHash: string;
    readonly provider: string;
    readonly collateralCost: bigint;
}
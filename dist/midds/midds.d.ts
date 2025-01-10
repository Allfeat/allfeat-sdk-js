import { AllfeatClient } from "../client";
import { Callback, ISubmittableExtrinsic, ISubmittableResult } from "dedot/types";
import { KeyringPair } from "@polkadot/keyring/types";
export declare abstract class Midds<SubstrateType> implements IMidds<SubstrateType> {
    private readonly _palletName;
    protected constructor(palletName: string);
    abstract get isValid(): boolean;
    abstract parseIntoSubstrateType(): SubstrateType;
    createRegisterExtrinsic(client: AllfeatClient): ISubmittableExtrinsic;
    register(client: AllfeatClient, account: KeyringPair | string, callback?: Callback<ISubmittableResult>): Promise<IRegisterResult>;
}
export interface IMidds<SubstrateType> {
    /**
     * Ensure that the Midds have at least one required field not empty.
     */
    get isValid(): boolean;
    /**
     * Parse this actual Midds instance into the Substrate API ready Midds type.
     */
    parseIntoSubstrateType(): SubstrateType;
    /**
     * Create an extrinsic to submit to the network from the current Midds data
     * @param client The client to create the extrinsic from.
     */
    createRegisterExtrinsic(client: AllfeatClient): ISubmittableExtrinsic;
    register(client: AllfeatClient, account: KeyringPair | string): Promise<IRegisterResult>;
    register(client: AllfeatClient, account: KeyringPair | string, callback: Callback<ISubmittableResult>): Promise<IRegisterResult>;
}
export interface IRegisterResult {
    readonly txHash: string;
    readonly blockHash: string;
    readonly blockNumber: number;
    readonly middsHash: string;
    readonly provider: string;
    readonly collateralCost: bigint;
}
//# sourceMappingURL=midds.d.ts.map
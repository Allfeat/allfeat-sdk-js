import {MiddsStakeholderStakeholder} from "../interfaces/allfeat";
import {IMidds, IRegisterResult, Midds} from "./midds";
import { toHex } from 'dedot/utils';

export class Stakeholder extends Midds {
    private _IPINameNumber: number | null = null;
    private _firstName: string | null = null;
    private _lastName: string | null = null;
    private _nickname: string | null = null;

    constructor() {
        super("stakeholders");
    }

    get isValid(): boolean {
        return (
            this._IPINameNumber !== null ||
            this._firstName !== null ||
            this._lastName !== null ||
            this._nickname !== null
        );
    }

    public set IPINameNumber(IPINameNumber: number) {
        if (IPINameNumber > 99999999999 || IPINameNumber < 100000000) {
            throw new Error('IPI Name Number cant have more than 11 digits and less than 9 digits.');
        }

        this._IPINameNumber = IPINameNumber;
    }

    public set FirstName(FirstName: string) {
        if (FirstName.length > 128) {
            throw new Error('First name must be less than 128 characters.');
        }

        this._firstName = FirstName;
    }

    public set LastName(LastName: string) {
        if (LastName.length > 128) {
            throw new Error('Last name must be less than 128 characters.');
        }

        this._lastName = LastName;
    }

    public set Nickname(Nickname: string) {
        if (Nickname.length > 128) {
            throw new Error('Nickname must be less than 128 characters.');
        }

        this._nickname = Nickname;
    }

    public get IPINameNumber(): number | null {
        return this._IPINameNumber;
    }

    public get FirstName(): string | null {
        return this._firstName
    }

    public get LastName(): string | null {
        return this._lastName
    }

    public get NickName(): string | null {
        return this._nickname
    }

    public parseIntoSubstrateType(): MiddsStakeholderStakeholder {
        if (!this.isValid) {
            throw new Error('Invalid Midds data for parsing.');
        }
        return {
            ipi: this._IPINameNumber ? BigInt(this._IPINameNumber) : undefined,
            firstName: this._firstName ? toHex(this._firstName) : undefined,
            lastName: this._lastName ? toHex(this._lastName) : undefined,
            nickname: this._nickname ? toHex(this._nickname) : undefined
        }
    }
}
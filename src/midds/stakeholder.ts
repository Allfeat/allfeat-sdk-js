import {MiddsStakeholderStakeholder} from "../interfaces/allfeat";
import { Midds } from "./midds";
import { MiddsNumber, MiddsString } from './input';

export class Stakeholder extends Midds {
    constructor() {
        const data = [
          new IPINameNumber(),
          new FirstName(),
          new LastName(),
          new Nickname()
        ]
        super("stakeholders", data);
    }

    public set IPI(IPI: number | null ) {
        this.data[0].Value = IPI
    }

    public set FirstName(FirstName: string | null ) {
        this.data[1].Value = FirstName
    }

    public set LastName(LastName: string | null ) {
        this.data[2].Value = LastName
    }

    public set Nickname(Nickname: string | null ) {
        this.data[3].Value = Nickname
    }

    public get IPI(): number | null {
        return this.data[0].Value
    }

    public get FirstName(): string | null {
        return this.data[1].Value
    }

    public get LastName(): string | null {
        return this.data[2].Value
    }

    public get Nickname(): string | null {
        return this.data[3].Value
    }

    public parseIntoSubstrateType(): MiddsStakeholderStakeholder {
        return {
            ipi: this.data[0].isValid && this.data[0].Value ? this.data[0].intoSubstrateType() : undefined,
            firstName: this.data[1].isValid && this.data[1].Value ? this.data[1].intoSubstrateType() : undefined,
            lastName: this.data[2].isValid && this.data[2].Value ? this.data[2].intoSubstrateType() : undefined,
            nickname: this.data[3].isValid && this.data[3].Value ? this.data[3].intoSubstrateType() : undefined,
        }
    }
}

export class IPINameNumber extends MiddsNumber {
    constructor() {
        super("IPI Name Number");
    }

    get isValid(): boolean {
        // IPI Name number should be between 9 and 11 digits max
        return !(this.Value && (this.Value > 99999999999 || this.Value < 100000000));
    }
}

export class FirstName extends MiddsString {
    constructor() {
        super("First Name", null, 128);
    }
}

export class LastName extends MiddsString {
    constructor() {
        super("Last Name", null, 128);
    }
}

export class Nickname extends MiddsString {
    constructor() {
        super("Nickname", null, 128);
    }
}
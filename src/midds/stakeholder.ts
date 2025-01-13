import {MiddsStakeholderStakeholder} from "../interfaces/allfeat";
import { Midds } from "./midds";
import { IMiddsInput, MiddsNumber, MiddsString } from './input';

interface StakeholderInputs {
    [key: string]: IMiddsInput<any, any>;
    ipi: IPINameNumber;
    firstName: FirstName;
    lastName: LastName;
    nickname: Nickname;
}

export class Stakeholder extends Midds<StakeholderInputs> {
    constructor() {
        const inputs: StakeholderInputs = {
            ipi: new IPINameNumber(),
            firstName: new FirstName(),
            lastName: new LastName(),
            nickname: new Nickname(),
        }
        super("stakeholders", inputs);
    }

    public set IPI(IPI: number | null ) {
        this.getInput('ipi').Value = IPI
    }

    public set FirstName(FirstName: string | null ) {
        this.getInput('firstName').Value = FirstName;
    }

    public set LastName(LastName: string | null ) {
        this.getInput('lastName').Value = LastName;
    }

    public set Nickname(Nickname: string | null ) {
        this.getInput('nickname').Value = Nickname;
    }

    public get IPI(): IPINameNumber {
        return this.getInput('ipi')
    }

    public get FirstName(): FirstName {
        return this.getInput('firstName')
    }

    public get LastName(): LastName {
        return this.getInput('lastName')
    }

    public get Nickname(): Nickname{
        return this.getInput('nickname')
    }

    public parseIntoSubstrateType(): MiddsStakeholderStakeholder {
        return {
            ipi: this.IPI.isValid && this.IPI.Value ? this.IPI.intoSubstrateType() : undefined,
            firstName: this.FirstName.isValid && this.FirstName.Value ? this.FirstName.intoSubstrateType() : undefined,
            lastName: this.LastName.isValid && this.LastName.Value ? this.LastName.intoSubstrateType() : undefined,
            nickname: this.Nickname.isValid && this.Nickname.Value ? this.Nickname.intoSubstrateType() : undefined,
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
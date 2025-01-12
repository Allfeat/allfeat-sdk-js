import { Midds } from "./midds";
import { MiddsNumber, MiddsString } from './input';
export class Stakeholder extends Midds {
    constructor() {
        const data = [
            new IPINameNumber(),
            new FirstName(),
            new LastName(),
            new Nickname()
        ];
        super("stakeholders", data);
    }
    set IPI(IPI) {
        this.data[0].Value = IPI;
    }
    set FirstName(FirstName) {
        this.data[1].Value = FirstName;
    }
    set LastName(LastName) {
        this.data[2].Value = LastName;
    }
    set Nickname(Nickname) {
        this.data[3].Value = Nickname;
    }
    get IPI() {
        return this.data[0].Value;
    }
    get FirstName() {
        return this.data[1].Value;
    }
    get LastName() {
        return this.data[2].Value;
    }
    get Nickname() {
        return this.data[3].Value;
    }
    parseIntoSubstrateType() {
        return {
            ipi: this.data[0].isValid && this.data[0].Value ? this.data[0].intoSubstrateType() : undefined,
            firstName: this.data[1].isValid && this.data[1].Value ? this.data[1].intoSubstrateType() : undefined,
            lastName: this.data[2].isValid && this.data[2].Value ? this.data[2].intoSubstrateType() : undefined,
            nickname: this.data[3].isValid && this.data[3].Value ? this.data[3].intoSubstrateType() : undefined,
        };
    }
}
export class IPINameNumber extends MiddsNumber {
    constructor() {
        super("IPI Name Number");
    }
    get isValid() {
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
//# sourceMappingURL=stakeholder.js.map
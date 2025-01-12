"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nickname = exports.LastName = exports.FirstName = exports.IPINameNumber = exports.Stakeholder = void 0;
const midds_1 = require("./midds");
const input_1 = require("./input");
class Stakeholder extends midds_1.Midds {
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
exports.Stakeholder = Stakeholder;
class IPINameNumber extends input_1.MiddsNumber {
    constructor() {
        super("IPI Name Number");
    }
    get isValid() {
        // IPI Name number should be between 9 and 11 digits max
        return !(this.Value && (this.Value > 99999999999 || this.Value < 100000000));
    }
}
exports.IPINameNumber = IPINameNumber;
class FirstName extends input_1.MiddsString {
    constructor() {
        super("First Name", null, 128);
    }
}
exports.FirstName = FirstName;
class LastName extends input_1.MiddsString {
    constructor() {
        super("Last Name", null, 128);
    }
}
exports.LastName = LastName;
class Nickname extends input_1.MiddsString {
    constructor() {
        super("Nickname", null, 128);
    }
}
exports.Nickname = Nickname;
//# sourceMappingURL=stakeholder.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stakeholder = void 0;
const midds_1 = require("./midds");
const utils_1 = require("dedot/utils");
class Stakeholder extends midds_1.Midds {
    constructor() {
        super("stakeholders");
        this._IPINameNumber = null;
        this._firstName = null;
        this._lastName = null;
        this._nickname = null;
    }
    get isValid() {
        return (this._IPINameNumber !== null ||
            this._firstName !== null ||
            this._lastName !== null ||
            this._nickname !== null);
    }
    set IPINameNumber(IPINameNumber) {
        if (IPINameNumber > 99999999999 || IPINameNumber < 100000000) {
            throw new Error('IPI Name Number cant have more than 11 digits and less than 9 digits.');
        }
        this._IPINameNumber = IPINameNumber;
    }
    set FirstName(FirstName) {
        if (FirstName.length > 128) {
            throw new Error('First name must be less than 128 characters.');
        }
        this._firstName = FirstName;
    }
    set LastName(LastName) {
        if (LastName.length > 128) {
            throw new Error('Last name must be less than 128 characters.');
        }
        this._lastName = LastName;
    }
    set Nickname(Nickname) {
        if (Nickname.length > 128) {
            throw new Error('Nickname must be less than 128 characters.');
        }
        this._nickname = Nickname;
    }
    get IPINameNumber() {
        return this._IPINameNumber;
    }
    get FirstName() {
        return this._firstName;
    }
    get LastName() {
        return this._lastName;
    }
    get NickName() {
        return this._nickname;
    }
    parseIntoSubstrateType() {
        if (!this.isValid) {
            throw new Error('Invalid Midds data for parsing.');
        }
        return {
            ipi: this._IPINameNumber ? BigInt(this._IPINameNumber) : undefined,
            firstName: this._firstName ? (0, utils_1.toHex)(this._firstName) : undefined,
            lastName: this._lastName ? (0, utils_1.toHex)(this._lastName) : undefined,
            nickname: this._nickname ? (0, utils_1.toHex)(this._nickname) : undefined
        };
    }
}
exports.Stakeholder = Stakeholder;
//# sourceMappingURL=stakeholder.js.map
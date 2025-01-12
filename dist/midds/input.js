"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiddsNumber = exports.MiddsString = exports.MiddsInput = void 0;
const utils_1 = require("dedot/utils");
class MiddsInput {
    constructor(name) {
        this.value = null;
        this.name = name;
    }
    get Value() { return this.value; }
    set Value(value) { this.value = value; }
    get Name() { return this.name; }
}
exports.MiddsInput = MiddsInput;
class MiddsString extends MiddsInput {
    constructor(name, regex, maxLength) {
        super(name);
        this._regex = regex;
        this._maxLength = maxLength;
    }
    get MaxLength() { return this._maxLength; }
    get Regex() { return this._regex; }
    intoSubstrateType() {
        if (!this.Value) {
            throw new Error(`Null value cannot be parsed to Substrate type`);
        }
        else {
            return (0, utils_1.toHex)(this.Value);
        }
    }
    get isValid() {
        if (this._regex && this.Value) {
            return this._regex.test(this.Value);
        }
        return true;
    }
}
exports.MiddsString = MiddsString;
class MiddsNumber extends MiddsInput {
    constructor(name) {
        super(name);
    }
    intoSubstrateType() {
        if (!this.Value) {
            throw new Error(`Null value cannot be parsed to Substrate type`);
        }
        else
            return BigInt(this.Value);
    }
}
exports.MiddsNumber = MiddsNumber;
//# sourceMappingURL=input.js.map
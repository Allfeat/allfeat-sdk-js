import { toHex } from 'dedot/utils';
export class MiddsInput {
    constructor(name) {
        this.value = null;
        this.name = name;
    }
    get Value() { return this.value; }
    set Value(value) { this.value = value; }
    get Name() { return this.name; }
}
export class MiddsString extends MiddsInput {
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
            return toHex(this.Value);
        }
    }
    get isValid() {
        if (this._regex && this.Value) {
            return this._regex.test(this.Value);
        }
        return true;
    }
}
export class MiddsNumber extends MiddsInput {
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
//# sourceMappingURL=input.js.map
import { toHex } from 'dedot/utils';

export interface IMiddsInput<T, SubstrateType> {
  get Value(): T | null;
  get Name(): string;
  get isValid(): boolean;
  set Value(value: T | null);
  intoSubstrateType(): SubstrateType | undefined;
}

export interface IMiddsString extends IMiddsInput<string, `0x${string}`> {
  get MaxLength(): number;
  get Regex(): RegExp | null;
}

export abstract class MiddsInput<T, SubstrateType> implements IMiddsInput<T, SubstrateType> {
  protected value: T | null = null;
  private readonly name: string;

  protected constructor(name: string) {
    this.name = name;
  }

  public get Value(): T | null { return this.value }

  public set Value(value: T | null) { this.value = value }

  public get Name(): string { return this.name }

  public abstract get isValid(): boolean;

  public abstract intoSubstrateType(): SubstrateType | undefined;
}

export abstract class MiddsString extends MiddsInput<string, `0x${string}`> implements IMiddsString {
  private readonly _maxLength: number;
  private readonly _regex: RegExp | null;

  protected constructor(name: string, regex: RegExp | null, maxLength: number) {
    super(name);
    this._regex = regex;
    this._maxLength = maxLength;
  }

  public get Value(): string | null { return this.value }

  public get MaxLength(): number { return this._maxLength }

  public get Regex(): RegExp | null { return this._regex }

  public intoSubstrateType(): `0x${string}` | undefined {
    if (!this.Value) {
      return undefined;
    } else {
      return toHex(this.Value)
    }
  }

  public get isValid(): boolean {
    let regexAssert: boolean = true;
    if (this._regex && this.Value) {
      regexAssert = this._regex.test(this.Value);
    }
    return !(regexAssert && this.Value && this.Value.length > this.MaxLength);
  }

  public set Value(value: string | null) {
    if (value?.trim() === "") {
      this.value = null;
      return;
    }
    this.value = value;
  }
}

export abstract class MiddsNumber extends MiddsInput<number, bigint> {
  protected constructor(name: string) {
    super(name);
  }

  intoSubstrateType(): bigint | undefined{
    if (!this.Value) {
      return undefined;
    } else return BigInt(this.Value)
  }
}

export abstract class MiddsNumberNonBigInt extends MiddsInput<number, number> {
  protected constructor(name: string) {
    super(name);
  }

  intoSubstrateType(): number | undefined{
    if (!this.Value) {
      return undefined;
    } else return this.Value
  }
}

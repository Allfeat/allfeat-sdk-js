export interface IMiddsInput<T, SubstrateType> {
    get Value(): T | null;
    get Name(): string;
    get isValid(): boolean;
    set Value(value: T | null);
    intoSubstrateType(): SubstrateType;
}
export interface IMiddsString extends IMiddsInput<string, `0x${string}`> {
    get MaxLength(): number;
    get Regex(): RegExp | null;
}
export declare abstract class MiddsInput<T, SubstrateType> implements IMiddsInput<T, SubstrateType> {
    private value;
    private readonly name;
    protected constructor(name: string);
    get Value(): T | null;
    set Value(value: T | null);
    get Name(): string;
    abstract get isValid(): boolean;
    abstract intoSubstrateType(): SubstrateType;
}
export declare abstract class MiddsString extends MiddsInput<string, `0x${string}`> implements IMiddsString {
    private readonly _maxLength;
    private readonly _regex;
    protected constructor(name: string, regex: RegExp | null, maxLength: number);
    get MaxLength(): number;
    get Regex(): RegExp | null;
    intoSubstrateType(): `0x${string}`;
    get isValid(): boolean;
}
export declare abstract class MiddsNumber extends MiddsInput<number, bigint> {
    protected constructor(name: string);
    intoSubstrateType(): bigint;
}
//# sourceMappingURL=input.d.ts.map
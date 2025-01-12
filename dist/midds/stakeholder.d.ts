import { MiddsStakeholderStakeholder } from "../interfaces/allfeat";
import { Midds } from "./midds";
import { MiddsNumber, MiddsString } from './input';
export declare class Stakeholder extends Midds {
    constructor();
    set IPI(IPI: number | null);
    set FirstName(FirstName: string | null);
    set LastName(LastName: string | null);
    set Nickname(Nickname: string | null);
    get IPI(): number | null;
    get FirstName(): string | null;
    get LastName(): string | null;
    get Nickname(): string | null;
    parseIntoSubstrateType(): MiddsStakeholderStakeholder;
}
export declare class IPINameNumber extends MiddsNumber {
    constructor();
    get isValid(): boolean;
}
export declare class FirstName extends MiddsString {
    constructor();
}
export declare class LastName extends MiddsString {
    constructor();
}
export declare class Nickname extends MiddsString {
    constructor();
}
//# sourceMappingURL=stakeholder.d.ts.map
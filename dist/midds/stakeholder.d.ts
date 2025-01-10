import { MiddsStakeholderStakeholder } from "../interfaces/allfeat";
import { Midds } from "./midds";
export declare class Stakeholder extends Midds<MiddsStakeholderStakeholder> {
    private _IPINameNumber;
    private _firstName;
    private _lastName;
    private _nickname;
    constructor();
    get isValid(): boolean;
    set IPINameNumber(IPINameNumber: number);
    set FirstName(FirstName: string);
    set LastName(LastName: string);
    set Nickname(Nickname: string);
    get IPINameNumber(): number | null;
    get FirstName(): string | null;
    get LastName(): string | null;
    get NickName(): string | null;
    parseIntoSubstrateType(): MiddsStakeholderStakeholder;
}
//# sourceMappingURL=stakeholder.d.ts.map
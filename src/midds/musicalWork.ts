import { IMiddsInput, MiddsInput, MiddsNumberNonBigInt, MiddsString } from './input';
import {
  AllfeatSupportIswc,
  AllfeatSupportMusicalWorkType,
  MiddsMusicalWorkMusicalWork,
  MiddsMusicalWorkRole,
  MiddsMusicalWorkShare,
} from '../interfaces/allfeat';
import { Midds } from './midds';

export interface MusicalWorkInputs {
  [key: string]: IMiddsInput<any, any>;
  iswc: ISWC
  title: MusicalWorkTitle
  duration: MusicalWorkDuration
  musicalWorkType: MusicalWorkType
  shares: Shares
}

export class MusicalWork extends Midds<MusicalWorkInputs> {
  constructor() {
    const inputs: MusicalWorkInputs = {
      iswc: new ISWC(),
      title: new MusicalWorkTitle(),
      duration: new MusicalWorkDuration(),
      musicalWorkType: new MusicalWorkType(),
      shares: new Shares()
    };
    super("musicalWorks", inputs);
  }

  get ISWC(): ISWC {
    return this.getInput("iswc");
  }

  get Title(): MusicalWorkTitle {
    return this.getInput("title");
  }

  get Duration(): MusicalWorkDuration {
    return this.getInput("duration");
  }

  get MusicalWorkType(): MusicalWorkType {
    return this.getInput("musicalWorkType");
  }

  get Shares(): Shares {
    return this.getInput("shares");
  }

  set ISWC(iswc: ISWCValue) {
    this.ISWC.Value = iswc;
  }

  set Title(title: string) {
    this.Title.Value = title;
  }

  set Duration(duration: number) {
    this.Duration.Value = duration
  }

  set MusicalWorkType(musicalWorkType: AllfeatSupportMusicalWorkType) {
    this.MusicalWorkType.Value = musicalWorkType;
  }

  set Shares(shares: IShare[]) {
    this.Shares.Value = shares;
  }

  parseIntoSubstrateType(): MiddsMusicalWorkMusicalWork {
    if (!this.isValid) {
      throw new Error("Midds data must be valid");
    }
    return {
      iswc: this.ISWC.intoSubstrateType(),
      title: this.Title.intoSubstrateType(),
      duration: this.Duration.intoSubstrateType(),
      type: this.MusicalWorkType.intoSubstrateType(),
      shares: this.Shares.intoSubstrateType()
    }
  }
}

export interface ISWCValue {
  group1: number;
  group2: number;
  group3: number;
  checkDigit: number;
}

export class ISWC extends MiddsInput<ISWCValue, AllfeatSupportIswc> {
  constructor() {
    super("ISWC");
  }

  get isValid(): boolean {
    if (this.Value) {
      return this.Value.group1.toString().length <= 3 &&
        this.Value.group2.toString().length <= 3 &&
        this.Value.group3.toString().length <= 3 &&
        this.Value.checkDigit.toString().length === 1;
    } else return true;
  }

  intoSubstrateType(): AllfeatSupportIswc | undefined {
    if (this.Value) {
      return {
        group1: this.Value.group1,
        group2: this.Value.group2,
        group3: this.Value.group3,
        checkDigit: this.Value.checkDigit,
      }
    } else return undefined
  }

  toString(): string {
    if (this.Value !== null) {
      return "T-" + this.Value.group1 + "." + this.Value.group2 + "." + this.Value.group3 + "-" + this.Value.checkDigit;
    } else return "null";
  }
}

export class MusicalWorkTitle extends MiddsString {
  constructor() {
    super("Title", null, 128);
  }
}

export class MusicalWorkDuration extends MiddsNumberNonBigInt {
  constructor() {
    super("Duration");
  }

  get isValid(): boolean {
    return this.Value ? this.Value > 0 : true
  }
}

export class MusicalWorkType extends MiddsInput<AllfeatSupportMusicalWorkType, AllfeatSupportMusicalWorkType> {
  constructor() {
    super("Type");
  }

  get isValid(): boolean {
    return true
  }

  intoSubstrateType(): AllfeatSupportMusicalWorkType | undefined {
    return this.Value ? this.Value : undefined
  }
}

export interface IShareInfo {
  role: MiddsMusicalWorkRole,
  performanceShare: number,
  mechanicalShare: number,
}

export interface IShare {
  stakeholderId: string;
  shareInfo: IShareInfo;
}

export class Shares extends MiddsInput<IShare[], MiddsMusicalWorkShare[]> {
  value: IShare[] = [];

  constructor() {
    super("Shares");
  }

  get Value(): IShare[] {
    return this.value;
  }

  set Value(value: IShare[]) {
    this.value = value;
  }

  get isValid(): boolean {
    if (this.Value && this.Value.length > 0) {
      // Percent validation
      this.Value.every((share) =>
        share.shareInfo.performanceShare <= 100 && share.shareInfo.mechanicalShare <= 100
      )
    }
    return true;
  }

  intoSubstrateType(): MiddsMusicalWorkShare[] | undefined {
    if (this.Value && this.Value.length > 0) {
      return this.Value.map((share) => <MiddsMusicalWorkShare>{
        stakeholderId: share.stakeholderId, // toHex shouldn't be used here as it ask a raw Hash (with 0x...)
        shareInfo: share.shareInfo,
      })
    }
    return undefined
  }
}

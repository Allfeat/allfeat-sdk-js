import { IMiddsInput, MiddsInput, MiddsNumberNonBigInt, MiddsString } from './input';
import {
  AllfeatSupportIswc,
  AllfeatSupportSongType,
  MiddsSongRole,
  MiddsSongShare, MiddsSongSong,
} from '../interfaces/allfeat';
import { AccountId32Like } from 'dedot/codecs';
import { Midds } from './midds';
import { toHex } from 'dedot/utils';

interface SongInput {
  [key: string]: IMiddsInput<any, any>;
  iswc: ISWC
  title: SongTitle
  duration: SongDuration
  songType: SongType
  shares: Shares
}

export class Song extends Midds<SongInput> {
  constructor() {
    const inputs: SongInput = {
      iswc: new ISWC(),
      title: new SongTitle(),
      duration: new SongDuration(),
      songType: new SongType(),
      shares: new Shares()
    };
    super("musicalWorks", inputs);
  }

  get ISWC(): ISWC {
    return this.getInput("iswc");
  }

  get Title(): SongTitle {
    return this.getInput("title");
  }

  get Duration(): SongDuration {
    return this.getInput("duration");
  }

  get SongType(): SongType {
    return this.getInput("songType");
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

  set SongType(songType: AllfeatSupportSongType) {
    this.SongType.Value = songType;
  }

  set Shares(shares: IShare[]) {
    this.Shares.Value = shares;
  }

  parseIntoSubstrateType(): MiddsSongSong {
    if (!this.isValid) {
      throw new Error("Midds data must be valid");
    }
    return {
      iswc: this.ISWC.intoSubstrateType(),
      title: this.Title.intoSubstrateType(),
      duration: this.Duration.intoSubstrateType(),
      type: this.SongType.intoSubstrateType(),
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

export class ISWC extends MiddsInput<ISWCValue, AllfeatSupportIswc>{
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
}

export class SongTitle extends MiddsString {
  constructor() {
    super("Title", null, 128);
  }
}

export class SongDuration extends MiddsNumberNonBigInt {
  constructor() {
    super("Duration");
  }

  get isValid(): boolean {
    return this.Value ? this.Value > 0 : true
  }
}

export class SongType extends MiddsInput<AllfeatSupportSongType, AllfeatSupportSongType> {
  constructor() {
    super("Type");
  }

  get isValid(): boolean {
    return true
  }

  intoSubstrateType(): AllfeatSupportSongType | undefined {
    return this.Value ? this.Value : undefined
  }
}

export interface IShareInfo {
  role: MiddsSongRole,
  performanceShare: number,
  mechanicalShare: number,
}

export interface IShare {
  stakeholderId: string;
  shareInfo: IShareInfo;
}

export class Shares extends MiddsInput<IShare[], MiddsSongShare[]> {
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

  intoSubstrateType(): MiddsSongShare[] | undefined {
    if (this.Value && this.Value.length > 0) {
      return this.Value.map((share) => <MiddsSongShare>{
        stakeholderId: share.stakeholderId, // toHex shouldn't be used here as it ask a raw Hash (with 0x...)
        shareInfo: share.shareInfo,
      })
    }
    return undefined
  }
}
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  AllfeatClient: () => AllfeatClient,
  AllfeatProvider: () => AllfeatProvider,
  Midds: () => Midds,
  MiddsInput: () => MiddsInput,
  MiddsNumber: () => MiddsNumber,
  MiddsString: () => MiddsString,
  Stakeholder: () => Stakeholder
});
module.exports = __toCommonJS(index_exports);

// src/provider.ts
var import_dedot = require("dedot");
var providersUrl = {
  melodie: "wss://melodie-rpc.allfeat.io",
  devnet: "ws://127.0.0.1:9944"
};
var AllfeatProvider = class extends import_dedot.WsProvider {
  /**
   * Create a Provider instance for a specific Allfeat network
   * @param networkOrUrl - Network to connect to ('melodie' or 'devnet' or custom URL)
   */
  constructor(networkOrUrl) {
    const url = networkOrUrl in providersUrl ? providersUrl[networkOrUrl] : networkOrUrl;
    if (!url) {
      throw new Error(`Network ${networkOrUrl} is not supported, and no valid URL was provided`);
    }
    super(url);
  }
  /**
   * List all supported networks
   */
  static getSupportedNetworks() {
    return Object.keys(providersUrl);
  }
};

// src/client.ts
var import_dedot2 = require("dedot");
var AllfeatClient = class extends import_dedot2.DedotClient {
  constructor(provider) {
    super(provider);
  }
  static new(provider) {
    return import_dedot2.DedotClient.new(provider);
  }
};

// src/midds/midds.ts
var Midds = class {
  constructor(palletName, data) {
    this._palletName = palletName;
    this.data = data;
  }
  get isValid() {
    return this.data.every((input) => input.isValid);
  }
  createRegisterExtrinsic(client) {
    const extrinsicFn = client.tx[this._palletName]?.register;
    if (!extrinsicFn) {
      throw new Error(`Register function not found for MIDDS module: ${this._palletName}`);
    }
    return extrinsicFn(this.parseIntoSubstrateType());
  }
  register(client, account, callback) {
    return new Promise(async (resolve, reject) => {
      try {
        const unsub = await this.createRegisterExtrinsic(client).signAndSend(account, (result) => {
          if (callback) {
            callback(result);
          }
          console.log("Registration of the MIDDS current status: ", result.status.type);
          if (result.status.type === "BestChainBlockIncluded" || result.status.type === "Finalized") {
            unsub();
            console.log("Registration successfully included in the chain, fetching result data...");
            const eventToFind = client.events[this._palletName].MiddsRegistered;
            if (!eventToFind) {
              throw new Error(`MiddsRegistered Event not found for MIDDS module: ${this._palletName}`);
            }
            const event = result.events.find(
              (event2) => eventToFind.is(event2)
            );
            if (!event || typeof event.event.palletEvent === "string") {
              reject(new Error("Expected event not found, Register call probably failed on-chain."));
              return;
            }
            console.log("Found MIDDS Registration event: ", event);
            const registerResult = {
              txHash: result.txHash,
              blockHash: result.status.value.blockHash,
              blockNumber: result.status.value.blockNumber,
              middsHash: event.event.palletEvent.data.hashId,
              provider: event.event.palletEvent.data.provider.address(),
              collateralCost: event.event.palletEvent.data.dataColateral
            };
            console.log("Returning new MIDDS Registration result: ", registerResult);
            resolve(registerResult);
          }
          if (result.status.type === "Drop" || result.status.type === "Invalid" || result.status.type === "NoLongerInBestChain") {
            console.log("Transaction of MIDDS Registration failed to be included in the chain: ", result.status.type);
            unsub();
            reject(new Error(`Extrinsic failed with status: ${result.status.type}`));
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }
};

// src/midds/input.ts
var import_utils = require("dedot/utils");
var MiddsInput = class {
  constructor(name) {
    this.value = null;
    this.name = name;
  }
  get Value() {
    return this.value;
  }
  set Value(value) {
    this.value = value;
  }
  get Name() {
    return this.name;
  }
};
var MiddsString = class extends MiddsInput {
  constructor(name, regex, maxLength) {
    super(name);
    this._regex = regex;
    this._maxLength = maxLength;
  }
  get MaxLength() {
    return this._maxLength;
  }
  get Regex() {
    return this._regex;
  }
  intoSubstrateType() {
    if (!this.Value) {
      throw new Error(`Null value cannot be parsed to Substrate type`);
    } else {
      return (0, import_utils.toHex)(this.Value);
    }
  }
  get isValid() {
    if (this._regex && this.Value) {
      return this._regex.test(this.Value);
    }
    return true;
  }
};
var MiddsNumber = class extends MiddsInput {
  constructor(name) {
    super(name);
  }
  intoSubstrateType() {
    if (!this.Value) {
      throw new Error(`Null value cannot be parsed to Substrate type`);
    } else return BigInt(this.Value);
  }
};

// src/midds/stakeholder.ts
var Stakeholder = class extends Midds {
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
  set FirstName(FirstName2) {
    this.data[1].Value = FirstName2;
  }
  set LastName(LastName2) {
    this.data[2].Value = LastName2;
  }
  set Nickname(Nickname2) {
    this.data[3].Value = Nickname2;
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
      ipi: this.data[0].isValid && this.data[0].Value ? this.data[0].intoSubstrateType() : void 0,
      firstName: this.data[1].isValid && this.data[1].Value ? this.data[1].intoSubstrateType() : void 0,
      lastName: this.data[2].isValid && this.data[2].Value ? this.data[2].intoSubstrateType() : void 0,
      nickname: this.data[3].isValid && this.data[3].Value ? this.data[3].intoSubstrateType() : void 0
    };
  }
};
var IPINameNumber = class extends MiddsNumber {
  constructor() {
    super("IPI Name Number");
  }
  get isValid() {
    return !(this.Value && (this.Value > 99999999999 || this.Value < 1e8));
  }
};
var FirstName = class extends MiddsString {
  constructor() {
    super("First Name", null, 128);
  }
};
var LastName = class extends MiddsString {
  constructor() {
    super("Last Name", null, 128);
  }
};
var Nickname = class extends MiddsString {
  constructor() {
    super("Nickname", null, 128);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AllfeatClient,
  AllfeatProvider,
  Midds,
  MiddsInput,
  MiddsNumber,
  MiddsString,
  Stakeholder
});

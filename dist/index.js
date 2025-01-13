var __create = Object.create;
var __getProtoOf = Object.getPrototypeOf;
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: (newValue) => all[name] = () => newValue
    });
};

// node_modules/eventemitter3/index.js
var require_eventemitter3 = __commonJS((exports, module) => {
  var has = Object.prototype.hasOwnProperty;
  var prefix = "~";
  function Events() {
  }
  if (Object.create) {
    Events.prototype = Object.create(null);
    if (!new Events().__proto__)
      prefix = false;
  }
  function EE(fn, context, once) {
    this.fn = fn;
    this.context = context;
    this.once = once || false;
  }
  function addListener(emitter, event, fn, context, once) {
    if (typeof fn !== "function") {
      throw new TypeError("The listener must be a function");
    }
    var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
    if (!emitter._events[evt])
      emitter._events[evt] = listener, emitter._eventsCount++;
    else if (!emitter._events[evt].fn)
      emitter._events[evt].push(listener);
    else
      emitter._events[evt] = [emitter._events[evt], listener];
    return emitter;
  }
  function clearEvent(emitter, evt) {
    if (--emitter._eventsCount === 0)
      emitter._events = new Events;
    else
      delete emitter._events[evt];
  }
  function EventEmitter() {
    this._events = new Events;
    this._eventsCount = 0;
  }
  EventEmitter.prototype.eventNames = function eventNames() {
    var names = [], events, name;
    if (this._eventsCount === 0)
      return names;
    for (name in events = this._events) {
      if (has.call(events, name))
        names.push(prefix ? name.slice(1) : name);
    }
    if (Object.getOwnPropertySymbols) {
      return names.concat(Object.getOwnPropertySymbols(events));
    }
    return names;
  };
  EventEmitter.prototype.listeners = function listeners(event) {
    var evt = prefix ? prefix + event : event, handlers = this._events[evt];
    if (!handlers)
      return [];
    if (handlers.fn)
      return [handlers.fn];
    for (var i = 0, l = handlers.length, ee = new Array(l);i < l; i++) {
      ee[i] = handlers[i].fn;
    }
    return ee;
  };
  EventEmitter.prototype.listenerCount = function listenerCount(event) {
    var evt = prefix ? prefix + event : event, listeners = this._events[evt];
    if (!listeners)
      return 0;
    if (listeners.fn)
      return 1;
    return listeners.length;
  };
  EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
    var evt = prefix ? prefix + event : event;
    if (!this._events[evt])
      return false;
    var listeners = this._events[evt], len = arguments.length, args, i;
    if (listeners.fn) {
      if (listeners.once)
        this.removeListener(event, listeners.fn, undefined, true);
      switch (len) {
        case 1:
          return listeners.fn.call(listeners.context), true;
        case 2:
          return listeners.fn.call(listeners.context, a1), true;
        case 3:
          return listeners.fn.call(listeners.context, a1, a2), true;
        case 4:
          return listeners.fn.call(listeners.context, a1, a2, a3), true;
        case 5:
          return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
        case 6:
          return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
      }
      for (i = 1, args = new Array(len - 1);i < len; i++) {
        args[i - 1] = arguments[i];
      }
      listeners.fn.apply(listeners.context, args);
    } else {
      var length = listeners.length, j;
      for (i = 0;i < length; i++) {
        if (listeners[i].once)
          this.removeListener(event, listeners[i].fn, undefined, true);
        switch (len) {
          case 1:
            listeners[i].fn.call(listeners[i].context);
            break;
          case 2:
            listeners[i].fn.call(listeners[i].context, a1);
            break;
          case 3:
            listeners[i].fn.call(listeners[i].context, a1, a2);
            break;
          case 4:
            listeners[i].fn.call(listeners[i].context, a1, a2, a3);
            break;
          default:
            if (!args)
              for (j = 1, args = new Array(len - 1);j < len; j++) {
                args[j - 1] = arguments[j];
              }
            listeners[i].fn.apply(listeners[i].context, args);
        }
      }
    }
    return true;
  };
  EventEmitter.prototype.on = function on(event, fn, context) {
    return addListener(this, event, fn, context, false);
  };
  EventEmitter.prototype.once = function once(event, fn, context) {
    return addListener(this, event, fn, context, true);
  };
  EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
    var evt = prefix ? prefix + event : event;
    if (!this._events[evt])
      return this;
    if (!fn) {
      clearEvent(this, evt);
      return this;
    }
    var listeners = this._events[evt];
    if (listeners.fn) {
      if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
        clearEvent(this, evt);
      }
    } else {
      for (var i = 0, events = [], length = listeners.length;i < length; i++) {
        if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
          events.push(listeners[i]);
        }
      }
      if (events.length)
        this._events[evt] = events.length === 1 ? events[0] : events;
      else
        clearEvent(this, evt);
    }
    return this;
  };
  EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
    var evt;
    if (event) {
      evt = prefix ? prefix + event : event;
      if (this._events[evt])
        clearEvent(this, evt);
    } else {
      this._events = new Events;
      this._eventsCount = 0;
    }
    return this;
  };
  EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
  EventEmitter.prototype.addListener = EventEmitter.prototype.on;
  EventEmitter.prefixed = prefix;
  EventEmitter.EventEmitter = EventEmitter;
  if (typeof module !== "undefined") {
    module.exports = EventEmitter;
  }
});

// node_modules/@dedot/shape/index.js
var exports_shape = {};
__export(exports_shape, {
  withMetadata: () => withMetadata,
  variant: () => variant,
  uint8Array: () => uint8Array,
  u8: () => u8,
  u64: () => u642,
  u32: () => u322,
  u256: () => u256,
  u16: () => u16,
  u128: () => u128,
  tuple: () => tuple,
  transform: () => transform,
  taggedUnion: () => taggedUnion,
  str: () => str,
  sizedUint8Array: () => sizedUint8Array,
  sizedArray: () => sizedArray,
  set: () => set,
  result: () => result,
  record: () => record,
  promise: () => promise,
  optionalField: () => optionalField,
  optionBool: () => optionBool,
  option: () => option2,
  object: () => object2,
  never: () => never,
  metadata: () => metadata,
  map: () => map,
  literalUnion: () => literalUnion,
  lenPrefixed: () => lenPrefixed,
  iterable: () => iterable,
  is: () => is,
  int: () => int,
  instance: () => instance,
  i8: () => i8,
  i64: () => i64,
  i32: () => i32,
  i256: () => i256,
  i16: () => i16,
  i128: () => i128,
  hex: () => hex3,
  field: () => field,
  f64: () => f64,
  encodeHexPrefixed: () => encodeHexPrefixed,
  encodeHex: () => encodeHex,
  documented: () => documented,
  deferred: () => deferred2,
  decodeHex: () => decodeHex,
  createShape: () => createShape2,
  constant: () => constant,
  compactVisitor: () => compactVisitor,
  compactU8: () => compactU82,
  compactU64: () => compactU642,
  compactU32: () => compactU327,
  compactU256: () => compactU2562,
  compactU16: () => compactU162,
  compactU128: () => compactU1282,
  compact: () => compact,
  bool: () => bool,
  bitSequence: () => bitSequence,
  assert: () => assert2,
  array: () => array2,
  Vec: () => Vec,
  Variant: () => Variant,
  U8a: () => U8a,
  Tuple: () => Tuple,
  Struct: () => Struct,
  SizedVec: () => SizedVec,
  SizedU8a: () => SizedU8a,
  ShapeVisitor: () => ShapeVisitor,
  ShapeSet: () => ShapeSet,
  ShapeMap: () => ShapeMap,
  ShapeError: () => ShapeError,
  ShapeEncodeError: () => ShapeEncodeError,
  ShapeDecodeError: () => ShapeDecodeError,
  ShapeAssertError: () => ShapeAssertError,
  Shape: () => Shape,
  Result: () => Result,
  RawHex: () => RawHex,
  PrefixedHex: () => PrefixedHex,
  Option: () => Option,
  Null: () => Null,
  FlatEnum: () => FlatEnum,
  FixedStr: () => FixedStr,
  FixedHex: () => FixedHex,
  Enum: () => Enum,
  EncodeBuffer: () => EncodeBuffer,
  DecodeBuffer: () => DecodeBuffer,
  Context: () => Context,
  BitSequence: () => BitSequence,
  AssertState: () => AssertState,
  Array: () => Array2
});

// node_modules/@dedot/utils/error.js
class DedotError extends Error {
  name = "DedotError";
}

class UnknownApiError extends DedotError {
  name = "UnknownApiError";
}

// node_modules/@dedot/utils/assert.js
function assert(condition, message) {
  if (condition) {
    return;
  }
  throwError(message);
}
function throwError(message) {
  if (message instanceof Error) {
    throw message;
  }
  throw new Error(message);
}
function ensurePresence(value, message) {
  return value ?? throwError(message || "Value is not present (null or undefined)");
}

// node_modules/@noble/hashes/esm/_assert.js
function anumber(n) {
  if (!Number.isSafeInteger(n) || n < 0)
    throw new Error("positive integer expected, got " + n);
}
function isBytes(a) {
  return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
}
function abytes(b, ...lengths) {
  if (!isBytes(b))
    throw new Error("Uint8Array expected");
  if (lengths.length > 0 && !lengths.includes(b.length))
    throw new Error("Uint8Array expected of length " + lengths + ", got length=" + b.length);
}
function aexists(instance, checkFinished = true) {
  if (instance.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (checkFinished && instance.finished)
    throw new Error("Hash#digest() has already been called");
}
function aoutput(out, instance) {
  abytes(out);
  const min = instance.outputLen;
  if (out.length < min) {
    throw new Error("digestInto() expects output buffer of length at least " + min);
  }
}

// node_modules/@noble/hashes/esm/utils.js
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
var u32 = (arr) => new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
var isLE = /* @__PURE__ */ (() => new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68)();
var byteSwap = (word) => word << 24 & 4278190080 | word << 8 & 16711680 | word >>> 8 & 65280 | word >>> 24 & 255;
var byteSwapIfBE = isLE ? (n) => n : (n) => byteSwap(n);
function byteSwap32(arr) {
  for (let i = 0;i < arr.length; i++) {
    arr[i] = byteSwap(arr[i]);
  }
}
var hexes = /* @__PURE__ */ Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, "0"));
function bytesToHex(bytes) {
  abytes(bytes);
  let hex = "";
  for (let i = 0;i < bytes.length; i++) {
    hex += hexes[bytes[i]];
  }
  return hex;
}
var asciis = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
function asciiToBase16(ch) {
  if (ch >= asciis._0 && ch <= asciis._9)
    return ch - asciis._0;
  if (ch >= asciis.A && ch <= asciis.F)
    return ch - (asciis.A - 10);
  if (ch >= asciis.a && ch <= asciis.f)
    return ch - (asciis.a - 10);
  return;
}
function hexToBytes(hex) {
  if (typeof hex !== "string")
    throw new Error("hex string expected, got " + typeof hex);
  const hl = hex.length;
  const al = hl / 2;
  if (hl % 2)
    throw new Error("hex string expected, got unpadded hex of length " + hl);
  const array = new Uint8Array(al);
  for (let ai = 0, hi = 0;ai < al; ai++, hi += 2) {
    const n1 = asciiToBase16(hex.charCodeAt(hi));
    const n2 = asciiToBase16(hex.charCodeAt(hi + 1));
    if (n1 === undefined || n2 === undefined) {
      const char = hex[hi] + hex[hi + 1];
      throw new Error('hex string expected, got non-hex character "' + char + '" at index ' + hi);
    }
    array[ai] = n1 * 16 + n2;
  }
  return array;
}
function utf8ToBytes(str) {
  if (typeof str !== "string")
    throw new Error("utf8ToBytes expected string, got " + typeof str);
  return new Uint8Array(new TextEncoder().encode(str));
}
function toBytes(data) {
  if (typeof data === "string")
    data = utf8ToBytes(data);
  abytes(data);
  return data;
}
function concatBytes(...arrays) {
  let sum = 0;
  for (let i = 0;i < arrays.length; i++) {
    const a = arrays[i];
    abytes(a);
    sum += a.length;
  }
  const res = new Uint8Array(sum);
  for (let i = 0, pad = 0;i < arrays.length; i++) {
    const a = arrays[i];
    res.set(a, pad);
    pad += a.length;
  }
  return res;
}

class Hash {
  clone() {
    return this._cloneInto();
  }
}
function wrapConstructor(hashCons) {
  const hashC = (msg) => hashCons().update(toBytes(msg)).digest();
  const tmp = hashCons();
  hashC.outputLen = tmp.outputLen;
  hashC.blockLen = tmp.blockLen;
  hashC.create = () => hashCons();
  return hashC;
}
function wrapConstructorWithOpts(hashCons) {
  const hashC = (msg, opts) => hashCons(opts).update(toBytes(msg)).digest();
  const tmp = hashCons({});
  hashC.outputLen = tmp.outputLen;
  hashC.blockLen = tmp.blockLen;
  hashC.create = (opts) => hashCons(opts);
  return hashC;
}
function wrapXOFConstructorWithOpts(hashCons) {
  const hashC = (msg, opts) => hashCons(opts).update(toBytes(msg)).digest();
  const tmp = hashCons({});
  hashC.outputLen = tmp.outputLen;
  hashC.blockLen = tmp.blockLen;
  hashC.create = (opts) => hashCons(opts);
  return hashC;
}

// node_modules/@dedot/utils/u8a.js
function u8aToHex(input) {
  if (!input)
    return "0x";
  return hexAddPrefix(bytesToHex(input));
}
var textDecoder = new TextDecoder("utf-8");
function u8aToString(input) {
  if (!input)
    return "";
  return textDecoder.decode(input);
}

// node_modules/@dedot/utils/is.js
function isNull(input) {
  return input === null;
}
function isUndefined(input) {
  return input === undefined || typeof input === "undefined";
}
function isString(input) {
  return typeof input === "string";
}
function isBoolean(input) {
  return typeof input === "boolean";
}
function isFunction(input) {
  return typeof input === "function";
}
function isNumber(input) {
  return typeof input === "number";
}
function isObject(input) {
  return !!input && typeof input === "object";
}
function isU8a(input) {
  return input instanceof Uint8Array;
}
var HEX_REGEX = /^0x[\da-fA-F]+$/;
function isHex(input, strict) {
  return isString(input) && (input === "0x" || HEX_REGEX.test(input)) && (!strict || input.length % 2 === 0);
}
var WASM_MAGIC = new Uint8Array([0, 97, 115, 109]);

// node_modules/@dedot/utils/hex.js
function hexToU8a(input) {
  return hexToBytes(hexStripPrefix(input));
}
function hexToString(input) {
  return u8aToString(hexToU8a(input));
}
var isZeroHex = (input) => {
  return isHex(input) && hexToU8a(input).every((b) => b === 0);
};
var hexAddPrefix = (input) => {
  if (!input)
    return "0x";
  return input.startsWith("0x") ? input : `0x${input}`;
};
var hexStripPrefix = (input) => {
  if (!input)
    return "";
  return input.startsWith("0x") ? input.substring(2) : input;
};

// node_modules/@dedot/utils/number.js
function numberToHex(input) {
  const hex = (input ?? 0).toString(16);
  return hexAddPrefix(hex.length % 2 ? `0${hex}` : hex);
}
function numberToU8a(input) {
  return hexToU8a(numberToHex(input));
}

// node_modules/@dedot/utils/string/cases.js
var CC_TO_UP = new Array(256);
var CC_TO_LO = new Array(256);
for (let i = 0, count = CC_TO_UP.length;i < count; i++) {
  CC_TO_LO[i] = String.fromCharCode(i).toLowerCase();
  CC_TO_UP[i] = String.fromCharCode(i).toUpperCase();
}
function formatAllCaps(w) {
  return w.slice(0, w.length - 1).toLowerCase() + CC_TO_UP[w.charCodeAt(w.length - 1)];
}
function converter(format) {
  return (value) => {
    const parts = value.replace(/[-_., ]+/g, " ").trim().split(" ");
    let result = "";
    for (let i = 0, count = parts.length;i < count; i++) {
      const w = parts[i];
      result += format(/^[\dA-Z]+$/.test(w) ? w.toLowerCase() : w.replace(/^[\dA-Z]{2,}[^a-z]/, formatAllCaps), i);
    }
    return result;
  };
}
var stringCamelCase = /* @__PURE__ */ converter((w, i) => (i ? CC_TO_UP[w.charCodeAt(0)] : CC_TO_LO[w.charCodeAt(0)]) + w.slice(1));
var stringPascalCase = /* @__PURE__ */ converter((w) => CC_TO_UP[w.charCodeAt(0)] + w.slice(1));
var stringSnakeCase = (input) => {
  if (!input)
    return "";
  return stringCamelCase(input).replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
};
// node_modules/@dedot/utils/string/index.js
var textEncoder = new TextEncoder;
function stringToU8a(input) {
  return textEncoder.encode(input);
}
function stringToHex(input) {
  return u8aToHex(stringToU8a(input));
}

// node_modules/@dedot/utils/to.js
function toHex(input) {
  if (isU8a(input)) {
    return u8aToHex(input);
  } else if (isNumber(input)) {
    return numberToHex(input);
  } else if (isHex(input)) {
    return input;
  } else if (isString(input)) {
    return stringToHex(input);
  }
  throw new Error(`Invalid input type of: ${input}`);
}
function toU8a(input) {
  if (isU8a(input)) {
    return input;
  } else if (isNumber(input)) {
    return numberToU8a(input);
  } else if (isHex(input)) {
    return hexToU8a(input);
  } else if (isString(input)) {
    return stringToU8a(input);
  }
  throw new Error(`Invalid input type of: ${input}`);
}

// node_modules/@dedot/utils/hash/xxhash64.js
var P64_1 = 11400714785074694791n;
var P64_2 = 14029467366897019727n;
var P64_3 = 1609587929392839161n;
var P64_4 = 9650029242287828579n;
var P64_5 = 2870177450012600261n;
var U64 = BigInt("0xffffffffffffffff");
var _0n = 0n;
var _1n = 1n;
var _7n = 7n;
var _11n = 11n;
var _12n = 12n;
var _16n = 16n;
var _18n = 18n;
var _23n = 23n;
var _27n = 27n;
var _29n = 29n;
var _31n = 31n;
var _32n = 32n;
var _33n = 33n;
var _64n = 64n;
var _256n = 256n;
function rotl(a, b) {
  const c = a & U64;
  return (c << b | c >> _64n - b) & U64;
}
function fromU8a(u8a, p, count) {
  const bigints = new Array(count);
  let offset = 0;
  for (let i = 0;i < count; i++, offset += 2) {
    bigints[i] = BigInt(u8a[p + offset] | u8a[p + 1 + offset] << 8);
  }
  let result = _0n;
  for (let i = count - 1;i >= 0; i--) {
    result = (result << _16n) + bigints[i];
  }
  return result;
}
function init(seed, input) {
  const state = {
    seed,
    u8a: new Uint8Array(32),
    u8asize: 0,
    v1: seed + P64_1 + P64_2,
    v2: seed + P64_2,
    v3: seed,
    v4: seed - P64_1
  };
  if (input.length < 32) {
    state.u8a.set(input);
    state.u8asize = input.length;
    return state;
  }
  const limit = input.length - 32;
  let p = 0;
  if (limit >= 0) {
    const adjustV = (v) => P64_1 * rotl(v + P64_2 * fromU8a(input, p, 4), _31n);
    do {
      state.v1 = adjustV(state.v1);
      p += 8;
      state.v2 = adjustV(state.v2);
      p += 8;
      state.v3 = adjustV(state.v3);
      p += 8;
      state.v4 = adjustV(state.v4);
      p += 8;
    } while (p <= limit);
  }
  if (p < input.length) {
    state.u8a.set(input.subarray(p, input.length));
    state.u8asize = input.length - p;
  }
  return state;
}
function xxhash64(input, initSeed) {
  const { seed, u8a, u8asize, v1, v2, v3, v4 } = init(BigInt(initSeed), input);
  let p = 0;
  let h64 = U64 & BigInt(input.length) + (input.length >= 32 ? ((((rotl(v1, _1n) + rotl(v2, _7n) + rotl(v3, _12n) + rotl(v4, _18n) ^ P64_1 * rotl(v1 * P64_2, _31n)) * P64_1 + P64_4 ^ P64_1 * rotl(v2 * P64_2, _31n)) * P64_1 + P64_4 ^ P64_1 * rotl(v3 * P64_2, _31n)) * P64_1 + P64_4 ^ P64_1 * rotl(v4 * P64_2, _31n)) * P64_1 + P64_4 : seed + P64_5);
  while (p <= u8asize - 8) {
    h64 = U64 & P64_4 + P64_1 * rotl(h64 ^ P64_1 * rotl(P64_2 * fromU8a(u8a, p, 4), _31n), _27n);
    p += 8;
  }
  if (p + 4 <= u8asize) {
    h64 = U64 & P64_3 + P64_2 * rotl(h64 ^ P64_1 * fromU8a(u8a, p, 2), _23n);
    p += 4;
  }
  while (p < u8asize) {
    h64 = U64 & P64_1 * rotl(h64 ^ P64_5 * BigInt(u8a[p++]), _11n);
  }
  h64 = U64 & P64_2 * (h64 ^ h64 >> _33n);
  h64 = U64 & P64_3 * (h64 ^ h64 >> _29n);
  h64 = U64 & (h64 ^ h64 >> _32n);
  const result = new Uint8Array(8);
  for (let i = 7;i >= 0; i--) {
    result[i] = Number(h64 % _256n);
    h64 = h64 / _256n;
  }
  return result;
}

// node_modules/@dedot/utils/hash/xxhash.js
function xxhashAsU8a(data, bitLength = 64) {
  const rounds = Math.ceil(bitLength / 64);
  const u8a = toU8a(data);
  const result = new Uint8Array(rounds * 8);
  for (let seed = 0;seed < rounds; seed++) {
    result.set(xxhash64(u8a, seed).reverse(), seed * 8);
  }
  return result;
}

// node_modules/@noble/hashes/esm/_blake.js
var SIGMA = /* @__PURE__ */ new Uint8Array([
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  14,
  10,
  4,
  8,
  9,
  15,
  13,
  6,
  1,
  12,
  0,
  2,
  11,
  7,
  5,
  3,
  11,
  8,
  12,
  0,
  5,
  2,
  15,
  13,
  10,
  14,
  3,
  6,
  7,
  1,
  9,
  4,
  7,
  9,
  3,
  1,
  13,
  12,
  11,
  14,
  2,
  6,
  5,
  10,
  4,
  0,
  15,
  8,
  9,
  0,
  5,
  7,
  2,
  4,
  10,
  15,
  14,
  1,
  11,
  12,
  6,
  8,
  3,
  13,
  2,
  12,
  6,
  10,
  0,
  11,
  8,
  3,
  4,
  13,
  7,
  5,
  15,
  14,
  1,
  9,
  12,
  5,
  1,
  15,
  14,
  13,
  4,
  10,
  0,
  7,
  6,
  3,
  9,
  2,
  8,
  11,
  13,
  11,
  7,
  14,
  12,
  1,
  3,
  9,
  5,
  0,
  15,
  4,
  8,
  6,
  2,
  10,
  6,
  15,
  14,
  9,
  11,
  3,
  0,
  8,
  12,
  2,
  13,
  7,
  1,
  4,
  10,
  5,
  10,
  2,
  8,
  4,
  7,
  6,
  1,
  5,
  15,
  11,
  9,
  14,
  3,
  12,
  13,
  0,
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  14,
  10,
  4,
  8,
  9,
  15,
  13,
  6,
  1,
  12,
  0,
  2,
  11,
  7,
  5,
  3
]);

class BLAKE extends Hash {
  constructor(blockLen, outputLen, opts = {}, keyLen, saltLen, persLen) {
    super();
    this.blockLen = blockLen;
    this.outputLen = outputLen;
    this.length = 0;
    this.pos = 0;
    this.finished = false;
    this.destroyed = false;
    anumber(blockLen);
    anumber(outputLen);
    anumber(keyLen);
    if (outputLen < 0 || outputLen > keyLen)
      throw new Error("outputLen bigger than keyLen");
    if (opts.key !== undefined && (opts.key.length < 1 || opts.key.length > keyLen))
      throw new Error("key length must be undefined or 1.." + keyLen);
    if (opts.salt !== undefined && opts.salt.length !== saltLen)
      throw new Error("salt must be undefined or " + saltLen);
    if (opts.personalization !== undefined && opts.personalization.length !== persLen)
      throw new Error("personalization must be undefined or " + persLen);
    this.buffer = new Uint8Array(blockLen);
    this.buffer32 = u32(this.buffer);
  }
  update(data) {
    aexists(this);
    const { blockLen, buffer, buffer32 } = this;
    data = toBytes(data);
    const len = data.length;
    const offset = data.byteOffset;
    const buf = data.buffer;
    for (let pos = 0;pos < len; ) {
      if (this.pos === blockLen) {
        if (!isLE)
          byteSwap32(buffer32);
        this.compress(buffer32, 0, false);
        if (!isLE)
          byteSwap32(buffer32);
        this.pos = 0;
      }
      const take = Math.min(blockLen - this.pos, len - pos);
      const dataOffset = offset + pos;
      if (take === blockLen && !(dataOffset % 4) && pos + take < len) {
        const data32 = new Uint32Array(buf, dataOffset, Math.floor((len - pos) / 4));
        if (!isLE)
          byteSwap32(data32);
        for (let pos32 = 0;pos + blockLen < len; pos32 += buffer32.length, pos += blockLen) {
          this.length += blockLen;
          this.compress(data32, pos32, false);
        }
        if (!isLE)
          byteSwap32(data32);
        continue;
      }
      buffer.set(data.subarray(pos, pos + take), this.pos);
      this.pos += take;
      this.length += take;
      pos += take;
    }
    return this;
  }
  digestInto(out) {
    aexists(this);
    aoutput(out, this);
    const { pos, buffer32 } = this;
    this.finished = true;
    this.buffer.subarray(pos).fill(0);
    if (!isLE)
      byteSwap32(buffer32);
    this.compress(buffer32, 0, true);
    if (!isLE)
      byteSwap32(buffer32);
    const out32 = u32(out);
    this.get().forEach((v, i) => out32[i] = byteSwapIfBE(v));
  }
  digest() {
    const { buffer, outputLen } = this;
    this.digestInto(buffer);
    const res = buffer.slice(0, outputLen);
    this.destroy();
    return res;
  }
  _cloneInto(to) {
    const { buffer, length, finished, destroyed, outputLen, pos } = this;
    to || (to = new this.constructor({ dkLen: outputLen }));
    to.set(...this.get());
    to.length = length;
    to.finished = finished;
    to.destroyed = destroyed;
    to.outputLen = outputLen;
    to.buffer.set(buffer);
    to.pos = pos;
    return to;
  }
}

// node_modules/@noble/hashes/esm/_u64.js
var U32_MASK64 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
var _32n2 = /* @__PURE__ */ BigInt(32);
function fromBig(n, le = false) {
  if (le)
    return { h: Number(n & U32_MASK64), l: Number(n >> _32n2 & U32_MASK64) };
  return { h: Number(n >> _32n2 & U32_MASK64) | 0, l: Number(n & U32_MASK64) | 0 };
}
function split(lst, le = false) {
  let Ah = new Uint32Array(lst.length);
  let Al = new Uint32Array(lst.length);
  for (let i = 0;i < lst.length; i++) {
    const { h, l } = fromBig(lst[i], le);
    [Ah[i], Al[i]] = [h, l];
  }
  return [Ah, Al];
}
var toBig = (h, l) => BigInt(h >>> 0) << _32n2 | BigInt(l >>> 0);
var shrSH = (h, _l, s) => h >>> s;
var shrSL = (h, l, s) => h << 32 - s | l >>> s;
var rotrSH = (h, l, s) => h >>> s | l << 32 - s;
var rotrSL = (h, l, s) => h << 32 - s | l >>> s;
var rotrBH = (h, l, s) => h << 64 - s | l >>> s - 32;
var rotrBL = (h, l, s) => h >>> s - 32 | l << 64 - s;
var rotr32H = (_h, l) => l;
var rotr32L = (h, _l) => h;
var rotlSH = (h, l, s) => h << s | l >>> 32 - s;
var rotlSL = (h, l, s) => l << s | h >>> 32 - s;
var rotlBH = (h, l, s) => l << s - 32 | h >>> 64 - s;
var rotlBL = (h, l, s) => h << s - 32 | l >>> 64 - s;
function add(Ah, Al, Bh, Bl) {
  const l = (Al >>> 0) + (Bl >>> 0);
  return { h: Ah + Bh + (l / 2 ** 32 | 0) | 0, l: l | 0 };
}
var add3L = (Al, Bl, Cl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0);
var add3H = (low, Ah, Bh, Ch) => Ah + Bh + Ch + (low / 2 ** 32 | 0) | 0;
var add4L = (Al, Bl, Cl, Dl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0);
var add4H = (low, Ah, Bh, Ch, Dh) => Ah + Bh + Ch + Dh + (low / 2 ** 32 | 0) | 0;
var add5L = (Al, Bl, Cl, Dl, El) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0) + (El >>> 0);
var add5H = (low, Ah, Bh, Ch, Dh, Eh) => Ah + Bh + Ch + Dh + Eh + (low / 2 ** 32 | 0) | 0;
var u64 = {
  fromBig,
  split,
  toBig,
  shrSH,
  shrSL,
  rotrSH,
  rotrSL,
  rotrBH,
  rotrBL,
  rotr32H,
  rotr32L,
  rotlSH,
  rotlSL,
  rotlBH,
  rotlBL,
  add,
  add3L,
  add3H,
  add4L,
  add4H,
  add5H,
  add5L
};
var _u64_default = u64;

// node_modules/@noble/hashes/esm/blake2b.js
var B2B_IV = /* @__PURE__ */ new Uint32Array([
  4089235720,
  1779033703,
  2227873595,
  3144134277,
  4271175723,
  1013904242,
  1595750129,
  2773480762,
  2917565137,
  1359893119,
  725511199,
  2600822924,
  4215389547,
  528734635,
  327033209,
  1541459225
]);
var BBUF = /* @__PURE__ */ new Uint32Array(32);
function G1b(a, b, c, d, msg, x) {
  const Xl = msg[x], Xh = msg[x + 1];
  let Al = BBUF[2 * a], Ah = BBUF[2 * a + 1];
  let Bl = BBUF[2 * b], Bh = BBUF[2 * b + 1];
  let Cl = BBUF[2 * c], Ch = BBUF[2 * c + 1];
  let Dl = BBUF[2 * d], Dh = BBUF[2 * d + 1];
  let ll = _u64_default.add3L(Al, Bl, Xl);
  Ah = _u64_default.add3H(ll, Ah, Bh, Xh);
  Al = ll | 0;
  ({ Dh, Dl } = { Dh: Dh ^ Ah, Dl: Dl ^ Al });
  ({ Dh, Dl } = { Dh: _u64_default.rotr32H(Dh, Dl), Dl: _u64_default.rotr32L(Dh, Dl) });
  ({ h: Ch, l: Cl } = _u64_default.add(Ch, Cl, Dh, Dl));
  ({ Bh, Bl } = { Bh: Bh ^ Ch, Bl: Bl ^ Cl });
  ({ Bh, Bl } = { Bh: _u64_default.rotrSH(Bh, Bl, 24), Bl: _u64_default.rotrSL(Bh, Bl, 24) });
  BBUF[2 * a] = Al, BBUF[2 * a + 1] = Ah;
  BBUF[2 * b] = Bl, BBUF[2 * b + 1] = Bh;
  BBUF[2 * c] = Cl, BBUF[2 * c + 1] = Ch;
  BBUF[2 * d] = Dl, BBUF[2 * d + 1] = Dh;
}
function G2b(a, b, c, d, msg, x) {
  const Xl = msg[x], Xh = msg[x + 1];
  let Al = BBUF[2 * a], Ah = BBUF[2 * a + 1];
  let Bl = BBUF[2 * b], Bh = BBUF[2 * b + 1];
  let Cl = BBUF[2 * c], Ch = BBUF[2 * c + 1];
  let Dl = BBUF[2 * d], Dh = BBUF[2 * d + 1];
  let ll = _u64_default.add3L(Al, Bl, Xl);
  Ah = _u64_default.add3H(ll, Ah, Bh, Xh);
  Al = ll | 0;
  ({ Dh, Dl } = { Dh: Dh ^ Ah, Dl: Dl ^ Al });
  ({ Dh, Dl } = { Dh: _u64_default.rotrSH(Dh, Dl, 16), Dl: _u64_default.rotrSL(Dh, Dl, 16) });
  ({ h: Ch, l: Cl } = _u64_default.add(Ch, Cl, Dh, Dl));
  ({ Bh, Bl } = { Bh: Bh ^ Ch, Bl: Bl ^ Cl });
  ({ Bh, Bl } = { Bh: _u64_default.rotrBH(Bh, Bl, 63), Bl: _u64_default.rotrBL(Bh, Bl, 63) });
  BBUF[2 * a] = Al, BBUF[2 * a + 1] = Ah;
  BBUF[2 * b] = Bl, BBUF[2 * b + 1] = Bh;
  BBUF[2 * c] = Cl, BBUF[2 * c + 1] = Ch;
  BBUF[2 * d] = Dl, BBUF[2 * d + 1] = Dh;
}

class BLAKE2b extends BLAKE {
  constructor(opts = {}) {
    super(128, opts.dkLen === undefined ? 64 : opts.dkLen, opts, 64, 16, 16);
    this.v0l = B2B_IV[0] | 0;
    this.v0h = B2B_IV[1] | 0;
    this.v1l = B2B_IV[2] | 0;
    this.v1h = B2B_IV[3] | 0;
    this.v2l = B2B_IV[4] | 0;
    this.v2h = B2B_IV[5] | 0;
    this.v3l = B2B_IV[6] | 0;
    this.v3h = B2B_IV[7] | 0;
    this.v4l = B2B_IV[8] | 0;
    this.v4h = B2B_IV[9] | 0;
    this.v5l = B2B_IV[10] | 0;
    this.v5h = B2B_IV[11] | 0;
    this.v6l = B2B_IV[12] | 0;
    this.v6h = B2B_IV[13] | 0;
    this.v7l = B2B_IV[14] | 0;
    this.v7h = B2B_IV[15] | 0;
    const keyLength = opts.key ? opts.key.length : 0;
    this.v0l ^= this.outputLen | keyLength << 8 | 1 << 16 | 1 << 24;
    if (opts.salt) {
      const salt = u32(toBytes(opts.salt));
      this.v4l ^= byteSwapIfBE(salt[0]);
      this.v4h ^= byteSwapIfBE(salt[1]);
      this.v5l ^= byteSwapIfBE(salt[2]);
      this.v5h ^= byteSwapIfBE(salt[3]);
    }
    if (opts.personalization) {
      const pers = u32(toBytes(opts.personalization));
      this.v6l ^= byteSwapIfBE(pers[0]);
      this.v6h ^= byteSwapIfBE(pers[1]);
      this.v7l ^= byteSwapIfBE(pers[2]);
      this.v7h ^= byteSwapIfBE(pers[3]);
    }
    if (opts.key) {
      const tmp = new Uint8Array(this.blockLen);
      tmp.set(toBytes(opts.key));
      this.update(tmp);
    }
  }
  get() {
    let { v0l, v0h, v1l, v1h, v2l, v2h, v3l, v3h, v4l, v4h, v5l, v5h, v6l, v6h, v7l, v7h } = this;
    return [v0l, v0h, v1l, v1h, v2l, v2h, v3l, v3h, v4l, v4h, v5l, v5h, v6l, v6h, v7l, v7h];
  }
  set(v0l, v0h, v1l, v1h, v2l, v2h, v3l, v3h, v4l, v4h, v5l, v5h, v6l, v6h, v7l, v7h) {
    this.v0l = v0l | 0;
    this.v0h = v0h | 0;
    this.v1l = v1l | 0;
    this.v1h = v1h | 0;
    this.v2l = v2l | 0;
    this.v2h = v2h | 0;
    this.v3l = v3l | 0;
    this.v3h = v3h | 0;
    this.v4l = v4l | 0;
    this.v4h = v4h | 0;
    this.v5l = v5l | 0;
    this.v5h = v5h | 0;
    this.v6l = v6l | 0;
    this.v6h = v6h | 0;
    this.v7l = v7l | 0;
    this.v7h = v7h | 0;
  }
  compress(msg, offset, isLast) {
    this.get().forEach((v, i) => BBUF[i] = v);
    BBUF.set(B2B_IV, 16);
    let { h, l } = _u64_default.fromBig(BigInt(this.length));
    BBUF[24] = B2B_IV[8] ^ l;
    BBUF[25] = B2B_IV[9] ^ h;
    if (isLast) {
      BBUF[28] = ~BBUF[28];
      BBUF[29] = ~BBUF[29];
    }
    let j = 0;
    const s = SIGMA;
    for (let i = 0;i < 12; i++) {
      G1b(0, 4, 8, 12, msg, offset + 2 * s[j++]);
      G2b(0, 4, 8, 12, msg, offset + 2 * s[j++]);
      G1b(1, 5, 9, 13, msg, offset + 2 * s[j++]);
      G2b(1, 5, 9, 13, msg, offset + 2 * s[j++]);
      G1b(2, 6, 10, 14, msg, offset + 2 * s[j++]);
      G2b(2, 6, 10, 14, msg, offset + 2 * s[j++]);
      G1b(3, 7, 11, 15, msg, offset + 2 * s[j++]);
      G2b(3, 7, 11, 15, msg, offset + 2 * s[j++]);
      G1b(0, 5, 10, 15, msg, offset + 2 * s[j++]);
      G2b(0, 5, 10, 15, msg, offset + 2 * s[j++]);
      G1b(1, 6, 11, 12, msg, offset + 2 * s[j++]);
      G2b(1, 6, 11, 12, msg, offset + 2 * s[j++]);
      G1b(2, 7, 8, 13, msg, offset + 2 * s[j++]);
      G2b(2, 7, 8, 13, msg, offset + 2 * s[j++]);
      G1b(3, 4, 9, 14, msg, offset + 2 * s[j++]);
      G2b(3, 4, 9, 14, msg, offset + 2 * s[j++]);
    }
    this.v0l ^= BBUF[0] ^ BBUF[16];
    this.v0h ^= BBUF[1] ^ BBUF[17];
    this.v1l ^= BBUF[2] ^ BBUF[18];
    this.v1h ^= BBUF[3] ^ BBUF[19];
    this.v2l ^= BBUF[4] ^ BBUF[20];
    this.v2h ^= BBUF[5] ^ BBUF[21];
    this.v3l ^= BBUF[6] ^ BBUF[22];
    this.v3h ^= BBUF[7] ^ BBUF[23];
    this.v4l ^= BBUF[8] ^ BBUF[24];
    this.v4h ^= BBUF[9] ^ BBUF[25];
    this.v5l ^= BBUF[10] ^ BBUF[26];
    this.v5h ^= BBUF[11] ^ BBUF[27];
    this.v6l ^= BBUF[12] ^ BBUF[28];
    this.v6h ^= BBUF[13] ^ BBUF[29];
    this.v7l ^= BBUF[14] ^ BBUF[30];
    this.v7h ^= BBUF[15] ^ BBUF[31];
    BBUF.fill(0);
  }
  destroy() {
    this.destroyed = true;
    this.buffer32.fill(0);
    this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
}
var blake2b = /* @__PURE__ */ wrapConstructorWithOpts((opts) => new BLAKE2b(opts));

// node_modules/@dedot/utils/hash/blake2.js
function blake2AsU8a(data, bitLength = 256, key) {
  const byteLength = Math.ceil(bitLength / 8);
  const u8a = toU8a(data);
  return key ? blake2b(u8a, { dkLen: byteLength, key }) : blake2b(u8a, { dkLen: byteLength });
}
function blake2AsHex(data, bitLength, key) {
  return u8aToHex(blake2AsU8a(data, bitLength, key));
}

// node_modules/@noble/hashes/esm/sha3.js
var SHA3_PI = [];
var SHA3_ROTL = [];
var _SHA3_IOTA = [];
var _0n2 = /* @__PURE__ */ BigInt(0);
var _1n2 = /* @__PURE__ */ BigInt(1);
var _2n = /* @__PURE__ */ BigInt(2);
var _7n2 = /* @__PURE__ */ BigInt(7);
var _256n2 = /* @__PURE__ */ BigInt(256);
var _0x71n = /* @__PURE__ */ BigInt(113);
for (let round = 0, R = _1n2, x = 1, y = 0;round < 24; round++) {
  [x, y] = [y, (2 * x + 3 * y) % 5];
  SHA3_PI.push(2 * (5 * y + x));
  SHA3_ROTL.push((round + 1) * (round + 2) / 2 % 64);
  let t = _0n2;
  for (let j = 0;j < 7; j++) {
    R = (R << _1n2 ^ (R >> _7n2) * _0x71n) % _256n2;
    if (R & _2n)
      t ^= _1n2 << (_1n2 << /* @__PURE__ */ BigInt(j)) - _1n2;
  }
  _SHA3_IOTA.push(t);
}
var [SHA3_IOTA_H, SHA3_IOTA_L] = /* @__PURE__ */ split(_SHA3_IOTA, true);
var rotlH = (h, l, s) => s > 32 ? rotlBH(h, l, s) : rotlSH(h, l, s);
var rotlL = (h, l, s) => s > 32 ? rotlBL(h, l, s) : rotlSL(h, l, s);
function keccakP(s, rounds = 24) {
  const B = new Uint32Array(5 * 2);
  for (let round = 24 - rounds;round < 24; round++) {
    for (let x = 0;x < 10; x++)
      B[x] = s[x] ^ s[x + 10] ^ s[x + 20] ^ s[x + 30] ^ s[x + 40];
    for (let x = 0;x < 10; x += 2) {
      const idx1 = (x + 8) % 10;
      const idx0 = (x + 2) % 10;
      const B0 = B[idx0];
      const B1 = B[idx0 + 1];
      const Th = rotlH(B0, B1, 1) ^ B[idx1];
      const Tl = rotlL(B0, B1, 1) ^ B[idx1 + 1];
      for (let y = 0;y < 50; y += 10) {
        s[x + y] ^= Th;
        s[x + y + 1] ^= Tl;
      }
    }
    let curH = s[2];
    let curL = s[3];
    for (let t = 0;t < 24; t++) {
      const shift = SHA3_ROTL[t];
      const Th = rotlH(curH, curL, shift);
      const Tl = rotlL(curH, curL, shift);
      const PI = SHA3_PI[t];
      curH = s[PI];
      curL = s[PI + 1];
      s[PI] = Th;
      s[PI + 1] = Tl;
    }
    for (let y = 0;y < 50; y += 10) {
      for (let x = 0;x < 10; x++)
        B[x] = s[y + x];
      for (let x = 0;x < 10; x++)
        s[y + x] ^= ~B[(x + 2) % 10] & B[(x + 4) % 10];
    }
    s[0] ^= SHA3_IOTA_H[round];
    s[1] ^= SHA3_IOTA_L[round];
  }
  B.fill(0);
}

class Keccak extends Hash {
  constructor(blockLen, suffix, outputLen, enableXOF = false, rounds = 24) {
    super();
    this.blockLen = blockLen;
    this.suffix = suffix;
    this.outputLen = outputLen;
    this.enableXOF = enableXOF;
    this.rounds = rounds;
    this.pos = 0;
    this.posOut = 0;
    this.finished = false;
    this.destroyed = false;
    anumber(outputLen);
    if (0 >= this.blockLen || this.blockLen >= 200)
      throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200);
    this.state32 = u32(this.state);
  }
  keccak() {
    if (!isLE)
      byteSwap32(this.state32);
    keccakP(this.state32, this.rounds);
    if (!isLE)
      byteSwap32(this.state32);
    this.posOut = 0;
    this.pos = 0;
  }
  update(data) {
    aexists(this);
    const { blockLen, state } = this;
    data = toBytes(data);
    const len = data.length;
    for (let pos = 0;pos < len; ) {
      const take = Math.min(blockLen - this.pos, len - pos);
      for (let i = 0;i < take; i++)
        state[this.pos++] ^= data[pos++];
      if (this.pos === blockLen)
        this.keccak();
    }
    return this;
  }
  finish() {
    if (this.finished)
      return;
    this.finished = true;
    const { state, suffix, pos, blockLen } = this;
    state[pos] ^= suffix;
    if ((suffix & 128) !== 0 && pos === blockLen - 1)
      this.keccak();
    state[blockLen - 1] ^= 128;
    this.keccak();
  }
  writeInto(out) {
    aexists(this, false);
    abytes(out);
    this.finish();
    const bufferOut = this.state;
    const { blockLen } = this;
    for (let pos = 0, len = out.length;pos < len; ) {
      if (this.posOut >= blockLen)
        this.keccak();
      const take = Math.min(blockLen - this.posOut, len - pos);
      out.set(bufferOut.subarray(this.posOut, this.posOut + take), pos);
      this.posOut += take;
      pos += take;
    }
    return out;
  }
  xofInto(out) {
    if (!this.enableXOF)
      throw new Error("XOF is not possible for this instance");
    return this.writeInto(out);
  }
  xof(bytes) {
    anumber(bytes);
    return this.xofInto(new Uint8Array(bytes));
  }
  digestInto(out) {
    aoutput(out, this);
    if (this.finished)
      throw new Error("digest() was already called");
    this.writeInto(out);
    this.destroy();
    return out;
  }
  digest() {
    return this.digestInto(new Uint8Array(this.outputLen));
  }
  destroy() {
    this.destroyed = true;
    this.state.fill(0);
  }
  _cloneInto(to) {
    const { blockLen, suffix, outputLen, rounds, enableXOF } = this;
    to || (to = new Keccak(blockLen, suffix, outputLen, enableXOF, rounds));
    to.state32.set(this.state32);
    to.pos = this.pos;
    to.posOut = this.posOut;
    to.finished = this.finished;
    to.rounds = rounds;
    to.suffix = suffix;
    to.outputLen = outputLen;
    to.enableXOF = enableXOF;
    to.destroyed = this.destroyed;
    return to;
  }
}
var gen = (suffix, blockLen, outputLen) => wrapConstructor(() => new Keccak(blockLen, suffix, outputLen));
var sha3_224 = /* @__PURE__ */ gen(6, 144, 224 / 8);
var sha3_256 = /* @__PURE__ */ gen(6, 136, 256 / 8);
var sha3_384 = /* @__PURE__ */ gen(6, 104, 384 / 8);
var sha3_512 = /* @__PURE__ */ gen(6, 72, 512 / 8);
var keccak_224 = /* @__PURE__ */ gen(1, 144, 224 / 8);
var keccak_256 = /* @__PURE__ */ gen(1, 136, 256 / 8);
var keccak_384 = /* @__PURE__ */ gen(1, 104, 384 / 8);
var keccak_512 = /* @__PURE__ */ gen(1, 72, 512 / 8);
var genShake = (suffix, blockLen, outputLen) => wrapXOFConstructorWithOpts((opts = {}) => new Keccak(blockLen, suffix, opts.dkLen === undefined ? outputLen : opts.dkLen, true));
var shake128 = /* @__PURE__ */ genShake(31, 168, 128 / 8);
var shake256 = /* @__PURE__ */ genShake(31, 136, 256 / 8);

// node_modules/@dedot/utils/hash/keccak.js
function keccakAsU8a(data, bitLength = 256) {
  const u8a = toU8a(data);
  if (bitLength === 256) {
    return keccak_256(u8a);
  } else if (bitLength === 512) {
    return keccak_512(u8a);
  }
  throw new Error("Invalid bitLength, only support 256 or 512!");
}

// node_modules/@dedot/utils/concat.js
function concatU8a(...args) {
  return concatBytes(...args);
}

// node_modules/@dedot/utils/hash/hashers.js
var blake2_128 = (data) => blake2AsU8a(data, 128);
var blake2_256 = (data) => blake2AsU8a(data, 256);
var blake2_128Concat = (data) => concatU8a(blake2AsU8a(data, 128), data);
var twox128 = (data) => xxhashAsU8a(data, 128);
var twox256 = (data) => xxhashAsU8a(data, 256);
var twox64Concat = (data) => concatU8a(xxhashAsU8a(data, 64), data);
var identity = (data) => data;
var HASHERS = {
  blake2_128,
  blake2_256,
  blake2_128Concat,
  twox128,
  twox256,
  twox64Concat,
  identity
};

// node_modules/@dedot/utils/address/evm/isEvmChecksum.js
function isInvalidChar(char, byte) {
  return char !== (byte > 7 ? char.toUpperCase() : char.toLowerCase());
}
function isEvmChecksum(_address) {
  const address = hexStripPrefix(_address);
  const hash = hexStripPrefix(u8aToHex(keccakAsU8a(address.toLowerCase())));
  for (let i = 0;i < 40; i++) {
    if (isInvalidChar(address[i], parseInt(hash[i], 16))) {
      return false;
    }
  }
  return true;
}

// node_modules/@dedot/utils/address/evm/isEvmAddress.js
var EVM_ADDRESS_REGEX = /^(0x)?[a-fA-F0-9]{40}$/;
function isEvmAddress(address) {
  if (!address || address.length !== 42 || !isHex(address)) {
    return false;
  } else if (EVM_ADDRESS_REGEX.test(address)) {
    return true;
  }
  return isEvmChecksum(address);
}

// node_modules/@dedot/utils/address/ss58/sshash.js
var SS58_PREFIX = stringToU8a("SS58PRE");
function sshash(key) {
  return blake2AsU8a(concatU8a(SS58_PREFIX, key), 512);
}

// node_modules/@dedot/utils/address/ss58/checkAddressChecksum.js
function checkAddressChecksum(decoded) {
  const ss58Length = decoded[0] & 64 ? 2 : 1;
  const ss58Decoded = ss58Length === 1 ? decoded[0] : (decoded[0] & 63) << 2 | decoded[1] >> 6 | (decoded[1] & 63) << 8;
  const isPublicKey = [34 + ss58Length, 35 + ss58Length].includes(decoded.length);
  const length = decoded.length - (isPublicKey ? 2 : 1);
  const hash = sshash(decoded.subarray(0, length));
  const isValid = (decoded[0] & 128) === 0 && ![46, 47].includes(decoded[0]) && (isPublicKey ? decoded[decoded.length - 2] === hash[0] && decoded[decoded.length - 1] === hash[1] : decoded[decoded.length - 1] === hash[0]);
  return [isValid, length, ss58Length, ss58Decoded];
}

// node_modules/@scure/base/lib/esm/index.js
/*! scure-base - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function isBytes2(a) {
  return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
}
function isArrayOf(isString2, arr) {
  if (!Array.isArray(arr))
    return false;
  if (arr.length === 0)
    return true;
  if (isString2) {
    return arr.every((item) => typeof item === "string");
  } else {
    return arr.every((item) => Number.isSafeInteger(item));
  }
}
function afn(input) {
  if (typeof input !== "function")
    throw new Error("function expected");
  return true;
}
function astr(label, input) {
  if (typeof input !== "string")
    throw new Error(`${label}: string expected`);
  return true;
}
function anumber2(n) {
  if (!Number.isSafeInteger(n))
    throw new Error(`invalid integer: ${n}`);
}
function aArr(input) {
  if (!Array.isArray(input))
    throw new Error("array expected");
}
function astrArr(label, input) {
  if (!isArrayOf(true, input))
    throw new Error(`${label}: array of strings expected`);
}
function anumArr(label, input) {
  if (!isArrayOf(false, input))
    throw new Error(`${label}: array of numbers expected`);
}
function chain(...args) {
  const id = (a) => a;
  const wrap = (a, b) => (c) => a(b(c));
  const encode = args.map((x) => x.encode).reduceRight(wrap, id);
  const decode = args.map((x) => x.decode).reduce(wrap, id);
  return { encode, decode };
}
function alphabet(letters) {
  const lettersA = typeof letters === "string" ? letters.split("") : letters;
  const len = lettersA.length;
  astrArr("alphabet", lettersA);
  const indexes = new Map(lettersA.map((l, i) => [l, i]));
  return {
    encode: (digits) => {
      aArr(digits);
      return digits.map((i) => {
        if (!Number.isSafeInteger(i) || i < 0 || i >= len)
          throw new Error(`alphabet.encode: digit index outside alphabet "${i}". Allowed: ${letters}`);
        return lettersA[i];
      });
    },
    decode: (input) => {
      aArr(input);
      return input.map((letter) => {
        astr("alphabet.decode", letter);
        const i = indexes.get(letter);
        if (i === undefined)
          throw new Error(`Unknown letter: "${letter}". Allowed: ${letters}`);
        return i;
      });
    }
  };
}
function join(separator = "") {
  astr("join", separator);
  return {
    encode: (from) => {
      astrArr("join.decode", from);
      return from.join(separator);
    },
    decode: (to) => {
      astr("join.decode", to);
      return to.split(separator);
    }
  };
}
function padding(bits, chr = "=") {
  anumber2(bits);
  astr("padding", chr);
  return {
    encode(data) {
      astrArr("padding.encode", data);
      while (data.length * bits % 8)
        data.push(chr);
      return data;
    },
    decode(input) {
      astrArr("padding.decode", input);
      let end = input.length;
      if (end * bits % 8)
        throw new Error("padding: invalid, string should have whole number of bytes");
      for (;end > 0 && input[end - 1] === chr; end--) {
        const last = end - 1;
        const byte = last * bits;
        if (byte % 8 === 0)
          throw new Error("padding: invalid, string has too much padding");
      }
      return input.slice(0, end);
    }
  };
}
function normalize(fn) {
  afn(fn);
  return { encode: (from) => from, decode: (to) => fn(to) };
}
function convertRadix(data, from, to) {
  if (from < 2)
    throw new Error(`convertRadix: invalid from=${from}, base cannot be less than 2`);
  if (to < 2)
    throw new Error(`convertRadix: invalid to=${to}, base cannot be less than 2`);
  aArr(data);
  if (!data.length)
    return [];
  let pos = 0;
  const res = [];
  const digits = Array.from(data, (d) => {
    anumber2(d);
    if (d < 0 || d >= from)
      throw new Error(`invalid integer: ${d}`);
    return d;
  });
  const dlen = digits.length;
  while (true) {
    let carry = 0;
    let done = true;
    for (let i = pos;i < dlen; i++) {
      const digit = digits[i];
      const fromCarry = from * carry;
      const digitBase = fromCarry + digit;
      if (!Number.isSafeInteger(digitBase) || fromCarry / from !== carry || digitBase - digit !== fromCarry) {
        throw new Error("convertRadix: carry overflow");
      }
      const div = digitBase / to;
      carry = digitBase % to;
      const rounded = Math.floor(div);
      digits[i] = rounded;
      if (!Number.isSafeInteger(rounded) || rounded * to + carry !== digitBase)
        throw new Error("convertRadix: carry overflow");
      if (!done)
        continue;
      else if (!rounded)
        pos = i;
      else
        done = false;
    }
    res.push(carry);
    if (done)
      break;
  }
  for (let i = 0;i < data.length - 1 && data[i] === 0; i++)
    res.push(0);
  return res.reverse();
}
var gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
var radix2carry = (from, to) => from + (to - gcd(from, to));
var powers = /* @__PURE__ */ (() => {
  let res = [];
  for (let i = 0;i < 40; i++)
    res.push(2 ** i);
  return res;
})();
function convertRadix2(data, from, to, padding2) {
  aArr(data);
  if (from <= 0 || from > 32)
    throw new Error(`convertRadix2: wrong from=${from}`);
  if (to <= 0 || to > 32)
    throw new Error(`convertRadix2: wrong to=${to}`);
  if (radix2carry(from, to) > 32) {
    throw new Error(`convertRadix2: carry overflow from=${from} to=${to} carryBits=${radix2carry(from, to)}`);
  }
  let carry = 0;
  let pos = 0;
  const max = powers[from];
  const mask = powers[to] - 1;
  const res = [];
  for (const n of data) {
    anumber2(n);
    if (n >= max)
      throw new Error(`convertRadix2: invalid data word=${n} from=${from}`);
    carry = carry << from | n;
    if (pos + from > 32)
      throw new Error(`convertRadix2: carry overflow pos=${pos} from=${from}`);
    pos += from;
    for (;pos >= to; pos -= to)
      res.push((carry >> pos - to & mask) >>> 0);
    const pow = powers[pos];
    if (pow === undefined)
      throw new Error("invalid carry");
    carry &= pow - 1;
  }
  carry = carry << to - pos & mask;
  if (!padding2 && pos >= from)
    throw new Error("Excess padding");
  if (!padding2 && carry > 0)
    throw new Error(`Non-zero padding: ${carry}`);
  if (padding2 && pos > 0)
    res.push(carry >>> 0);
  return res;
}
function radix(num) {
  anumber2(num);
  const _256 = 2 ** 8;
  return {
    encode: (bytes) => {
      if (!isBytes2(bytes))
        throw new Error("radix.encode input should be Uint8Array");
      return convertRadix(Array.from(bytes), _256, num);
    },
    decode: (digits) => {
      anumArr("radix.decode", digits);
      return Uint8Array.from(convertRadix(digits, num, _256));
    }
  };
}
function radix2(bits, revPadding = false) {
  anumber2(bits);
  if (bits <= 0 || bits > 32)
    throw new Error("radix2: bits should be in (0..32]");
  if (radix2carry(8, bits) > 32 || radix2carry(bits, 8) > 32)
    throw new Error("radix2: carry overflow");
  return {
    encode: (bytes) => {
      if (!isBytes2(bytes))
        throw new Error("radix2.encode input should be Uint8Array");
      return convertRadix2(Array.from(bytes), 8, bits, !revPadding);
    },
    decode: (digits) => {
      anumArr("radix2.decode", digits);
      return Uint8Array.from(convertRadix2(digits, bits, 8, revPadding));
    }
  };
}
function unsafeWrapper(fn) {
  afn(fn);
  return function(...args) {
    try {
      return fn.apply(null, args);
    } catch (e) {
    }
  };
}
var base16 = chain(radix2(4), alphabet("0123456789ABCDEF"), join(""));
var base32 = chain(radix2(5), alphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"), padding(5), join(""));
var base32nopad = chain(radix2(5), alphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"), join(""));
var base32hex = chain(radix2(5), alphabet("0123456789ABCDEFGHIJKLMNOPQRSTUV"), padding(5), join(""));
var base32hexnopad = chain(radix2(5), alphabet("0123456789ABCDEFGHIJKLMNOPQRSTUV"), join(""));
var base32crockford = chain(radix2(5), alphabet("0123456789ABCDEFGHJKMNPQRSTVWXYZ"), join(""), normalize((s) => s.toUpperCase().replace(/O/g, "0").replace(/[IL]/g, "1")));
var base64 = chain(radix2(6), alphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"), padding(6), join(""));
var base64nopad = chain(radix2(6), alphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"), join(""));
var base64url = chain(radix2(6), alphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"), padding(6), join(""));
var base64urlnopad = chain(radix2(6), alphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"), join(""));
var genBase58 = (abc) => chain(radix(58), alphabet(abc), join(""));
var base58 = genBase58("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz");
var base58flickr = genBase58("123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ");
var base58xrp = genBase58("rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz");
var BECH_ALPHABET = chain(alphabet("qpzry9x8gf2tvdw0s3jn54khce6mua7l"), join(""));
var POLYMOD_GENERATORS = [996825010, 642813549, 513874426, 1027748829, 705979059];
function bech32Polymod(pre) {
  const b = pre >> 25;
  let chk = (pre & 33554431) << 5;
  for (let i = 0;i < POLYMOD_GENERATORS.length; i++) {
    if ((b >> i & 1) === 1)
      chk ^= POLYMOD_GENERATORS[i];
  }
  return chk;
}
function bechChecksum(prefix, words, encodingConst = 1) {
  const len = prefix.length;
  let chk = 1;
  for (let i = 0;i < len; i++) {
    const c = prefix.charCodeAt(i);
    if (c < 33 || c > 126)
      throw new Error(`Invalid prefix (${prefix})`);
    chk = bech32Polymod(chk) ^ c >> 5;
  }
  chk = bech32Polymod(chk);
  for (let i = 0;i < len; i++)
    chk = bech32Polymod(chk) ^ prefix.charCodeAt(i) & 31;
  for (let v of words)
    chk = bech32Polymod(chk) ^ v;
  for (let i = 0;i < 6; i++)
    chk = bech32Polymod(chk);
  chk ^= encodingConst;
  return BECH_ALPHABET.encode(convertRadix2([chk % powers[30]], 30, 5, false));
}
function genBech32(encoding) {
  const ENCODING_CONST = encoding === "bech32" ? 1 : 734539939;
  const _words = radix2(5);
  const fromWords = _words.decode;
  const toWords = _words.encode;
  const fromWordsUnsafe = unsafeWrapper(fromWords);
  function encode(prefix, words, limit = 90) {
    astr("bech32.encode prefix", prefix);
    if (isBytes2(words))
      words = Array.from(words);
    anumArr("bech32.encode", words);
    const plen = prefix.length;
    if (plen === 0)
      throw new TypeError(`Invalid prefix length ${plen}`);
    const actualLength = plen + 7 + words.length;
    if (limit !== false && actualLength > limit)
      throw new TypeError(`Length ${actualLength} exceeds limit ${limit}`);
    const lowered = prefix.toLowerCase();
    const sum = bechChecksum(lowered, words, ENCODING_CONST);
    return `${lowered}1${BECH_ALPHABET.encode(words)}${sum}`;
  }
  function decode(str, limit = 90) {
    astr("bech32.decode input", str);
    const slen = str.length;
    if (slen < 8 || limit !== false && slen > limit)
      throw new TypeError(`invalid string length: ${slen} (${str}). Expected (8..${limit})`);
    const lowered = str.toLowerCase();
    if (str !== lowered && str !== str.toUpperCase())
      throw new Error(`String must be lowercase or uppercase`);
    const sepIndex = lowered.lastIndexOf("1");
    if (sepIndex === 0 || sepIndex === -1)
      throw new Error(`Letter "1" must be present between prefix and data only`);
    const prefix = lowered.slice(0, sepIndex);
    const data = lowered.slice(sepIndex + 1);
    if (data.length < 6)
      throw new Error("Data must be at least 6 characters long");
    const words = BECH_ALPHABET.decode(data).slice(0, -6);
    const sum = bechChecksum(prefix, words, ENCODING_CONST);
    if (!data.endsWith(sum))
      throw new Error(`Invalid checksum in ${str}: expected "${sum}"`);
    return { prefix, words };
  }
  const decodeUnsafe = unsafeWrapper(decode);
  function decodeToBytes(str) {
    const { prefix, words } = decode(str, false);
    return { prefix, words, bytes: fromWords(words) };
  }
  function encodeFromBytes(prefix, bytes) {
    return encode(prefix, toWords(bytes));
  }
  return {
    encode,
    decode,
    encodeFromBytes,
    decodeToBytes,
    decodeUnsafe,
    fromWords,
    fromWordsUnsafe,
    toWords
  };
}
var bech32 = genBech32("bech32");
var bech32m = genBech32("bech32m");
var hex = chain(radix2(4), alphabet("0123456789abcdef"), join(""), normalize((s) => {
  if (typeof s !== "string" || s.length % 2 !== 0)
    throw new TypeError(`hex.decode: expected string, got ${typeof s} with length ${s.length}`);
  return s.toLowerCase();
}));

// node_modules/@dedot/utils/address/ss58/decodeAddress.js
var ALLOWED_ENCODED_LENGTHS = [3, 4, 6, 10, 35, 36, 37, 38];
function decodeAddress(encoded, ignoreChecksum, ss58Format = -1) {
  if (!encoded) {
    throw new Error("Invalid empty address passed");
  }
  if (isU8a(encoded) || isHex(encoded)) {
    return toU8a(encoded);
  }
  try {
    const decoded = base58.decode(encoded);
    if (!ALLOWED_ENCODED_LENGTHS.includes(decoded.length)) {
      throw new Error("Invalid decoded address length");
    }
    const [isValid, endPos, ss58Length, ss58Decoded] = checkAddressChecksum(decoded);
    if (!isValid && !ignoreChecksum) {
      throw new Error("Invalid decoded address checksum");
    } else if (ss58Format !== -1 && ss58Format !== ss58Decoded) {
      throw new Error(`Expected ss58Format ${ss58Format}, received ${ss58Decoded}`);
    }
    return decoded.slice(ss58Length, endPos);
  } catch (error) {
    throw new Error(`Decoding ${encoded}: ${error.message}`);
  }
}

// node_modules/@dedot/utils/address/ss58/encodeAddress.js
var DEFAULT_SUBSTRATE_ADDRESS_PREFIX = 42;
var ALLOWED_DECODED_LENGTHS = [1, 2, 4, 8, 32, 33];
function encodeAddress(key, ss58Format = DEFAULT_SUBSTRATE_ADDRESS_PREFIX) {
  const u8a = decodeAddress(key);
  if (ss58Format < 0 || ss58Format > 16383 || [46, 47].includes(ss58Format)) {
    throw new Error("Out of range ss58Format specified");
  } else if (!ALLOWED_DECODED_LENGTHS.includes(u8a.length)) {
    throw new Error(`Expected a valid key to convert, with length ${ALLOWED_DECODED_LENGTHS.join(", ")}`);
  }
  const input = concatU8a(ss58Format < 64 ? Uint8Array.from([ss58Format]) : Uint8Array.from([
    (ss58Format & 252) >> 2 | 64,
    ss58Format >> 8 | (ss58Format & 3) << 6
  ]), u8a);
  return base58.encode(concatU8a(input, sshash(input).subarray(0, [32, 33].includes(u8a.length) ? 2 : 1)));
}

// node_modules/eventemitter3/index.mjs
var import__ = __toESM(require_eventemitter3(), 1);

// node_modules/@dedot/utils/event/EventEmitter.js
var handlerWrapper = (handler) => {
  return (...args) => {
    try {
      handler(...args);
    } catch {
    }
  };
};

class EventEmitter2 {
  #emitter;
  #mapper;
  constructor() {
    this.#emitter = new import__.default;
    this.#mapper = new Map;
  }
  emit(event, ...args) {
    return this.#emitter.emit(event, ...args);
  }
  clearEvents() {
    this.#emitter.removeAllListeners();
    this.#mapper.clear();
  }
  on(event, handler) {
    const wrapper = handlerWrapper(handler);
    this.#mapper.set(handler, wrapper);
    this.#emitter.on(event, wrapper);
    return () => {
      this.off(event, handler);
    };
  }
  once(event, handler) {
    const wrapper = handlerWrapper(handler);
    this.#mapper.set(handler, wrapper);
    this.#emitter.once(event, wrapper);
    return () => {
      this.off(event, handler);
    };
  }
  off(event, handler) {
    if (handler) {
      const wrapper = this.#mapper.get(handler);
      if (!wrapper)
        return this;
      this.#emitter.off(event, wrapper);
      this.#mapper.delete(handler);
    } else {
      this.#emitter.off(event);
    }
    return this;
  }
}

// node_modules/@dedot/utils/bigint.js
function bnMax(a, b) {
  return a > b ? a : b;
}
function bnMin(a, b) {
  return a > b ? b : a;
}
function bnAbs(n) {
  return n < 0n ? -n : n;
}
function bnToHex(n) {
  const hex2 = bnAbs(n).toString(16);
  return `0x${hex2.length % 2 ? `0${hex2}` : hex2}`;
}

// node_modules/@dedot/utils/misc.js
var calcRuntimeApiHash = (runtimeApiName) => {
  return blake2AsHex(runtimeApiName, 64);
};
function normalizeName(ident) {
  return stringCamelCase(ident.replace("#", "_"));
}
function noop() {
}
function waitFor(howLong) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, howLong);
  });
}

// node_modules/@dedot/utils/deferred.js
function deferred() {
  let resolve = noop;
  let reject = noop;
  const promise = new Promise((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });
  return {
    promise,
    resolve,
    reject
  };
}

// node_modules/@dedot/utils/queue/AsyncQueue.js
class AsyncQueue {
  _works;
  _working;
  _currentWork;
  constructor() {
    this._works = [];
    this._working = false;
  }
  enqueue(work) {
    const defer = deferred();
    this._works.push({ work, defer });
    this.dequeue().catch(noop);
    return defer.promise;
  }
  clear() {
    this._works.forEach(({ defer }) => {
      defer.reject(new Error("Queue cleaned"));
    });
    this._works = [];
  }
  cancel() {
    this.cancelCurrentWork();
    this.clear();
  }
  cancelCurrentWork() {
    if (!this._currentWork)
      return;
    this._currentWork.defer.reject(new Error("Work cancelled"));
    this._currentWork = undefined;
    this._working = false;
  }
  get size() {
    return this._works.length;
  }
  get isWorking() {
    return this._working;
  }
  async dequeue() {
    if (this._working)
      return;
    this._currentWork = this._works.shift();
    if (!this._currentWork)
      return;
    const { defer, work } = this._currentWork;
    try {
      this._working = true;
      const result = await work(this);
      this._working = false;
      defer.resolve(result);
    } catch (e) {
      this._working = false;
      defer.reject(e);
    } finally {
      this._currentWork = undefined;
      this.dequeue().catch(noop);
    }
  }
}

// node_modules/deshape/esm/common/util.js
class ShapeError extends Error {
  constructor(shape, message) {
    super(message);
    Object.defineProperty(this, "shape", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: shape
    });
  }
}

class ShapeAssertError extends ShapeError {
  constructor(shape, value, message) {
    super(shape, message);
    Object.defineProperty(this, "value", {
      enumerable: true,
      configurable: true,
      writable: true,
      value
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "ShapeAssertError"
    });
  }
}

class ShapeEncodeError extends ShapeError {
  constructor(shape, value, message) {
    super(shape, message);
    Object.defineProperty(this, "value", {
      enumerable: true,
      configurable: true,
      writable: true,
      value
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "ShapeEncodeError"
    });
  }
}

class ShapeDecodeError extends ShapeError {
  constructor(shape, buffer, message) {
    super(shape, message);
    Object.defineProperty(this, "buffer", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: buffer
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "ShapeDecodeError"
    });
  }
}

// node_modules/deshape/esm/common/assert.js
class AssertState {
  constructor(value, pathPart = "value", parent) {
    Object.defineProperty(this, "value", {
      enumerable: true,
      configurable: true,
      writable: true,
      value
    });
    Object.defineProperty(this, "pathPart", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: pathPart
    });
    Object.defineProperty(this, "parent", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: parent
    });
  }
  get path() {
    return (this.parent?.path ?? "") + this.pathPart;
  }
  typeof(shape, type) {
    if (typeof this.value !== type) {
      throw new ShapeAssertError(shape, this.value, `typeof ${this.path} !== "${type}"`);
    }
  }
  nonNull(shape) {
    if (this.value == null) {
      throw new ShapeAssertError(shape, this.value, `${this.path} == null`);
    }
  }
  instanceof(shape, ctor) {
    if (!(this.value instanceof ctor)) {
      throw new ShapeAssertError(shape, this.value, `!(${this.path} instanceof ${ctor.name})`);
    }
  }
  key(shape, key) {
    this.typeof(shape, "object");
    this.nonNull(shape);
    if (!(key in this.value)) {
      throw new ShapeAssertError(shape, this.value, `!(${JSON.stringify(key)} in ${this.path})`);
    }
    const pathPart = typeof key === "string" && /^[^\W\d]\w*$/u.test(key) ? `.${key}` : `[${typeof key === "string" ? JSON.stringify(key) : key.toString()}]`;
    return new AssertState(this.value[key], pathPart, this);
  }
  equals(shape, value, label = `${value}`) {
    if (this.value !== value) {
      throw new ShapeAssertError(shape, this.value, `${this.path} !== ${label}`);
    }
  }
  integer(shape, min, max) {
    this.typeof(shape, "number");
    const value = this.value;
    if (value !== (value > 0 ? value >>> 0 : value >> 0)) {
      throw new ShapeAssertError(shape, this.value, `${this.path}: invalid int`);
    }
    if (value < min) {
      throw new ShapeAssertError(shape, this.value, `${this.path} < ${min}`);
    }
    if (value > max) {
      throw new ShapeAssertError(shape, this.value, `${this.path} > ${max}`);
    }
  }
  bigint(shape, min, max) {
    this.typeof(shape, "bigint");
    const value = this.value;
    if (value < min) {
      throw new ShapeAssertError(shape, this.value, `${this.path} < ${min}n`);
    }
    if (value > max) {
      throw new ShapeAssertError(shape, this.value, `${this.path} > ${max}n`);
    }
  }
}

// node_modules/deshape/esm/common/buffer.js
class EncodeBuffer {
  constructor(init2, context = new Context) {
    Object.defineProperty(this, "context", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: context
    });
    Object.defineProperty(this, "finishedArrays", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: []
    });
    Object.defineProperty(this, "finishedSize", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 0
    });
    Object.defineProperty(this, "queuedArrays", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: []
    });
    Object.defineProperty(this, "array", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    Object.defineProperty(this, "view", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    Object.defineProperty(this, "index", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 0
    });
    Object.defineProperty(this, "asyncCount", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 0
    });
    Object.defineProperty(this, "asyncPromise", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: Promise.resolve()
    });
    Object.defineProperty(this, "asyncResolve", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: () => {
      }
    });
    this._setArray(typeof init2 === "number" ? new Uint8Array(init2) : init2);
  }
  insertArray(buffer) {
    this._commitWritten();
    this.finishedArrays.push(buffer);
    this.finishedSize += buffer.length;
    if (this.index) {
      this._setArray(this.array.subarray(this.index));
    }
  }
  pushAlloc(size) {
    this._commitWritten();
    this.queuedArrays.push(this.array.subarray(this.index));
    this._setArray(new Uint8Array(size));
  }
  popAlloc() {
    this._commitWritten();
    this._setArray(this.queuedArrays.pop());
  }
  writeAsync(length, fn) {
    this.waitFor(async () => {
      const cursor = this.createCursor(length);
      await fn(cursor);
      cursor.close();
    });
  }
  createCursor(length) {
    const cursor = Object.assign(new EncodeBuffer(this.stealAlloc(length), this.context), {
      close: () => {
        this.waitForBuffer(cursor, () => {
          cursor._commitWritten();
          this.finishedSize += cursor.finishedSize;
        });
      }
    });
    this.finishedArrays.push(cursor);
    return cursor;
  }
  waitFor(fn) {
    if (!this.asyncCount) {
      this.asyncPromise = new Promise((resolve) => this.asyncResolve = resolve);
    }
    this.asyncCount++;
    fn().then(() => {
      this.asyncCount--;
      if (!this.asyncCount) {
        this.asyncResolve();
      }
    }).catch((e) => {
      this.asyncResolve(Promise.reject(e));
    });
  }
  stealAlloc(length) {
    this._commitWritten();
    const array = this.array.subarray(this.index, this.index + length);
    this._setArray(this.array.subarray(this.index + length));
    return array;
  }
  waitForBuffer(buffer, fn) {
    if (buffer.asyncCount) {
      this.waitFor(async () => {
        await buffer.asyncPromise;
        fn();
      });
    } else {
      fn();
    }
  }
  finish() {
    if (this.asyncCount)
      throw new Error("Attempted to finish before async completion");
    if (!this.finishedArrays.length)
      return this.array.subarray(0, this.index);
    this._commitWritten();
    const fullArray = new Uint8Array(this.finishedSize);
    this._finishInto(fullArray, 0);
    return fullArray;
  }
  async finishAsync() {
    await this.asyncPromise;
    return this.finish();
  }
  _finishInto(fullArray, index) {
    for (let i = 0;i < this.finishedArrays.length; i++) {
      const array = this.finishedArrays[i];
      if (array instanceof EncodeBuffer) {
        index = array._finishInto(fullArray, index);
      } else {
        fullArray.set(array, index);
        index += array.length;
      }
    }
    return index;
  }
  _commitWritten() {
    if (this.index) {
      this.finishedArrays.push(this.array.subarray(0, this.index));
      this.finishedSize += this.index;
    }
  }
  _setArray(array) {
    this.array = array;
    this.view = new DataView(array.buffer, array.byteOffset, array.byteLength);
    this.index = 0;
  }
}

class DecodeBuffer {
  constructor(array) {
    Object.defineProperty(this, "array", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: array
    });
    Object.defineProperty(this, "view", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    Object.defineProperty(this, "index", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 0
    });
    Object.defineProperty(this, "context", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: new Context
    });
    this.view = new DataView(array.buffer, array.byteOffset, array.byteLength);
  }
}

class Context {
  constructor() {
    Object.defineProperty(this, "map", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: new Map
    });
  }
  get(T) {
    let value = this.map.get(T);
    if (!value) {
      value = new T;
      this.map.set(T, value);
    }
    return value;
  }
}

// node_modules/deshape/esm/common/shape.js
function createShape(_shape) {
  const { staticSize, subEncode, subAssert, subDecode, metadata } = _shape;
  const shape = {
    __proto__: Shape.prototype,
    staticSize,
    subEncode,
    subDecode,
    subAssert,
    metadata
  };
  return shape;
}
function withMetadata(metadata, shape) {
  const result = {
    __proto__: Shape.prototype,
    ...shape,
    metadata: [...metadata, ...shape.metadata]
  };
  return result;
}
var shapeInspectCtx = new Map;
var shapeInspectIdN = 0;
var nodeCustomInspect = Symbol.for("nodejs.util.inspect.custom");
var denoCustomInspect = Symbol.for("Deno.customInspect");

class _Shape {
  [nodeCustomInspect](_0, _1, inspect) {
    return this._inspect(inspect);
  }
  [denoCustomInspect](inspect, opts) {
    return this._inspect((x) => inspect(x, opts));
  }
  _inspect(inspect) {
    let id = shapeInspectCtx.get(this);
    if (id !== undefined) {
      if (id === null) {
        shapeInspectCtx.set(this, id = shapeInspectIdN++);
      }
      return `$${id}`;
    }
    try {
      shapeInspectCtx.set(this, null);
      const metadata = this.metadata[0];
      const content = metadata ? metadata.type === "atomic" ? metadata.name : `${metadata.name}(${inspect(metadata.args).replace(/^\[(?: (.+) |(.+))\]$/s, "$1$2")})` : "?";
      id = shapeInspectCtx.get(this);
      return id !== null ? `$${id} = ${content}` : content;
    } finally {
      shapeInspectCtx.delete(this);
      if (shapeInspectCtx.size === 0)
        shapeInspectIdN = 0;
    }
  }
}

class Shape extends _Shape {
  encode(value) {
    const buf = new EncodeBuffer(this.staticSize);
    this.subEncode(buf, value);
    if (buf.asyncCount)
      throw new ShapeEncodeError(this, value, "Attempted to synchronously encode an async shape");
    return buf.finish();
  }
  async encodeAsync(value) {
    const buf = new EncodeBuffer(this.staticSize);
    this.subEncode(buf, value);
    return buf.finishAsync();
  }
  decode(array) {
    const buf = new DecodeBuffer(array);
    return this.subDecode(buf);
  }
  assert(value) {
    assert2(this, value);
  }
}
function assert2(shape, value) {
  shape.subAssert(new AssertState(value));
}
function is(shape, value) {
  try {
    shape.subAssert(new AssertState(value));
    return true;
  } catch (e) {
    if (e instanceof ShapeAssertError) {
      return false;
    } else {
      throw e;
    }
  }
}

// node_modules/deshape/esm/common/metadata.js
var __classPrivateFieldGet = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var _ShapeVisitor_fallback;
var _ShapeVisitor_visitors;
function metadata(...fullArgs) {
  if (typeof fullArgs[0] !== "string")
    return fullArgs.flat();
  const [name, factory, ...args] = fullArgs;
  return [
    factory ? {
      type: "factory",
      name,
      factory,
      args
    } : {
      type: "atomic",
      name
    }
  ];
}

class ShapeVisitor {
  constructor() {
    _ShapeVisitor_fallback.set(this, undefined);
    _ShapeVisitor_visitors.set(this, new Map);
  }
  add(shape, fn) {
    if (shape instanceof Shape) {
      shape = shape.metadata[0];
      if (!shape)
        throw new Error("Cannot register visitor for metadata-less shape");
    }
    if (__classPrivateFieldGet(this, _ShapeVisitor_visitors, "f").has(shape)) {
      throw new Error("Duplicate visitor");
    }
    __classPrivateFieldGet(this, _ShapeVisitor_visitors, "f").set(shape, fn);
    return this;
  }
  fallback(fn) {
    if (__classPrivateFieldGet(this, _ShapeVisitor_fallback, "f")) {
      throw new Error("Duplicate fallback");
    }
    __classPrivateFieldSet(this, _ShapeVisitor_fallback, fn, "f");
    return this;
  }
  generic(fn) {
    fn(this);
    return this;
  }
  visit(shape) {
    for (const metadata2 of shape.metadata) {
      let visitor = __classPrivateFieldGet(this, _ShapeVisitor_visitors, "f").get(metadata2);
      if (visitor)
        return visitor(shape);
      if (metadata2.type !== "factory")
        continue;
      visitor = __classPrivateFieldGet(this, _ShapeVisitor_visitors, "f").get(metadata2.factory);
      if (visitor)
        return visitor(shape, ...metadata2.args);
    }
    if (__classPrivateFieldGet(this, _ShapeVisitor_fallback, "f")) {
      return __classPrivateFieldGet(this, _ShapeVisitor_fallback, "f").call(this, shape);
    }
    throw new Error("Unrecognized shape");
  }
}
_ShapeVisitor_fallback = new WeakMap, _ShapeVisitor_visitors = new WeakMap;

// node_modules/deshape/esm/shapes/constant.js
function constant(value, c) {
  const pattern = c && (c instanceof Uint8Array ? c : c.encode(value));
  return createShape({
    metadata: metadata("$.constant", constant, value, ...pattern ? [pattern] : []),
    staticSize: 0,
    subEncode(buffer) {
      if (pattern) {
        buffer.insertArray(pattern);
      }
    },
    subDecode(buffer) {
      if (pattern) {
        const got = buffer.array.subarray(buffer.index, buffer.index += pattern.length);
        for (let i = 0;i < pattern.length; i++) {
          if (pattern[i] !== got[i]) {
            throw new ShapeDecodeError(this, buffer, `Invalid pattern; expected ${hex2(pattern)}, got ${hex2(got)}`);
          }
        }
      }
      return value;
    },
    subAssert(assert3) {
      assert3.equals(this, value);
    }
  });
}
function hex2(pattern) {
  let str = "0x";
  for (let i = 0;i < pattern.length; i++) {
    str += pattern[i].toString(16).padStart(2, "0");
  }
  return str;
}

// node_modules/deshape/esm/shapes/int.js
var u8 = createShape({
  metadata: intMetadata(false, 8),
  staticSize: 1,
  subEncode(buffer, value) {
    buffer.array[buffer.index++] = value;
  },
  subDecode(buffer) {
    return buffer.array[buffer.index++];
  },
  subAssert(assert3) {
    assert3.integer(this, 0, 255);
  }
});
function _intNumber(signed, size) {
  const byteSize = size / 8;
  const key = `${signed ? "Int" : "Uint"}${size}`;
  const getMethod = DataView.prototype[`get${key}`];
  const setMethod = DataView.prototype[`set${key}`];
  const min = signed ? -(2 ** (size - 1)) : 0;
  const max = 2 ** (size - +signed) - 1;
  return createShape({
    metadata: intMetadata(signed, size),
    staticSize: byteSize,
    subEncode(buffer, value) {
      setMethod.call(buffer.view, buffer.index, value, true);
      buffer.index += byteSize;
    },
    subDecode(buffer) {
      const value = getMethod.call(buffer.view, buffer.index, true);
      buffer.index += byteSize;
      return value;
    },
    subAssert(assert3) {
      assert3.typeof(this, "number");
      assert3.integer(this, min, max);
    }
  });
}
var i8 = _intNumber(true, 8);
var u16 = _intNumber(false, 16);
var i16 = _intNumber(true, 16);
var u322 = _intNumber(false, 32);
var i32 = _intNumber(true, 32);
function _intBigInt(signed, size) {
  const byteSize = size / 8;
  const chunks = size / 64;
  const getMethod = DataView.prototype[signed ? "getBigInt64" : "getBigUint64"];
  const min = signed ? -(1n << BigInt(size - 1)) : 0n;
  const max = (1n << BigInt(size - +signed)) - 1n;
  return createShape({
    metadata: intMetadata(signed, size),
    staticSize: byteSize,
    subEncode(buffer, value) {
      for (let i = 0;i < chunks; i++) {
        buffer.view.setBigInt64(buffer.index, value, true);
        value >>= 64n;
        buffer.index += 8;
      }
    },
    subDecode(buffer) {
      let value = getMethod.call(buffer.view, buffer.index + (byteSize - 8), true);
      for (let i = chunks - 2;i >= 0; i--) {
        value <<= 64n;
        value |= buffer.view.getBigUint64(buffer.index + i * 8, true);
      }
      buffer.index += byteSize;
      return value;
    },
    subAssert(assert3) {
      assert3.bigint(this, min, max);
    }
  });
}
var u642 = _intBigInt(false, 64);
var i64 = _intBigInt(true, 64);
var u128 = _intBigInt(false, 128);
var i128 = _intBigInt(true, 128);
var u256 = _intBigInt(false, 256);
var i256 = _intBigInt(true, 256);
var intLookup = { u8, i8, u16, i16, u32: u322, i32, u64: u642, i64, u128, i128, u256, i256 };
function int(signed, size) {
  const key = `${signed ? "i" : "u"}${size}`;
  return intLookup[key];
}
function intMetadata(signed, size) {
  return metadata(metadata(`$.${signed ? "i" : "u"}${size}`), metadata("$.int", int, signed, size));
}

// node_modules/deshape/esm/shapes/option.js
function option($some, none) {
  if ($some.metadata.some((x) => x.factory === option && x.args[1] === none)) {
    throw new Error("Nested option shape will not roundtrip correctly");
  }
  return createShape({
    metadata: metadata("$.option", option, $some, ...none === undefined ? [] : [none]),
    staticSize: 1 + $some.staticSize,
    subEncode(buffer, value) {
      if (buffer.array[buffer.index++] = +(value !== none)) {
        $some.subEncode(buffer, value);
      }
    },
    subDecode(buffer) {
      switch (buffer.array[buffer.index++]) {
        case 0:
          return none;
        case 1: {
          const value = $some.subDecode(buffer);
          if (value === none) {
            throw new ShapeDecodeError(this, buffer, "Some(None) will not roundtrip correctly");
          }
          return value;
        }
        default:
          throw new ShapeDecodeError(this, buffer, "Option discriminant neither 0 nor 1");
      }
    },
    subAssert(assert3) {
      if (assert3.value === none)
        return;
      $some.subAssert(assert3);
    }
  });
}

// node_modules/deshape/esm/shapes/object.js
function field(key, $value) {
  return createShape({
    metadata: metadata("$.field", field, key, $value),
    staticSize: $value.staticSize,
    subEncode(buffer, value) {
      $value.subEncode(buffer, value[key]);
    },
    subDecode(buffer) {
      return { [key]: $value.subDecode(buffer) };
    },
    subAssert(assert3) {
      $value.subAssert(assert3.key(this, key));
    }
  });
}
function optionalField(key, $value) {
  const $option = option($value);
  return createShape({
    metadata: metadata("$.optionalField", optionalField, key, $value),
    staticSize: $value.staticSize,
    subEncode(buffer, value) {
      $option.subEncode(buffer, value[key]);
    },
    subDecode(buffer) {
      if (buffer.array[buffer.index++]) {
        return { [key]: $value.subDecode(buffer) };
      } else {
        return {};
      }
    },
    subAssert(assert3) {
      assert3.typeof(this, "object");
      assert3.nonNull(this);
      if (key in assert3.value) {
        $option.subAssert(assert3.key(this, key));
      }
    }
  });
}
function object(...members) {
  return createShape({
    metadata: metadata("$.object", object, ...members),
    staticSize: members.map((x) => x.staticSize).reduce((a, b) => a + b, 0),
    subEncode: generateEncode(members),
    subDecode: generateDecode(members),
    subAssert(assert3) {
      assert3.typeof(this, "object");
      assert3.nonNull(this);
      for (const member of members) {
        member.subAssert(assert3);
      }
    }
  });
}
function generateEncode(members) {
  return (buffer, value) => {
    members.forEach((member) => {
      member.subEncode(buffer, value);
    });
  };
}
function generateDecode(members) {
  return (buffer) => {
    return members.reduce((o, member) => {
      return { ...o, ...member.subDecode(buffer) };
    }, {});
  };
}

// node_modules/deshape/esm/shapes/tuple.js
function tuple(...shapes) {
  return createShape({
    metadata: metadata("$.tuple", tuple, ...shapes),
    staticSize: shapes.map((x) => x.staticSize).reduce((a, b) => a + b, 0),
    subEncode(buffer, value) {
      for (let i = 0;i < shapes.length; i++) {
        shapes[i].subEncode(buffer, value[i]);
      }
    },
    subDecode(buffer) {
      const value = Array(shapes.length);
      for (let i = 0;i < shapes.length; i++) {
        value[i] = shapes[i].subDecode(buffer);
      }
      return value;
    },
    subAssert(assert3) {
      assert3.instanceof(this, Array);
      assert3.key(this, "length").equals(this, shapes.length);
      for (let i = 0;i < shapes.length; i++) {
        shapes[i].subAssert(assert3.key(this, i));
      }
    }
  });
}

// node_modules/deshape/esm/shapes/compact.js
var MAX_U6 = 63;
var MAX_U14 = 16383;
var MAX_U30 = 1073741823;
var compactVisitor = new ShapeVisitor;
function compact(shape) {
  return compactVisitor.visit(shape);
}
function compactNumber($base) {
  return createShape({
    metadata: metadata("$.compact", compact, $base),
    staticSize: 5,
    subEncode(buffer, value) {
      if (value <= MAX_U6) {
        buffer.array[buffer.index++] = value << 2;
      } else if (value <= MAX_U14) {
        u16.subEncode(buffer, value << 2 | 1);
      } else if (value <= MAX_U30) {
        u322.subEncode(buffer, value << 2 | 2);
      } else {
        buffer.array[buffer.index++] = 3;
        u322.subEncode(buffer, value);
      }
    },
    subDecode(buffer) {
      switch (buffer.array[buffer.index] & 3) {
        case 0:
          return buffer.array[buffer.index++] >> 2;
        case 1:
          return u16.subDecode(buffer) >> 2;
        case 2:
          return u322.subDecode(buffer) >>> 2;
        default:
          if (buffer.array[buffer.index++] !== 3)
            throw new ShapeDecodeError(this, buffer, "Out of range for U32");
          return u322.subDecode(buffer);
      }
    },
    subAssert(assert3) {
      $base.subAssert(assert3);
    }
  });
}
var compactU8 = compactNumber(u8);
var compactU16 = compactNumber(u16);
var compactU32 = compactNumber(u322);
compactVisitor.add(u8, () => compactU8);
compactVisitor.add(u16, () => compactU16);
compactVisitor.add(u322, () => compactU32);
function compactBigInt($base) {
  return createShape({
    metadata: metadata("$.compact", compact, $base),
    staticSize: 5,
    subEncode(buffer, value) {
      if (value <= 4294967295) {
        compactU32.subEncode(buffer, Number(value));
        return;
      }
      let extraBytes = 0;
      let _value = value >> 32n;
      while (_value > 0n) {
        _value >>= 8n;
        extraBytes++;
      }
      buffer.array[buffer.index++] = extraBytes << 2 | 3;
      u322.subEncode(buffer, Number(value & 0xffffffffn));
      _value = value >> 32n;
      buffer.pushAlloc(extraBytes);
      for (let i = 0;i < extraBytes; i++) {
        buffer.array[buffer.index++] = Number(_value & 0xffn);
        _value >>= 8n;
      }
      buffer.popAlloc();
    },
    subDecode(buffer) {
      const b = buffer.array[buffer.index];
      if ((b & 3) < 3 || b === 3) {
        return BigInt(compactU32.subDecode(buffer));
      }
      const extraBytes = b >> 2;
      buffer.index++;
      let value = BigInt(u322.subDecode(buffer));
      for (let i = 0;i < extraBytes; i++) {
        value |= BigInt(buffer.array[buffer.index++]) << BigInt(32 + i * 8);
      }
      return value;
    },
    subAssert(assert3) {
      $base.subAssert(assert3);
    }
  });
}
var compactU64 = compactBigInt(u642);
var compactU128 = compactBigInt(u128);
var compactU256 = compactBigInt(u256);
compactVisitor.add(u642, () => compactU64);
compactVisitor.add(u128, () => compactU128);
compactVisitor.add(u256, () => compactU256);
compactVisitor.add(constant, (shape) => shape);
compactVisitor.add(tuple, (shape, ...entries) => {
  if (entries.length === 0)
    return shape;
  if (entries.length > 1)
    throw new Error("Cannot derive compact shape for tuples with more than one field");
  return withMetadata(metadata("$.compact", compact, shape), tuple(compact(entries[0])));
});
compactVisitor.add(field, (shape, key, value) => {
  return withMetadata(metadata("$.compact", compact, shape), field(key, compact(value)));
});
compactVisitor.add(object, (shape, ...entries) => {
  if (entries.length === 0)
    return shape;
  if (entries.length > 1)
    throw new Error("Cannot derive compact shape for objects with more than one field");
  return withMetadata(metadata("$.compact", compact, shape), compact(entries[0]));
});

// node_modules/deshape/esm/shapes/array.js
var compactU322 = compact(u322);
function sizedArray($el, length) {
  return createShape({
    metadata: metadata("$.sizedArray", sizedArray, $el, length),
    staticSize: $el.staticSize * length,
    subEncode(buffer, value) {
      for (let i = 0;i < value.length; i++) {
        $el.subEncode(buffer, value[i]);
      }
    },
    subDecode(buffer) {
      const value = Array(length);
      for (let i = 0;i < value.length; i++) {
        value[i] = $el.subDecode(buffer);
      }
      return value;
    },
    subAssert(assert3) {
      assert3.instanceof(this, Array);
      assert3.key(this, "length").equals(this, length);
      for (let i = 0;i < length; i++) {
        $el.subAssert(assert3.key(this, i));
      }
    }
  });
}
function array($el) {
  return createShape({
    metadata: metadata("$.array", array, $el),
    staticSize: compactU322.staticSize,
    subEncode(buffer, value) {
      compactU322.subEncode(buffer, value.length);
      if (value.length) {
        buffer.pushAlloc(value.length * $el.staticSize);
        for (let i = 0;i < value.length; i++) {
          $el.subEncode(buffer, value[i]);
        }
        buffer.popAlloc();
      }
    },
    subDecode(buffer) {
      const length = compactU322.subDecode(buffer);
      const value = Array(length);
      for (let i = 0;i < value.length; i++) {
        value[i] = $el.subDecode(buffer);
      }
      return value;
    },
    subAssert(assert3) {
      assert3.instanceof(this, Array);
      for (let i = 0;i < assert3.value.length; i++) {
        $el.subAssert(assert3.key(this, i));
      }
    }
  });
}
var uint8Array = createShape({
  metadata: metadata("$.uint8Array"),
  staticSize: compactU322.staticSize,
  subEncode(buffer, value) {
    compactU322.subEncode(buffer, value.length);
    buffer.insertArray(value);
  },
  subDecode(buffer) {
    const length = compactU322.subDecode(buffer);
    const value = buffer.array.subarray(buffer.index, buffer.index + length);
    buffer.index += length;
    return value;
  },
  subAssert(assert3) {
    assert3.instanceof(this, Uint8Array);
  }
});
function sizedUint8Array(length) {
  return createShape({
    metadata: metadata("$.sizedUint8Array", sizedUint8Array, length),
    staticSize: 0,
    subEncode(buffer, value) {
      buffer.insertArray(value);
    },
    subDecode(buffer) {
      return buffer.array.subarray(buffer.index, buffer.index += length);
    },
    subAssert(assert3) {
      assert3.instanceof(this, Uint8Array);
      assert3.key(this, "length").equals(this, length);
    }
  });
}

// node_modules/deshape/esm/shapes/bitSequence.js
var compactU323 = compact(u322);

class BitSequence {
  constructor(length = 0, data) {
    Object.defineProperty(this, "length", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: length
    });
    Object.defineProperty(this, "data", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    const byteLength = Math.ceil(length / 8);
    data ??= new Uint8Array(byteLength);
    if (data.length !== byteLength) {
      throw new Error("Incorrectly sized Uint8Array passed to BitSequence constructor");
    }
    this.data = data;
  }
  static from(array2) {
    const sequence = new BitSequence(array2.length);
    for (let i = 0;i < array2.length; i++) {
      sequence._setBit(i, array2[i]);
    }
    return sequence;
  }
  get byteLength() {
    return this.data.length;
  }
  _hasBit(index) {
    return 0 <= index && index < this.length && index === Math.floor(index);
  }
  _getBit(index) {
    if (!this._hasBit(index))
      return;
    const i = Math.floor(index / 8);
    const j = 7 - index % 8;
    return !!(this.data[i] & 1 << j);
  }
  _setBit(index, bit) {
    if (!this._hasBit(index))
      return false;
    const i = Math.floor(index / 8);
    const j = 7 - index % 8;
    this.data[i] = this.data[i] & ~(1 << j) | +!!bit << j;
    return true;
  }
}
Object.setPrototypeOf(BitSequence.prototype, new Proxy(Object.prototype, {
  get: (target, k, receiver) => {
    const i = typeof k === "string" ? +k : NaN;
    if (isNaN(i))
      return Reflect.get(target, k, receiver);
    return receiver._getBit(i);
  },
  set: (target, k, v, receiver) => {
    const i = typeof k === "string" ? +k : NaN;
    if (isNaN(i))
      return Reflect.set(target, k, v, receiver);
    return receiver._setBit(i, v);
  }
}));
var bitSequence = createShape({
  metadata: metadata("$.bitSequence"),
  staticSize: compactU323.staticSize,
  subEncode(buffer, value) {
    compactU323.subEncode(buffer, value.length);
    buffer.insertArray(value.data);
  },
  subDecode(buffer) {
    const length = compactU323.subDecode(buffer);
    const byteLength = Math.ceil(length / 8);
    return new BitSequence(length, buffer.array.subarray(buffer.index, buffer.index += byteLength));
  },
  subAssert(assert3) {
    assert3.instanceof(this, BitSequence);
  }
});

// node_modules/deshape/esm/shapes/bool.js
var bool = createShape({
  metadata: metadata("$.bool"),
  staticSize: 1,
  subEncode(buffer, value) {
    buffer.array[buffer.index++] = +value;
  },
  subDecode(buffer) {
    return !!buffer.array[buffer.index++];
  },
  subAssert(assert3) {
    assert3.typeof(this, "boolean");
  }
});

// node_modules/deshape/esm/shapes/iterable.js
var compactU324 = compact(u322);
function iterable(props) {
  return createShape({
    metadata: metadata("$.iterable", iterable, props),
    staticSize: compactU324.staticSize,
    subEncode(buffer, value) {
      const length = props.calcLength(value);
      compactU324.subEncode(buffer, length);
      buffer.pushAlloc(length * props.$el.staticSize);
      let i = 0;
      for (const el of value) {
        props.$el.subEncode(buffer, el);
        i++;
      }
      if (i !== length)
        throw new ShapeEncodeError(this, value, "Incorrect length returned by calcLength");
      buffer.popAlloc();
    },
    subDecode(buffer) {
      const length = compactU324.subDecode(buffer);
      let done = false;
      const value = props.rehydrate(function* () {
        for (let i = 0;i < length; i++) {
          yield props.$el.subDecode(buffer);
        }
        done = true;
      }());
      if (!done)
        throw new ShapeDecodeError(this, buffer, "Iterable passed to rehydrate must be immediately exhausted");
      return value;
    },
    subAssert(assert3) {
      props.assert.call(this, assert3);
      const length = props.calcLength(assert3.value);
      let i = 0;
      for (const el of assert3.value) {
        props.$el.subAssert(new AssertState(el, `#iterator[${i}]`));
        i++;
      }
      if (i !== length) {
        throw new ShapeAssertError(this, assert3.value, `${assert3.path}: Incorrect length returned by calcLength`);
      }
    }
  });
}

// node_modules/deshape/esm/shapes/collections.js
var __classPrivateFieldGet2 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ShapeMap_instances;
var _ShapeMap_inner;
var _ShapeMap_hexMemo;
var _ShapeMap_transformKey;
var _ShapeSet_instances;
var _ShapeSet_inner;
var _ShapeSet_hexMemo;
var _ShapeSet_transformValue;
function map($key, $value) {
  return withMetadata(metadata("$.map", map, $key, $value), iterable({
    $el: tuple($key, $value),
    calcLength: (map2) => map2.size,
    rehydrate: (values) => new ShapeMap($key, values),
    assert(assert3) {
      assert3.instanceof(this, ShapeMap);
    }
  }));
}
function set($value) {
  return withMetadata(metadata("$.set", set, $value), iterable({
    $el: $value,
    calcLength: (set2) => set2.size,
    rehydrate: (values) => new ShapeSet($value, values),
    assert(assert3) {
      assert3.instanceof(this, ShapeSet);
    }
  }));
}

class ShapeMap {
  constructor($key, entries) {
    _ShapeMap_instances.add(this);
    Object.defineProperty(this, "$key", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: $key
    });
    _ShapeMap_inner.set(this, new Map);
    _ShapeMap_hexMemo.set(this, new WeakMap);
    if (entries) {
      for (const [key, value] of entries) {
        this.set(key, value);
      }
    }
  }
  get size() {
    return __classPrivateFieldGet2(this, _ShapeMap_inner, "f").size;
  }
  get [(_ShapeMap_inner = new WeakMap, _ShapeMap_hexMemo = new WeakMap, _ShapeMap_instances = new WeakSet, _ShapeMap_transformKey = function _ShapeMap_transformKey(key) {
    return transformKey(this.$key, __classPrivateFieldGet2(this, _ShapeMap_hexMemo, "f"), key);
  }, Symbol.toStringTag)]() {
    return "ShapeMap";
  }
  clear() {
    __classPrivateFieldGet2(this, _ShapeMap_inner, "f").clear();
  }
  delete(key) {
    return __classPrivateFieldGet2(this, _ShapeMap_inner, "f").delete(__classPrivateFieldGet2(this, _ShapeMap_instances, "m", _ShapeMap_transformKey).call(this, key));
  }
  forEach(callbackfn, thisArg) {
    __classPrivateFieldGet2(this, _ShapeMap_inner, "f").forEach(([key, value]) => callbackfn.call(thisArg, value, key, this));
  }
  get(key) {
    return __classPrivateFieldGet2(this, _ShapeMap_inner, "f").get(__classPrivateFieldGet2(this, _ShapeMap_instances, "m", _ShapeMap_transformKey).call(this, key))?.[1];
  }
  has(key) {
    return __classPrivateFieldGet2(this, _ShapeMap_inner, "f").has(__classPrivateFieldGet2(this, _ShapeMap_instances, "m", _ShapeMap_transformKey).call(this, key));
  }
  set(key, value) {
    __classPrivateFieldGet2(this, _ShapeMap_inner, "f").set(__classPrivateFieldGet2(this, _ShapeMap_instances, "m", _ShapeMap_transformKey).call(this, key), [key, value]);
    return this;
  }
  [Symbol.iterator]() {
    return __classPrivateFieldGet2(this, _ShapeMap_inner, "f").values();
  }
  entries() {
    return __classPrivateFieldGet2(this, _ShapeMap_inner, "f").values();
  }
  *keys() {
    for (const { 0: key } of this) {
      yield key;
    }
  }
  *values() {
    for (const { 1: value } of this) {
      yield value;
    }
  }
}

class ShapeSet {
  constructor($value, values) {
    _ShapeSet_instances.add(this);
    Object.defineProperty(this, "$value", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: $value
    });
    _ShapeSet_inner.set(this, new Map);
    _ShapeSet_hexMemo.set(this, new WeakMap);
    if (values) {
      for (const value of values) {
        this.add(value);
      }
    }
  }
  get size() {
    return __classPrivateFieldGet2(this, _ShapeSet_inner, "f").size;
  }
  get [(_ShapeSet_inner = new WeakMap, _ShapeSet_hexMemo = new WeakMap, _ShapeSet_instances = new WeakSet, _ShapeSet_transformValue = function _ShapeSet_transformValue(value) {
    return transformKey(this.$value, __classPrivateFieldGet2(this, _ShapeSet_hexMemo, "f"), value);
  }, Symbol.toStringTag)]() {
    return "ShapeSet";
  }
  clear() {
    __classPrivateFieldGet2(this, _ShapeSet_inner, "f").clear();
  }
  delete(value) {
    return __classPrivateFieldGet2(this, _ShapeSet_inner, "f").delete(__classPrivateFieldGet2(this, _ShapeSet_instances, "m", _ShapeSet_transformValue).call(this, value));
  }
  forEach(callbackfn, thisArg) {
    __classPrivateFieldGet2(this, _ShapeSet_inner, "f").forEach((value) => callbackfn.call(thisArg, value, value, this));
  }
  has(key) {
    return __classPrivateFieldGet2(this, _ShapeSet_inner, "f").has(__classPrivateFieldGet2(this, _ShapeSet_instances, "m", _ShapeSet_transformValue).call(this, key));
  }
  add(value) {
    __classPrivateFieldGet2(this, _ShapeSet_inner, "f").set(__classPrivateFieldGet2(this, _ShapeSet_instances, "m", _ShapeSet_transformValue).call(this, value), value);
    return this;
  }
  [Symbol.iterator]() {
    return __classPrivateFieldGet2(this, _ShapeSet_inner, "f").values();
  }
  *entries() {
    for (const value of this) {
      yield [value, value];
    }
  }
  keys() {
    return __classPrivateFieldGet2(this, _ShapeSet_inner, "f").values();
  }
  values() {
    return __classPrivateFieldGet2(this, _ShapeSet_inner, "f").values();
  }
}
function transformKey($key, hexMemo, key) {
  if (typeof key === "string") {
    return key.startsWith("0x") ? "0x" + key : key;
  }
  if (typeof key !== "object" && typeof key !== "function" || !key) {
    return key;
  }
  const existingHex = hexMemo.get(key);
  if (existingHex)
    return existingHex;
  const hex3 = encodeHexPrefixed($key.encode(key));
  hexMemo.set(key, hex3);
  return hex3;
}

// node_modules/deshape/esm/shapes/deferred.js
function deferred2(getShape) {
  let $shape;
  const shape = createShape({
    metadata: metadata("$.deferred", deferred2, getShape),
    staticSize: 0,
    subEncode(buffer, value) {
      $shape ??= getShape();
      buffer.pushAlloc($shape.staticSize);
      $shape.subEncode(buffer, value);
      buffer.popAlloc();
    },
    subDecode(buffer) {
      $shape ??= getShape();
      return $shape.subDecode(buffer);
    },
    subAssert(assert3) {
      $shape ??= getShape();
      $shape.subAssert(assert3);
    }
  });
  shape["_inspect"] = (inspect) => {
    return `$.deferred(() => ${getShape()["_inspect"](inspect)})`;
  };
  return shape;
}

// node_modules/deshape/esm/shapes/documented.js
function documented(docs, inner) {
  return withMetadata(metadata("$.documented", documented, docs, inner), inner);
}

// node_modules/deshape/esm/shapes/float.js
var f64 = createShape({
  metadata: metadata("$.f64"),
  staticSize: 8,
  subEncode(buffer, value) {
    buffer.view.setFloat64(buffer.index, value, true);
    buffer.index += 8;
  },
  subDecode(buffer) {
    const value = buffer.view.getFloat64(buffer.index, true);
    buffer.index += 8;
    return value;
  },
  subAssert(assert3) {
    assert3.typeof(this, "number");
  }
});

// node_modules/deshape/esm/shapes/transform.js
function transform(props) {
  return createShape({
    metadata: metadata("$.transform", transform, props),
    staticSize: props.$base.staticSize,
    subEncode(buffer, value) {
      props.$base.subEncode(buffer, props.encode(value));
    },
    subDecode(buffer) {
      return props.decode(props.$base.subDecode(buffer));
    },
    subAssert(assert3) {
      props.assert?.call(this, assert3);
      props.$base.subAssert(new AssertState(props.encode(assert3.value), "#encode", assert3));
    }
  });
}

// node_modules/deshape/esm/shapes/hex.js
var encodeLookup = Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, "0"));
var decodeLookup = Array.from({ length: 128 }, (_, i) => parseInt(String.fromCharCode(i), 16) | 0);
function encodeHex(bytes) {
  let str = "";
  for (let i = 0;i < bytes.length; i++) {
    str += encodeLookup[bytes[i]];
  }
  return str;
}
function encodeHexPrefixed(bytes) {
  let str = "0x";
  for (let i = 0;i < bytes.length; i++) {
    str += encodeLookup[bytes[i]];
  }
  return str;
}
function decodeHex(hex3) {
  if (hex3.startsWith("0x"))
    hex3 = hex3.slice(2);
  if (hex3.length % 2 === 1)
    hex3 = "0" + hex3;
  const array2 = new Uint8Array(hex3.length >> 1);
  for (let i = 0;i < array2.length; i++) {
    array2[i] = decodeLookup[hex3.charCodeAt(i << 1)] << 4 | decodeLookup[hex3.charCodeAt(i << 1 | 1)];
  }
  return array2;
}
var hexRegex = /^(?:0x)?[\da-f]*$/i;
function hex3($inner) {
  return withMetadata(metadata("$.hex", hex3, $inner), transform({
    $base: $inner,
    encode: decodeHex,
    decode: encodeHex,
    assert(assert3) {
      assert3.typeof(this, "string");
      if (!hexRegex.test(assert3.value)) {
        throw new ShapeAssertError(this, assert3.value, `${assert3.path}: invalid hex`);
      }
    }
  }));
}

// node_modules/deshape/esm/shapes/instance.js
function instance(ctor, $args, toArgs) {
  return createShape({
    metadata: metadata("$.instance", instance, ctor, $args, toArgs),
    staticSize: $args.staticSize,
    subEncode(buffer, value) {
      $args.subEncode(buffer, toArgs(value));
    },
    subDecode(buffer) {
      return new ctor(...$args.subDecode(buffer));
    },
    subAssert(assert3) {
      assert3.instanceof(this, ctor);
      $args.subAssert(new AssertState(toArgs(assert3.value), "#arguments", assert3));
    }
  });
}

// node_modules/deshape/esm/shapes/lenPrefixed.js
var compactU325 = compact(u322);
function lenPrefixed($inner) {
  return createShape({
    metadata: metadata("$.lenPrefixed", lenPrefixed, $inner),
    staticSize: compactU325.staticSize + $inner.staticSize,
    subEncode(buffer, extrinsic) {
      const lengthCursor = buffer.createCursor(compactU325.staticSize);
      const contentCursor = buffer.createCursor($inner.staticSize);
      $inner.subEncode(contentCursor, extrinsic);
      buffer.waitForBuffer(contentCursor, () => {
        const length = contentCursor.finishedSize + contentCursor.index;
        compactU325.subEncode(lengthCursor, length);
        lengthCursor.close();
        contentCursor.close();
      });
    },
    subDecode(buffer) {
      const length = compactU325.subDecode(buffer);
      return $inner.decode(buffer.array.subarray(buffer.index, buffer.index += length));
    },
    subAssert(assert3) {
      $inner.subAssert(assert3);
    }
  });
}

// node_modules/deshape/esm/shapes/never.js
var never = createShape({
  metadata: metadata("$.never"),
  staticSize: 0,
  subEncode(value) {
    throw new ShapeEncodeError(this, value, "Cannot encode $.never");
  },
  subDecode(buffer) {
    throw new ShapeDecodeError(this, buffer, "Cannot decode $.never");
  },
  subAssert(assert3) {
    throw new ShapeAssertError(this, assert3.value, `${assert3.path}: Cannot validate $.never`);
  }
});

// node_modules/deshape/esm/shapes/optionBool.js
var optionBool = createShape({
  metadata: metadata("$.optionBool"),
  staticSize: 1,
  subEncode(buffer, value) {
    buffer.array[buffer.index++] = value === undefined ? 0 : 1 + +!value;
  },
  subDecode(buffer) {
    const byte = buffer.array[buffer.index++];
    return byte === 0 ? undefined : !(byte - 1);
  },
  subAssert(assert3) {
    if (assert3.value === undefined)
      return;
    assert3.typeof(this, "boolean");
  }
});

// node_modules/deshape/esm/shapes/promise.js
function promise($value) {
  return createShape({
    metadata: metadata("$.promise", promise, $value),
    staticSize: $value.staticSize,
    subEncode(buffer, value) {
      buffer.writeAsync($value.staticSize, async (buffer2) => {
        $value.subEncode(buffer2, await value);
      });
    },
    subDecode(buffer) {
      return Promise.resolve($value.subDecode(buffer));
    },
    subAssert(assert3) {
      assert3.instanceof(this, Promise);
    }
  });
}

// node_modules/deshape/esm/shapes/str.js
var compactU326 = compact(u322);
var textEncoder2 = new TextEncoder;
var textDecoder2 = new TextDecoder;
var str = createShape({
  metadata: metadata("$.str"),
  staticSize: compactU326.staticSize,
  subEncode(buffer, value) {
    const array2 = textEncoder2.encode(value);
    compactU326.subEncode(buffer, array2.length);
    buffer.insertArray(array2);
  },
  subDecode(buffer) {
    const len = compactU326.subDecode(buffer);
    if (buffer.array.length < buffer.index + len) {
      throw new ShapeDecodeError(this, buffer, "Attempting to `str`-decode beyond bounds of input bytes");
    }
    const slice = buffer.array.subarray(buffer.index, buffer.index + len);
    buffer.index += len;
    return textDecoder2.decode(slice);
  },
  subAssert(assert3) {
    assert3.typeof(this, "string");
  }
});

// node_modules/deshape/esm/shapes/record.js
function record($value) {
  return transform({
    $base: array(tuple(str, $value)),
    encode: Object.entries,
    decode: Object.fromEntries
  });
}

// node_modules/deshape/esm/shapes/result.js
function result($ok, $err) {
  if ($ok.metadata.some((x) => x.factory === result)) {
    throw new Error("Nested result shape will not roundtrip correctly");
  }
  return createShape({
    metadata: metadata("$.result", result, $ok, $err),
    staticSize: 1 + Math.max($ok.staticSize, $err.staticSize),
    subEncode(buffer, value) {
      if (buffer.array[buffer.index++] = +(value instanceof Error)) {
        $err.subEncode(buffer, value);
      } else {
        $ok.subEncode(buffer, value);
      }
    },
    subDecode(buffer) {
      switch (buffer.array[buffer.index++]) {
        case 0: {
          const value = $ok.subDecode(buffer);
          if (value instanceof Error) {
            throw new ShapeDecodeError(this, buffer, "An ok value that is instanceof Error will not roundtrip correctly");
          }
          return value;
        }
        case 1: {
          return $err.subDecode(buffer);
        }
        default: {
          throw new ShapeDecodeError(this, buffer, "Result discriminant neither 0 nor 1");
        }
      }
    },
    subAssert(assert3) {
      if (assert3.value instanceof Error) {
        $err.subAssert(assert3);
      } else {
        $ok.subAssert(assert3);
      }
    }
  });
}

// node_modules/deshape/esm/shapes/union.js
class Variant {
  constructor(tag, shape) {
    Object.defineProperty(this, "tag", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: tag
    });
    Object.defineProperty(this, "shape", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: shape
    });
  }
}
function variant(tag, ...members) {
  return new Variant(tag, object(...members));
}
function taggedUnion(tagKey, members) {
  const tagToDiscriminant = Object.create(null);
  const discriminantToMember = Object.create(null);
  for (const _discriminant in members) {
    const discriminant = +_discriminant;
    if (isNaN(discriminant))
      continue;
    const { tag, shape } = members[discriminant];
    tagToDiscriminant[tag] = discriminant;
    discriminantToMember[discriminant] = object(field(tagKey, constant(tag)), shape);
  }
  return createShape({
    metadata: metadata("$.taggedUnion", taggedUnion, tagKey, members),
    staticSize: 1 + Math.max(...Object.values(discriminantToMember).map((x) => x.staticSize)),
    subEncode(buffer, value) {
      const discriminant = tagToDiscriminant[value[tagKey]];
      const $member = discriminantToMember[discriminant];
      buffer.array[buffer.index++] = discriminant;
      $member.subEncode(buffer, value);
    },
    subDecode(buffer) {
      const discriminant = buffer.array[buffer.index++];
      const $member = discriminantToMember[discriminant];
      if (!$member) {
        throw new ShapeDecodeError(this, buffer, `No such member shape matching the discriminant \`${discriminant}\``);
      }
      return $member.subDecode(buffer);
    },
    subAssert(assert3) {
      const assertTag = assert3.key(this, tagKey);
      assertTag.typeof(this, "string");
      if (!(assertTag.value in tagToDiscriminant)) {
        throw new ShapeAssertError(this, assertTag.value, `${assertTag.path}: invalid tag`);
      }
      discriminantToMember[tagToDiscriminant[assertTag.value]].subAssert(assert3);
    }
  });
}
function literalUnion(members) {
  const keyToDiscriminant = new Map;
  for (const _discriminant in members) {
    const discriminant = +_discriminant;
    if (isNaN(discriminant))
      continue;
    const key = members[discriminant];
    keyToDiscriminant.set(key, discriminant);
  }
  return createShape({
    metadata: metadata("$.literalUnion", literalUnion, members),
    staticSize: 1,
    subEncode(buffer, value) {
      const discriminant = keyToDiscriminant.get(value);
      buffer.array[buffer.index++] = discriminant;
    },
    subDecode(buffer) {
      const discriminant = buffer.array[buffer.index++];
      return members[discriminant];
    },
    subAssert(assert3) {
      assert3.typeof(this, "string");
      if (!keyToDiscriminant.has(assert3.value)) {
        throw new ShapeAssertError(this, assert3.value, `${assert3.path} invalid value`);
      }
    }
  });
}

// node_modules/@dedot/shape/deshape.js
Shape.prototype.tryDecode = function(input) {
  if (this.decoders && this.decoders.length > 0) {
    for (const one of this.decoders.reverse()) {
      const [predicate, decoder] = one;
      if (predicate(input)) {
        return decoder.call(this, this, input);
      }
    }
  }
  if (isHex(input)) {
    input = hexToU8a(input);
  }
  return this.decode(input);
};
Shape.prototype.registerDecoder = function(predicate, decoder) {
  this.decoders = this.decoders || [];
  this.decoders.push([predicate, decoder]);
};
Shape.prototype.tryEncode = function(input) {
  if (this.encoders && this.encoders.length > 0) {
    for (const one of this.encoders.reverse()) {
      const [predicate, encoder] = one;
      if (predicate(input)) {
        return encoder.call(this, this, input);
      }
    }
  }
  return this.encode(input);
};
Shape.prototype.registerEncoder = function(predicate, encoder) {
  this.encoders = this.encoders || [];
  this.encoders.push([predicate, encoder]);
};
ShapeMap.prototype.toJSON = function() {
  return Object.fromEntries(this);
};
ShapeSet.prototype.toJSON = function() {
  return Array.from(this);
};
var identity2 = (_, input) => input;
bool.registerDecoder(isBoolean, identity2);
i128.registerDecoder(isNumber, identity2);
i16.registerDecoder(isNumber, identity2);
i256.registerDecoder(isNumber, identity2);
i32.registerDecoder(isNumber, identity2);
i64.registerDecoder(isNumber, identity2);
i8.registerDecoder(isNumber, identity2);
u128.registerDecoder(isNumber, identity2);
u16.registerDecoder(isNumber, identity2);
u256.registerDecoder(isNumber, identity2);
u322.registerDecoder(isNumber, identity2);
u642.registerDecoder(isNumber, identity2);
u8.registerDecoder(isNumber, identity2);
str.registerDecoder((input) => isString(input) && !isHex(input), identity2);
bool.nativeType = "boolean";
i256.nativeType = "bigint";
i128.nativeType = "bigint";
i64.nativeType = "bigint";
i32.nativeType = "number";
i16.nativeType = "number";
i8.nativeType = "number";
u256.nativeType = "bigint";
u128.nativeType = "bigint";
u642.nativeType = "bigint";
u322.nativeType = "number";
u16.nativeType = "number";
u8.nativeType = "number";
str.nativeType = "string";
// node_modules/@dedot/shape/extension/object.js
function shouldDecodeObject(input) {
  if (isHex(input) || isU8a(input) || isString(input) || !isObject(input)) {
    return false;
  }
  return true;
}
function decodeObject($shape, input) {
  const { args } = $shape.metadata[0];
  return args.map((one) => one.metadata[0]).reduce((o, { factory, args: [name, field2] }) => {
    const fieldInput = input[name];
    const isOptional = factory === optionalField;
    if (isOptional && (fieldInput === null || fieldInput === undefined)) {
      o[name] = undefined;
    } else {
      o[name] = field2.tryDecode(fieldInput);
    }
    return o;
  }, {});
}
function object2(...members) {
  const shaped = object(...members);
  shaped.registerDecoder(shouldDecodeObject, decodeObject);
  return shaped;
}
// node_modules/@dedot/shape/extension/array.js
function shouldDecodeArray(input) {
  return Array.isArray(input);
}
function decodeArray($shape, input) {
  const { args } = $shape.metadata[0];
  const $innerShape = args[0];
  return input.map((inner) => $innerShape.tryDecode(inner));
}
function array2($el) {
  const shaped = array($el);
  shaped.registerDecoder(shouldDecodeArray, decodeArray);
  return shaped;
}
// node_modules/@dedot/shape/extension/option.js
function shouldDecodeInner(input) {
  return !(isHex(input) || isU8a(input));
}
function isNone(input) {
  return isUndefined(input) || isNull(input) || input === "0x";
}
function decodeInner($shape, input) {
  const $some = $shape.metadata[0].args[0];
  return $some.tryDecode(input);
}
function option2($some) {
  const shaped = option($some);
  shaped.registerDecoder(isNone, (_, input) => {
    return;
  });
  shaped.registerDecoder(shouldDecodeInner, decodeInner);
  return shaped;
}
// node_modules/@dedot/shape/extension/createShape.js
var notImplemented = () => {
  throw new Error("subAssert is not implemented!");
};
function createShape2(_shape) {
  const { staticSize, subEncode, subDecode, metadata: metadata2, subAssert } = _shape;
  return createShape({
    staticSize,
    subEncode,
    subDecode,
    metadata: metadata2,
    subAssert: subAssert || notImplemented
  });
}

// node_modules/@dedot/shape/extension/raw.js
var RawHex = createShape2({
  metadata: metadata("$.RawHex"),
  staticSize: 0,
  subEncode(buffer, value) {
    buffer.insertArray(hexToU8a(value));
  },
  subDecode(buffer) {
    return u8aToHex(buffer.array);
  }
});
var Null = withMetadata(metadata("$.Null"), constant(null));
// node_modules/@dedot/shape/extension/compact.js
var compactU82 = compact(u8);
var compactU162 = compact(u16);
var compactU327 = compact(u322);
var compactU642 = compact(u642);
var compactU1282 = compact(u128);
var compactU2562 = compact(u256);

// node_modules/@dedot/shape/extension/hex.js
var HEX_PREFIX = "0x";
function FixedHex(lengthInBytes) {
  const shaped = hex3(sizedUint8Array(lengthInBytes));
  const originalSubDecode = shaped.subDecode.bind(shaped);
  shaped.subDecode = function(buffer) {
    const decoded = originalSubDecode(buffer);
    return decoded.startsWith(HEX_PREFIX) ? decoded : `${HEX_PREFIX}${decoded}`;
  };
  return shaped;
}
var PrefixedHex = createShape2({
  metadata: metadata("$.PrefixedHex"),
  staticSize: compactU327.staticSize,
  subEncode(buffer, value) {
    const u8a = hexToU8a(value);
    compactU327.subEncode(buffer, u8a.length);
    buffer.insertArray(u8a);
  },
  subDecode(buffer) {
    const length = compactU327.subDecode(buffer);
    const value = buffer.array.subarray(buffer.index, buffer.index + length);
    buffer.index += length;
    return u8aToHex(value);
  }
});
// node_modules/@dedot/shape/extension/str.js
var textEncoder3 = new TextEncoder;
var textDecoder3 = new TextDecoder;
function FixedStr(lengthInBytes) {
  return createShape({
    metadata: metadata("$FixedStr", FixedStr, lengthInBytes),
    staticSize: lengthInBytes,
    subEncode(buffer, value) {
      buffer.insertArray(textEncoder3.encode(value));
    },
    subDecode(buffer) {
      if (buffer.array.length < buffer.index + lengthInBytes) {
        throw new ShapeDecodeError(this, buffer, "Attempting to `str`-decode beyond bounds of input bytes");
      }
      const slice = buffer.array.subarray(buffer.index, buffer.index + lengthInBytes);
      buffer.index += lengthInBytes;
      return textDecoder3.decode(slice);
    },
    subAssert(assert3) {
      assert3.typeof(this, "string");
    }
  });
}
// node_modules/@dedot/shape/extension/result.js
function Result($ok, $err) {
  return createShape({
    metadata: metadata("$.Result", Result, $ok, $err),
    staticSize: 1 + Math.max($ok.staticSize, $err.staticSize),
    subEncode(buffer, value) {
      if (value.isOk !== undefined) {
        buffer.array[buffer.index++] = value.isOk ? 0 : 1;
      } else if (value.isErr !== undefined) {
        buffer.array[buffer.index++] = value.isErr ? 1 : 0;
      } else {
        throw new ShapeEncodeError(this, buffer, "Invalid result discriminant");
      }
      if (value.isOk || !value.isErr) {
        $ok.subEncode(buffer, value.value);
      } else {
        $err.subEncode(buffer, value.err);
      }
    },
    subDecode(buffer) {
      switch (buffer.array[buffer.index++]) {
        case 0: {
          return {
            isOk: true,
            isErr: false,
            value: $ok.subDecode(buffer)
          };
        }
        case 1: {
          return {
            isOk: false,
            isErr: true,
            err: $err.subDecode(buffer)
          };
        }
        default: {
          throw new ShapeDecodeError(this, buffer, "Result discriminant neither 0 nor 1");
        }
      }
    },
    subAssert(assert3) {
      const value = assert3.value;
      if (value.isOk === true) {
        $ok.subAssert(value.value);
      } else if (value.isErr === true) {
        $err.subAssert(value.err);
      }
    }
  });
}
// node_modules/@dedot/shape/extension/alias.js
var FlatEnum = literalUnion;
var Option = option2;
var Tuple = tuple;
var Vec = array2;
var Array2 = array2;
var SizedVec = sizedArray;
var U8a = uint8Array;
var SizedU8a = sizedUint8Array;
// node_modules/@dedot/shape/lean/Struct.js
var Struct = (members) => {
  const fields = Object.keys(members).map((keyName) => {
    const member = members[keyName];
    const [metadata2] = member.metadata;
    const isOptional = metadata2.name === "$.option";
    return isOptional ? optionalField(keyName, metadata2.args[0]) : field(keyName, member);
  });
  return object2(...fields);
};

// node_modules/@dedot/shape/lean/Enum.js
var Enum = (members, options) => {
  const tagKey = options?.tagKey || "type";
  const valueKey = options?.valueKey || "value";
  const enumMembers = {};
  Object.keys(members).forEach((keyName, keyIndex) => {
    if (members[keyName]) {
      const { index, value } = members[keyName];
      if (Number.isInteger(index)) {
        if (value) {
          enumMembers[index] = variant(keyName, field(valueKey, value));
        } else {
          enumMembers[index] = variant(keyName);
        }
      } else {
        enumMembers[keyIndex] = variant(keyName, field(valueKey, members[keyName]));
      }
    } else {
      enumMembers[keyIndex] = variant(keyName);
    }
  });
  const shaped = taggedUnion(tagKey, enumMembers);
  shaped.registerDecoder((input) => shouldDecodeSerdePlainValue(input, { tagKey }), (shape, input) => decodeSerdePlainValue(shape, input, { tagKey, valueKey }));
  return shaped;
};
function isPlainObject(value) {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in value) && !(Symbol.iterator in value);
}
var shouldDecodeSerdePlainValue = (input, { tagKey }) => {
  return isString(input) && !isHex(input) || isPlainObject(input) && !input[tagKey];
};
var decodeSerdePlainValue = ($shape, input, { tagKey, valueKey }) => {
  const members = $shape.metadata[0].args[1];
  const variants = Object.values(members);
  if (isString(input)) {
    const targetVariant = variants.find((v) => v.tag === input || stringCamelCase(v.tag) === input);
    if (targetVariant) {
      const shapeMembers = targetVariant.shape.metadata[0].args;
      if (shapeMembers && shapeMembers.length === 0) {
        return { [tagKey]: targetVariant.tag };
      }
    }
  } else if (isObject(input)) {
    const targetVariant = variants.find((v) => !!input[v.tag] || !!input[stringCamelCase(v.tag)]);
    if (targetVariant) {
      const targetShape = targetVariant.shape.metadata[0].args[0].metadata[0].args[1];
      const value = input[targetVariant.tag] || input[stringCamelCase(targetVariant.tag)];
      return {
        [tagKey]: targetVariant.tag,
        [valueKey]: targetShape.tryDecode(value)
      };
    }
  }
  throw new ShapeDecodeError($shape, new DecodeBuffer(new Uint8Array), `Cannot decode plain serde input: ${JSON.stringify(input)}`);
};
// node_modules/@dedot/codecs/codecs/generic/AccountId32.js
var accountId32ToHex = (input) => {
  if (input instanceof AccountId32) {
    return input.raw;
  } else if (isU8a(input)) {
    return u8aToHex(input);
  } else if (isString(input)) {
    return u8aToHex(decodeAddress(input));
  } else if (isHex(input)) {
    return input;
  }
  throw Error(`Invalid input for AccountId32: ${input}`);
};

class AccountId32 {
  raw;
  constructor(input) {
    this.raw = accountId32ToHex(input);
  }
  address(ss58Format) {
    return encodeAddress(this.raw, ss58Format);
  }
  toJSON() {
    return this.address();
  }
  eq(other) {
    return this.raw === new AccountId32(other).raw;
  }
}
var $AccountId32 = instance(AccountId32, Tuple(FixedHex(32)), (input) => [accountId32ToHex(input)]);

// node_modules/@dedot/codecs/codecs/generic/AccountId20.js
var accountId20ToHex = (input) => {
  if (input instanceof AccountId20) {
    return input.raw;
  } else if (isU8a(input)) {
    return u8aToHex(input);
  } else if (isHex(input) && isEvmAddress(input)) {
    return input;
  }
  throw Error(`Invalid input for AccountId20: ${input}`);
};

class AccountId20 {
  raw;
  constructor(input) {
    this.raw = accountId20ToHex(input);
  }
  address() {
    return this.raw;
  }
  toJSON() {
    return this.address();
  }
}
var $AccountId20 = instance(AccountId20, Tuple(FixedHex(20)), (input) => [accountId20ToHex(input)]);
var $EthereumAddress = $AccountId20;

// node_modules/@dedot/codecs/codecs/generic/Hash.js
var $Hash = FixedHex(32);
var $BlockHash = $Hash;

// node_modules/@dedot/codecs/codecs/generic/Header.js
var $BlockNumber = withMetadata(metadata("$BlockNumber"), u322);
var $HeaderBlockNumber = withMetadata(metadata("$HeaderBlockNumber"), compactU327);
$HeaderBlockNumber.registerDecoder(isHex, (_, input) => parseInt(input, 16));

class ConsensusEngineId {
  id;
  constructor(id) {
    this.id = id;
  }
  get name() {
    return hexToString(this.id);
  }
  toString() {
    return this.name;
  }
  toJSON() {
    return this.name;
  }
}
var $ConsensusEngineId = instance(ConsensusEngineId, Tuple(FixedHex(4)), (value) => {
  if (value instanceof ConsensusEngineId) {
    return [value.id];
  } else {
    return [value];
  }
});
var $DigestItem = Enum({
  Other: { index: 0, value: PrefixedHex },
  Consensus: { index: 4, value: Tuple($ConsensusEngineId, PrefixedHex) },
  Seal: { index: 5, value: Tuple($ConsensusEngineId, PrefixedHex) },
  PreRuntime: { index: 6, value: Tuple($ConsensusEngineId, PrefixedHex) },
  RuntimeEnvironmentUpdated: { index: 8 }
});
var $Digest = Struct({
  logs: Vec($DigestItem)
});
var $Header = Struct({
  parentHash: $Hash,
  number: $HeaderBlockNumber,
  stateRoot: $Hash,
  extrinsicsRoot: $Hash,
  digest: $Digest
});

// node_modules/@dedot/codecs/codecs/known/runtime/TransactionValidityError.js
var $InvalidTransaction = Enum({
  Call: null,
  Payment: null,
  Future: null,
  Stale: null,
  BadProof: null,
  AncientBirthBlock: null,
  ExhaustsResources: null,
  Custom: u8,
  BadMandatory: null,
  MandatoryValidation: null,
  BadSigner: null
});
var $UnknownTransaction = Enum({
  CannotLookup: null,
  NoUnsignedValidator: null,
  Custom: u8
});
var $TransactionValidityError = Enum({
  Invalid: $InvalidTransaction,
  Unknown: $UnknownTransaction
});

// node_modules/@dedot/codecs/codecs/known/runtime/DispatchError.js
var $TokenError = FlatEnum([
  "FundsUnavailable",
  "OnlyProvider",
  "BelowMinimum",
  "CannotCreate",
  "UnknownAsset",
  "Frozen",
  "Unsupported",
  "CannotCreateHold",
  "NotExpendable",
  "Blocked"
]);
var $ModuleError = Struct({
  index: u8,
  error: FixedHex(4)
});
var $TransactionalError = FlatEnum([
  "LimitReached",
  "NoLayer"
]);
var $ArithmeticError = FlatEnum([
  "Underflow",
  "Overflow",
  "DivisionByZero"
]);
var $DispatchError = Enum({
  Other: null,
  CannotLookup: null,
  BadOrigin: null,
  Module: $ModuleError,
  ConsumerRemaining: null,
  NoProviders: null,
  TooManyConsumers: null,
  Token: $TokenError,
  Arithmetic: $ArithmeticError,
  Transactional: $TransactionalError,
  Exhausted: null,
  Corruption: null,
  Unavailable: null,
  RootNotAllowed: null
});

// node_modules/@dedot/codecs/codecs/known/runtime/ApplyExtrinsicResult.js
var $DispatchOutcome = Result(Tuple(), $DispatchError);
var $ApplyExtrinsicResult = Result($DispatchOutcome, $TransactionValidityError);

// node_modules/@dedot/codecs/codecs/known/runtime/MultiAddress.js
var $MultiAddressBase = Enum({
  Id: $AccountId32,
  Index: compactU327,
  Raw: PrefixedHex,
  Address32: FixedHex(32),
  Address20: FixedHex(20)
});
var $MultiAddress = transform({
  $base: $MultiAddressBase,
  encode: (value) => {
    if (typeof value === "string" || value instanceof AccountId32) {
      return { type: "Id", value };
    }
    return value;
  },
  decode: (value) => value
});

// node_modules/@dedot/codecs/codecs/known/common.js
var $StorageData = RawHex;
var $RawBytes = transform({
  $base: RawHex,
  encode: (value) => isU8a(value) ? u8aToHex(value) : value,
  decode: (value) => value
});
var $Bytes = transform({
  $base: PrefixedHex,
  encode: (value) => toHex(value),
  decode: (value) => value
});

// node_modules/@dedot/codecs/codecs/known/runtime/OpaqueExtrinsic.js
var $OpaqueExtrinsic = createShape2({
  metadata: metadata("$OpaqueExtrinsic"),
  staticSize: compactU327.staticSize,
  subEncode(buffer, value) {
    const u8a = toU8a(value);
    const buf = new EncodeBuffer(compactU327.staticSize);
    compactU327.subEncode(buf, u8a.length);
    buffer.insertArray(u8a);
  },
  subDecode(buffer) {
    const length = compactU327.subDecode(buffer);
    const lengthSize = compactU327.encode(length).length;
    const value = buffer.array.subarray(buffer.index - lengthSize, buffer.index + length);
    buffer.index += length;
    return u8aToHex(value);
  }
});
var $UncheckedExtrinsic = $OpaqueExtrinsic;

// node_modules/@dedot/codecs/codecs/generic/Block.js
var $Block = Struct({
  header: $Header,
  extrinsics: Vec($OpaqueExtrinsic)
});
var $Justification = Tuple($ConsensusEngineId, PrefixedHex);
var $Justifications = Vec($Justification);
var $SignedBlock = Struct({
  block: $Block,
  justifications: Option($Justifications)
});

// node_modules/@dedot/codecs/codecs/generic/Era.js
function numOfTrailingZeroes(n) {
  let i = 0n;
  while (!(n & 1n)) {
    i++;
    n >>= 1n;
  }
  return i;
}
function nextPowerOfTwo(n) {
  let p = 1n;
  while (n > p)
    p <<= 1n;
  return p;
}
var $Era = createShape2({
  metadata: metadata("$Era"),
  staticSize: 2,
  subEncode(buffer, input) {
    if (input.hasOwnProperty("period") && input.hasOwnProperty("current")) {
      input = input;
      const adjustedPeriod = bnMin(bnMax(nextPowerOfTwo(input.period), 4n), 1n << 16n);
      const phase = input.current % adjustedPeriod;
      const quantizeFactor = bnMax(adjustedPeriod >> 12n, 1n);
      const quantizedPhase = phase / quantizeFactor * quantizeFactor;
      input = { type: "Mortal", value: { period: adjustedPeriod, phase: quantizedPhase } };
    }
    if (input.hasOwnProperty("type")) {
      input = input;
      if (input.type === "Immortal") {
        buffer.array[buffer.index++] = 0;
      } else if (input.type === "Mortal") {
        const quantizeFactor = bnMax(input.value.period >> 12n, 1n);
        const encoded = bnMin(bnMax(numOfTrailingZeroes(input.value.period) - 1n, 1n), 15n) | input.value.phase / quantizeFactor << 4n;
        u16.subEncode(buffer, Number(encoded));
      }
    }
  },
  subDecode(buffer) {
    if (buffer.array[buffer.index] === 0) {
      buffer.index++;
      return { type: "Immortal" };
    } else {
      const encoded = BigInt(buffer.array[buffer.index] + (buffer.array[buffer.index + 1] << 8));
      buffer.index += 2;
      const period = 2n << encoded % (1n << 4n);
      const quantizeFactor = bnMax(period >> 12n, 1n);
      const phase = (encoded >> 4n) * quantizeFactor;
      if (period >= 4n && phase < period) {
        return { type: "Mortal", value: { period, phase } };
      } else {
        throw new Error("Invalid period and phase");
      }
    }
  }
});

// node_modules/@dedot/codecs/codecs/known/primitives.js
var $H128 = FixedHex(16);
var $H160 = FixedHex(20);
var $H256 = FixedHex(32);
var $H384 = FixedHex(48);
var $H512 = FixedHex(64);
var $H768 = FixedHex(96);

// node_modules/@dedot/codecs/codecs/known/identity.js
var $DataRaw = Enum({
  None: null,
  Raw0: FixedStr(0),
  Raw1: FixedStr(1),
  Raw2: FixedStr(2),
  Raw3: FixedStr(3),
  Raw4: FixedStr(4),
  Raw5: FixedStr(5),
  Raw6: FixedStr(6),
  Raw7: FixedStr(7),
  Raw8: FixedStr(8),
  Raw9: FixedStr(9),
  Raw10: FixedStr(10),
  Raw11: FixedStr(11),
  Raw12: FixedStr(12),
  Raw13: FixedStr(13),
  Raw14: FixedStr(14),
  Raw15: FixedStr(15),
  Raw16: FixedStr(16),
  Raw17: FixedStr(17),
  Raw18: FixedStr(18),
  Raw19: FixedStr(19),
  Raw20: FixedStr(20),
  Raw21: FixedStr(21),
  Raw22: FixedStr(22),
  Raw23: FixedStr(23),
  Raw24: FixedStr(24),
  Raw25: FixedStr(25),
  Raw26: FixedStr(26),
  Raw27: FixedStr(27),
  Raw28: FixedStr(28),
  Raw29: FixedStr(29),
  Raw30: FixedStr(30),
  Raw31: FixedStr(31),
  Raw32: FixedStr(32),
  BlakeTwo256: FixedHex(32),
  Sha256: FixedHex(32),
  Keccak256: FixedHex(32),
  ShaThree256: FixedHex(32)
});
var $Data = transform({
  $base: $DataRaw,
  encode: (input) => {
    if (input.type === "Raw") {
      const bytes = stringToU8a(input.value);
      return {
        type: `Raw${bytes.length}`,
        value: input.value
      };
    }
    return input;
  },
  decode: (input) => {
    if (input.type.startsWith("Raw")) {
      return {
        type: "Raw",
        value: input.value
      };
    }
    return input;
  }
});

// node_modules/@dedot/codecs/codecs/known/consensus/beefy.js
var $BeefyPayloadId = FixedHex(2);
var $Payload = Vec(Tuple($BeefyPayloadId, PrefixedHex));
var $Commitment = Struct({
  payload: $Payload,
  blockNumber: u322,
  validatorSetId: u642
});
var $CompactSignedCommitment = Struct({
  commitment: $Commitment,
  signatures_from: PrefixedHex,
  validator_set_len: u322,
  signatures_compact: Vec(FixedHex(65))
});
var $VersionedFinalityProof = Enum({
  V1: { index: 1, value: $CompactSignedCommitment }
});
var $ValidatorSetId = u642;
var $ValidatorSet = Struct({
  validators: Vec($AccountId32),
  id: $ValidatorSetId
});
var $VoteMessage = Struct({
  commitment: $Commitment,
  id: $AccountId32,
  signature: $H512
});
var $BeefyEquivocationProof = Struct({
  first: $VoteMessage,
  second: $VoteMessage
});
var $BeefyAuthoritySet = Struct({
  id: $ValidatorSetId,
  len: u322,
  keysetCommitment: $H256
});

// node_modules/@dedot/codecs/codecs/known/metadata.js
var $OpaqueMetadata = PrefixedHex;

// node_modules/@dedot/codecs/codecs/known/transaction.js
var $TransactionStatus = Enum({
  Future: null,
  Ready: null,
  Broadcast: Vec(str),
  InBlock: $BlockHash,
  Retracted: $BlockHash,
  FinalityTimeout: $BlockHash,
  Finalized: $BlockHash,
  Usurped: $Hash,
  Dropped: null,
  Invalid: null
});

// node_modules/@dedot/codecs/codecs/metadata/scale_info.js
var $TypeId = compactU327;
var $Field = Struct({
  name: Option(str),
  typeId: $TypeId,
  typeName: Option(str),
  docs: Vec(str)
});
var $PrimitiveKind = FlatEnum([
  "bool",
  "char",
  "str",
  "u8",
  "u16",
  "u32",
  "u64",
  "u128",
  "u256",
  "i8",
  "i16",
  "i32",
  "i64",
  "i128",
  "i256"
]);
var $EnumTypeDef = Struct({
  members: Vec(Struct({
    name: str,
    fields: Vec($Field),
    index: u8,
    docs: Vec(str)
  }))
});
var $TypeDef = Enum({
  Struct: Struct({ fields: Vec($Field) }),
  Enum: $EnumTypeDef,
  Sequence: Struct({ typeParam: $TypeId }),
  SizedVec: Struct({ len: u322, typeParam: $TypeId }),
  Tuple: Struct({ fields: Vec($TypeId) }),
  Primitive: Struct({ kind: $PrimitiveKind }),
  Compact: Struct({ typeParam: $TypeId }),
  BitSequence: Struct({ bitOrderType: $TypeId, bitStoreType: $TypeId })
});
var $TypeParam = Struct({ name: str, typeId: Option($TypeId) });
var $PortableType = Struct({
  id: compact(u322),
  path: Vec(str),
  params: Vec($TypeParam),
  typeDef: $TypeDef,
  docs: Vec(str)
});

// node_modules/@dedot/codecs/codecs/metadata/v14.js
var $Hasher = FlatEnum([
  "blake2_128",
  "blake2_256",
  "blake2_128Concat",
  "twox128",
  "twox256",
  "twox64Concat",
  "identity"
]);
var $StorageEntryV14 = Struct({
  name: str,
  modifier: FlatEnum(["Optional", "Default"]),
  storageType: Enum({
    Plain: Struct({ valueTypeId: $TypeId }),
    Map: Struct({
      hashers: Vec($Hasher),
      keyTypeId: $TypeId,
      valueTypeId: $TypeId
    })
  }),
  default: PrefixedHex,
  docs: Vec(str)
});
var $ConstantDefV14 = Struct({
  name: str,
  typeId: $TypeId,
  value: PrefixedHex,
  docs: Vec(str)
});
var $PalletDefV14 = Struct({
  name: str,
  storage: Option(Struct({
    prefix: str,
    entries: Vec($StorageEntryV14)
  })),
  calls: Option($TypeId),
  event: Option($TypeId),
  constants: Vec($ConstantDefV14),
  error: Option($TypeId),
  index: u8
});
var $SignedExtensionDefV14 = Struct({
  ident: str,
  typeId: $TypeId,
  additionalSigned: $TypeId
});
var $ExtrinsicDefV14 = Struct({
  typeId: $TypeId,
  version: u8,
  signedExtensions: Vec($SignedExtensionDefV14)
});
var $MetadataV14 = Struct({
  types: Vec($PortableType),
  pallets: Vec($PalletDefV14),
  extrinsic: $ExtrinsicDefV14,
  runtimeType: $TypeId
});

// node_modules/@dedot/codecs/codecs/metadata/v15.js
var $ConstantDefV15 = $ConstantDefV14;
var $StorageEntryV15 = $StorageEntryV14;
var $PalletDefV15 = Struct({
  name: str,
  storage: Option(Struct({
    prefix: str,
    entries: Vec($StorageEntryV15)
  })),
  calls: Option($TypeId),
  event: Option($TypeId),
  constants: Vec($ConstantDefV15),
  error: Option($TypeId),
  index: u8,
  docs: Vec(str)
});
var $SignedExtensionDefV15 = $SignedExtensionDefV14;
var $ExtrinsicDefV15 = Struct({
  version: u8,
  addressTypeId: $TypeId,
  callTypeId: $TypeId,
  signatureTypeId: $TypeId,
  extraTypeId: $TypeId,
  signedExtensions: Vec($SignedExtensionDefV15)
});
var $RuntimeApiMethodParamDefV15 = Struct({
  name: str,
  typeId: $TypeId
});
var $RuntimeApiMethodDefV15 = Struct({
  name: str,
  inputs: Vec($RuntimeApiMethodParamDefV15),
  output: $TypeId,
  docs: Vec(str)
});
var $RuntimeApiDefV15 = Struct({
  name: str,
  methods: Vec($RuntimeApiMethodDefV15),
  docs: Vec(str)
});
var $MetadataV15 = Struct({
  types: Vec($PortableType),
  pallets: Vec($PalletDefV15),
  extrinsic: $ExtrinsicDefV15,
  runtimeType: $TypeId,
  apis: Vec($RuntimeApiDefV15),
  outerEnums: Struct({
    callEnumTypeId: $TypeId,
    eventEnumTypeId: $TypeId,
    errorEnumTypeId: $TypeId
  }),
  custom: Struct({
    map: map(str, Struct({
      typeId: $TypeId,
      value: PrefixedHex
    }))
  })
});

// node_modules/@dedot/codecs/codecs/metadata/conversion/toV15.js
var toV15 = (metadataV14) => {
  const { types, pallets: palletsV14, extrinsic: extrinsicV14, runtimeType } = metadataV14;
  const extrinsicV14Type = types[extrinsicV14.typeId];
  const [address, call, signature, extra] = extrinsicV14Type.params;
  const extrinsic = {
    ...extrinsicV14,
    addressTypeId: address.typeId,
    callTypeId: call.typeId,
    signatureTypeId: signature.typeId,
    extraTypeId: extra.typeId
  };
  const pallets = palletsV14.map((p) => ({ ...p, docs: [] }));
  const frameSystemEventRecord = types.find(({ path }) => path.join("::") === "frame_system::EventRecord");
  return {
    types,
    pallets,
    extrinsic,
    runtimeType,
    apis: [],
    outerEnums: {
      callEnumTypeId: call.typeId,
      eventEnumTypeId: frameSystemEventRecord.params[0].typeId,
      errorEnumTypeId: -1
    },
    custom: { map: new Map }
  };
};

// node_modules/@dedot/codecs/codecs/metadata/Metadata.js
var notSupportedCodec = (msg = "Not supported!") => {
  return createShape2({
    metadata: metadata("$.NotSupported"),
    staticSize: 0,
    subEncode(buffer, value) {
      throw new Error(msg);
    },
    subDecode(buffer) {
      throw new Error(msg);
    }
  });
};
var $NotSupported = notSupportedCodec();
var $MetadataVersioned = Enum({
  V0: notSupportedCodec("Metadata V0 is not supported"),
  V1: notSupportedCodec("Metadata V1 is not supported"),
  V2: notSupportedCodec("Metadata V2 is not supported"),
  V3: notSupportedCodec("Metadata V3 is not supported"),
  V4: notSupportedCodec("Metadata V4 is not supported"),
  V5: notSupportedCodec("Metadata V5 is not supported"),
  V6: notSupportedCodec("Metadata V6 is not supported"),
  V7: notSupportedCodec("Metadata V7 is not supported"),
  V8: notSupportedCodec("Metadata V8 is not supported"),
  V9: notSupportedCodec("Metadata V9 is not supported"),
  V10: notSupportedCodec("Metadata V10 is not supported"),
  V11: notSupportedCodec("Metadata V11 is not supported"),
  V12: notSupportedCodec("Metadata V12 is not supported"),
  V13: notSupportedCodec("Metadata V13 is not supported"),
  V14: $MetadataV14,
  V15: $MetadataV15
});
var MAGIC_NUMBER = 1635018093;
class Metadata {
  magicNumber;
  metadataVersioned;
  constructor(magicNumber, metadata2) {
    if (magicNumber !== MAGIC_NUMBER) {
      throw new Error("Invalid magic number");
    }
    this.magicNumber = magicNumber;
    this.metadataVersioned = metadata2;
  }
  get versionNumber() {
    return parseInt(this.version.substring(1));
  }
  get version() {
    return this.metadataVersioned.type;
  }
  get latest() {
    const currentVersion = this.metadataVersioned.type;
    if (currentVersion === "V15") {
      return this.metadataVersioned.value;
    } else if (currentVersion === "V14") {
      return toV15(this.metadataVersioned.value);
    }
    throw new Error(`Unsupported metadata version, found: ${currentVersion}`);
  }
}
var $Metadata = instance(Metadata, Tuple(u322, $MetadataVersioned), (metadata2) => [metadata2.magicNumber, metadata2.metadataVersioned]);

// node_modules/@dedot/codecs/codecs/extrinsic/ExtrinsicVersion.js
var EXTRINSIC_FORMAT_VERSION = 4;
var verifyExtrinsicVersion = (actualVersion) => {
  assert(actualVersion === EXTRINSIC_FORMAT_VERSION, `Unsupported extrinsic format version, found: ${actualVersion}`);
};
var $ExtrinsicVersion = createShape2({
  metadata: metadata("$ExtrinsicVersion"),
  staticSize: 1,
  subDecode(buffer) {
    const firstByte = buffer.array[buffer.index++];
    const signed = (firstByte & 128) !== 0;
    const version = firstByte & 127;
    verifyExtrinsicVersion(version);
    return {
      signed,
      version
    };
  },
  subEncode(buffer, value) {
    const { signed, version } = value;
    verifyExtrinsicVersion(version);
    buffer.array[buffer.index++] = +signed << 7 | version;
  }
});

// node_modules/@dedot/codecs/codecs/extrinsic/ExtrinsicV4.js
class ExtrinsicV4 {
  registry;
  #version;
  #call;
  #signature;
  constructor(registry, call, signature) {
    this.registry = registry;
    this.#version = 4;
    this.#call = call;
    this.#signature = signature;
  }
  get signed() {
    return !!this.#signature;
  }
  get version() {
    return this.#version;
  }
  get signature() {
    return this.#signature;
  }
  get call() {
    return this.#call;
  }
  get callU8a() {
    const { callTypeId } = this.registry.metadata.extrinsic;
    const $RuntimeCall = this.registry.findCodec(callTypeId);
    return $RuntimeCall.tryEncode(this.call);
  }
  get callHex() {
    return u8aToHex(this.callU8a);
  }
  get callLength() {
    return this.callU8a.length;
  }
  attachSignature(signature) {
    this.#signature = signature;
  }
  get $Codec() {
    return this.registry.$Extrinsic;
  }
  toU8a() {
    return this.$Codec.tryEncode(this);
  }
  toHex() {
    return u8aToHex(this.toU8a());
  }
  get length() {
    return this.toU8a().length;
  }
  get hash() {
    return this.registry.hashAsHex(this.toU8a());
  }
}

// node_modules/@dedot/codecs/codecs/extrinsic/Extrinsic.js
class Extrinsic extends ExtrinsicV4 {
}
var $Extrinsic = (registry) => {
  assert(registry, "PortableRegistry is required to compose $Extrinsic codec");
  const { callTypeId, addressTypeId, signatureTypeId, extraTypeId } = registry.metadata.extrinsic;
  const $Address = registry.findCodec(addressTypeId);
  const $Signature = registry.findCodec(signatureTypeId);
  const $Extra = registry.findCodec(extraTypeId);
  const $RuntimeCall = registry.findCodec(callTypeId);
  const $ExtrinsicSignature = Struct({
    address: $Address,
    signature: $Signature,
    extra: $Extra
  });
  const staticSize = $ExtrinsicVersion.staticSize + $ExtrinsicSignature.staticSize + $RuntimeCall.staticSize;
  const $BaseEx = createShape2({
    metadata: [],
    staticSize,
    subDecode(buffer) {
      const { signed } = $ExtrinsicVersion.subDecode(buffer);
      const signature = signed ? $ExtrinsicSignature.subDecode(buffer) : undefined;
      const call = $RuntimeCall.subDecode(buffer);
      return new Extrinsic(registry, call, signature);
    },
    subEncode(buffer, extrinsic) {
      const { version, signed, signature, call } = extrinsic;
      $ExtrinsicVersion.subEncode(buffer, { version, signed });
      if (signed) {
        assert(signature, "Signature is required!");
        $ExtrinsicSignature.subEncode(buffer, signature);
      }
      $RuntimeCall.subEncode(buffer, call);
    }
  });
  return withMetadata(metadata("$Extrinsic"), lenPrefixed($BaseEx));
};

// node_modules/@dedot/codecs/registry/TypeRegistry.js
var KNOWN_CODECS = {
  "sp_core::crypto::AccountId32": $AccountId32,
  "sp_runtime::generic::era::Era": $Era,
  "sp_runtime::multiaddress::MultiAddress": $MultiAddress,
  "fp_account::AccountId20": $AccountId20,
  "account::AccountId20": $AccountId20,
  "polkadot_runtime_common::claims::EthereumAddress": $EthereumAddress,
  "sp_runtime::generic::unchecked_extrinsic::UncheckedExtrinsic": $UncheckedExtrinsic,
  "pallet_identity::types::Data": $Data,
  "sp_runtime::generic::digest::Digest": $Digest,
  "sp_runtime::generic::digest::DigestItem": $DigestItem,
  "sp_runtime::generic::header::Header": $Header,
  "ink_primitives::types::Hash": $Hash,
  "ink_primitives::types::AccountId": $AccountId32
};

class TypeRegistry {
  types;
  #cache;
  constructor(types) {
    if (Array.isArray(types)) {
      this.types = types.reduce((o, one) => {
        o[one.id] = one;
        return o;
      }, {});
    } else {
      this.types = types;
    }
    this.#cache = new Map;
  }
  findType(typeId) {
    const type = this.types[typeId];
    if (!type) {
      throw new Error(`Cannot find portable type for id: ${typeId}`);
    }
    return type;
  }
  findCodec(typeId) {
    const typeDef = this.findType(typeId);
    if (typeDef && typeDef.path.length > 0) {
      try {
        const fullPath = typeDef.path.join("::");
        if (!!KNOWN_CODECS[fullPath]) {
          return KNOWN_CODECS[fullPath];
        }
      } catch (e) {
      }
    }
    if (this.#cache.has(typeId)) {
      return this.#cache.get(typeId);
    }
    this.#cache.set(typeId, deferred2(() => this.#cache.get(typeId) || $RawBytes));
    const $codec = this.#createCodec(typeId);
    this.#cache.set(typeId, $codec);
    return $codec;
  }
  #createCodec = (typeId) => {
    const def = this.types[typeId];
    if (!def) {
      throw new Error(`Type id not found ${typeId}`);
    }
    const { typeDef, path } = def;
    const { type, value } = typeDef;
    if (type === "Struct") {
      const { fields } = value;
      if (fields.length === 0) {
        return Struct({});
      } else if (fields[0].name === undefined) {
        if (fields.length === 1) {
          return this.findCodec(fields[0].typeId);
        } else {
          return Tuple(...fields.map((x) => this.findCodec(x.typeId)));
        }
      } else {
        return Struct(fields.reduce((o, field2) => ({
          ...o,
          [normalizeName(field2.name)]: this.findCodec(field2.typeId)
        }), {}));
      }
    } else if (type === "Tuple") {
      const { fields } = value;
      if (fields.length === 0) {
        return Tuple();
      } else if (fields.length === 1) {
        return this.findCodec(fields[0]);
      } else {
        return Tuple(...fields.map((x) => this.findCodec(x)));
      }
    } else if (type === "Enum") {
      const { members } = value;
      if (path.join("::") === "Option") {
        const some = members.find((one) => one.name === "Some");
        if (some) {
          const $codec = this.findCodec(some.fields[0].typeId);
          if ($codec.metadata[0].name === "$.bool") {
            return optionBool;
          } else {
            return Option($codec);
          }
        }
      } else if (path.join("::") === "Result") {
        const ok = members.find((one) => one.name === "Ok");
        const err = members.find((one) => one.name === "Err");
        if (ok && err) {
          const $OkCodec = this.findCodec(ok.fields[0].typeId);
          const $ErrCodec = this.findCodec(err.fields[0].typeId);
          return Result($OkCodec, $ErrCodec);
        }
      }
      if (members.length === 0) {
        return Null;
      } else if (members.every((x) => x.fields.length === 0)) {
        const enumMembers = {};
        for (const { index, name } of members) {
          enumMembers[index] = name;
        }
        return FlatEnum(enumMembers);
      } else {
        const enumMembers = {};
        for (const { fields, name, index } of members) {
          const keyName = stringPascalCase(name);
          if (fields.length === 0) {
            enumMembers[keyName] = { index };
          } else if (fields[0].name === undefined) {
            const $value = fields.length === 1 ? this.findCodec(fields[0].typeId) : Tuple(...fields.map((f) => this.findCodec(f.typeId)));
            enumMembers[keyName] = { index, value: $value };
          } else {
            enumMembers[keyName] = {
              index,
              value: Struct(fields.reduce((o, field2) => ({
                ...o,
                [normalizeName(field2.name)]: this.findCodec(field2.typeId)
              }), {}))
            };
          }
        }
        return Enum(enumMembers, this.getEnumOptions(typeId));
      }
    } else if (type === "Sequence") {
      const $inner = this.findCodec(typeDef.value.typeParam);
      if ($inner === u8) {
        return $Bytes;
      } else {
        return Vec($inner);
      }
    } else if (type === "SizedVec") {
      const $inner = this.findCodec(typeDef.value.typeParam);
      if ($inner === u8) {
        return FixedHex(typeDef.value.len);
      } else {
        return SizedVec($inner, typeDef.value.len);
      }
    } else if (type === "Primitive") {
      const kind = typeDef.value.kind;
      if (kind === "char") {
        return str;
      }
      const $codec = exports_shape[kind];
      if (!$codec) {
        throw new Error(`Invalid primitive kind: ${kind}`);
      }
      return $codec;
    } else if (type === "Compact") {
      return compact(this.findCodec(typeDef.value.typeParam));
    } else if (type === "BitSequence") {
      return bitSequence;
    }
    throw Error(`Not support yet! ${JSON.stringify(def, null, 2)}`);
  };
  getEnumOptions(_typeId) {
    return {
      tagKey: "type",
      valueKey: "value"
    };
  }
}

// node_modules/@dedot/codecs/registry/PortableRegistry.js
class PortableRegistry extends TypeRegistry {
  #metadata;
  #hasher;
  constructor(metadata2, hasher) {
    super(metadata2.types);
    this.#metadata = metadata2;
    this.#hasher = hasher || blake2_256;
  }
  get $Extrinsic() {
    return $Extrinsic(this);
  }
  get metadata() {
    return this.#metadata;
  }
  hash(input) {
    return this.#hasher(input);
  }
  hashAsHex(input) {
    if (isU8a(input)) {
      return u8aToHex(this.hash(input));
    } else {
      return u8aToHex(this.hash(hexToU8a(input)));
    }
  }
  setHasher(hasher) {
    this.#hasher = hasher;
  }
  findErrorMeta(errorInfo) {
    const moduleError = isObject(errorInfo) && errorInfo.type === "Module" ? errorInfo.value : errorInfo;
    const targetPallet = this.metadata.pallets.find((p) => p.index === moduleError.index);
    if (!targetPallet || !targetPallet.error)
      return;
    const def = this.metadata.types[targetPallet.error];
    if (!def)
      return;
    const { type, value } = def.typeDef;
    if (type !== "Enum")
      return;
    const errorDef = value.members.find(({ index }) => index === hexToU8a(moduleError.error)[0]);
    if (!errorDef)
      return;
    return {
      ...errorDef,
      fieldCodecs: errorDef.fields.map(({ typeId }) => this.findCodec(typeId)),
      pallet: targetPallet.name,
      palletIndex: targetPallet.index
    };
  }
  findType(typeId) {
    const type = this.types[typeId];
    if (!type) {
      throw new Error(`Cannot find portable type for id: ${typeId}`);
    }
    return type;
  }
  getEnumOptions(typeId) {
    const { extrinsic: { callTypeId }, outerEnums: { eventEnumTypeId, errorEnumTypeId } } = this.metadata;
    if (typeId === eventEnumTypeId) {
      return {
        tagKey: "pallet",
        valueKey: "palletEvent"
      };
    } else if (typeId === callTypeId) {
      return {
        tagKey: "pallet",
        valueKey: "palletCall"
      };
    } else if (typeId === errorEnumTypeId) {
      return {
        tagKey: "pallet",
        valueKey: "palletError"
      };
    } else if (this.getFieldTypeIdsFromEnum(eventEnumTypeId).includes(typeId) || this.getFieldTypeIdsFromEnum(errorEnumTypeId).includes(typeId)) {
      return {
        tagKey: "name",
        valueKey: "data"
      };
    } else if (this.getFieldTypeIdsFromEnum(callTypeId).includes(typeId)) {
      return {
        tagKey: "name",
        valueKey: "params"
      };
    }
    return {
      tagKey: "type",
      valueKey: "value"
    };
  }
  getFieldTypeIdsFromEnum(typeId) {
    try {
      const eventType = this.findType(typeId);
      if (eventType.typeDef.type === "Enum") {
        return eventType.typeDef.value.members.map((m) => m.fields[0].typeId);
      }
    } catch {
    }
    return [];
  }
}

// node_modules/@dedot/api/storage/QueryableStorage.js
var HASHER_INFO = {
  blake2_128: [16, false],
  blake2_256: [32, false],
  blake2_128Concat: [16, true],
  twox128: [16, false],
  twox256: [32, false],
  twox64Concat: [8, true],
  identity: [0, true]
};

class QueryableStorage {
  registry;
  palletName;
  storageItem;
  pallet;
  storageEntry;
  constructor(registry, palletName, storageItem) {
    this.registry = registry;
    this.palletName = palletName;
    this.storageItem = storageItem;
    this.pallet = this.#getPallet();
    this.storageEntry = this.#getStorageEntry();
  }
  get prefixKey() {
    return u8aToHex(this.prefixKeyAsU8a);
  }
  get prefixKeyAsU8a() {
    const palletNameHash = xxhashAsU8a(this.pallet.name, 128);
    const storageItemHash = xxhashAsU8a(this.storageEntry.name, 128);
    return concatU8a(palletNameHash, storageItemHash);
  }
  #getStorageMapInfo(storageType) {
    assert(storageType.type === "Map");
    const { hashers, keyTypeId } = storageType.value;
    let keyTypeIds = [keyTypeId];
    if (hashers.length > 1) {
      const { typeDef } = this.registry.findType(keyTypeId);
      assert(typeDef.type === "Tuple", "Key type should be a tuple!");
      keyTypeIds = typeDef.value.fields;
    }
    return { hashers, keyTypeIds };
  }
  encodeKey(keyInput) {
    const { storageType } = this.storageEntry;
    if (storageType.type === "Plain") {
      return this.prefixKey;
    } else if (storageType.type === "Map") {
      const { hashers, keyTypeIds } = this.#getStorageMapInfo(storageType);
      const extractedInputs = this.#extractRequiredKeyInputs(keyInput, hashers.length);
      const keyParts = keyTypeIds.map((keyId, index) => {
        const input = extractedInputs[index];
        const hasher = HASHERS[hashers[index]];
        const $keyCodec = this.registry.findCodec(keyId);
        return hasher($keyCodec.tryEncode(input));
      });
      return u8aToHex(concatU8a(this.prefixKeyAsU8a, ...keyParts));
    }
    throw Error(`Invalid storage entry type: ${JSON.stringify(storageType)}`);
  }
  decodeKey(key) {
    const { storageType } = this.storageEntry;
    if (storageType.type === "Plain") {
      return;
    } else if (storageType.type === "Map") {
      const prefix = this.prefixKey;
      if (!key.startsWith(prefix)) {
        throw new Error(`Storage key does not match this storage entry (${this.palletName}.${this.storageItem})`);
      }
      const { hashers, keyTypeIds } = this.#getStorageMapInfo(storageType);
      let keyData = hexToU8a(hexAddPrefix(key.slice(prefix.length)));
      const results = keyTypeIds.map((keyId, index) => {
        const [hashLen, canDecode] = HASHER_INFO[hashers[index]];
        if (!canDecode)
          throw new Error("Cannot decode storage key");
        const $keyCodec = this.registry.findCodec(keyId);
        keyData = keyData.slice(hashLen);
        const result3 = $keyCodec.tryDecode(keyData);
        const encoded = $keyCodec.tryEncode(result3);
        keyData = keyData.slice(encoded.length);
        return result3;
      });
      return hashers.length > 1 ? results : results[0];
    }
    throw Error(`Invalid storage entry type: ${JSON.stringify(storageType)}`);
  }
  decodeValue(raw2) {
    const { modifier, storageType: { value: { valueTypeId } }, default: defaultValue } = this.storageEntry;
    if (raw2 === null || raw2 === undefined) {
      if (modifier === "Optional") {
        return;
      } else if (modifier === "Default") {
        return this.registry.findCodec(valueTypeId).tryDecode(hexToU8a(defaultValue));
      }
    } else {
      return this.registry.findCodec(valueTypeId).tryDecode($StorageData.tryEncode(raw2));
    }
  }
  #extractRequiredKeyInputs(keyInput, numberOfValue) {
    if (numberOfValue === 0) {
      return [];
    } else {
      if (keyInput === undefined) {
        throw new Error(`Invalid key inputs, required ${numberOfValue} input(s)`);
      }
      if (numberOfValue === 1) {
        return [keyInput];
      } else {
        if (!Array.isArray(keyInput)) {
          throw new Error(`Input should be an array with ${numberOfValue} value(s)`);
        }
        if (keyInput.length !== numberOfValue) {
          throw new Error(`Mismatch key inputs length, required an array of ${numberOfValue} value(s)`);
        }
        return keyInput.slice(0, numberOfValue);
      }
    }
  }
  #getPallet() {
    const targetPallet = this.registry.metadata.pallets.find((p) => stringCamelCase(p.name) === stringCamelCase(this.palletName));
    assert(targetPallet, new UnknownApiError(`Pallet not found: ${this.palletName}`));
    return targetPallet;
  }
  #getStorageEntry() {
    const targetEntry = this.pallet.storage?.entries?.find((entry) => stringCamelCase(entry.name) === stringCamelCase(this.storageItem));
    assert(targetEntry, new UnknownApiError(`Storage item not found: ${this.storageItem}`));
    return targetEntry;
  }
}

// node_modules/@dedot/api/extrinsic/extensions/SignedExtension.js
class SignedExtension {
  client;
  options;
  data;
  additionalSigned;
  constructor(client, options) {
    this.client = client;
    this.options = options;
    this.data = {};
    this.additionalSigned = [];
  }
  async init() {
  }
  get identifier() {
    return this.signedExtensionDef.ident;
  }
  get $Data() {
    return ensurePresence(this.registry.findCodec(this.signedExtensionDef.typeId));
  }
  get $AdditionalSigned() {
    return ensurePresence(this.registry.findCodec(this.signedExtensionDef.additionalSigned));
  }
  get registry() {
    return this.client.registry;
  }
  get signedExtensionDef() {
    return ensurePresence(this.options.def);
  }
  get payloadOptions() {
    return this.options?.payloadOptions || {};
  }
  toPayload(...args) {
    return {};
  }
}

// node_modules/@dedot/api/extrinsic/extensions/known/ChargeAssetTxPayment.js
class ChargeAssetTxPayment extends SignedExtension {
  async init() {
    const { tip, assetId } = this.payloadOptions;
    this.data = {
      tip: tip || 0n,
      assetId
    };
  }
  toPayload() {
    const { tip, assetId } = this.data;
    return {
      tip: bnToHex(tip),
      assetId: this.#encodeAssetId(assetId)
    };
  }
  #encodeAssetId(assetId) {
    if (assetId === null || assetId === undefined) {
      return;
    }
    return u8aToHex(this.$AssetId().tryEncode(assetId));
  }
  $AssetId() {
    const extensionTypeDef = this.registry.findType(this.signedExtensionDef.typeId);
    assert(extensionTypeDef.typeDef.type === "Struct");
    const assetIdTypeDef = extensionTypeDef.typeDef.value.fields.find((f) => f.name === "asset_id");
    const $codec = this.registry.findCodec(assetIdTypeDef.typeId);
    const codecMetadata = $codec.metadata[0];
    if (codecMetadata.name === "$.option") {
      return codecMetadata.args[0];
    }
    return $codec;
  }
}

// node_modules/@dedot/api/extrinsic/extensions/known/ChargeTransactionPayment.js
class ChargeTransactionPayment extends SignedExtension {
  async init() {
    this.data = this.payloadOptions.tip || 0n;
  }
  toPayload() {
    return {
      tip: bnToHex(this.data)
    };
  }
}

// node_modules/@dedot/api/extrinsic/extensions/known/CheckGenesis.js
class CheckGenesis extends SignedExtension {
  async init() {
    this.additionalSigned = ensurePresence(this.client.genesisHash);
  }
  toPayload() {
    return {
      genesisHash: this.additionalSigned
    };
  }
}

// node_modules/@dedot/api/extrinsic/extensions/known/CheckMetadataHash.js
class CheckMetadataHash extends SignedExtension {
  async init() {
    let metadataHash = this.payloadOptions.metadataHash;
    if (metadataHash) {
      assert(isHex(metadataHash), "Metadata hash is not a valid hex string");
      this.data = { mode: "Enabled" };
      this.additionalSigned = metadataHash;
    } else {
      this.data = { mode: "Disabled" };
      this.additionalSigned = undefined;
    }
  }
  toPayload() {
    let enabled = this.data.mode === "Enabled";
    return {
      mode: enabled ? 1 : 0,
      metadataHash: this.additionalSigned
    };
  }
}

// node_modules/@dedot/api/extrinsic/extensions/known/CheckMortality.js
var MAX_FINALITY_LAG = 5;
var FALLBACK_MAX_HASH_COUNT = 250;
var FALLBACK_PERIOD = 6 * 1000;
var MORTAL_PERIOD = 5 * 60 * 1000;

class CheckMortality extends SignedExtension {
  #signingHeader;
  async init() {
    this.#signingHeader = await this.#getSigningHeader();
    this.data = { period: this.#calculateMortalLength(), current: BigInt(this.#signingHeader.number) };
    this.additionalSigned = this.#signingHeader.hash;
  }
  async#getSigningHeader() {
    if (this.client.rpcVersion === "v2") {
      return this.#getSigningHeaderRpcV2();
    }
    return this.#getSigningHeaderViaLegacyRpc();
  }
  async#getSigningHeaderRpcV2() {
    const api = this.client;
    const finalizedBlock = await api.chainHead.finalizedBlock();
    return {
      hash: finalizedBlock.hash,
      number: finalizedBlock.number
    };
  }
  async#getSigningHeaderViaLegacyRpc() {
    const [header, finalizedHash] = await Promise.all([
      this.client.rpc.chain_getHeader(),
      this.client.rpc.chain_getFinalizedHead()
    ]);
    assert(header, "Current header not found");
    const [currentHeader, finalizedHeader] = await Promise.all([
      Promise.resolve(header).then((header2) => {
        const { parentHash } = header2;
        if (parentHash.length === 0 || isZeroHex(parentHash)) {
          return header2;
        } else {
          return this.client.rpc.chain_getHeader(parentHash);
        }
      }),
      this.client.rpc.chain_getHeader(finalizedHash)
    ]);
    assert(currentHeader, "Cannot determine current header");
    if (!finalizedHeader || currentHeader.number - finalizedHeader.number > MAX_FINALITY_LAG) {
      return this.#toSigningHeader(currentHeader);
    }
    return this.#toSigningHeader(finalizedHeader);
  }
  async#toSigningHeader(header) {
    const { number } = header;
    const hash = await this.client.rpc.chain_getBlockHash(header.number);
    return { hash, number };
  }
  #calculateMortalLength() {
    return bnMin(BigInt(this.#getConst("system", "blockHashCount") || FALLBACK_MAX_HASH_COUNT), BigInt(MORTAL_PERIOD) / BigInt(this.#getConst("babe", "expectedBlockTime") || this.#getConst("aura", "slotDuration") || BigInt(this.#getConst("timestamp", "minimumPeriod") || 0) * 2n || FALLBACK_PERIOD) + BigInt(MAX_FINALITY_LAG));
  }
  #getConst(pallet, name) {
    try {
      return this.client.consts[pallet][name];
    } catch {
    }
    return;
  }
  toPayload() {
    return {
      era: u8aToHex(this.$Data.tryEncode(this.data)),
      blockHash: this.additionalSigned,
      blockNumber: numberToHex(this.#signingHeader.number)
    };
  }
}

// node_modules/@dedot/api/extrinsic/extensions/known/CheckNonZeroSender.js
class CheckNonZeroSender extends SignedExtension {
}

// node_modules/@dedot/api/extrinsic/extensions/known/CheckNonce.js
class CheckNonce extends SignedExtension {
  async init() {
    this.data = this.payloadOptions.nonce || await this.#getNonce();
  }
  async#getNonce() {
    const { signerAddress } = this.options || {};
    assert(signerAddress, "Signer address not found");
    try {
      return (await this.client.query.system.account(signerAddress)).nonce;
    } catch {
    }
    try {
      return await this.client.call.accountNonceApi.accountNonce(signerAddress);
    } catch {
    }
    return 0;
  }
  toPayload() {
    return {
      nonce: numberToHex(this.data)
    };
  }
}

// node_modules/@dedot/api/extrinsic/extensions/known/CheckSpecVersion.js
class CheckSpecVersion extends SignedExtension {
  async init() {
    this.additionalSigned = this.client.runtimeVersion.specVersion;
  }
  toPayload() {
    return {
      specVersion: numberToHex(this.additionalSigned)
    };
  }
}

// node_modules/@dedot/api/extrinsic/extensions/known/CheckTxVersion.js
class CheckTxVersion extends SignedExtension {
  async init() {
    this.additionalSigned = this.client.runtimeVersion.transactionVersion;
  }
  toPayload() {
    return {
      transactionVersion: numberToHex(this.additionalSigned)
    };
  }
}

// node_modules/@dedot/api/extrinsic/extensions/known/CheckWeight.js
class CheckWeight extends SignedExtension {
}

// node_modules/@dedot/api/extrinsic/extensions/known/PrevalidateAttests.js
class PrevalidateAttests extends SignedExtension {
}

// node_modules/@dedot/api/extrinsic/extensions/known/StorageWeightReclaim.js
class StorageWeightReclaim extends SignedExtension {
}

// node_modules/@dedot/api/extrinsic/extensions/known/index.js
var knownSignedExtensions = {
  CheckNonZeroSender,
  CheckSpecVersion,
  CheckTxVersion,
  CheckGenesis,
  CheckMortality,
  CheckNonce,
  CheckWeight,
  ChargeTransactionPayment,
  PrevalidateAttests,
  ChargeAssetTxPayment,
  CheckMetadataHash,
  StorageWeightReclaim
};

// node_modules/@dedot/api/extrinsic/extensions/ExtraSignedExtension.js
class ExtraSignedExtension extends SignedExtension {
  #signedExtensions;
  async init() {
    this.#signedExtensions = this.#getSignedExtensions();
    await Promise.all(this.#signedExtensions.map((se) => se.init()));
    this.data = this.#signedExtensions.map((se) => se.data);
    this.additionalSigned = this.#signedExtensions.map((se) => se.additionalSigned);
  }
  get identifier() {
    return "ExtraSignedExtension";
  }
  get $Data() {
    const { extraTypeId } = this.registry.metadata.extrinsic;
    return ensurePresence(this.registry.findCodec(extraTypeId));
  }
  get $AdditionalSigned() {
    const $AdditionalSignedCodecs = this.#signedExtensionDefs.map((se) => this.registry.findCodec(se.additionalSigned));
    return Tuple(...$AdditionalSignedCodecs);
  }
  get $Payload() {
    const { callTypeId } = this.registry.metadata.extrinsic;
    const $Call = this.registry.findCodec(callTypeId);
    return Tuple($Call, this.$Data, this.$AdditionalSigned);
  }
  get #signedExtensionDefs() {
    return this.registry.metadata.extrinsic.signedExtensions;
  }
  #getSignedExtensions() {
    return this.#signedExtensionDefs.map((extDef) => {
      const { signedExtensions: userSignedExtensions = {} } = this.client.options;
      const Extension = userSignedExtensions[extDef.ident] || knownSignedExtensions[extDef.ident];
      assert(Extension, `SignedExtension for ${extDef.ident} not found`);
      return new Extension(this.client, {
        ...ensurePresence(this.options),
        def: extDef
      });
    });
  }
  toPayload(call = "0x") {
    const signedExtensions = this.#signedExtensions.map((se) => se.identifier);
    const { version } = this.registry.metadata.extrinsic;
    return Object.assign({ address: this.options.signerAddress, signedExtensions, version, method: call }, ...this.#signedExtensions.map((se) => se.toPayload()));
  }
  toRawPayload(call = "0x") {
    const payload = this.toPayload(call);
    const $ToSignPayload = Tuple(RawHex, this.$Data, this.$AdditionalSigned);
    const toSignPayload = [call, this.data, this.additionalSigned];
    const rawPayload = $ToSignPayload.tryEncode(toSignPayload);
    return {
      address: payload.address,
      data: u8aToHex(rawPayload),
      type: "payload"
    };
  }
}

// node_modules/@dedot/api/extrinsic/submittable/errors.js
class InvalidTxError extends DedotError {
  data;
  name = "InvalidTxError";
  constructor(message, data) {
    super(message);
    this.data = data;
  }
}

// node_modules/@dedot/api/extrinsic/submittable/SubmittableResult.js
class SubmittableResult {
  status;
  events;
  dispatchInfo;
  dispatchError;
  txHash;
  txIndex;
  constructor({ events, status, txHash, txIndex }) {
    this.events = events || [];
    this.status = status;
    this.txHash = txHash;
    this.txIndex = txIndex;
    [this.dispatchInfo, this.dispatchError] = this._extractDispatchInfo();
  }
  _extractDispatchInfo() {
    for (const { event } of this.events) {
      const { pallet, palletEvent } = event;
      if (pallet === "System" && palletEvent.name === "ExtrinsicFailed") {
        const { dispatchInfo, dispatchError } = palletEvent.data;
        return [dispatchInfo, dispatchError];
      } else if (pallet === "System" && palletEvent.name === "ExtrinsicSuccess") {
        const { dispatchInfo } = palletEvent.data;
        return [dispatchInfo, undefined];
      }
    }
    return [undefined, undefined];
  }
}

// node_modules/@dedot/api/extrinsic/submittable/fakeSigner.js
var FAKE_SIGNATURE = new Uint8Array(64 * 8).fill(0);
var fakeSigner = {
  signPayload: async () => {
    return {
      id: Date.now(),
      signature: u8aToHex(FAKE_SIGNATURE)
    };
  }
};

// node_modules/@dedot/api/extrinsic/submittable/utils.js
function isKeyringPair(account) {
  return isFunction(account.sign);
}
function signRaw(signerPair, raw2) {
  const u8a = hexToU8a(raw2);
  const toSignRaw = u8a.length > 256 ? blake2AsU8a(u8a, 256) : u8a;
  return signerPair.sign(toSignRaw, { withType: true });
}
function toTxStatus(txStatus, txInfo) {
  switch (txStatus.type) {
    case "Ready":
    case "Future":
      return { type: "Validated" };
    case "Broadcast":
      return { type: "Broadcasting" };
    case "Retracted":
      return { type: "NoLongerInBestChain" };
    case "InBlock":
      assert(txInfo, "TxInfo is required");
      return {
        type: "BestChainBlockIncluded",
        value: {
          blockHash: txStatus.value,
          ...txInfo
        }
      };
    case "Finalized":
      assert(txInfo, "TxInfo is required");
      return {
        type: "Finalized",
        value: {
          blockHash: txStatus.value,
          ...txInfo
        }
      };
    case "FinalityTimeout":
      return {
        type: "Drop",
        value: {
          error: "Maximum number of finality watchers has been reached"
        }
      };
    case "Dropped":
      return {
        type: "Drop",
        value: {
          error: "Extrinsic dropped from the pool due to exceeding limits"
        }
      };
    case "Usurped":
      return {
        type: "Invalid",
        value: {
          error: "Extrinsic was rendered invalid by another extrinsic"
        }
      };
    case "Invalid":
      return {
        type: "Invalid",
        value: {
          error: "Extrinsic marked as invalid"
        }
      };
  }
}

// node_modules/@dedot/api/extrinsic/submittable/BaseSubmittableExtrinsic.js
class BaseSubmittableExtrinsic extends Extrinsic {
  client;
  #alterTx;
  constructor(client, call) {
    super(client.registry, call);
    this.client = client;
  }
  async paymentInfo(account, options) {
    await this.sign(account, { ...options, signer: fakeSigner });
    const txU8a = this.toU8a();
    const api = this.client;
    return api.call.transactionPaymentApi.queryInfo(txU8a, txU8a.length);
  }
  async sign(fromAccount, options) {
    const address = isKeyringPair(fromAccount) ? fromAccount.address : fromAccount.toString();
    const extra = new ExtraSignedExtension(this.client, {
      signerAddress: address,
      payloadOptions: options
    });
    await extra.init();
    const signer = this.#getSigner(options);
    let signature, alteredTx;
    if (isKeyringPair(fromAccount)) {
      signature = u8aToHex(signRaw(fromAccount, extra.toRawPayload(this.callHex).data));
    } else if (signer?.signPayload) {
      const result3 = await signer.signPayload(extra.toPayload(this.callHex));
      signature = result3.signature;
      alteredTx = result3.signedTransaction;
    } else {
      throw new Error("Signer not found. Cannot sign the extrinsic!");
    }
    const { signatureTypeId } = this.registry.metadata.extrinsic;
    const $Signature = this.registry.findCodec(signatureTypeId);
    this.attachSignature({
      address,
      signature: $Signature.tryDecode(signature),
      extra: extra.data
    });
    if (alteredTx) {
      this.#validateSignedTx(alteredTx);
      this.#alterTx = toHex(alteredTx);
    }
    return this;
  }
  async signAndSend(fromAccount, partialOptions, maybeCallback) {
    const [options, callback] = this.#normalizeOptions(partialOptions, maybeCallback);
    await this.sign(fromAccount, options);
    return this.send(callback);
  }
  #normalizeOptions(partialOptions, callback) {
    if (isFunction(partialOptions)) {
      return [{}, partialOptions];
    } else {
      return [Object.assign({}, partialOptions), callback];
    }
  }
  send(callback) {
    throw new Error("Unimplemented!");
  }
  async getSystemEventsAt(hash) {
    const atApi = await this.client.at(hash);
    return await atApi.query.system.events();
  }
  toHex() {
    return this.#alterTx || super.toHex();
  }
  #validateSignedTx(tx) {
    const alteredTx = this.$Codec.tryDecode(tx);
    if (!alteredTx.signed) {
      throw new DedotError("Altered transaction from signer is not signed");
    }
    if (alteredTx.callHex !== this.callHex) {
      throw new DedotError("Call data does not match, signer is not allowed to change tx call data.");
    }
  }
  #getSigner(options) {
    return options?.signer || this.client.options.signer;
  }
}

// node_modules/@dedot/api/extrinsic/submittable/SubmittableExtrinsic.js
class SubmittableExtrinsic extends BaseSubmittableExtrinsic {
  async dryRun(account, optionsOrHash) {
    const dryRunFn = this.client.rpc.system_dryRun;
    if (isHex(optionsOrHash)) {
      return dryRunFn(this.toHex(), optionsOrHash);
    }
    await this.sign(account, optionsOrHash);
    return dryRunFn(this.toHex());
  }
  async send(callback) {
    const isSubscription = !!callback;
    const txHex = this.toHex();
    const txHash = this.hash;
    if (isSubscription) {
      return this.client.rpc.author_submitAndWatchExtrinsic(txHex, async (txStatus) => {
        if (txStatus.type === "InBlock" || txStatus.type === "Finalized") {
          const blockHash = txStatus.value;
          const [signedBlock, blockEvents] = await Promise.all([
            this.client.rpc.chain_getBlock(blockHash),
            this.getSystemEventsAt(blockHash)
          ]);
          const txIndex = signedBlock.block.extrinsics.indexOf(txHex);
          assert(txIndex >= 0, "Extrinsic not found!");
          const events = blockEvents.filter(({ phase }) => phase.type === "ApplyExtrinsic" && phase.value === txIndex);
          const blockNumber = signedBlock.block.header.number;
          const status = toTxStatus(txStatus, { txIndex, blockNumber });
          return callback(new SubmittableResult({ status, txHash, events, txIndex }));
        } else {
          const status = toTxStatus(txStatus);
          return callback(new SubmittableResult({ status, txHash }));
        }
      });
    } else {
      return this.client.rpc.author_submitExtrinsic(txHex);
    }
  }
}

// node_modules/@dedot/api/extrinsic/submittable/SubmittableExtrinsicV2.js
class SubmittableExtrinsicV2 extends BaseSubmittableExtrinsic {
  client;
  constructor(client, call) {
    super(client, call);
    this.client = client;
  }
  async#send(callback) {
    const api = this.client;
    const txHex = this.toHex();
    const txHash = this.hash;
    const finalizedHash = await this.client.chainHead.finalizedHash();
    const validateTx = async (hash) => {
      const apiAt = await api.at(hash);
      return apiAt.call.taggedTransactionQueue.validateTransaction("External", txHex, hash);
    };
    const validation = await validateTx(finalizedHash);
    if (validation.isOk) {
      callback(new SubmittableResult({ status: { type: "Validated" }, txHash }));
    } else if (validation.isErr) {
      throw new InvalidTxError(`Invalid Tx: ${validation.err.type} - ${validation.err.value.type}`, validation);
    }
    const checkTxIsOnChain = async (blockHash) => {
      if (blockHash === finalizedHash)
        return;
      const block = api.chainHead.findBlock(blockHash);
      const txs = await api.chainHead.body(blockHash);
      const txIndex = txs.indexOf(txHex);
      if (txIndex < 0) {
        return checkTxIsOnChain(block.parent);
      }
      const events = await this.getSystemEventsAt(blockHash);
      const txEvents = events.filter(({ phase }) => phase.type == "ApplyExtrinsic" && phase.value === txIndex);
      return {
        blockHash,
        blockNumber: block.number,
        index: txIndex,
        events: txEvents
      };
    };
    let txFound;
    let isSearching = false;
    let searchQueue = new AsyncQueue;
    const cancelPendingSearch = () => {
      searchQueue.clear();
    };
    const cancelBodySearch = () => {
      searchQueue.cancel();
    };
    const startSearching = (block) => {
      return searchQueue.enqueue(async () => {
        const found = await checkTxIsOnChain(block.hash);
        if (found) {
          cancelPendingSearch();
        }
        return found;
      });
    };
    const checkBestBlockIncluded = async (block, bestChainChanged) => {
      if (bestChainChanged) {
        if (isSearching) {
          cancelBodySearch();
        }
      } else {
        if (txFound)
          return;
      }
      try {
        isSearching = true;
        const inBlock = await startSearching(block);
        if (!inBlock) {
          if (txFound && bestChainChanged) {
            txFound = undefined;
            callback(new SubmittableResult({
              status: { type: "NoLongerInBestChain" },
              txHash
            }));
          }
          return;
        }
        if (txFound && bestChainChanged) {
          if (txFound.blockHash === inBlock.blockHash)
            return;
        }
        txFound = inBlock;
        const { index: txIndex, events, blockHash, blockNumber } = inBlock;
        callback(new SubmittableResult({
          status: { type: "BestChainBlockIncluded", value: { blockHash, blockNumber, txIndex } },
          txHash,
          events,
          txIndex
        }));
      } catch {
      } finally {
        if (searchQueue.size === 0 && !searchQueue.isWorking) {
          isSearching = false;
        }
      }
    };
    let txUnsub;
    let stopBroadcastFn;
    let stopped = false;
    const stopBroadcast = () => {
      if (stopped)
        return;
      if (stopBroadcastFn) {
        stopped = true;
        stopBroadcastFn().catch(noop);
      }
    };
    const checkFinalizedBlockIncluded = async (block) => {
      const inBlock = await checkTxIsOnChain(block.hash);
      if (inBlock) {
        const { index: txIndex, events, blockHash, blockNumber } = inBlock;
        callback(new SubmittableResult({
          status: { type: "Finalized", value: { blockHash, blockNumber, txIndex } },
          txHash,
          events,
          txIndex
        }));
      } else {
        const validation2 = await validateTx(block.hash);
        if (validation2.isOk)
          return;
        callback(new SubmittableResult({
          status: {
            type: "Invalid",
            value: { error: `Invalid Tx: ${validation2.err.type} - ${validation2.err.value.type}` }
          },
          txHash
        }));
      }
      txUnsub().catch(noop);
    };
    stopBroadcastFn = await api.txBroadcaster.broadcastTx(txHex);
    callback(new SubmittableResult({
      status: { type: "Broadcasting" },
      txHash
    }));
    const stopBestBlockTrackingFn = api.chainHead.on("bestBlock", checkBestBlockIncluded);
    const stopFinalizedBlockTrackingFn = api.chainHead.on("finalizedBlock", checkFinalizedBlockIncluded);
    const stopTracking = () => {
      stopBestBlockTrackingFn();
      stopFinalizedBlockTrackingFn();
      cancelBodySearch();
    };
    txUnsub = async () => {
      stopTracking();
      stopBroadcast();
    };
    return txUnsub;
  }
  async send(callback) {
    const isSubscription = !!callback;
    if (isSubscription) {
      return this.#send(callback);
    } else {
      const defer = deferred();
      try {
        const unsub = await this.#send(({ status, txHash }) => {
          if (status.type === "BestChainBlockIncluded" || status.type === "Finalized") {
            defer.resolve(txHash);
            unsub().catch(noop);
          } else if (status.type === "Invalid" || status.type === "Drop") {
            defer.reject(new Error(status.value.error));
            unsub().catch(noop);
          }
        });
      } catch (e) {
        defer.reject(e);
      }
      return defer.promise;
    }
  }
}

// node_modules/@dedot/api/executor/utils.js
var isPalletEvent = (event) => {
  return "pallet" in event && typeof event["pallet"] === "string" && "palletEvent" in event && (typeof event["palletEvent"] === "object" || typeof event["palletEvent"] === "string");
};
var isEventRecord = (event) => {
  return "phase" in event && typeof event["phase"] === "object" && "event" in event && isPalletEvent(event["event"]) && "topics" in event && Array.isArray(event["topics"]);
};

// node_modules/@dedot/api/executor/Executor.js
class Executor {
  client;
  #atBlockHash;
  constructor(client, atBlockHash) {
    this.client = client;
    this.#atBlockHash = atBlockHash;
  }
  get atBlockHash() {
    return this.#atBlockHash || this.client.atBlockHash;
  }
  get registry() {
    return this.client.registry;
  }
  get metadata() {
    return this.registry.metadata;
  }
  getPallet(name) {
    const targetPallet = this.metadata.pallets.find((p) => stringCamelCase(p.name) === name);
    assert(targetPallet, new UnknownApiError(`Pallet not found: ${name}`));
    return targetPallet;
  }
  execute(...paths) {
    try {
      return this.doExecute(...paths);
    } catch (e) {
      if (!this.client.options?.throwOnUnknownApi && e instanceof UnknownApiError) {
        return;
      }
      throw e;
    }
  }
}

// node_modules/@dedot/api/executor/ConstantExecutor.js
class ConstantExecutor extends Executor {
  doExecute(pallet, constantName) {
    const targetPallet = this.getPallet(pallet);
    const constantDef = targetPallet.constants.find((one) => stringCamelCase(one.name) === constantName);
    assert(constantDef, new UnknownApiError(`Constant ${constantName} not found in pallet ${pallet}`));
    const $codec = this.registry.findCodec(constantDef.typeId);
    return $codec.tryDecode(constantDef.value);
  }
}

// node_modules/@dedot/api/executor/StorageQueryExecutor.js
var DEFAULT_KEYS_PAGE_SIZE = 1000;
var DEFAULT_ENTRIES_PAGE_SIZE = 250;

class StorageQueryExecutor extends Executor {
  doExecute(pallet, storage) {
    const entry = new QueryableStorage(this.registry, pallet, storage);
    const extractArgs = (args) => {
      const inArgs = args.slice();
      const lastArg = args.at(-1);
      const callback = isFunction(lastArg) ? inArgs.pop() : undefined;
      return [inArgs, callback];
    };
    const getStorageKey = (...args) => {
      const [inArgs] = extractArgs(args);
      return entry.encodeKey(inArgs.at(0));
    };
    const getStorage = async (keys) => {
      const results = await this.queryStorage(keys, this.atBlockHash);
      return keys.reduce((o, key) => {
        o[key] = entry.decodeValue(results[key]);
        return o;
      }, {});
    };
    const queryFn = async (...args) => {
      const [inArgs, callback] = extractArgs(args);
      const encodedKey = entry.encodeKey(inArgs.at(0));
      if (callback) {
        return await this.subscribeStorage([encodedKey], (changes) => {
          if (changes.length === 0)
            return;
          callback(entry.decodeValue(changes[0]));
        });
      } else {
        const results = await getStorage([encodedKey]);
        return results[encodedKey];
      }
    };
    queryFn.rawKey = getStorageKey;
    queryFn.meta = {
      pallet: entry.pallet.name,
      palletIndex: entry.pallet.index,
      ...entry.storageEntry
    };
    const isMap = entry.storageEntry.storageType.type === "Map";
    if (isMap) {
      const queryMultiFn = async (...args) => {
        const [inArgs, callback] = extractArgs(args);
        const multiArgs = inArgs.at(0);
        assert(Array.isArray(multiArgs), "First param for multi query should be an array");
        const encodedKeys = multiArgs.map((arg) => entry.encodeKey(arg));
        if (callback) {
          return await this.subscribeStorage(encodedKeys, (changes) => {
            callback(changes.map((change) => entry.decodeValue(change)));
          });
        } else {
          const result3 = await getStorage(encodedKeys);
          return encodedKeys.map((key) => result3[key]);
        }
      };
      queryFn.multi = queryMultiFn;
      Object.assign(queryFn, this.exposeStorageMapMethods(entry));
    }
    return queryFn;
  }
  exposeStorageMapMethods(entry) {
    const rawKeys = async (pagination) => {
      const pageSize = pagination?.pageSize || DEFAULT_KEYS_PAGE_SIZE;
      const startKey = pagination?.startKey || entry.prefixKey;
      return await this.client.rpc.state_getKeysPaged(entry.prefixKey, pageSize, startKey, this.atBlockHash);
    };
    const pagedKeys = async (pagination) => {
      const storageKeys = await rawKeys({ pageSize: DEFAULT_KEYS_PAGE_SIZE, ...pagination });
      return storageKeys.map((key) => entry.decodeKey(key));
    };
    const pagedEntries = async (pagination) => {
      const storageKeys = await rawKeys({ pageSize: DEFAULT_ENTRIES_PAGE_SIZE, ...pagination });
      const storageMap = await this.queryStorage(storageKeys, this.atBlockHash);
      return storageKeys.map((key) => [entry.decodeKey(key), entry.decodeValue(storageMap[key])]);
    };
    return { pagedKeys, pagedEntries };
  }
  async queryStorage(keys, hash) {
    const changeSets = await this.client.rpc.state_queryStorageAt(keys, hash);
    return changeSets[0].changes.reduce((o, [key, value]) => {
      o[key] = value ?? undefined;
      return o;
    }, {});
  }
  subscribeStorage(keys, callback) {
    const lastChanges = {};
    return this.client.rpc.state_subscribeStorage(keys, (changeSet) => {
      changeSet.changes.forEach(([key, value]) => {
        if (lastChanges[key] !== value) {
          lastChanges[key] = value ?? undefined;
        }
      });
      return callback(keys.map((key) => lastChanges[key]));
    });
  }
}

// node_modules/@dedot/api/executor/ErrorExecutor.js
class ErrorExecutor extends Executor {
  doExecute(pallet, errorName) {
    const targetPallet = this.getPallet(pallet);
    const errorTypeId = targetPallet.error;
    assert(errorTypeId, new UnknownApiError(`Not found error with id ${errorTypeId} in pallet ${pallet}`));
    const errorDef = this.#getErrorDef(errorTypeId, errorName);
    return {
      meta: {
        ...errorDef,
        pallet: targetPallet.name,
        palletIndex: targetPallet.index
      },
      is: (errorInfo) => {
        if (isObject(errorInfo) && errorInfo.type === "Module") {
          errorInfo = errorInfo.value;
        }
        if (isObject(errorInfo) && isNumber(errorInfo.index) && isHex(errorInfo.error)) {
          return errorInfo.index === targetPallet.index && hexToU8a(errorInfo.error)[0] === errorDef.index;
        }
        return false;
      }
    };
  }
  #getErrorDef(errorTypeId, errorName) {
    const def = this.metadata.types[errorTypeId];
    assert(def, new UnknownApiError(`Error def not found for id ${errorTypeId}`));
    const { type, value } = def.typeDef;
    assert(type === "Enum", new UnknownApiError(`Error type should be an enum, found: ${type}`));
    const errorDef = value.members.find(({ name }) => stringPascalCase(name) === errorName);
    assert(errorDef, new UnknownApiError(`Error def not found for ${errorName}`));
    return {
      ...errorDef,
      fieldCodecs: errorDef.fields.map(({ typeId }) => this.registry.findCodec(typeId))
    };
  }
}

// node_modules/@dedot/api/executor/EventExecutor.js
class EventExecutor extends Executor {
  doExecute(pallet, eventName) {
    const targetPallet = this.getPallet(pallet);
    const eventTypeId = targetPallet.event;
    assert(eventTypeId, new UnknownApiError(`Not found event with id ${eventTypeId} in pallet ${pallet}`));
    const eventDef = this.#getEventDef(eventTypeId, eventName);
    const is2 = (event) => {
      if (isEventRecord(event)) {
        event = event.event;
      }
      const palletCheck = stringCamelCase(event.pallet) === pallet;
      if (typeof event.palletEvent === "string") {
        return palletCheck && stringPascalCase(event.palletEvent) === eventName;
      } else if (typeof event.palletEvent === "object") {
        return palletCheck && stringPascalCase(event.palletEvent.name) === eventName;
      }
      return false;
    };
    const find = (events) => {
      if (!events || events.length === 0)
        return;
      if (isEventRecord(events[0])) {
        return events.map(({ event }) => event).find(is2);
      } else {
        return events.find(is2);
      }
    };
    const filter = (events) => {
      if (isEventRecord(events[0])) {
        return events.map(({ event }) => event).filter(is2);
      } else {
        return events.filter(is2);
      }
    };
    const watch = (callback) => {
      return this.client.query.system.events((records) => {
        const events = filter(records);
        if (events.length === 0)
          return;
        callback(filter(records));
      });
    };
    const meta = {
      ...eventDef,
      pallet: targetPallet.name,
      palletIndex: targetPallet.index
    };
    return {
      is: is2,
      find,
      filter,
      meta,
      watch
    };
  }
  #getEventDef(eventTypeId, errorName) {
    const def = this.metadata.types[eventTypeId];
    assert(def, new UnknownApiError(`Event def not found for id ${eventTypeId}`));
    const { type, value } = def.typeDef;
    assert(type === "Enum", new UnknownApiError(`Event type should be an enum, found: ${type}`));
    const eventDef = value.members.find(({ name }) => stringPascalCase(name) === errorName);
    assert(eventDef, new UnknownApiError(`Event def not found for ${errorName}`));
    return {
      ...eventDef,
      fieldCodecs: eventDef.fields.map(({ typeId }) => this.registry.findCodec(typeId))
    };
  }
}

// node_modules/@dedot/runtime-specs/metadata.js
var V1_V2_SHARED = {
  metadata: {
    docs: "Returns the metadata of a runtime.",
    params: [],
    type: "OpaqueMetadata",
    codec: $OpaqueMetadata
  }
};
var Metadata2 = [
  {
    methods: {
      metadataAtVersion: {
        docs: "Returns the metadata at a given version.",
        params: [
          {
            name: "version",
            type: "u32",
            codec: u322
          }
        ],
        type: "Option<OpaqueMetadata>",
        codec: Option($OpaqueMetadata)
      },
      metadataVersions: {
        docs: "Returns the supported metadata versions.",
        params: [],
        type: "Array<u32>",
        codec: Array2(u322)
      },
      ...V1_V2_SHARED
    },
    version: 2
  },
  {
    methods: {
      ...V1_V2_SHARED
    },
    version: 1
  }
];

// node_modules/@dedot/runtime-specs/all.js
var toRuntimeApiMethods = (runtimeApiSpec) => {
  const { runtimeApiName, version, methods } = runtimeApiSpec;
  return Object.keys(methods).map((methodName) => ({
    ...methods[methodName],
    methodName,
    runtimeApiName,
    version
  }));
};
var toRuntimeApiSpecs = (specs) => {
  return Object.keys(specs).map((runtimeApiName) => specs[runtimeApiName].map((spec) => ({ ...spec, runtimeApiName }))).flat();
};

// node_modules/@dedot/api/executor/RuntimeApiExecutor.js
var FallbackRuntimeApis = { "0x37e397fc7c91f5e4": 2 };
var FallbackRuntimeApiSpecs = { Metadata: Metadata2 };

class RuntimeApiExecutor extends Executor {
  doExecute(runtimeApi, method) {
    const runtimeApiName = stringPascalCase(runtimeApi);
    const methodName = stringSnakeCase(method);
    const callName = this.#callName({ runtimeApiName, methodName });
    const callSpec = this.#findRuntimeApiMethodSpec(runtimeApiName, methodName);
    assert(callSpec, new UnknownApiError(`Runtime api spec not found for ${callName}`));
    const callFn = async (...args) => {
      const { params } = callSpec;
      const formattedInputs = params.map((param, index) => this.tryEncode(param, args[index]));
      const bytes = u8aToHex(concatU8a(...formattedInputs));
      const callParams = {
        func: callName,
        params: bytes,
        at: this.atBlockHash
      };
      const result3 = await this.stateCall(callParams);
      return this.tryDecode(callSpec, result3);
    };
    callFn.meta = callSpec;
    return callFn;
  }
  stateCall(callParams) {
    const { func, params, at } = callParams;
    const args = [func, params];
    if (at)
      args.push(at);
    return this.client.rpc.state_call(...args);
  }
  tryDecode(callSpec, raw2) {
    const $codec = this.#findCodec(callSpec, `Codec not found to decode respond data for ${this.#callName(callSpec)}`);
    return $codec.tryDecode(raw2);
  }
  tryEncode(paramSpec, value) {
    const $codec = this.#findCodec(paramSpec, `Codec not found to encode input for param ${paramSpec.name}`);
    return $codec.tryEncode(value);
  }
  #findCodec(spec, error) {
    const { codec, typeId, type } = spec;
    if (codec)
      return codec;
    if (isNumber(typeId)) {
      return this.registry.findCodec(typeId);
    }
    throw new Error(error || "Codec not found");
  }
  #callName({ runtimeApiName, methodName }) {
    return `${runtimeApiName}_${methodName}`;
  }
  #findRuntimeApiMethodSpec(runtimeApi, method) {
    const targetVersion = this.#findTargetRuntimeApiVersion(runtimeApi);
    if (!isNumber(targetVersion))
      return;
    const userDefinedSpec = this.#findDefinedSpec(this.client.options.runtimeApis, runtimeApi, method, targetVersion);
    if (userDefinedSpec)
      return userDefinedSpec;
    const methodDef = this.#findRuntimeApiMethodDef(runtimeApi, method);
    if (methodDef) {
      return this.#toMethodSpec(runtimeApi, methodDef);
    }
    return this.#findDefinedSpec(FallbackRuntimeApiSpecs, runtimeApi, method, targetVersion);
  }
  #findRuntimeApiMethodDef(runtimeApi, method) {
    try {
      for (const api of this.metadata.apis) {
        if (api.name !== runtimeApi)
          continue;
        for (const apiMethod of api.methods) {
          if (apiMethod.name === method)
            return apiMethod;
        }
      }
    } catch {
    }
  }
  #toMethodSpec(runtimeApi, methodDef) {
    const { name, inputs, output, docs } = methodDef;
    return {
      docs,
      runtimeApiName: runtimeApi,
      methodName: name,
      typeId: output,
      params: inputs.map(({ name: name2, typeId }) => ({
        name: name2,
        typeId
      }))
    };
  }
  #findTargetRuntimeApiVersion(runtimeApi) {
    const runtimeApiHash = calcRuntimeApiHash(runtimeApi);
    try {
      return this.client.runtimeVersion.apis[runtimeApiHash] || FallbackRuntimeApis[runtimeApiHash];
    } catch {
      return FallbackRuntimeApis[runtimeApiHash];
    }
  }
  #findDefinedSpec(specs, runtimeApi, method, runtimeApiVersion) {
    if (!specs)
      return;
    const methodSpecs = toRuntimeApiSpecs(specs).map(toRuntimeApiMethods).flat();
    return methodSpecs.find(({ runtimeApiName, methodName, version }) => `${stringPascalCase(runtimeApiName)}_${stringSnakeCase(methodName)}` === `${runtimeApi}_${method}` && runtimeApiVersion === version);
  }
}

// node_modules/@dedot/api/executor/TxExecutor.js
class TxExecutor extends Executor {
  doExecute(pallet, functionName) {
    const targetPallet = this.getPallet(pallet);
    assert(targetPallet.calls, new UnknownApiError(`Tx calls are not available for pallet ${targetPallet.name}`));
    const txType = this.metadata.types[targetPallet.calls];
    assert(txType.typeDef.type === "Enum", new UnknownApiError("Tx type defs should be enum"));
    const isFlatEnum = txType.typeDef.value.members.every((m) => m.fields.length === 0);
    const txCallDef = txType.typeDef.value.members.find((m) => stringCamelCase(m.name) === functionName);
    assert(txCallDef, new UnknownApiError(`Tx call spec not found for ${pallet}.${functionName}`));
    const txCallFn = (...args) => {
      let call;
      if (isFlatEnum) {
        call = {
          pallet: stringPascalCase(targetPallet.name),
          palletCall: stringPascalCase(txCallDef.name)
        };
      } else {
        const callParams = txCallDef.fields.reduce((o, { name }, idx) => {
          o[stringCamelCase(name)] = args[idx];
          return o;
        }, {});
        call = {
          pallet: stringPascalCase(targetPallet.name),
          palletCall: {
            name: stringPascalCase(txCallDef.name),
            params: callParams
          }
        };
      }
      return this.createExtrinsic(call);
    };
    txCallFn.meta = {
      ...txCallDef,
      fieldCodecs: txCallDef.fields.map(({ typeId }) => this.registry.findCodec(typeId)),
      pallet: targetPallet.name,
      palletIndex: targetPallet.index
    };
    return txCallFn;
  }
  createExtrinsic(call) {
    return new SubmittableExtrinsic(this.client, call);
  }
}

// node_modules/@dedot/api/executor/v2/StorageQueryExecutorV2.js
class StorageQueryExecutorV2 extends StorageQueryExecutor {
  chainHead;
  constructor(client, chainHead, atBlockHash) {
    assert(client.rpcVersion === "v2", "Only supports JSON-RPC v2");
    super(client, atBlockHash);
    this.chainHead = chainHead;
  }
  exposeStorageMapMethods(entry) {
    const entries = async () => {
      const results = await this.chainHead.storage([{ type: "descendantsValues", key: entry.prefixKey }]);
      return results.map(({ key, value }) => [
        entry.decodeKey(key),
        entry.decodeValue(value)
      ]);
    };
    return { entries };
  }
  async queryStorage(keys, at) {
    const results = await this.chainHead.storage(keys.map((key) => ({ type: "value", key })), undefined, at);
    return results.reduce((o, r) => {
      o[r.key] = r.value ?? undefined;
      return o;
    }, {});
  }
  async subscribeStorage(keys, callback) {
    let best = await this.chainHead.bestBlock();
    let eventToListen = "bestBlock";
    const latestChanges = new Map;
    const pull = async ({ hash }) => {
      const results = await this.queryStorage(keys, hash);
      let changed = false;
      keys.forEach((key) => {
        const newValue = results[key];
        if (latestChanges.size > 0 && latestChanges.get(key) === newValue)
          return;
        changed = true;
        latestChanges.set(key, newValue);
      });
      if (!changed)
        return;
      callback(keys.map((key) => latestChanges.get(key)));
    };
    await pull(best);
    const unsub = this.chainHead.on(eventToListen, pull);
    return async () => {
      unsub();
    };
  }
}

// node_modules/@dedot/api/executor/v2/RuntimeApiExecutorV2.js
class RuntimeApiExecutorV2 extends RuntimeApiExecutor {
  chainHead;
  constructor(client, chainHead, atBlockHash) {
    assert(client.rpcVersion === "v2", "Only supports JSON-RPC v2");
    super(client, atBlockHash);
    this.chainHead = chainHead;
  }
  stateCall(callParams) {
    const { func, params, at } = callParams;
    return this.chainHead.call(func, params, at);
  }
}

// node_modules/@dedot/api/executor/v2/TxExecutorV2.js
class TxExecutorV2 extends TxExecutor {
  constructor(api) {
    assert(api.rpcVersion === "v2", "Only supports JSON-RPC v2");
    super(api);
  }
  createExtrinsic(call) {
    return new SubmittableExtrinsicV2(this.client, call);
  }
}

// node_modules/@dedot/api/json-rpc/subscriptionsInfo.js
var subscriptionsInfo = {
  author_submitAndWatchExtrinsic: ["author_extrinsicUpdate", "author_unwatchExtrinsic"],
  state_subscribeRuntimeVersion: ["state_runtimeVersion", "state_unsubscribeRuntimeVersion"],
  state_subscribeStorage: ["state_storage", "state_unsubscribeStorage"],
  chain_subscribeAllHeads: ["chain_allHead", "chain_unsubscribeAllHeads"],
  chain_subscribeNewHeads: ["chain_newHead", "chain_unsubscribeNewHeads"],
  chain_subscribeFinalizedHeads: ["chain_finalizedHead", "chain_unsubscribeFinalizedHeads"],
  grandpa_subscribeJustifications: ["grandpa_justifications", "grandpa_unsubscribeJustifications"],
  beefy_subscribeJustifications: ["beefy_justifications", "beefy_unsubscribeJustifications"],
  chainHead_unstable_follow: ["chainHead_unstable_followEvent", "chainHead_unstable_unfollow"],
  chainHead_v1_follow: ["chainHead_v1_followEvent", "chainHead_v1_unfollow"],
  transactionWatch_unstable_submitAndWatch: [
    "transactionWatch_unstable_watchEvent",
    "transactionWatch_unstable_unwatch"
  ],
  transactionWatch_v1_submitAndWatch: ["transactionWatch_v1_watchEvent", "transactionWatch_v1_unwatch"]
};

// node_modules/@dedot/api/json-rpc/scaledResponses.js
var scaledResponses = {
  system_dryRun: $ApplyExtrinsicResult,
  state_getMetadata: $Metadata,
  chain_getHeader: $Header,
  chain_getBlock: $SignedBlock,
  chain_subscribeAllHeads: $Header,
  chain_subscribeNewHeads: $Header,
  chain_subscribeFinalizedHeads: $Header,
  author_submitAndWatchExtrinsic: $TransactionStatus,
  beefy_subscribeJustifications: $VersionedFinalityProof
};

// node_modules/@dedot/api/json-rpc/JsonRpcClient.js
var isJsonRpcProvider = (provider) => {
  return provider && isString(provider.status) && isFunction(provider.send) && isFunction(provider.subscribe) && isFunction(provider.connect) && isFunction(provider.disconnect);
};

class JsonRpcClient extends EventEmitter2 {
  #options;
  #provider;
  constructor(options) {
    super();
    if (isJsonRpcProvider(options)) {
      this.#options = { provider: options };
      this.#provider = options;
    } else {
      this.#options = options;
      this.#provider = options.provider;
    }
    assert(this.#provider, "A JsonRpcProvider is required");
  }
  static async create(options) {
    return new JsonRpcClient(options).connect();
  }
  static async new(options) {
    return JsonRpcClient.create(options);
  }
  get options() {
    return this.#options;
  }
  get status() {
    return this.provider.status;
  }
  get provider() {
    return this.#provider;
  }
  connect() {
    return this.#doConnect();
  }
  async#doConnect() {
    this.provider.on("connected", this.#onConnected);
    this.provider.on("disconnected", this.#onDisconnected);
    this.provider.on("reconnecting", this.#onReconnecting);
    this.provider.on("error", this.#onError);
    return new Promise((resolve, reject) => {
      this.once("connected", () => {
        resolve(this);
      });
      if (this.status === "connected") {
        this.#onConnected().catch(reject);
      } else {
        this.provider.connect().catch(reject);
      }
    });
  }
  #onConnected = async () => {
    this.emit("connected");
  };
  #onDisconnected = async () => {
    this.emit("disconnected");
  };
  #onReconnecting = async () => {
    this.emit("reconnecting");
  };
  #onError = async (e) => {
    this.emit("error", e);
  };
  async disconnect() {
    await this.#provider.disconnect();
    this.clearEvents();
  }
  get rpc() {
    return new Proxy(this, {
      get(target, property, receiver) {
        const rpcMethod = property.toString();
        return target.#doExecute(rpcMethod);
      }
    });
  }
  #doExecute(rpcName) {
    const subscriptionInfo = this.options.subscriptions?.[rpcName] || subscriptionsInfo[rpcName];
    const isSubscription = !!subscriptionInfo;
    const fnRpc = async (...args) => {
      const result3 = await this.provider.send(rpcName, args);
      return this.#tryDecode(rpcName, result3);
    };
    const fnSubRpc = async (...args) => {
      const inArgs = args.slice();
      const callback = inArgs.pop();
      assert(isFunction(callback), "A callback is required for subscription");
      const onNewMessage = (error, result3, subscription2) => {
        if (error) {
          console.error(error);
          return;
        }
        callback(this.#tryDecode(rpcName, result3), subscription2);
      };
      const [subname, unsubscribe] = subscriptionInfo;
      const subscription = await this.provider.subscribe({ subname, subscribe: rpcName, params: inArgs, unsubscribe }, onNewMessage);
      return async () => {
        await subscription.unsubscribe();
      };
    };
    return isSubscription ? fnSubRpc : fnRpc;
  }
  #tryDecode(rpcName, raw2) {
    if (raw2 === null) {
      return;
    }
    const $maybeCodec = this.options.scaledResponses?.[rpcName] || scaledResponses[rpcName];
    if ($maybeCodec) {
      return $maybeCodec.tryDecode(raw2);
    }
    return raw2;
  }
}

// node_modules/@dedot/api/json-rpc/group/JsonRpcGroup.js
class JsonRpcGroup extends EventEmitter2 {
  client;
  options;
  #detectedVersion;
  constructor(client, options) {
    super();
    this.client = client;
    this.options = options;
  }
  async supported() {
    try {
      const detectedVersion = await this.#detectVersion();
      const { supportedVersions } = this.options;
      if (!supportedVersions || supportedVersions.length === 0)
        return true;
      return supportedVersions.includes(detectedVersion);
    } catch {
    }
    return false;
  }
  async send(method, ...params) {
    const rpcMethod = `${this.prefix}_${await this.version()}_${method}`;
    return this.client.rpc[rpcMethod](...params);
  }
  get prefix() {
    return this.options.prefix;
  }
  async version() {
    const { fixedVersion, supportedVersions } = this.options;
    if (fixedVersion)
      return fixedVersion;
    const detectedVersion = await this.#detectVersion();
    if (supportedVersions && supportedVersions.length > 0 && !supportedVersions.includes(detectedVersion)) {
      throw new Error(`Detected version ${detectedVersion} is not supported`);
    }
    return detectedVersion;
  }
  async#detectVersion() {
    if (!this.#detectedVersion) {
      this.#detectedVersion = await this.#doDetectVersion();
    }
    return this.#detectedVersion;
  }
  async#doDetectVersion() {
    const rpcMethods = this.options.rpcMethods || (await this.client.rpc.rpc_methods()).methods;
    const prefixedMethods = rpcMethods.filter((method) => method.startsWith(`${this.prefix}_`));
    if (prefixedMethods.length === 0) {
      throw new Error(`No methods found with prefix ${this.prefix}`);
    }
    return prefixedMethods[0].split("_")[1];
  }
}

// node_modules/@dedot/api/json-rpc/group/ChainSpec.js
class ChainSpec extends JsonRpcGroup {
  constructor(client, options) {
    super(client, { prefix: "chainSpec", supportedVersions: ["unstable", "v1"], ...options });
  }
  async chainName() {
    return this.send("chainName");
  }
  async genesisHash() {
    return this.send("genesisHash");
  }
  async properties() {
    return this.send("properties");
  }
}

// node_modules/@dedot/api/json-rpc/group/Transaction.js
class Transaction extends JsonRpcGroup {
  constructor(client, options) {
    super(client, { prefix: "transaction", supportedVersions: ["unstable", "v1"], ...options });
  }
  async broadcastTx(tx) {
    const operationId = await this.broadcast(tx);
    return () => {
      return this.stop(operationId);
    };
  }
  async broadcast(tx) {
    const operationId = await this.send("broadcast", tx);
    assert(operationId, "Maximum number of broadcasted transactions has been reached");
    return operationId;
  }
  stop(operationId) {
    return this.send("stop", operationId);
  }
}

// node_modules/@dedot/api/json-rpc/group/TransactionWatch.js
class TransactionWatch extends JsonRpcGroup {
  constructor(client, options) {
    super(client, { prefix: "transactionWatch", supportedVersions: ["unstable"], ...options });
  }
  broadcastTx(tx) {
    return this.submitAndWatch(tx, noop);
  }
  async submitAndWatch(tx, callback) {
    return this.send("submitAndWatch", tx, callback);
  }
}

// node_modules/@dedot/api/json-rpc/group/ChainHead/error.js
var RetryStrategy;
(function(RetryStrategy2) {
  RetryStrategy2["NOW"] = "NOW";
  RetryStrategy2["QUEUED"] = "QUEUED";
})(RetryStrategy || (RetryStrategy = {}));

class ChainHeadError extends DedotError {
  name = "ChainHeadError";
  retryStrategy;
}

class ChainHeadOperationInaccessibleError extends ChainHeadError {
  name = "ChainHeadOperationInaccessibleError";
  retryStrategy = RetryStrategy.NOW;
}

class ChainHeadStopError extends ChainHeadError {
  name = "ChainHeadStopError";
  retryStrategy = RetryStrategy.QUEUED;
}

class ChainHeadOperationError extends ChainHeadError {
  name = "ChainHeadOperationError";
}

class ChainHeadLimitReachedError extends ChainHeadError {
  name = "ChainHeadLimitReachedError";
  retryStrategy = RetryStrategy.QUEUED;
}
class ChainHeadBlockNotPinnedError extends ChainHeadError {
  name = "ChainHeadBlockNotPinnedError";
}

class ChainHeadBlockPrunedError extends ChainHeadError {
  name = "ChainHeadBlockPrunedError";
}

// node_modules/@dedot/api/json-rpc/group/ChainHead/BlockUsage.js
class BlockUsage {
  #usages = {};
  use(blockHash) {
    this.#usages[blockHash] = (this.#usages[blockHash] || 0) + 1;
  }
  release(blockHash) {
    if (!this.#usages[blockHash])
      return;
    this.#usages[blockHash] -= 1;
  }
  usage(blockHash) {
    return this.#usages[blockHash] || 0;
  }
  clear() {
    this.#usages = {};
  }
}

// node_modules/@dedot/api/json-rpc/group/ChainHead/ChainHead.js
var MIN_FINALIZED_QUEUE_SIZE = 10;

class ChainHead extends JsonRpcGroup {
  #unsub;
  #subscriptionId;
  #handlers;
  #pendingOperations;
  #finalizedQueue;
  #pinnedBlocks;
  #bestHash;
  #finalizedHash;
  #finalizedRuntime;
  #followResponseQueue;
  #retryQueue;
  #recovering;
  #blockUsage;
  #cache;
  constructor(client, options) {
    super(client, { prefix: "chainHead", supportedVersions: ["unstable", "v1"], ...options });
    this.#handlers = {};
    this.#pendingOperations = {};
    this.#pinnedBlocks = {};
    this.#finalizedQueue = [];
    this.#followResponseQueue = new AsyncQueue;
    this.#retryQueue = new AsyncQueue;
    this.#blockUsage = new BlockUsage;
    this.#cache = new Map;
  }
  async runtimeVersion() {
    await this.#ensureFollowed();
    return this.#finalizedRuntime;
  }
  async bestRuntimeVersion() {
    await this.#ensureFollowed();
    return this.#findRuntimeAt(this.#bestHash) || this.runtimeVersion();
  }
  async finalizedHash() {
    await this.#ensureFollowed();
    return this.#finalizedHash;
  }
  async bestHash() {
    await this.#ensureFollowed();
    return this.#bestHash;
  }
  async bestBlock() {
    return this.findBlock(await this.bestHash());
  }
  async finalizedBlock() {
    return this.findBlock(await this.finalizedHash());
  }
  findBlock(hash) {
    return this.#pinnedBlocks[hash];
  }
  isPinned(hash) {
    return !!this.findBlock(hash);
  }
  async unfollow() {
    await this.#ensureFollowed();
    this.#unsub && await this.#unsub();
    this.#cleanUp();
  }
  async follow() {
    assert(!this.#subscriptionId, "Already followed chain head. Please unfollow first.");
    return this.#doFollow();
  }
  async#doFollow() {
    const defer = deferred();
    try {
      this.#unsub && this.#unsub().catch(noop);
      this.#unsub = await this.send("follow", true, (event, subscription) => {
        this.#followResponseQueue.enqueue(async () => {
          await this.#onFollowEvent(event, subscription);
          if (event.event == "initialized") {
            defer.resolve();
          }
        }).catch(console.error);
      });
    } catch (e) {
      defer.reject(e);
    }
    return defer.promise;
  }
  #onFollowEvent = async (result3, subscription) => {
    switch (result3.event) {
      case "initialized": {
        const { finalizedBlockHashes = [], finalizedBlockHash, finalizedBlockRuntime } = result3;
        if (finalizedBlockHash)
          finalizedBlockHashes.push(finalizedBlockHash);
        this.#subscriptionId = subscription.subscriptionId;
        this.#finalizedQueue = finalizedBlockHashes;
        this.#finalizedRuntime = this.#extractRuntime(finalizedBlockRuntime);
        assert(this.#finalizedRuntime, "Invalid finalized runtime");
        this.#bestHash = this.#finalizedHash = finalizedBlockHashes.at(-1);
        this.#pinnedBlocks = finalizedBlockHashes.reduce((o, hash, idx, arr) => {
          o[hash] = { hash, parent: arr[idx - 1], number: idx };
          if (idx === finalizedBlockHashes.length - 1) {
            o[hash]["runtime"] = this.#finalizedRuntime;
          }
          return o;
        }, {});
        const header = $Header.tryDecode(await this.#getHeader(finalizedBlockHashes[0]));
        Object.values(this.#pinnedBlocks).forEach((b, idx) => {
          b.number += header.number;
          if (idx === 0) {
            b.parent = header.parentHash;
          }
        });
        break;
      }
      case "newBlock": {
        const { blockHash: hash, parentBlockHash: parent, newRuntime } = result3;
        const runtime = this.#extractRuntime(newRuntime);
        const parentBlock = this.findBlock(parent);
        assert(parentBlock, `Parent block not found for new block ${hash}`);
        this.#pinnedBlocks[hash] = {
          hash,
          parent,
          runtime: runtime || this.#findRuntimeAt(parent),
          number: parentBlock.number + 1
        };
        this.emit("newBlock", this.#pinnedBlocks[hash]);
        break;
      }
      case "bestBlockChanged": {
        const { bestBlockHash } = result3;
        const currentBestBlock = this.findBlock(this.#bestHash);
        const newBestBlock = this.findBlock(bestBlockHash);
        if (!newBestBlock)
          return;
        if (currentBestBlock.hash === newBestBlock.hash)
          return;
        const bestChainChanged = !this.#onTheSameChain(currentBestBlock, newBestBlock);
        this.#bestHash = bestBlockHash;
        this.emit("bestBlock", newBestBlock, bestChainChanged);
        if (bestChainChanged)
          this.emit("bestChainChanged", newBestBlock);
        break;
      }
      case "finalized": {
        const { finalizedBlockHashes, prunedBlockHashes } = result3;
        this.#finalizedHash = finalizedBlockHashes.at(-1);
        const finalizedRuntime = this.#findRuntimeAt(this.#finalizedHash);
        if (finalizedRuntime) {
          this.#finalizedRuntime = finalizedRuntime;
        }
        finalizedBlockHashes.forEach((hash) => {
          if (this.#finalizedQueue.includes(hash))
            return;
          this.#finalizedQueue.push(hash);
        });
        this.emit("finalizedBlock", this.findBlock(this.#finalizedHash));
        const finalizedBlockHeights = finalizedBlockHashes.map((hash) => this.findBlock(hash).number);
        const pinnedHashes = Object.keys(this.#pinnedBlocks);
        const hashesToUnpin = new Set([
          ...prunedBlockHashes.filter((hash) => pinnedHashes.includes(hash)),
          ...Object.values(this.#pinnedBlocks).filter((b) => finalizedBlockHeights.includes(b.number)).filter((b) => !finalizedBlockHashes.includes(b.hash)).map((b) => b.hash)
        ]);
        Object.values(this.#handlers).forEach(({ defer, hash, operationId }) => {
          if (hashesToUnpin.has(hash)) {
            defer.reject(new ChainHeadBlockPrunedError);
            this.stopOperation(operationId).catch(noop);
            delete this.#handlers[operationId];
          }
        });
        if (this.#finalizedQueue.length > MIN_FINALIZED_QUEUE_SIZE) {
          const finalizedQueue = this.#finalizedQueue.slice();
          const numOfItemsToUnpin = finalizedQueue.length - MIN_FINALIZED_QUEUE_SIZE;
          const queuedHashesToUnpin = finalizedQueue.splice(0, numOfItemsToUnpin);
          queuedHashesToUnpin.forEach((hash) => {
            if (this.#blockUsage.usage(hash) > 0) {
              finalizedQueue.unshift(hash);
            } else {
              hashesToUnpin.add(hash);
            }
          });
          this.#finalizedQueue = finalizedQueue;
        }
        hashesToUnpin.forEach((hash) => {
          if (!this.isPinned(hash))
            return;
          delete this.#pinnedBlocks[hash];
          Array.from(this.#cache.keys()).filter((key) => key.startsWith(`${hash}::`)).forEach((key) => this.#cache.delete(key));
        });
        this.unpin([...hashesToUnpin]).catch(noop);
        break;
      }
      case "stop": {
        this.#recovering = deferred();
        this.#doFollow().then(() => {
          this.#recovering.resolve();
          Object.values(this.#handlers).forEach(({ defer, operationId }) => {
            defer.reject(new ChainHeadStopError("ChainHead subscription stopped!"));
            delete this.#handlers[operationId];
          });
        }).catch((e) => {
          console.error(e);
          this.#recovering.reject(new ChainHeadError("Cannot recover from stop event!"));
          Object.values(this.#handlers).forEach(({ defer, operationId }) => {
            defer.reject(new ChainHeadError("Cannot recover from stop event!"));
            delete this.#handlers[operationId];
          });
        }).finally(() => {
          waitFor().then(() => {
            this.#recovering = undefined;
          });
        });
        break;
      }
      case "operationBodyDone": {
        this.#handleOperationResponse(result3, ({ defer }) => {
          defer.resolve(result3.value);
        });
        break;
      }
      case "operationCallDone": {
        this.#handleOperationResponse(result3, ({ defer }) => {
          defer.resolve(result3.output);
        });
        break;
      }
      case "operationStorageItems": {
        this.#handleOperationResponse(result3, (handler) => {
          if (!handler.storageResults)
            handler.storageResults = [];
          handler.storageResults.push(...result3.items);
        }, false);
        break;
      }
      case "operationStorageDone": {
        this.#handleOperationResponse(result3, ({ defer, storageResults }) => {
          defer.resolve(storageResults || []);
        });
        break;
      }
      case "operationError": {
        this.#handleOperationResponse(result3, ({ defer }) => {
          defer.reject(new ChainHeadOperationError(result3.error));
        });
        break;
      }
      case "operationInaccessible": {
        this.#handleOperationResponse(result3, ({ defer }) => {
          defer.reject(new ChainHeadOperationInaccessibleError("Operation Inaccessible"));
        });
        break;
      }
      case "operationWaitingForContinue": {
        this.continue(result3.operationId).catch(noop);
        break;
      }
    }
  };
  #findRuntimeAt(at) {
    const block = this.findBlock(at);
    if (!block)
      return;
    const runtime = block.runtime;
    if (runtime)
      return runtime;
    if (this.#finalizedQueue.includes(at))
      return;
    return this.#findRuntimeAt(block.parent);
  }
  #onTheSameChain(b1, b2) {
    if (!b1 || !b2)
      return false;
    if (b1.number === b2.number) {
      return b1.hash === b2.hash;
    } else if (b1.number < b2.number) {
      return this.#onTheSameChain(b1, this.findBlock(b2.parent));
    } else {
      return this.#onTheSameChain(this.findBlock(b1.parent), b2);
    }
  }
  #ensurePinnedHash(hash) {
    if (hash) {
      if (this.isPinned(hash)) {
        return hash;
      } else {
        throw new ChainHeadBlockNotPinnedError(`Block hash ${hash} is not pinned`);
      }
    }
    return ensurePresence(this.#bestHash || this.#finalizedHash);
  }
  #getOperationHandler(result3) {
    const handler = this.#handlers[result3.operationId];
    if (handler)
      return handler;
    if (!this.#pendingOperations[result3.operationId]) {
      this.#pendingOperations[result3.operationId] = [];
    }
    this.#pendingOperations[result3.operationId].push(result3);
  }
  #handleOperationResponse(result3, handle, cleanUp = true) {
    const handler = this.#getOperationHandler(result3);
    if (!handler)
      return;
    handle(handler);
    if (cleanUp) {
      this.#cleanUpOperation(result3.operationId);
    }
  }
  #extractRuntime(runtimeEvent) {
    if (!runtimeEvent)
      return;
    if (runtimeEvent.type == "valid") {
      return runtimeEvent.spec;
    }
    console.error(runtimeEvent.error);
  }
  #cleanUp() {
    this.off("newBlock");
    this.off("bestBlock");
    this.off("finalizedBlock");
    this.#subscriptionId = undefined;
    this.#unsub = undefined;
    this.#handlers = {};
    this.#pendingOperations = {};
    this.#pinnedBlocks = {};
    this.#bestHash = undefined;
    this.#finalizedHash = undefined;
    this.#finalizedRuntime = undefined;
    this.#followResponseQueue.clear();
    this.#retryQueue.clear();
    this.#blockUsage.clear();
    this.#cache.clear();
  }
  async#ensureFollowed() {
    if (this.#recovering) {
      await this.#recovering.promise;
    }
    assert(this.#subscriptionId, "Please call the .follow() method before invoking any other methods in this group.");
  }
  #cleanUpOperation(operationId) {
    delete this.#handlers[operationId];
    this.stopOperation(operationId).catch(noop);
  }
  async#performOperationWithRetry(operation, hash) {
    try {
      this.#blockUsage.use(hash);
      return await operation();
    } catch (e) {
      if (e instanceof ChainHeadError && e.retryStrategy) {
        return this.#retryOperation(e.retryStrategy, operation);
      }
      throw e;
    } finally {
      this.#blockUsage.release(hash);
    }
  }
  async#retryOperation(strategy, retry) {
    try {
      return await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (strategy === RetryStrategy.NOW) {
            retry().then(resolve).catch(reject);
          } else if (strategy === RetryStrategy.QUEUED) {
            this.#retryQueue.enqueue(retry).then(resolve).catch(reject);
          } else {
            throw new Error("Invalid retry strategy");
          }
        });
      });
    } catch (e) {
      if (e instanceof ChainHeadError && e.retryStrategy) {
        return this.#retryOperation(e.retryStrategy, retry);
      }
      throw e;
    }
  }
  #awaitOperation(resp, hash) {
    if (resp.result === "limitReached") {
      throw new ChainHeadLimitReachedError("Limit reached");
    }
    const defer = deferred();
    this.#handlers[resp.operationId] = {
      operationId: resp.operationId,
      defer,
      hash
    };
    if (this.#pendingOperations[resp.operationId]) {
      this.#pendingOperations[resp.operationId].forEach((one) => {
        this.#onFollowEvent(one);
      });
      delete this.#pendingOperations[resp.operationId];
    }
    return defer.promise;
  }
  async body(at) {
    await this.#ensureFollowed();
    const shouldRetryOnPrunedBlock = !at;
    try {
      const atHash = this.#ensurePinnedHash(at);
      const cacheKey = `${atHash}::body`;
      if (this.#cache.has(cacheKey)) {
        return this.#cache.get(cacheKey);
      }
      const operation = async () => {
        await this.#ensureFollowed();
        const hash = this.#ensurePinnedHash(atHash);
        const resp2 = await this.send("body", this.#subscriptionId, hash);
        return this.#awaitOperation(resp2, hash);
      };
      const resp = await this.#performOperationWithRetry(operation, atHash);
      this.#cache.set(cacheKey, resp);
      return resp;
    } catch (e) {
      if (e instanceof ChainHeadBlockPrunedError && shouldRetryOnPrunedBlock) {
        return this.body();
      }
      throw e;
    }
  }
  async call(func, params = "0x", at) {
    await this.#ensureFollowed();
    const shouldRetryOnPrunedBlock = !at;
    try {
      const atHash = this.#ensurePinnedHash(at);
      const cacheKey = `${atHash}::call::${func}::${params}`;
      if (this.#cache.has(cacheKey)) {
        return this.#cache.get(cacheKey);
      }
      const operation = async () => {
        await this.#ensureFollowed();
        const hash = this.#ensurePinnedHash(atHash);
        const resp2 = await this.send("call", this.#subscriptionId, hash, func, params);
        return this.#awaitOperation(resp2, hash);
      };
      const resp = await this.#performOperationWithRetry(operation, atHash);
      this.#cache.set(cacheKey, resp);
      return resp;
    } catch (e) {
      if (e instanceof ChainHeadBlockPrunedError && shouldRetryOnPrunedBlock) {
        return this.call(func, params);
      }
      throw e;
    }
  }
  async header(at) {
    await this.#ensureFollowed();
    const hash = this.#ensurePinnedHash(at);
    const cacheKey = `${hash}::header`;
    if (this.#cache.has(cacheKey)) {
      return this.#cache.get(cacheKey);
    }
    const resp = await this.#getHeader(hash);
    this.#cache.set(cacheKey, resp);
    return resp;
  }
  async#getHeader(at) {
    return await this.send("header", this.#subscriptionId, at);
  }
  async storage(items, childTrie, at) {
    await this.#ensureFollowed();
    const shouldRetryOnPrunedBlock = !at;
    const hash = this.#ensurePinnedHash(at);
    try {
      const cacheKey = `${hash}::storage::${JSON.stringify(items)}::${childTrie ?? null}`;
      if (this.#cache.has(cacheKey)) {
        return this.#cache.get(cacheKey);
      }
      this.#blockUsage.use(hash);
      const results = [];
      let queryItems = items;
      while (queryItems.length > 0) {
        const [newBatch, newDiscardedItems] = await this.#getStorage(queryItems, childTrie ?? null, hash);
        results.push(...newBatch);
        queryItems = newDiscardedItems;
      }
      this.#cache.set(cacheKey, results);
      return results;
    } catch (e) {
      if (e instanceof ChainHeadBlockPrunedError && shouldRetryOnPrunedBlock) {
        return this.storage(items, childTrie);
      }
      throw e;
    } finally {
      this.#blockUsage.release(hash);
    }
  }
  async#getStorage(items, childTrie, at) {
    const operation = () => this.#getStorageOperation(items, childTrie, this.#ensurePinnedHash(at));
    return this.#performOperationWithRetry(operation, at);
  }
  async#getStorageOperation(items, childTrie, at) {
    await this.#ensureFollowed();
    const resp = await this.send("storage", this.#subscriptionId, at, items, childTrie);
    let discardedItems = [];
    if (resp.result === "started" && resp.discardedItems && resp.discardedItems > 0) {
      discardedItems = items.slice(items.length - resp.discardedItems);
    }
    return [await this.#awaitOperation(resp, at), discardedItems];
  }
  async stopOperation(operationId) {
    await this.#ensureFollowed();
    await this.send("stopOperation", this.#subscriptionId, operationId);
  }
  async continue(operationId) {
    await this.#ensureFollowed();
    await this.send("continue", this.#subscriptionId, operationId);
  }
  async unpin(hashes) {
    await this.#ensureFollowed();
    if (Array.isArray(hashes) && hashes.length === 0)
      return;
    await this.send("unpin", this.#subscriptionId, hashes);
  }
}

// node_modules/@dedot/api/proxychain.js
var newProxyChain = (carrier, currentLevel = 1, maxLevel = 3) => {
  const { executor, chain: chain2 = [] } = carrier;
  if (currentLevel === maxLevel) {
    return executor.execute(...chain2);
  }
  return new Proxy(carrier, {
    get(target, property, receiver) {
      if (!target.chain) {
        target.chain = [];
      }
      const { chain: chain3 } = target;
      chain3.push(property.toString());
      return newProxyChain(target, currentLevel + 1, maxLevel);
    }
  });
};

// node_modules/@dedot/storage/impl/LocalStorage.js
var checkAvailability = () => {
  try {
    localStorage.setItem("dedot", "true");
    localStorage.removeItem("dedot");
  } catch {
    throw new Error("localStorage is not available!");
  }
};
var DEFAULT_PREFIX = "dedot:";

class LocalStorage {
  prefix;
  constructor(prefix = DEFAULT_PREFIX) {
    this.prefix = prefix;
    checkAvailability();
  }
  async clear() {
    const length = localStorage.length;
    const keysToRemove = [];
    for (let idx = 0;idx < length; idx += 1) {
      const key = localStorage.key(idx);
      if (key?.startsWith(this.prefix)) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach((key) => localStorage.removeItem(key));
  }
  async get(key) {
    return localStorage.getItem(this.#getPrefixedKey(key));
  }
  #getPrefixedKey(key) {
    return key.startsWith(DEFAULT_PREFIX) ? key : `${this.prefix}${key}`;
  }
  async set(key, value) {
    localStorage.setItem(this.#getPrefixedKey(key), value);
    return value;
  }
  async keys() {
    const length = localStorage.length;
    const keys = [];
    for (let idx = 0;idx < length; idx += 1) {
      const key = localStorage.key(idx);
      if (key?.startsWith(this.prefix))
        keys.push(key.substring(this.prefix.length));
    }
    return keys;
  }
  async length() {
    return (await this.keys()).length;
  }
  async remove(key) {
    localStorage.removeItem(this.#getPrefixedKey(key));
  }
}

// node_modules/@dedot/api/client/BaseSubstrateClient.js
var SUPPORTED_METADATA_VERSIONS = [15, 14];
var MetadataApiHash = calcRuntimeApiHash("Metadata");
var MESSAGE = "Make sure to call `.connect()` method first before using the API interfaces.";
function ensurePresence2(value) {
  return ensurePresence(value, MESSAGE);
}

class BaseSubstrateClient extends JsonRpcClient {
  rpcVersion;
  _options;
  _registry;
  _metadata;
  _genesisHash;
  _runtimeVersion;
  _localCache;
  _runtimeUpgrading;
  constructor(rpcVersion, options) {
    super(options);
    this.rpcVersion = rpcVersion;
    this._options = this.normalizeOptions(options);
  }
  normalizeOptions(options) {
    const defaultOptions = { throwOnUnknownApi: true };
    if (isJsonRpcProvider(options)) {
      return { ...defaultOptions, provider: options };
    } else {
      return { ...defaultOptions, ...options };
    }
  }
  async initializeLocalCache() {
    if (!this._options.cacheMetadata)
      return;
    if (this._options.cacheStorage) {
      this._localCache = this._options.cacheStorage;
      return;
    }
    try {
      this._localCache = new LocalStorage;
    } catch {
      throw new Error("localStorage is not available for caching, please provide a cacheStorage option");
    }
  }
  async setupMetadata(preloadMetadata) {
    let metadata2 = preloadMetadata;
    let shouldUpdateCache = !!metadata2;
    if (!metadata2) {
      metadata2 = this.getMetadataFromOptions(this._runtimeVersion);
    }
    const metadataKey = this.currentMetadataKey;
    try {
      if (this._localCache && this._options.cacheMetadata) {
        if (!metadata2) {
          try {
            const cachedRawMetadata = await this._localCache.get(metadataKey);
            if (cachedRawMetadata) {
              metadata2 = $Metadata.tryDecode(cachedRawMetadata);
            }
          } catch (e) {
            console.error("Cannot decode raw metadata, try fetching fresh metadata from chain.", e);
          }
        }
      }
    } finally {
      if (!metadata2) {
        metadata2 = await this.fetchMetadata();
        if (this._options.cacheMetadata)
          shouldUpdateCache = true;
      }
    }
    if (shouldUpdateCache && this._localCache) {
      await this._localCache.set(metadataKey, u8aToHex($Metadata.tryEncode(metadata2)));
    }
    if (!metadata2) {
      throw new Error("Cannot load metadata");
    }
    this.setMetadata(metadata2);
  }
  setMetadata(metadata2) {
    this._metadata = metadata2;
    this._registry = new PortableRegistry(metadata2.latest, this.options.hasher);
  }
  getMetadataKey(runtime) {
    return `RAW_META/${this._genesisHash || "0x"}/${runtime?.specVersion || "---"}`;
  }
  get currentMetadataKey() {
    return this.getMetadataKey(this._runtimeVersion);
  }
  async shouldPreloadMetadata() {
    if (this._options.metadata && Object.keys(this._options.metadata).length) {
      return false;
    }
    if (!this._options.cacheMetadata || !this._localCache) {
      return true;
    }
    const keys = await this._localCache.keys();
    return !keys.some((k) => k.startsWith("RAW_META/"));
  }
  getMetadataFromOptions(runtime) {
    if (!runtime || !this.options.metadata)
      return;
    const key = this.getMetadataKey(runtime);
    if (this.options.metadata[key]) {
      return $Metadata.tryDecode(this.options.metadata[key]);
    }
  }
  async fetchMetadata(hash, runtime) {
    const optionMetadata = this.getMetadataFromOptions(runtime);
    if (optionMetadata)
      return optionMetadata;
    const supportedV2 = runtime ? runtime.apis[MetadataApiHash] === 2 : true;
    if (supportedV2) {
      for (const version of SUPPORTED_METADATA_VERSIONS) {
        try {
          const rawMetadata = await this.callAt(hash).metadata.metadataAtVersion(version);
          if (!rawMetadata)
            continue;
          return $Metadata.tryDecode(rawMetadata);
        } catch {
        }
      }
    }
    try {
      return $Metadata.tryDecode(await this.callAt(hash).metadata.metadata());
    } catch {
      return await this.rpc.state_getMetadata();
    }
  }
  cleanUp() {
    this._registry = undefined;
    this._metadata = undefined;
    this._genesisHash = undefined;
    this._runtimeVersion = undefined;
    this._localCache = undefined;
  }
  async clearCache() {
    await this._localCache?.clear();
  }
  async doConnect() {
    this.on("connected", this.onConnected);
    this.on("disconnected", this.onDisconnected);
    return new Promise((resolve) => {
      this.once("ready", () => {
        resolve(this);
      });
    });
  }
  onConnected = async () => {
    await this.initialize();
  };
  onDisconnected = async () => {
  };
  async initialize() {
    await this.initializeLocalCache();
    await this.doInitialize();
    this.emit("ready");
  }
  async doInitialize() {
    throw new Error("Unimplemented!");
  }
  async beforeDisconnect() {
  }
  async afterDisconnect() {
    this.cleanUp();
  }
  toSubstrateRuntimeVersion(runtimeVersion) {
    return {
      ...runtimeVersion,
      apis: runtimeVersion.apis.reduce((o, [name, version]) => {
        o[name] = version;
        return o;
      }, {})
    };
  }
  startRuntimeUpgrade() {
    this._runtimeUpgrading = deferred();
  }
  doneRuntimeUpgrade() {
    if (!this._runtimeUpgrading)
      return;
    this._runtimeUpgrading.resolve();
    setTimeout(() => {
      this._runtimeUpgrading = undefined;
    });
  }
  async ensureRuntimeUpgraded() {
    if (!this._runtimeUpgrading)
      return;
    await this._runtimeUpgrading.promise;
  }
  async connect() {
    const [api, _] = await Promise.all([this.doConnect(), super.connect()]);
    return api;
  }
  async disconnect() {
    await this.beforeDisconnect();
    await super.disconnect();
    await this.afterDisconnect();
  }
  get options() {
    return this._options;
  }
  get metadata() {
    return ensurePresence2(this._metadata);
  }
  get registry() {
    return ensurePresence2(this._registry);
  }
  get genesisHash() {
    return ensurePresence2(this._genesisHash);
  }
  get runtimeVersion() {
    return ensurePresence2(this._runtimeVersion);
  }
  async getRuntimeVersion() {
    await this.ensureRuntimeUpgraded();
    return this.runtimeVersion;
  }
  get consts() {
    return newProxyChain({ executor: new ConstantExecutor(this) });
  }
  get errors() {
    return newProxyChain({ executor: new ErrorExecutor(this) });
  }
  get events() {
    return newProxyChain({ executor: new EventExecutor(this) });
  }
  get query() {
    throw new Error("Unimplemented!");
  }
  get call() {
    return this.callAt();
  }
  callAt(hash) {
    throw new Error("Unimplemented!");
  }
  get tx() {
    throw new Error("Unimplemented!");
  }
  at(hash) {
    throw new Error("Unimplemented!");
  }
  setSigner(signer) {
    this._options.signer = signer;
  }
}

// node_modules/@dedot/api/client/DedotClient.js
class DedotClient extends BaseSubstrateClient {
  _chainHead;
  _chainSpec;
  _txBroadcaster;
  #apiAtCache = {};
  constructor(options) {
    super("v2", options);
  }
  static async create(options) {
    return new DedotClient(options).connect();
  }
  static async new(options) {
    return DedotClient.create(options);
  }
  get chainSpec() {
    return ensurePresence2(this._chainSpec);
  }
  get chainHead() {
    return ensurePresence2(this._chainHead);
  }
  get txBroadcaster() {
    this.chainHead;
    assert(this._txBroadcaster, "JSON-RPC method to broadcast transactions is not supported by the server/node.");
    return this._txBroadcaster;
  }
  async#initializeTxBroadcaster(rpcMethods) {
    const tx = new Transaction(this, { rpcMethods });
    if (await tx.supported())
      return tx;
    const txWatch = new TransactionWatch(this, { rpcMethods });
    if (await txWatch.supported())
      return txWatch;
  }
  async doInitialize() {
    const rpcMethods = (await this.rpc.rpc_methods()).methods;
    this._chainHead = new ChainHead(this, { rpcMethods });
    this._chainSpec = new ChainSpec(this, { rpcMethods });
    this._txBroadcaster = await this.#initializeTxBroadcaster(rpcMethods);
    let [_, genesisHash] = await Promise.all([
      this.chainHead.follow(),
      this.chainSpec.genesisHash().catch(() => {
        return;
      })
    ]);
    this._genesisHash = genesisHash || await this.#getGenesisHashFallback();
    this._runtimeVersion = await this.chainHead.bestRuntimeVersion();
    let metadata2;
    if (await this.shouldPreloadMetadata()) {
      metadata2 = await this.fetchMetadata();
    }
    await this.setupMetadata(metadata2);
    this.subscribeRuntimeUpgrades();
  }
  async#getGenesisHashFallback() {
    const pallet = xxhashAsU8a("System", 128);
    const item = xxhashAsU8a("BlockHash", 128);
    const blockHeightAt0 = twox64Concat(u322.encode(0));
    const key = u8aToHex(concatU8a(pallet, item, blockHeightAt0));
    const storageValue = await this.chainHead.storage([{ type: "value", key }]);
    const rawGenesisHash = storageValue.at(0)?.value;
    assert(rawGenesisHash, "Genesis hash not found!");
    return $H256.tryDecode(rawGenesisHash);
  }
  subscribeRuntimeUpgrades() {
    this.chainHead.on("bestBlock", this.onRuntimeUpgrade);
  }
  onRuntimeUpgrade = async (block) => {
    const runtimeUpgraded = block.runtime && block.runtime.specVersion !== this._runtimeVersion?.specVersion;
    if (!runtimeUpgraded)
      return;
    this.startRuntimeUpgrade();
    this._runtimeVersion = block.runtime;
    const newMetadata = await this.fetchMetadata(undefined, this._runtimeVersion);
    await this.setupMetadata(newMetadata);
    this.emit("runtimeUpgraded", this._runtimeVersion);
    this.doneRuntimeUpgrade();
  };
  async beforeDisconnect() {
    await this.chainHead.unfollow();
  }
  onDisconnected = async () => {
    this.chainHead.unfollow().catch(noop);
  };
  cleanUp() {
    super.cleanUp();
    this._chainHead = undefined;
    this._chainSpec = undefined;
    this._txBroadcaster = undefined;
    this.#apiAtCache = {};
  }
  get query() {
    return newProxyChain({
      executor: new StorageQueryExecutorV2(this, this.chainHead)
    });
  }
  get call() {
    return this.callAt();
  }
  callAt(blockHash) {
    return newProxyChain({
      executor: new RuntimeApiExecutorV2(this, this.chainHead, blockHash)
    });
  }
  get tx() {
    return newProxyChain({ executor: new TxExecutorV2(this) });
  }
  async at(hash) {
    if (this.#apiAtCache[hash])
      return this.#apiAtCache[hash];
    const targetBlock = this.chainHead.findBlock(hash);
    assert(targetBlock, "Block is not pinned!");
    let targetVersion = targetBlock.runtime;
    if (!targetVersion) {
      targetVersion = this.toSubstrateRuntimeVersion(await this.callAt(hash).core.version());
    }
    let metadata2 = this.metadata;
    let registry = this.registry;
    if (targetVersion && targetVersion.specVersion !== this.runtimeVersion.specVersion) {
      metadata2 = await this.fetchMetadata(hash, targetVersion);
      registry = new PortableRegistry(metadata2.latest, this.options.hasher);
    }
    const api = {
      rpcVersion: "v2",
      atBlockHash: hash,
      options: this.options,
      genesisHash: this.genesisHash,
      runtimeVersion: targetVersion,
      metadata: metadata2,
      registry,
      rpc: this.rpc
    };
    api.consts = newProxyChain({ executor: new ConstantExecutor(api) });
    api.events = newProxyChain({ executor: new EventExecutor(api) });
    api.errors = newProxyChain({ executor: new ErrorExecutor(api) });
    api.query = newProxyChain({ executor: new StorageQueryExecutorV2(api, this.chainHead) });
    api.call = newProxyChain({ executor: new RuntimeApiExecutorV2(api, this.chainHead) });
    this.#apiAtCache[hash] = api;
    return api;
  }
}

// node_modules/@dedot/providers/error.js
var UNKNOWN_ERROR_CODE = -99999;

class JsonRpcError extends Error {
  code;
  data;
  constructor(eOrMsg, code = UNKNOWN_ERROR_CODE, data) {
    if (typeof eOrMsg === "string") {
      super(`${code}: ${eOrMsg}`);
      this.code = code;
      this.data = data;
    } else {
      const { message, code: code2, data: data2 } = eOrMsg;
      super(`${code2}: ${message}`);
      this.code = code2;
      this.data = data2;
    }
  }
}

// node_modules/@polkadot/x-global/index.js
function evaluateThis(fn) {
  return fn("return this");
}
var xglobal = typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : evaluateThis(Function);

// node_modules/@polkadot/x-ws/browser.js
var WebSocket = xglobal.WebSocket;

// node_modules/@dedot/providers/base/SubscriptionProvider.js
class SubscriptionProvider extends EventEmitter2 {
  _status;
  _handlers;
  _subscriptions;
  _pendingNotifications;
  constructor() {
    super();
    this._status = "disconnected";
    this._handlers = {};
    this._subscriptions = {};
    this._pendingNotifications = {};
  }
  connect() {
    throw new Error("Unimplemented!");
  }
  disconnect() {
    throw new Error("Unimplemented!");
  }
  async doSend(request) {
    throw new Error("Unimplemented!");
  }
  _setStatus(status) {
    if (this._status === status)
      return;
    this._status = status;
    this.emit(status);
  }
  _cleanUp() {
    this._handlers = {};
    this._subscriptions = {};
    this._pendingNotifications = {};
    this.clearEvents();
  }
  get status() {
    return this._status;
  }
  _onReceiveResponse = (response) => {
    const data = JSON.parse(response);
    const isNotification = !data.id && data.method;
    if (isNotification) {
      this._handleNotification(data);
    } else {
      this._handleResponse(data);
    }
  };
  _handleResponse(response) {
    const { id, error, result: result3 } = response;
    const handler = this._handlers[id];
    if (!handler) {
      console.error(`Received response with unknown id: ${id}`);
      return;
    }
    const { defer } = handler;
    if (error) {
      defer.reject(new JsonRpcError(error));
    } else {
      defer.resolve(result3);
    }
    delete this._handlers[id];
  }
  _handleNotification(response) {
    const { method: subname, params } = response;
    const { subscription: subscriptionId, result: result3, error } = params;
    const subkey = `${subname}::${subscriptionId}`;
    const substate = this._subscriptions[subkey];
    if (!substate) {
      if (!this._pendingNotifications[subkey]) {
        this._pendingNotifications[subkey] = [];
      }
      this._pendingNotifications[subkey].push(response);
      return;
    }
    const { callback } = substate;
    if (error) {
      callback(new JsonRpcError(error), null, substate.subscription);
    } else {
      callback(null, result3, substate.subscription);
    }
  }
  async send(method, params) {
    const defer = deferred();
    try {
      const request = this.#prepareRequest(method, params);
      this._handlers[request.id] = {
        defer,
        request,
        from: Date.now()
      };
      await this.doSend(request);
    } catch (e) {
      defer.reject(e);
    }
    return defer.promise;
  }
  async subscribe(input, callback) {
    const { subname, subscribe, params, unsubscribe } = input;
    const subscriptionId = await this.send(subscribe, params);
    const subkey = `${subname}::${subscriptionId}`;
    const subscription = {
      unsubscribe: async () => {
        delete this._subscriptions[subkey];
        await this.send(unsubscribe, [subscriptionId]);
      },
      subscriptionId
    };
    this._subscriptions[subkey] = {
      input,
      callback,
      subscription
    };
    if (this._pendingNotifications[subkey]) {
      this._pendingNotifications[subkey].forEach((notification) => {
        this._handleNotification(notification);
      });
      delete this._pendingNotifications[subkey];
    }
    return subscription;
  }
  #id = 0;
  #prepareRequest(method, params) {
    const id = ++this.#id;
    return {
      id,
      jsonrpc: "2.0",
      method,
      params
    };
  }
}

// node_modules/@dedot/providers/ws/WsProvider.js
var DEFAULT_OPTIONS = {
  retryDelayMs: 2500,
  timeout: 30000
};
var NO_RESUBSCRIBE_PREFIXES = ["author_", "chainHead_", "transactionWatch_"];

class WsProvider extends SubscriptionProvider {
  #options;
  #ws;
  #timeoutTimer;
  constructor(options) {
    super();
    this.#options = this.#normalizeOptions(options);
  }
  async connect() {
    this.#connectAndRetry();
    return this.#untilConnected();
  }
  #untilConnected = () => {
    return new Promise((resolve, reject) => {
      const doResolve = () => {
        resolve(this);
        this.off("error", doReject);
      };
      const doReject = (error) => {
        reject(error);
        this.off("connected", doResolve);
      };
      this.once("connected", doResolve);
      if (!this.#shouldRetry) {
        this.once("error", doReject);
      }
    });
  };
  get #shouldRetry() {
    return this.#options.retryDelayMs > 0;
  }
  #doConnect() {
    assert(!this.#ws, "Websocket connection already exists");
    try {
      this.#ws = new WebSocket(this.#options.endpoint);
      this.#ws.onopen = this.#onSocketOpen;
      this.#ws.onclose = this.#onSocketClose;
      this.#ws.onmessage = this.#onSocketMessage;
      this.#ws.onerror = this.#onSocketError;
      this.#setupRequestTimeoutHandler();
    } catch (e) {
      console.error("Error connecting to websocket", e);
      this.emit("error", e);
      throw e;
    }
  }
  #connectAndRetry() {
    assert(!this.#ws, "Websocket connection already exists");
    try {
      this.#doConnect();
    } catch (e) {
      if (!this.#shouldRetry) {
        throw e;
      }
      this.#retry();
    }
  }
  #retry() {
    if (!this.#shouldRetry)
      return;
    setTimeout(() => {
      this._setStatus("reconnecting");
      this.#connectAndRetry();
    }, this.#options.retryDelayMs);
  }
  #onSocketOpen = async (event) => {
    this._setStatus("connected");
    Object.keys(this._subscriptions).forEach((subkey) => {
      const { input, callback, subscription } = this._subscriptions[subkey];
      if (NO_RESUBSCRIBE_PREFIXES.some((prefix) => input.subscribe.startsWith(prefix))) {
        delete this._subscriptions[subkey];
        return;
      }
      this.subscribe(input, callback).then((newsub) => {
        delete this._subscriptions[subkey];
        Object.assign(subscription, newsub);
      });
    });
  };
  #clearWs() {
    if (!this.#ws)
      return;
    this.#ws.onclose = null;
    this.#ws.onerror = null;
    this.#ws.onmessage = null;
    this.#ws.onopen = null;
    this.#ws = undefined;
  }
  #setupRequestTimeoutHandler() {
    const timeout = this.#options.timeout;
    if (timeout <= 0)
      return;
    this.#clearTimeoutHandler();
    this.#timeoutTimer = setInterval(() => {
      const now = Date.now();
      Object.values(this._handlers).forEach(({ from, defer, request }) => {
        if (now - from > timeout) {
          defer.reject(new Error(`Request timed out after ${timeout}ms`));
          delete this._handlers[request.id];
        }
      });
    }, 5000);
  }
  #clearTimeoutHandler() {
    if (!this.#timeoutTimer)
      return;
    clearInterval(this.#timeoutTimer);
    this.#timeoutTimer = undefined;
  }
  _cleanUp() {
    super._cleanUp();
    this.#clearWs();
    this.#clearTimeoutHandler();
  }
  #onSocketClose = (event) => {
    this.#clearWs();
    const error = new Error(`disconnected from ${this.#options.endpoint}: ${event.code} - ${event.reason}`);
    Object.values(this._handlers).forEach(({ defer }) => {
      defer.reject(error);
    });
    this._handlers = {};
    this._pendingNotifications = {};
    this._setStatus("disconnected");
    const normalClosure = event.code === 1000;
    if (!normalClosure) {
      console.error(error.message);
      this.#retry();
    }
  };
  #onSocketError = (error) => {
    this.emit("error", error);
  };
  #onSocketMessage = (message) => {
    this._onReceiveResponse(message.data);
  };
  #normalizeOptions(options) {
    const normalizedOptions = typeof options === "string" ? {
      ...DEFAULT_OPTIONS,
      endpoint: options
    } : {
      ...DEFAULT_OPTIONS,
      ...options
    };
    const { endpoint = "" } = normalizedOptions;
    if (!endpoint.startsWith("ws://") && !endpoint.startsWith("wss://")) {
      throw new Error(`Invalid websocket endpoint ${endpoint}, a valid endpoint should start with wss:// or ws://`);
    }
    return normalizedOptions;
  }
  async disconnect() {
    try {
      assert(this.#ws, "Websocket connection does not exist");
      this.#ws.close(1000);
      this._setStatus("disconnected");
      this._cleanUp();
    } catch (error) {
      console.error("Error disconnecting from websocket", error);
      this.emit("error", error);
      throw error;
    }
  }
  async doSend(request) {
    assert(this.#ws && this.status === "connected", "Websocket connection is not connected");
    this.#ws.send(JSON.stringify(request));
  }
}

// src/provider.ts
var providersUrl = {
  melodie: "wss://melodie-rpc.allfeat.io",
  devnet: "ws://127.0.0.1:9944"
};

class AllfeatProvider extends WsProvider {
  constructor(networkOrUrl) {
    const url = networkOrUrl in providersUrl ? providersUrl[networkOrUrl] : networkOrUrl;
    if (!url) {
      throw new Error(`Network ${networkOrUrl} is not supported, and no valid URL was provided`);
    }
    super(url);
  }
  static getSupportedNetworks() {
    return Object.keys(providersUrl);
  }
}
// src/client.ts
class AllfeatClient extends DedotClient {
  constructor(provider) {
    super(provider);
  }
  static new(provider) {
    return DedotClient.new(provider);
  }
}
// src/midds/midds.ts
class Midds {
  _palletName;
  inputs;
  constructor(palletName, inputs) {
    this._palletName = palletName;
    this.inputs = inputs;
  }
  getInput(key) {
    return this.inputs[key];
  }
  get isValid() {
    const inputs = Object.values(this.inputs);
    return inputs.every((input) => input.isValid) && inputs.some((input) => input.Value !== null);
  }
  createRegisterExtrinsic(client) {
    const extrinsicFn = client.tx[this._palletName]?.register;
    if (!extrinsicFn) {
      throw new Error(`Register function not found for MIDDS module: ${this._palletName}`);
    }
    return extrinsicFn(this.parseIntoSubstrateType());
  }
  register(client, account, signer, callback) {
    return new Promise(async (resolve, reject) => {
      try {
        const options = signer ? { signer } : {};
        const unsub = await this.createRegisterExtrinsic(client).signAndSend(account, options, (result3) => {
          if (callback) {
            callback(result3);
          }
          console.log("Registration of the MIDDS current status: ", result3.status.type);
          if (result3.status.type === "BestChainBlockIncluded" || result3.status.type === "Finalized") {
            unsub();
            console.log("Registration successfully included in the chain, fetching result data...");
            const eventToFind = client.events[this._palletName].MiddsRegistered;
            if (!eventToFind) {
              throw new Error(`MiddsRegistered Event not found for MIDDS module: ${this._palletName}`);
            }
            const event = result3.events.find((event2) => eventToFind.is(event2));
            if (!event || typeof event.event.palletEvent === "string") {
              reject(new Error("Expected event not found, Register call probably failed on-chain."));
              return;
            }
            console.log("Found MIDDS Registration event: ", event);
            const registerResult = {
              txHash: result3.txHash,
              blockHash: result3.status.value.blockHash,
              blockNumber: result3.status.value.blockNumber,
              middsHash: event.event.palletEvent.data.hashId,
              provider: event.event.palletEvent.data.provider.address(),
              collateralCost: event.event.palletEvent.data.dataColateral
            };
            console.log("Returning new MIDDS Registration result: ", registerResult);
            resolve(registerResult);
          }
          if (result3.status.type === "Drop" || result3.status.type === "Invalid" || result3.status.type === "NoLongerInBestChain") {
            console.log("Transaction of MIDDS Registration failed to be included in the chain: ", result3.status.type);
            unsub();
            reject(new Error(`Extrinsic failed with status: ${result3.status.type}`));
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}
// src/midds/input.ts
class MiddsInput {
  value = null;
  name;
  constructor(name) {
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
}

class MiddsString extends MiddsInput {
  _maxLength;
  _regex;
  constructor(name, regex, maxLength) {
    super(name);
    this._regex = regex;
    this._maxLength = maxLength;
  }
  get Value() {
    return this.value;
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
      return toHex(this.Value);
    }
  }
  get isValid() {
    let regexAssert = true;
    if (this._regex && this.Value) {
      regexAssert = this._regex.test(this.Value);
    }
    return !(regexAssert && this.Value && this.Value.length > this.MaxLength);
  }
  set Value(value) {
    if (value?.trim() === "") {
      this.value = null;
      return;
    }
    this.value = value;
  }
}

class MiddsNumber extends MiddsInput {
  constructor(name) {
    super(name);
  }
  intoSubstrateType() {
    if (!this.Value) {
      throw new Error(`Null value cannot be parsed to Substrate type`);
    } else
      return BigInt(this.Value);
  }
}
// src/midds/stakeholder.ts
class Stakeholder extends Midds {
  constructor() {
    const inputs = {
      ipi: new IPINameNumber,
      firstName: new FirstName,
      lastName: new LastName,
      nickname: new Nickname
    };
    super("stakeholders", inputs);
  }
  set IPI(IPI) {
    this.getInput("ipi").Value = IPI;
  }
  set FirstName(FirstName) {
    this.getInput("firstName").Value = FirstName;
  }
  set LastName(LastName) {
    this.getInput("lastName").Value = LastName;
  }
  set Nickname(Nickname) {
    this.getInput("nickname").Value = Nickname;
  }
  get IPI() {
    return this.getInput("ipi");
  }
  get FirstName() {
    return this.getInput("firstName");
  }
  get LastName() {
    return this.getInput("lastName");
  }
  get Nickname() {
    return this.getInput("nickname");
  }
  parseIntoSubstrateType() {
    return {
      ipi: this.IPI.isValid && this.IPI.Value ? this.IPI.intoSubstrateType() : undefined,
      firstName: this.FirstName.isValid && this.FirstName.Value ? this.FirstName.intoSubstrateType() : undefined,
      lastName: this.LastName.isValid && this.LastName.Value ? this.LastName.intoSubstrateType() : undefined,
      nickname: this.Nickname.isValid && this.Nickname.Value ? this.Nickname.intoSubstrateType() : undefined
    };
  }
}

class IPINameNumber extends MiddsNumber {
  constructor() {
    super("IPI Name Number");
  }
  get isValid() {
    return !(this.Value && (this.Value > 99999999999 || this.Value < 1e8));
  }
}

class FirstName extends MiddsString {
  constructor() {
    super("First Name", null, 128);
  }
}

class LastName extends MiddsString {
  constructor() {
    super("Last Name", null, 128);
  }
}

class Nickname extends MiddsString {
  constructor() {
    super("Nickname", null, 128);
  }
}
export {
  Stakeholder,
  MiddsString,
  MiddsNumber,
  MiddsInput,
  Midds,
  AllfeatProvider,
  AllfeatClient
};

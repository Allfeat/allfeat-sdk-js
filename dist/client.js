"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllfeatClient = void 0;
const dedot_1 = require("dedot");
class AllfeatClient extends dedot_1.DedotClient {
    constructor(provider) {
        super(provider);
    }
    static new(provider) {
        return dedot_1.DedotClient.new(provider);
    }
}
exports.AllfeatClient = AllfeatClient;
//# sourceMappingURL=client.js.map
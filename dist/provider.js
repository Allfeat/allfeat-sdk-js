"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllfeatProvider = void 0;
const dedot_1 = require("dedot");
const providersUrl = {
    melodie: 'wss://melodie-rpc.allfeat.io',
    devnet: 'ws://127.0.0.1:9944'
};
class AllfeatProvider extends dedot_1.WsProvider {
    /**
     * Create a Provider instance for a specific Allfeat network
     * @param networkOrUrl - Network to connect to ('melodie' or 'devnet' or custom URL)
     */
    constructor(networkOrUrl) {
        const url = (networkOrUrl in providersUrl)
            ? providersUrl[networkOrUrl] // Predefined Networks
            : networkOrUrl; // Custom URL
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
}
exports.AllfeatProvider = AllfeatProvider;
//# sourceMappingURL=provider.js.map
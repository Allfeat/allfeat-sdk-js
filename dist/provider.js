import { WsProvider } from "dedot";
const providersUrl = {
    melodie: 'wss://melodie-rpc.allfeat.io',
    devnet: 'ws://127.0.0.1:9944'
};
export class AllfeatProvider extends WsProvider {
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
//# sourceMappingURL=provider.js.map
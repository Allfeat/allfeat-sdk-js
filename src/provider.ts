import {WsProvider} from "dedot";
import type {AllfeatNetwork} from "./types.ts";

const providersUrl: Record<AllfeatNetwork, string> = {
    melodie: 'wss://melodie-rpc.allfeat.io',
    devnet: 'ws://127.0.0.1:9944'
}

export class AllfeatProvider extends WsProvider {
    /**
     * Create a Provider instance for a specific Allfeat network
     * @param networkOrUrl - Network to connect to ('melodie' or 'devnet' or custom URL)
     */
    constructor(networkOrUrl: AllfeatNetwork | string) {
        const url = (networkOrUrl in providersUrl)
            ? providersUrl[networkOrUrl as AllfeatNetwork] // Predefined Networks
            : networkOrUrl; // Custom URL

        if (!url) {
            throw new Error(`Network ${networkOrUrl} is not supported, and no valid URL was provided`);
        }

        super(url);
    }

    /**
     * List all supported networks
     */
    static getSupportedNetworks(): AllfeatNetwork[] {
        return Object.keys(providersUrl) as AllfeatNetwork[];
    }
}
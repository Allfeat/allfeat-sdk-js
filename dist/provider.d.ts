import { WsProvider } from "dedot";
import type { AllfeatNetwork } from "./types.ts";
export declare class AllfeatProvider extends WsProvider {
    /**
     * Create a Provider instance for a specific Allfeat network
     * @param networkOrUrl - Network to connect to ('melodie' or 'devnet' or custom URL)
     */
    constructor(networkOrUrl: AllfeatNetwork | string);
    /**
     * List all supported networks
     */
    static getSupportedNetworks(): AllfeatNetwork[];
}
//# sourceMappingURL=provider.d.ts.map
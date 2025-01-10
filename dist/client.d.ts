import { DedotClient } from "dedot";
import { AllfeatProvider } from "./provider";
import { AllfeatApi } from "./interfaces/allfeat";
export declare class AllfeatClient extends DedotClient<AllfeatApi> {
    constructor(provider: AllfeatProvider);
    static new(provider: AllfeatProvider): Promise<AllfeatClient>;
}
//# sourceMappingURL=client.d.ts.map
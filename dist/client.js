import { DedotClient } from "dedot";
export class AllfeatClient extends DedotClient {
    constructor(provider) {
        super(provider);
    }
    static new(provider) {
        return DedotClient.new(provider);
    }
}
//# sourceMappingURL=client.js.map
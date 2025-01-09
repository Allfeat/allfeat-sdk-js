import {DedotClient} from "dedot";
import {AllfeatProvider} from "./provider";
import {AllfeatApi} from "./interfaces/allfeat";

export class AllfeatClient extends DedotClient<AllfeatApi> {
    constructor(provider: AllfeatProvider) {
        super(provider);
    }

    static new(provider: AllfeatProvider): Promise<AllfeatClient> {
        return DedotClient.new<AllfeatApi>(provider);
    }
}
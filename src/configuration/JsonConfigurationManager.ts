import {injectable} from "inversify";
import "reflect-metadata";
import {ConfigurationManager} from "./ConfigurationManager";
import {TYPES} from "../types";
import * as config from "config";

@injectable()
export class JsonConfigurationManager implements ConfigurationManager {
    

    constructor() {
    }

    /**
     * 验证Key格式是否合法
     * @param key key
     */
    validKey(key: string): boolean {
        if(key === null || key.length <= 0)
            return false;
        return true;
    }

    getStringValue(key: string): string {
        if(this.validKey(key))
            return config.get<string>(key);
        return undefined;
    }

    getBooleanValue(key: string): boolean {
        if(this.validKey(key))
            return config.get<boolean>(key);
        return undefined;
    }

    getNumberValue(key: string): number {
        if(this.validKey(key))
            return config.get<number>(key);
        return undefined;
    }

    getSection<T>(key: string): T{
        if(!this.validKey(key))
            return undefined;
        
        return config.get<T>(key);
    }

    exists(key: string): boolean{
        if(this.validKey(key))
            return config.has(key);
        return false;
    }
}
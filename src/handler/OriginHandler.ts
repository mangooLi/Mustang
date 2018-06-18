import {Handler} from "./Handler";
import {WSContext} from "../common/WSContext";
import { NotImplementedError } from "../error/NotImplementedError";

export class OriginHandler implements Handler {
    
    /**
     * 添加域名到应用白名单中
     * @param appname 应用名
     * @param domainname 域名
     */
    add(appname: string, domainname: string): void {

    }

    /**
     * 从指定应用白名单中移除域名
     * @param appname 应用名
     * @param domainname 域名
     */
    remove(appname: string, domainname: string): void {

    }

    /**
     * 查询域名是否存在应用白名单中
     * @param appname 应用名
     * @param domainname 域名
     */
    existed(appname: string, domainname: string): boolean {
        return false;
    }

    /**
     * 获取应用白名单列表
     * @param appname 应用名
     */
    get(appname: string): string[] {
        return [];
    }

    process(context: WSContext): boolean {
        throw new NotImplementedError();
    }
}
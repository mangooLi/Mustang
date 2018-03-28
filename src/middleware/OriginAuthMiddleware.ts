import {Middleware} from "./Middleware";
import {Handler} from "../handler/Handler";
import {WSContext} from "../common/WSContext";
import { NotImplementedError } from "../error/NotImplementedError";

/**
 * 域名白名单中间件
 */
export default class OriginAuthMiddleware implements Middleware {

    constructor() {
        
    }

    getHandler(context: WSContext): Handler {
        throw new NotImplementedError();
    }
}
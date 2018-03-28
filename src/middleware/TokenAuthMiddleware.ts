import {Middleware} from "./Middleware";
import {Handler} from "../handler/Handler";
import {WSContext} from "../common/WSContext";
import { NotImplementedError } from "../error/NotImplementedError";

/**
 * 访问令牌授权中间件
 */
export class TokenAuthMiddleware extends Middleware {

    constructor() {
        super();
    }

    getHandler(context: WSContext): Handler {
        throw new NotImplementedError();
    }
}
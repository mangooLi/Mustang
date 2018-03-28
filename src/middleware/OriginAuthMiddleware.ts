import {Middleware} from "./Middleware";
import {Handler} from "../handler/Handler";
import {WSContext, State} from "../common/WSContext";
import { NotImplementedError } from "../error/NotImplementedError";

/**
 * 域名白名单中间件
 */
export default class OriginAuthMiddleware extends Middleware {

    constructor() {
        super();
    }

    getHandler(context: WSContext): Handler {
        if(context.state == State.Connection){

        }
        return null;
    }
}
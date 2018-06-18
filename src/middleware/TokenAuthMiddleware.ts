import {Middleware} from "./Middleware";
import {Handler,NullHandler} from "../handler/Handler";
import {WSContext,State} from "../common/WSContext";

/**
 * 访问令牌授权中间件
 */
export default class TokenAuthMiddleware extends Middleware {

    constructor() {
        super();
    }

    getHandler(context: WSContext): Handler {
        if(context.state == State.Connection){

        }
        return new NullHandler();
    }
}
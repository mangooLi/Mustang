import {Middleware} from "./Middleware";
import {Handler} from "../handler/Handler";
import {WSContext} from "../common/WSContext";
import { NotImplementedError } from "../error/NotImplementedError";

/**
 * 异常中间件，作为全局第一个中间件，负责所有异常日志记录等
 */
export default class ErrorMiddleware extends Middleware {
    
    constructor() {
        super();
    }

    getHandler(context: WSContext): Handler {
        throw new NotImplementedError();
    }
}
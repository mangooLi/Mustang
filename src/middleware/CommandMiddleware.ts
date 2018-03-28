import {Middleware} from "./Middleware";
import {Handler} from "../handler/Handler";
import {WSContext} from "../common/WSContext";
import { NotImplementedError } from "../error/NotImplementedError";

/**
 * 命令中间件
 */
export default class CommandMiddleware extends Middleware {

    constructor() {
        super();
    }

    getHandler(context: WSContext): Handler {
        throw new NotImplementedError();
    }
}